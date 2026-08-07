// ISO 3166-1 alpha-2 -> country name, for the handful of codes this
// site actually uses (validated against scripts/schemas.js's isoCountry
// pattern, which accepts any two uppercase letters — this list only
// needs to cover whatever appears in real content, not all ~250 ISO
// codes). Deliberately hand-maintained rather than an npm package: the
// project's stated priority is a small, auditable dependency footprint,
// and a lookup this size isn't worth a new dependency for.
//
// Used where a country code appears WITHOUT a name/person right next to
// it for context (e.g. the /browse/ country list, where the code would
// otherwise be the only label on the row) — see COUNTRY_NAMES filter
// usage. Where a code already sits next to a person's name (the feed's
// country-tag, person cards), the bare code stays: it's compact and the
// surrounding context already tells you who it belongs to.
//
// If a contributor's PR adds a person from a country not listed here,
// the lookup falls back to the raw code rather than failing the build —
// see the `| countryName` filter in eleventy.config.js.

export const COUNTRY_NAMES = {
  AR: "Argentina",
  BO: "Bolivia",
  BR: "Brazil",
  CL: "Chile",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  DO: "Dominican Republic",
  EC: "Ecuador",
  SV: "El Salvador",
  GT: "Guatemala",
  HN: "Honduras",
  MX: "Mexico",
  NI: "Nicaragua",
  PA: "Panama",
  PY: "Paraguay",
  PE: "Peru",
  PR: "Puerto Rico",
  UY: "Uruguay",
  VE: "Venezuela",
  // Where researchers currently live, not necessarily Latin America:
  CZ: "Czech Republic",
  ES: "Spain",
  US: "United States",
};

export default COUNTRY_NAMES;
