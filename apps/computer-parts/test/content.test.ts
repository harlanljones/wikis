import { describe, expect, test } from "bun:test";
import { createWiki } from "@wikis/core";

const wiki = createWiki({
  title: "Computer Parts Wiki",
  contentDir: `${import.meta.dir}/../content`,
});

const pages = await wiki.pages();

/** Renders every page once, keyed by slug. */
const rendered = new Map<string, string>();
for (const slug of pages.keys()) {
  const response = await wiki.fetch(new Request(`http://wiki.test/${slug}`));
  rendered.set(slug, await response.text());
}

/** The page body, without the navigation that every page shares. */
function article(html: string): string {
  return html.slice(html.indexOf("<article>"), html.indexOf("</article>"));
}

function headingIds(html: string): Set<string> {
  return new Set([...article(html).matchAll(/<h[1-6] id="([^"]+)"/g)].map((match) => match[1] ?? ""));
}

describe("computer parts wiki content", () => {
  test("has a home page and the main sections", () => {
    for (const slug of ["", "basics", "parts", "specs", "buying", "use-cases", "building", "glossary", "market"]) {
      expect(pages.has(slug), `missing page: /${slug}`).toBe(true);
    }
  });

  test("every page renders and starts with a title", () => {
    for (const [slug, html] of rendered) {
      expect(article(html), `/${slug} has no level-one heading`).toContain("<h1 ");
    }
  });

  test("no wiki link points to a page that does not exist", () => {
    const missing: string[] = [];
    for (const [slug, html] of rendered) {
      for (const match of article(html).matchAll(/<a href="([^"]*)" class="wikilink missing">/g)) {
        missing.push(`/${slug} -> ${match[1]}`);
      }
    }
    expect(missing).toEqual([]);
  });

  test("no wiki link was left unparsed, for example inside a table", () => {
    const unparsed: string[] = [];
    for (const [slug, html] of rendered) {
      const text = article(html).replace(/<code>[\s\S]*?<\/code>/g, "");
      if (text.includes("[[") || text.includes("]]")) unparsed.push(`/${slug}`);
    }
    expect(unparsed).toEqual([]);
  });

  test("every link to a heading points to a heading that exists", () => {
    const broken: string[] = [];
    for (const [slug, html] of rendered) {
      for (const match of article(html).matchAll(/<a href="\/([^"#]*)#([^"]+)"/g)) {
        const target = rendered.get(match[1] ?? "");
        if (!target || !headingIds(target).has(match[2] ?? "")) {
          broken.push(`/${slug} -> /${match[1]}#${match[2]}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  test("every page can be reached from the home page", () => {
    const seen = new Set<string>([""]);
    const queue = [""];
    while (queue.length > 0) {
      const slug = queue.pop() ?? "";
      for (const match of article(rendered.get(slug) ?? "").matchAll(/<a href="\/([^"#]*)(?:#[^"]*)?" class="wikilink">/g)) {
        const target = match[1] ?? "";
        if (pages.has(target) && !seen.has(target)) {
          seen.add(target);
          queue.push(target);
        }
      }
    }
    expect([...pages.keys()].filter((slug) => !seen.has(slug))).toEqual([]);
  });
});
