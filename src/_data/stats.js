// Computed global Eleventy data: simple counts for the /stats/ page.
//
// Deliberately just counts, nothing ranked or sorted by size. The site's
// whole stance is visibility, not ranking, so this page states scale
// (how many people, how much research, how many countries) without
// implying any entry, country, or field is "ahead" of another — field
// counts render in the fixed order from fields.js, not sorted by count,
// and countries are a plain total, not a leaderboard.

import peopleData from "./people.js";
import researchData from "./research.js";
import eventsData from "./events.js";
import { FIELDS } from "./fields.js";

export default function () {
  const people = peopleData();
  const research = researchData();
  const events = eventsData();

  const countries = new Set(people.map((p) => p.data.country).filter(Boolean));

  const fieldCounts = FIELDS.map((field) => ({
    slug: field.slug,
    label: field.label,
    count: research.filter((r) => r.data.field === field.slug).length,
  })).filter((f) => f.count > 0);

  const maxFieldCount = Math.max(...fieldCounts.map((f) => f.count), 1);

  return {
    peopleCount: people.length,
    researchCount: research.length,
    eventsCount: events.length,
    countriesCount: countries.size,
    fieldCounts,
    maxFieldCount,
  };
}
