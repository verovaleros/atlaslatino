// Global Eleventy data: all people, from src/content/people/*.md
// Exposed to templates as `people`: [{ slug, data, body }], body is
// rendered HTML. Schema validation is deliberately not done here — see
// scripts/validate.js, which is the single source of error messages.

import { loadCollection } from "./_load.js";

export default function () {
  return loadCollection("people");
}
