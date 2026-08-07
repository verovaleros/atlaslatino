// Generates a deterministic, Space-Invaders-style pixel avatar for a
// person or event. The site doesn't support uploaded photos — this is
// everyone's and every event's permanent visual identity, not a
// fallback for a missing image.
//
// The pattern is derived entirely from the person's slug via a simple
// string hash — no randomness, no external image, no npm dependency.
// The same slug always produces the same invader, so a person's "face"
// stays stable across rebuilds instead of reshuffling every deploy.
//
// Classic Space Invaders sprites are bilaterally symmetric: only the
// left half is actually drawn, and it's mirrored to produce the right
// half. That's what gives the silhouette its recognizable blocky-alien
// look rather than reading as random static, so the generator does the
// same — 5 unique columns, mirrored to 10, times 8 rows.

const COLS = 5; // unique columns; mirrored to 10 total
const ROWS = 8;
const CELL = 8; // px per pixel in the SVG viewBox

// A small, non-cryptographic string hash (djb2). Deterministic across
// Node versions and platforms, which a JS engine's built-in string
// hashing is explicitly NOT guaranteed to be — this needs to produce
// the same output on every build, including in CI.
function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return h >>> 0; // unsigned
}

/**
 * @param {string} seed - typically a person's slug
 * @returns {string} a self-contained <svg> markup string
 */
export function invaderSvg(seed) {
  const h = hash(String(seed ?? ""));

  // Walk the hash's bits to decide each of the 5x8 = 40 cells. Reusing
  // the same 32-bit hash across more than 32 cells by re-hashing the
  // running value keeps the pattern from repeating in an obvious tiling.
  let state = h;
  const cellOn = () => {
    state = (state * 1103515245 + 12345) >>> 0; // classic LCG step
    return (state >> 16) % 2 === 0;
  };

  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (cellOn()) cells.push([row, col]);
    }
  }

  const width = COLS * 2 * CELL;
  const height = ROWS * CELL;

  const rects = cells
    .flatMap(([row, col]) => {
      const y = row * CELL;
      const xLeft = col * CELL;
      const xRight = width - CELL - xLeft; // mirror across the vertical center
      // Skip the duplicate rect when the column sits on the mirror line
      // (only possible if COLS were odd relative to width, which it
      // isn't here, but this keeps the function correct if COLS changes).
      return xLeft === xRight
        ? [`<rect x="${xLeft}" y="${y}" width="${CELL}" height="${CELL}"/>`]
        : [
            `<rect x="${xLeft}" y="${y}" width="${CELL}" height="${CELL}"/>`,
            `<rect x="${xRight}" y="${y}" width="${CELL}" height="${CELL}"/>`,
          ];
    })
    .join("");

  return (
    `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" ` +
    `class="invader" role="img" aria-hidden="true" shape-rendering="crispEdges">` +
    `<rect width="${width}" height="${height}" class="invader-bg"/>` +
    `<g class="invader-fg">${rects}</g>` +
    `</svg>`
  );
}

export default invaderSvg;
