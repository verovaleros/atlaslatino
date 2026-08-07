import { FIELD_LABELS } from "./src/_data/fields.js";
import { TYPE_LABELS } from "./src/_data/types.js";
import { invaderSvg } from "./src/_lib/invader.js";

// Repo-name placeholder for GitHub Pages project sites, which are
// served from https://<user>.github.io/<repo>/ — every internal URL
// needs this prefix. Change this (and the matching values in
// .github/workflows/deploy.yml and README.md) to your actual repo
// name before your first deploy. Leave as "/" for local dev; the
// build script below only applies the prefix in production builds.
export const PATH_PREFIX = "/atlaslatino/";

export default function (eleventyConfig) {
  // Static passthroughs.
  eleventyConfig.addPassthroughCopy("src/css");

  // Human-readable label for a field slug, e.g. {{ "machine-learning" | fieldLabel }}
  eleventyConfig.addFilter("fieldLabel", (slug) => FIELD_LABELS[slug] ?? slug);

  // Human-readable label for a type slug, e.g. {{ "talk" | typeLabel }}
  eleventyConfig.addFilter("typeLabel", (slug) => TYPE_LABELS[slug] ?? slug);

  // Deterministic pixel-invader avatar for a person, used wherever
  // there's no photo. Returns raw SVG markup, so call sites need
  // `| safe`, same as entry.body elsewhere — e.g. {{ person.slug | invader | safe }}
  eleventyConfig.addFilter("invader", (seed) => invaderSvg(seed));

  // Resolve a slug against an array of { slug, data, body } items —
  // used in templates to turn a research entry's people[]/event slugs
  // into the actual person/event object, e.g.
  //   {% for slug in entry.data.people %}{{ (people | findBySlug(slug)).data.name }}{% endfor %}
  eleventyConfig.addFilter("findBySlug", (collection, slug) =>
    (collection ?? []).find((item) => item.slug === slug)
  );

  // Format an ISO date string ("2026-08-05") for display, e.g. "August 5, 2026".
  eleventyConfig.addFilter("readableDate", (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
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
