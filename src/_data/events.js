// Global Eleventy data: all events, from src/content/events/*.md
// Exposed to templates as `events`. See src/_data/people.js.

import { loadCollection } from "./_load.js";

export default function () {
  return loadCollection("events");
}
