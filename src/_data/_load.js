// Shared content loader for the people / events / research collections.
//
// All three collections are folders of Markdown files with YAML
// frontmatter, read the same way, so the reading and parsing lives here
// once. scripts/validate.js deliberately does NOT use this helper — it
// needs to capture per-file parse errors and report them rather than
// throwing, and it must see the raw body to check emptiness.
//
// Bodies are rendered to HTML here, not in the templates. Templates
// print them with `| safe`, which only disables escaping — it does not
// render Markdown. Before this helper existed the raw Markdown source
// was being emitted verbatim, so `**bold**` showed as literal asterisks
// and the blank line between paragraphs collapsed (HTML ignores
// newlines), turning every bio and description into one run-on block.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

// html: false escapes raw HTML in the source instead of passing it
// through. Bodies come from contributor pull requests, so this is what
// makes `| safe` in the templates safe by construction: what reaches the
// template is markdown-it's own trusted output, never a contributor's
// unsanitized string. Do not enable html here.
const md = new MarkdownIt({ html: false, linkify: true, typographer: false });

/**
 * Read a content collection.
 * @param {string} dirName folder under src/content/
 * @returns {{ slug: string, data: object, body: string }[]} body is rendered HTML
 */
export function loadCollection(dirName) {
  const dir = path.join(process.cwd(), "src/content", dirName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");

      let parsed;
      try {
        parsed = matter(raw);
      } catch (err) {
        // Surface the filename — a bare gray-matter stack trace during
        // `pnpm run dev` doesn't say which file has the bad YAML.
        throw new Error(
          `Could not parse frontmatter in src/content/${dirName}/${filename}: ${err.message}`
        );
      }

      return {
        slug,
        data: parsed.data,
        body: md.render(parsed.content.trim()),
      };
    });
}
