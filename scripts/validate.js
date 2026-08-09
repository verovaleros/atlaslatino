#!/usr/bin/env node
// Validates every file under src/content/{people,events,research}
// against the Zod schemas in scripts/schemas.js, plus cross-reference
// integrity (research.people[]/event slugs must actually exist) and
// filename conventions.
//
// Collects every error before exiting — a contributor's PR should
// show all problems in one run, not one-at-a-time. Exits non-zero on
// any failure so CI (.github/workflows/ci.yml) fails the PR.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { personSchema, eventSchema, researchSchema } from "./schemas.js";
import { FIELD_SLUGS } from "../src/_data/fields.js";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src/content");

// filename (without .md) must be lowercase letters/digits/hyphens only
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// people files specifically: country code, then one or more name parts.
// One part is allowed on purpose — mononyms exist ("br-pele.md"), and
// requiring two would reject them.
const PERSON_FILENAME_PATTERN = /^[a-z]{2}(-[a-z0-9]+)+$/;

/** @returns {{ slug: string, file: string, data: object, body: string }[]} */
function loadCollection(dirName) {
  const dir = path.join(CONTENT_DIR, dirName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const file = path.join("src/content", dirName, filename);
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      let data = {};
      let body = "";
      try {
        ({ data, content: body } = matter(raw));
      } catch (err) {
        return { slug, file, data: null, body: null, parseError: err.message };
      }
      return { slug, file, data, body: body.trim() };
    });
}

const errors = [];

function reportZodError(file, zodError) {
  for (const issue of zodError.issues) {
    const field = issue.path.length ? issue.path.join(".") : "(root)";
    errors.push(`${file}: field "${field}" — ${issue.message}`);
  }
}

// --- People ---------------------------------------------------------

const people = loadCollection("people");
const peopleSlugs = new Set();

for (const entry of people) {
  if (entry.parseError) {
    errors.push(`${entry.file}: could not parse frontmatter — ${entry.parseError}`);
    continue;
  }

  if (!PERSON_FILENAME_PATTERN.test(entry.slug)) {
    errors.push(
      `${entry.file}: filename must match "country-firstname-lastname" ` +
        `(lowercase, hyphen-separated), e.g. "ar-veronica-valeros.md". ` +
        `Use unaccented ASCII in the filename (Lucía → lucia, Muñoz → munoz); ` +
        `accents belong in the "name" field, which supports full Unicode.`
    );
  }

  peopleSlugs.add(entry.slug);

  const result = personSchema.safeParse(entry.data);
  if (!result.success) reportZodError(entry.file, result.error);

  // A bio is optional. When we add someone from a conference schedule we
  // often have only their name, country, and a link — and an invented
  // bio is worse than none, since a plausible-looking fabrication is hard
  // to spot and back out later. A person with no body simply renders as
  // name/country/links with no bio paragraph (see src/people/person.njk,
  // which already guards the bio block with `{% if person.body %}`).
}

// --- Events -----------------------------------------------------------

const events = loadCollection("events");
const eventSlugs = new Set();

for (const entry of events) {
  if (entry.parseError) {
    errors.push(`${entry.file}: could not parse frontmatter — ${entry.parseError}`);
    continue;
  }

  if (!SLUG_PATTERN.test(entry.slug)) {
    errors.push(
      `${entry.file}: filename must be lowercase letters/digits/hyphens only, e.g. "blackhat-2026.md"`
    );
  }

  eventSlugs.add(entry.slug);

  const result = eventSchema.safeParse(entry.data);
  if (!result.success) reportZodError(entry.file, result.error);
}

// --- Research -----------------------------------------------------------

const research = loadCollection("research");

for (const entry of research) {
  if (entry.parseError) {
    errors.push(`${entry.file}: could not parse frontmatter — ${entry.parseError}`);
    continue;
  }

  if (!SLUG_PATTERN.test(entry.slug)) {
    errors.push(
      `${entry.file}: filename must be lowercase letters/digits/hyphens only, e.g. "2026-lastname-topic.md"`
    );
  }

  const result = researchSchema.safeParse(entry.data);
  if (!result.success) reportZodError(entry.file, result.error);

  if (!entry.body) {
    errors.push(`${entry.file}: body — a short description is required, file body is empty`);
  }

  // Cross-reference checks — only meaningful once the shape itself is valid.
  if (result.success) {
    for (const personSlug of result.data.people) {
      if (!peopleSlugs.has(personSlug)) {
        errors.push(
          `${entry.file}: field "people" — references unknown person slug "${personSlug}" ` +
            `(no file src/content/people/${personSlug}.md)`
        );
      }
    }

    if (result.data.event && !eventSlugs.has(result.data.event)) {
      errors.push(
        `${entry.file}: field "event" — references unknown event slug "${result.data.event}" ` +
          `(no file src/content/events/${result.data.event}.md)`
      );
    }
  }
}

// --- Report -----------------------------------------------------------

const totalFiles = people.length + events.length + research.length;

if (errors.length > 0) {
  console.error(`\n✗ Validation failed — ${errors.length} error(s) across ${totalFiles} file(s) checked:\n`);
  for (const err of errors) console.error(`  ${err}`);
  console.error(`\nFix the file(s) and field(s) listed above, then re-run: pnpm run validate\n`);
  process.exit(1);
} else {
  console.log(
    `✓ All content valid — ${people.length} people, ${events.length} events, ${research.length} research entries.`
  );
  process.exit(0);
}
