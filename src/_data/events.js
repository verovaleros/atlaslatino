// Global Eleventy data: all events, from src/content/events/*.md
// Exposed to templates as `events`. See src/_data/people.js.
//
// One normalization step beyond the plain loadCollection() every other
// collection uses: eventSchema (scripts/schemas.js) treats `endDate` as
// optional, defaulting it to `startDate` for single-day events — but
// that default only takes effect inside a Zod parse, and _load.js
// deliberately reads raw frontmatter without going through Zod (see its
// header comment: scripts/validate.js is the single source of parse
// errors). Without this, a single-day event that only sets `startDate`
// would reach templates with `data.endDate === undefined` even though
// `pnpm run validate` says the file is valid. Mirrors the schema's
// default exactly; if that default ever changes, change it here too.

import { loadCollection } from "./_load.js";

export default function () {
  return loadCollection("events").map((event) => ({
    ...event,
    data: { ...event.data, endDate: event.data.endDate ?? event.data.startDate },
  }));
}
