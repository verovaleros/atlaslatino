// Precomputed pagination for the single-axis static filter pages
// (/field/<slug>/, /type/<slug>/, /country/<code>/).
//
// Eleventy's built-in `pagination` handles "one array, sliced into
// pages" well, but doesn't nest cleanly for "one page PER FILTER VALUE,
// each ALSO sliced into pages" — the case here (many fields, each with
// its own multi-page feed). Rather than fight that, this file does the
// slicing directly: for each field/type/country, split its matching
// research entries into PAGE_SIZE-sized chunks and emit one flat entry
// per resulting page. The page templates then just paginate over this
// precomputed array with size: 1 — trivial pagination, since the real
// pagination work already happened here.
//
// Kept as one shared computation (not three separate near-identical
// data files) because the pattern is identical across all three axes;
// only what's being grouped by differs.

import researchData from "./research.js";
import { FIELDS } from "./fields.js";
import { TYPES } from "./types.js";
import peopleData from "./people.js";
import { COUNTRY_NAMES } from "./countries.js";

const PAGE_SIZE = 25;

// Page 0 of a filter lives at the bare basePath (e.g. /field/talk/);
// every later page lives at basePath + page/N/, 1-indexed to match
// what a human expects to see in the URL. Computed once here rather
// than re-derived in every template with string concatenation.
function pageUrl(basePath, pageNumber) {
  return pageNumber === 0 ? basePath : `${basePath}page/${pageNumber + 1}/`;
}

function paginate(basePath, label, entries) {
  const totalPages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push({
      basePath,
      label,
      pageNumber: i, // 0-indexed, same convention as Eleventy's own pagination.pageNumber
      totalPages,
      totalEntries: entries.length,
      pageEntries: entries.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
      url: pageUrl(basePath, i),
      prevUrl: i > 0 ? pageUrl(basePath, i - 1) : null,
      nextUrl: i + 1 < totalPages ? pageUrl(basePath, i + 1) : null,
    });
  }
  return pages;
}

export default function () {
  const research = researchData(); // already sorted date-desc
  const people = peopleData();

  const fieldPages = FIELDS.flatMap((field) =>
    paginate(
      `/field/${field.slug}/`,
      field.label,
      research.filter((r) => r.data.field === field.slug)
    )
  ).filter((p) => p.totalEntries > 0);

  const typePages = TYPES.flatMap((type) =>
    paginate(
      `/type/${type.slug}/`,
      type.label,
      research.filter((r) => r.data.type === type.slug)
    )
  ).filter((p) => p.totalEntries > 0);

  // Countries aren't a fixed enum like field/type — they're whatever
  // ISO codes actually appear on people right now, discovered at build
  // time. A country's research is "anything one of its people co-authored",
  // not a field on the research entry itself, so this goes through
  // people first rather than research.data directly.
  const countries = [...new Set(people.map((p) => p.data.country).filter(Boolean))].sort();
  const countryPages = countries.flatMap((country) => {
    const peopleSlugsInCountry = new Set(
      people.filter((p) => p.data.country === country).map((p) => p.slug)
    );
    const entries = research.filter((r) =>
      (r.data.people ?? []).some((slug) => peopleSlugsInCountry.has(slug))
    );
    // `label` is the human-facing country name (falls back to the bare
    // code for anything not yet in countries.js — see that file); the
    // URL keeps using the raw ISO code via `country`, unaffected by this.
    return paginate(`/country/${country}/`, COUNTRY_NAMES[country] ?? country, entries);
  }).filter((p) => p.totalEntries > 0);

  return { fieldPages, typePages, countryPages };
}
