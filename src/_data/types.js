// Single source of truth for the fixed type list used to tag research
// entries — what kind of work it is (a talk, a workshop, a training, a
// paper), as distinct from `field`, which is what subject it's in.
// Referenced by scripts/schemas.js (validation), by templates (rendering
// a human-readable label for a type slug), and available to Eleventy as
// global data (`types`).
//
// workshop is deliberately separate from training: both are hands-on,
// but conferences distinguish them (workshop = shorter, often free,
// single session; training = paid, multi-day, structured curriculum),
// and content in this repo has used the word "workshop" for sessions
// that were being filed under training for lack of a better option.
//
// arsenal is its own format too, not a talk or a workshop: a live,
// hands-on demo of an open-source tool, typically at a station rather
// than a stage, run repeatedly during a demo window rather than as a
// single scheduled session — the DEF CON/Black Hat "Arsenal" track.

export const TYPES = [
  { slug: "talk", label: "Talk" },
  { slug: "workshop", label: "Workshop" },
  { slug: "training", label: "Training" },
  { slug: "arsenal", label: "Arsenal" },
  { slug: "paper", label: "Paper" },
];

export const TYPE_SLUGS = TYPES.map((t) => t.slug);

export const TYPE_LABELS = Object.fromEntries(
  TYPES.map((t) => [t.slug, t.label])
);

export default TYPES;
