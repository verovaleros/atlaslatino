// Computed global data: for each field / type / country, the set of
// people connected to it. Powers the "people" column on /browse/ and the
// per-axis people pages (/field/<slug>/people/ etc.).
//
// A person's field and type are DERIVED, not stored: a person "belongs
// to" a field if they co-authored at least one research entry tagged with
// it (same for type). Country is a real property of the person, so it is
// read straight off people. This mirrors how browsePages.js groups the
// research feed, just grouped onto people instead.
//
// Not paginated: the largest bucket is well under 100 people, and a person
// grid is compact, so each axis value gets a single page. If a bucket ever
// grows large enough to need paging, follow the browsePages.js pattern.

import peopleData from "./people.js";
import researchData from "./research.js";
import { FIELDS } from "./fields.js";
import { TYPES } from "./types.js";
import { COUNTRY_NAMES } from "./countries.js";

export default function () {
  const people = peopleData();
  const research = researchData();
  const peopleBySlug = new Map(people.map((p) => [p.slug, p]));

  // Resolve a set of person slugs into person objects, in the collection's
  // own order (people.js order), skipping any that don't resolve.
  function resolve(slugSet) {
    return people.filter((p) => slugSet.has(p.slug));
  }

  // Gather person slugs per field/type by walking research once.
  const bySlugField = new Map(); // field slug -> Set(personSlug)
  const bySlugType = new Map(); // type slug  -> Set(personSlug)
  for (const entry of research) {
    const f = entry.data.field;
    const t = entry.data.type;
    for (const personSlug of entry.data.people ?? []) {
      if (!peopleBySlug.has(personSlug)) continue;
      if (f) {
        if (!bySlugField.has(f)) bySlugField.set(f, new Set());
        bySlugField.get(f).add(personSlug);
      }
      if (t) {
        if (!bySlugType.has(t)) bySlugType.set(t, new Set());
        bySlugType.get(t).add(personSlug);
      }
    }
  }

  // Field/type pages emitted in the fixed list order, only non-empty ones.
  const fieldPeople = FIELDS.map((field) => ({
    slug: field.slug,
    label: field.label,
    url: `/field/${field.slug}/people/`,
    people: resolve(bySlugField.get(field.slug) ?? new Set()),
  })).filter((p) => p.people.length > 0);

  const typePeople = TYPES.map((type) => ({
    slug: type.slug,
    label: type.label,
    url: `/type/${type.slug}/people/`,
    people: resolve(bySlugType.get(type.slug) ?? new Set()),
  })).filter((p) => p.people.length > 0);

  // Country is a direct property of the person.
  const countries = [
    ...new Set(people.map((p) => p.data.country).filter(Boolean)),
  ].sort();
  const countryPeople = countries.map((code) => ({
    slug: code,
    label: COUNTRY_NAMES[code] ?? code,
    url: `/country/${code}/people/`,
    people: people.filter((p) => p.data.country === code),
  }));

  // Flat maps of value -> count, for the browse hub's people column.
  const fieldCounts = Object.fromEntries(fieldPeople.map((p) => [p.slug, p.people.length]));
  const typeCounts = Object.fromEntries(typePeople.map((p) => [p.slug, p.people.length]));
  const countryCounts = Object.fromEntries(countryPeople.map((p) => [p.slug, p.people.length]));

  return { fieldPeople, typePeople, countryPeople, fieldCounts, typeCounts, countryCounts };
}
