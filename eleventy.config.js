import { FIELD_LABELS } from "./src/_data/fields.js";
import { TYPE_LABELS } from "./src/_data/types.js";
import { COUNTRY_NAMES } from "./src/_data/countries.js";
import { invaderSvg } from "./src/_lib/invader.js";

// GitHub Pages project sites without a custom domain are served from
// https://<user>.github.io/<repo>/, which needs every internal URL
// prefixed with the repo name. Once a custom domain (CNAME file) is
// attached, GitHub Pages always serves from the domain root instead,
// regardless of repo name — so PATH_PREFIX must be "/" in that case,
// not the repo name. This site uses a custom domain (atlaslatino.org),
// hence "/" here. If the custom domain is ever removed, this needs to
// go back to "/<repo-name>/" or every internal link breaks.
export const PATH_PREFIX = "/";

export default function (eleventyConfig) {
  // Static passthroughs.
  eleventyConfig.addPassthroughCopy("src/css");
  // CNAME must land at the output root as-is (no templating) for GitHub
  // Pages to recognize the custom domain. Copied from the repo root, not
  // src/, since it isn't part of the site's own content tree.
  eleventyConfig.addPassthroughCopy("CNAME");
  // .nojekyll tells GitHub Pages to skip its legacy Jekyll auto-builder,
  // which otherwise runs on every push regardless of our own Actions
  // deploy and fails loudly trying to parse Nunjucks syntax as Liquid —
  // cosmetic noise (our actual deploy is unaffected), but worth silencing.
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // Human-readable label for a field slug, e.g. {{ "machine-learning" | fieldLabel }}
  eleventyConfig.addFilter("fieldLabel", (slug) => FIELD_LABELS[slug] ?? slug);

  // Human-readable label for a type slug, e.g. {{ "talk" | typeLabel }}
  eleventyConfig.addFilter("typeLabel", (slug) => TYPE_LABELS[slug] ?? slug);

  // Full country name for an ISO 3166-1 alpha-2 code, e.g. {{ "AR" | countryName }} -> "Argentina"
  // Falls back to the bare code for anything not in src/_data/countries.js,
  // so a PR adding a person from an unlisted country doesn't break the
  // build — it just shows the code until someone adds the name.
  eleventyConfig.addFilter("countryName", (code) => COUNTRY_NAMES[code] ?? code);

  // Deterministic pixel-invader avatar for a person, used wherever
  // there's no photo. Returns raw SVG markup, so call sites need
  // `| safe`, same as entry.body elsewhere — e.g. {{ person.slug | invader | safe }}
  eleventyConfig.addFilter("invader", (seed) => invaderSvg(seed));

  // Resolve a slug against an array of { slug, data, body } items —
  // used in templates to turn a research entry's people[]/event slugs
  // into the actual person/event object, e.g.
  //   {% for slug in entry.data.people %}{{ (people | findBySlug(slug)).data.name }}{% endfor %}
  //
  // Cached per collection identity (a Map keyed on the array reference
  // itself), so repeated calls against the same `people`/`events` array
  // — which is every call, since Eleventy passes the same global data
  // array each time — do one O(n) index build the first time and O(1)
  // lookups after that, instead of a linear .find() on every single
  // call. This matters once a page (the feed, a person page, an event
  // page) resolves dozens of author/event slugs across dozens of
  // entries: at content volumes in the thousands, the difference is
  // between building an index once and re-scanning the full collection
  // on every lookup.
  const slugIndexCache = new WeakMap();
  function slugIndexFor(collection) {
    let index = slugIndexCache.get(collection);
    if (!index) {
      index = new Map(collection.map((item) => [item.slug, item]));
      slugIndexCache.set(collection, index);
    }
    return index;
  }
  eleventyConfig.addFilter("findBySlug", (collection, slug) =>
    collection ? slugIndexFor(collection).get(slug) : undefined
  );

  // Human-facing 1-indexed page number from Eleventy's 0-indexed
  // pagination.pageNumber, e.g. {{ 0 | plus1 }} -> 1
  eleventyConfig.addFilter("plus1", (n) => n + 1);

  // Format an ISO date string ("2026-08-05") for display, e.g. "August 5, 2026".
  function toUTCDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }
  eleventyConfig.addFilter("readableDate", (isoDate) => {
    if (!isoDate) return "";
    return toUTCDate(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Compact display for an event's startDate/endDate pair, e.g.
  //   {{ event.data.startDate | dateRange(event.data.endDate) }}
  // Same day            -> "August 6, 2026"        (just readableDate)
  // Same month/year      -> "August 6–9, 2026"
  // Crosses months/years -> "August 30 – September 1, 2026" / "December 30, 2026 – January 2, 2027"
  // (spaced en dash across months so it doesn't read as a hyphenated
  // phrase; tight en dash within a month, matching typical style).
  eleventyConfig.addFilter("dateRange", (startIso, endIso) => {
    if (!startIso) return "";
    if (!endIso || endIso === startIso) {
      return eleventyConfig.getFilter("readableDate")(startIso);
    }
    const start = toUTCDate(startIso);
    const end = toUTCDate(endIso);
    const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
    const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();

    if (sameMonth) {
      const monthYear = start.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
      // Splice the end day into "<Month> <year>" -> "<Month> <startDay>–<endDay>, <year>"
      const [monthName, year] = monthYear.split(" ");
      return `${monthName} ${start.getUTCDate()}–${end.getUTCDate()}, ${year}`;
    }

    const startLabel = start.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: sameYear ? undefined : "numeric",
      timeZone: "UTC",
    });
    const endLabel = end.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
    return `${startLabel} – ${endLabel}`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    pathPrefix: process.env.ELEVENTY_ENV === "production" ? PATH_PREFIX : "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "11ty.js"],
  };
}
