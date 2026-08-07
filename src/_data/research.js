// Global Eleventy data: all research entries, from
// src/content/research/*.md, sorted reverse-chronologically. This is the
// one sort order used everywhere entries are listed (home feed, person
// pages, event pages). See src/_data/people.js for the loading pattern.

import { loadCollection } from "./_load.js";

export default function () {
  const entries = loadCollection("research");

  // ISO date strings compare correctly as strings, so no Date parsing
  // needed. Array.prototype.sort is stable in Node 18+, so entries
  // sharing a date keep a deterministic (readdir) order — but only if
  // the comparator actually returns 0 for a tie. An earlier version of
  // this always returned 1 or -1 and never 0, which is not a valid
  // comparator: V8's sort doesn't just fail to guarantee order on ties,
  // it visibly reverses them, confirmed against the ~26 entries here
  // that currently share a date.
  entries.sort((a, b) => {
    if (a.data.date < b.data.date) return 1;
    if (a.data.date > b.data.date) return -1;
    return 0;
  });

  return entries;
}
