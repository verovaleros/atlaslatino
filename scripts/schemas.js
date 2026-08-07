// Shared Zod schemas for AtlasLatino content.
//
// Used by scripts/validate.js (CI + `pnpm run validate`) and by the
// Eleventy _data loaders, so the rules enforced at build time and at
// validation time can never drift apart.

import { z } from "zod";
import { FIELD_SLUGS } from "../src/_data/fields.js";
import { TYPE_SLUGS } from "../src/_data/types.js";

// ISO 3166-1 alpha-2 country code: two uppercase letters.
const isoCountry = z
  .string()
  .regex(/^[A-Z]{2}$/, "must be an ISO 3166-1 alpha-2 code, e.g. \"AR\", \"MX\", \"BR\"");

// ISO date string, e.g. "2026-08-05". Deliberately a plain string
// (not z.date()) because frontmatter YAML dates round-trip as strings
// through gray-matter/js-yaml unless quoted, and keeping it a string
// avoids surprises from either representation reaching this schema.
//
// The shape check alone is not enough: Date.UTC silently rolls over
// out-of-range parts, so "2026-13-01" (a plausible off-by-one on the
// month) would pass and then render as January 2027 *and* sort to the
// top of the feed. The round-trip check rejects any date that isn't a
// real calendar date.
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date string, e.g. \"2026-08-05\"")
  .refine(
    (s) => {
      const d = new Date(`${s}T00:00:00Z`);
      return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
    },
    { message: "is not a real calendar date" }
  );

// z.string().url() validates URL *syntax*, not scheme — "javascript:alert(1)"
// is a syntactically valid URL and would otherwise pass validation and be
// rendered into a live href. Content arrives via pull request, and a
// javascript: URL in a links: block looks much like a legitimate entry in a
// diff, so the scheme is constrained here rather than relying on review.
const url = z
  .string()
  .url()
  .refine((u) => /^https?:\/\//i.test(u), {
    message: "must be an http:// or https:// URL",
  });

const linksSchema = z
  .object({
    website: url.optional(),
    orcid: url.optional(),
    scholar: url.optional(),
    github: url.optional(),
    mastodon: url.optional(),
    linkedin: url.optional(),
    bluesky: url.optional(),
    x: url.optional(),
  })
  .strict()
  // Every key here is optional, and the whole object is optional too, so
  // `links: {}` (e.g. left over from an unfilled template a contributor
  // copy-pasted) would otherwise pass validation — templates then treat
  // a present-but-empty links object as truthy and render a stray empty
  // <p class="person-links"></p>. Reject the empty-object case explicitly
  // so "links present" always means "at least one link present".
  .refine((links) => Object.keys(links).length > 0, {
    message: "if present, links must include at least one URL — omit the field entirely instead of leaving it empty",
  })
  .optional();

export const personSchema = z
  .object({
    name: z.string().min(1, "required"),
    country: isoCountry,
    city: z.string().min(1).optional(),
    currentCountry: isoCountry.optional(),
    affiliation: z.string().min(1).optional(),
    // NOTE: no "field" here on purpose — field/topic tagging lives on
    // research entries, not people (a person's areas are the union of
    // their research entries' fields). .strict() below means a
    // leftover "field:" key in a person file is already rejected as
    // an unrecognized key, with a clear Zod message pointing at it.
    links: linksSchema,
  })
  .strict();

// Events span multiple days (a village runs all four days of DEF CON;
// Black Hat's trainings start days before its briefings) — a single
// `date` field conflated "when does this event happen" with "when does
// a session at it happen", and that ambiguity is exactly what caused a
// real mixup between an event's date and one of its sessions' dates.
// Two explicit fields instead. endDate is optional in frontmatter (a
// genuinely single-day event shouldn't need to type the same date
// twice) and defaults to startDate via `.transform()` below — done here
// rather than in each consumer (src/_data/events.js, scripts/validate.js)
// so every reader of eventSchema output sees the same already-normalized
// shape, never a partial one.
export const eventSchema = z
  .object({
    name: z.string().min(1, "required"),
    location: z.string().min(1).optional(),
    startDate: isoDate,
    endDate: isoDate.optional(),
    url: url.optional(),
  })
  .strict()
  .transform((event) => ({ ...event, endDate: event.endDate ?? event.startDate }))
  .refine((event) => event.endDate >= event.startDate, {
    message: "endDate must be on or after startDate",
    path: ["endDate"],
  });

const linkEntry = z.object({
  label: z.string().min(1, "required"),
  url: url,
});

export const researchSchema = z
  .object({
    title: z.string().min(1, "required"),
    date: isoDate,
    people: z.array(z.string().min(1)).min(1, "must reference at least one person slug"),
    event: z.string().min(1).optional(),
    field: z.enum(FIELD_SLUGS, {
      message: `must be one of: ${FIELD_SLUGS.join(", ")}`,
    }),
    // What kind of work this is (a talk, a training, a paper), as
    // distinct from `field`, which is what subject it's in.
    type: z.enum(TYPE_SLUGS, {
      message: `must be one of: ${TYPE_SLUGS.join(", ")}`,
    }),
    links: z.array(linkEntry).optional(),
    news: z.array(linkEntry).optional(),
  })
  .strict();
