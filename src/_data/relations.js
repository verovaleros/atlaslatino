// Computed global Eleventy data: cross-references between people,
// events, and research entries.
//
// Eleventy has no built-in equivalent of Astro content collections'
// reference() — research entries only store plain string slugs
// (research.data.people[], research.data.event). This file resolves
// those slugs into the actual person/event objects once, and builds
// the two lookup directions templates need:
//   - person slug  -> that person's research entries (desc by date)
//   - event slug   -> that event's research entries (desc by date)
//
// Referential integrity (a slug that doesn't resolve to anything) is
// NOT handled here — that's scripts/validate.js's job, so a bad
// reference is a loud validation failure rather than a silently
// empty list at build time. Here we just skip what doesn't resolve,
// since `pnpm run build` should still produce a site even if
// validation hasn't been run.

import peopleData from "./people.js";
import eventsData from "./events.js";
import researchData from "./research.js";

export default function () {
  const people = peopleData();
  const events = eventsData();
  const research = researchData();

  const peopleBySlug = new Map(people.map((p) => [p.slug, p]));
  const eventsBySlug = new Map(events.map((e) => [e.slug, e]));

  const researchByPerson = new Map();
  const researchByEvent = new Map();

  for (const entry of research) {
    for (const personSlug of entry.data.people ?? []) {
      if (!peopleBySlug.has(personSlug)) continue;
      if (!researchByPerson.has(personSlug)) researchByPerson.set(personSlug, []);
      researchByPerson.get(personSlug).push(entry);
    }

    const eventSlug = entry.data.event;
    if (eventSlug && eventsBySlug.has(eventSlug)) {
      if (!researchByEvent.has(eventSlug)) researchByEvent.set(eventSlug, []);
      researchByEvent.get(eventSlug).push(entry);
    }
  }

  // research.js already sorts by date desc, so the grouped arrays
  // above inherit that order without re-sorting.

  return {
    researchByPerson: Object.fromEntries(researchByPerson),
    researchByEvent: Object.fromEntries(researchByEvent),
  };
}
