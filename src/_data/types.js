// Single source of truth for the fixed type list used to tag research
// entries — what kind of work it is (a talk, a training, a paper), as
// distinct from `field`, which is what subject it's in. Referenced by
// scripts/schemas.js (validation), by templates (rendering a
// human-readable label for a type slug), and available to Eleventy as
// global data (`types`).

export const TYPES = [
  { slug: "talk", label: "Talk" },
  { slug: "training", label: "Training" },
  { slug: "paper", label: "Paper" },
];

export const TYPE_SLUGS = TYPES.map((t) => t.slug);

export const TYPE_LABELS = Object.fromEntries(
  TYPES.map((t) => [t.slug, t.label])
);

export default TYPES;
