import { FIELD_LABELS } from "./src/_data/fields.js";
import { TYPE_LABELS } from "./src/_data/types.js";
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
