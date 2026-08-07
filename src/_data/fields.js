// Single source of truth for the fixed field/topic list used to tag
// research entries. Referenced by scripts/schemas.js (validation),
// by templates (rendering a human-readable label for a field slug),
// and available to Eleventy as global data (`fields`).

export const FIELDS = [
  { slug: "malware-reversing", label: "Malware & Reversing" },
  { slug: "ai-security", label: "AI Security" },
  { slug: "offensive-security", label: "Offensive Security" },
  { slug: "incident-response", label: "Incident Response" },
  { slug: "appsec-supply-chain", label: "AppSec & Supply Chain" },
  { slug: "other", label: "Other" },
];

export const FIELD_SLUGS = FIELDS.map((f) => f.slug);

export const FIELD_LABELS = Object.fromEntries(
  FIELDS.map((f) => [f.slug, f.label])
);

export default FIELDS;
