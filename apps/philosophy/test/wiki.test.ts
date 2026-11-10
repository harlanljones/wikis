import { describe, expect, test } from "bun:test";
import { ERAS, lifespan, slugOf, THINKERS } from "../src/thinkers.ts";
import { renderTimeline } from "../src/timeline.ts";
import { fetch, wiki } from "../src/wiki.ts";

async function get(path: string) {
  const response = await fetch(new Request(`http://wiki.test${path}`));
  return { status: response.status, html: await response.text() };
}

/** The page body, without the navigation that links to every page. */
function article(html: string): string {
  return html.slice(html.indexOf("<article>"), html.indexOf("</article>"));
}

const pages = await wiki.pages();

/** Every page's body, rendered once and keyed by slug. */
const rendered = new Map<string, string>();
for (const slug of pages.keys()) {
  const { status, html } = await get(`/${slug}`);
  if (status !== 200) throw new Error(`/${slug} answered ${status}`);
  rendered.set(slug, article(html));
}

describe("content", () => {
  test("has the home page, the sections and the standalone pages", () => {
    for (const slug of ["", "thinkers", "ideas", "traditions", "debates", "timeline", "glossary", "reading-list", "about"]) {
      expect(pages.has(slug), `missing page: /${slug}`).toBe(true);
    }
  });

  test("every page starts with a title and a summary paragraph", () => {
    for (const [slug, html] of rendered) {
      expect(html, `/${slug} has no level-one heading`).toMatch(/<h1[ >]/);
      expect(html, `/${slug} does not open with a paragraph`).toMatch(/<\/h1>\s*<p>/);
    }
  });

  test("every internal link points at a page and heading that exist", () => {
    const broken: string[] = [];
    for (const [slug, html] of rendered) {
      for (const [, href = ""] of html.matchAll(/<a href="\/([^"]*)"/g)) {
        const [target = "", anchor] = href.split("#", 2);
        const page = rendered.get(target);
        if (page === undefined) broken.push(`/${slug} links to missing page /${target}`);
        else if (anchor && !page.includes(`id="${anchor}"`)) {
          broken.push(`/${slug} links to missing heading /${target}#${anchor}`);
        }
      }
      // A `[[wiki link]]` that survives rendering was not parsed, usually an unescaped pipe in a table.
      const unparsed = html.replace(/<(code|pre)[\s\S]*?<\/\1>/g, "").match(/\[\[[^\]]*\]\]|\\\|/);
      if (unparsed) broken.push(`/${slug} has an unparsed wiki link: ${unparsed[0]}`);
    }
    expect(broken).toEqual([]);
  });

  test("every page can be reached from the home page", () => {
    const seen = new Set<string>([""]);
    const queue = [""];
    while (queue.length > 0) {
      const slug = queue.pop() ?? "";
      for (const [, target = ""] of (rendered.get(slug) ?? "").matchAll(/<a href="\/([^"#]*)(?:#[^"]*)?"/g)) {
        if (pages.has(target) && !seen.has(target)) {
          seen.add(target);
          queue.push(target);
        }
      }
    }
    expect([...pages.keys()].filter((slug) => !seen.has(slug))).toEqual([]);
  });
});

describe("thinkers", () => {
  test("the list in src/thinkers.ts and the pages under content/thinkers agree", () => {
    const listed = THINKERS.map(slugOf).sort();
    const written = [...pages.keys()].filter((slug) => slug.startsWith("thinkers/")).sort();
    expect(listed).toEqual(written);
  });

  test("the list is in order of birth and every era is one of the known ones", () => {
    const births = THINKERS.map((thinker) => thinker.born);
    expect(births).toEqual([...births].sort((a, b) => a - b));
    const eras = new Set(ERAS.map((era) => era.id));
    expect(THINKERS.filter((thinker) => !eras.has(thinker.era))).toEqual([]);
  });

  test("every thinker page states the same dates as the list", () => {
    const wrong = THINKERS.filter(
      (thinker) => !rendered.get(slugOf(thinker))?.includes(`<td>${lifespan(thinker)}`),
    );
    expect(wrong.map((thinker) => thinker.id)).toEqual([]);
  });

  test("every thinker page has the shared sections", () => {
    const incomplete: string[] = [];
    for (const thinker of THINKERS) {
      const html = rendered.get(slugOf(thinker)) ?? "";
      for (const heading of ["At a glance", "Life", "Where to start"]) {
        if (!html.includes(`>${heading}</`)) incomplete.push(`${thinker.id} is missing "${heading}"`);
      }
    }
    expect(incomplete).toEqual([]);
  });

  test("the thinkers page and the home page list every thinker, with the right dates on the first", () => {
    const index = rendered.get("thinkers") ?? "";
    const home = rendered.get("") ?? "";
    const missing: string[] = [];
    for (const thinker of THINKERS) {
      const link = `href="/${slugOf(thinker)}"`;
      if (!home.includes(link)) missing.push(`home: ${thinker.id}`);
      const row = index.split("<tr>").find((cells) => cells.includes(link));
      if (!row?.includes(`<td>${lifespan(thinker)}</td>`)) missing.push(`thinkers: ${thinker.id}`);
    }
    expect(missing).toEqual([]);
  });
});

describe("page shell", () => {
  test("only the section being read is expanded in the navigation", async () => {
    const { html } = await get("/thinkers/hobbes");
    expect(html).toContain('<a href="/thinkers/locke">');
    expect(html).toContain('<a href="/ideas/liberty" class="nav-folded">');
    expect(html).toContain('<a href="/ideas">');
  });

  test("the timeline has a bar for every thinker, on the home and timeline pages", async () => {
    for (const path of ["/", "/timeline"]) {
      const { html } = await get(path);
      for (const thinker of THINKERS) {
        expect(html, `${path} has no bar for ${thinker.id}`).toContain(
          `<a href="/${slugOf(thinker)}" class="timeline-row">`,
        );
      }
    }
  });

  test("a living thinker's bar runs to the year the chart is drawn", () => {
    const bar = (year: number) => renderTimeline(pages, year).match(/href="\/thinkers\/sen"[\s\S]*?<\/a>/)?.[0];
    expect(bar(2026)).toContain("born 1933");
    expect(bar(2026)).not.toEqual(bar(2036));
  });

  test("each thinker page links to the thinkers born before and after", async () => {
    const { html } = await get("/thinkers/hobbes");
    expect(html).toContain('<a href="/thinkers/machiavelli" rel="prev"');
    expect(html).toContain('<a href="/thinkers/locke" rel="next"');
    expect((await get("/thinkers/plato")).html).not.toContain('rel="prev"');
    expect((await get("/thinkers/nussbaum")).html).not.toContain('rel="next"');
    expect((await get("/ideas/liberty")).html).not.toContain("thinker-nav");
  });

  test("the app stylesheet and favicon are linked and served", async () => {
    const { html } = await get("/");
    expect(html).toContain('<link rel="stylesheet" href="/public/philosophy.css">');
    expect((await get("/public/philosophy.css")).status).toBe(200);
    expect((await get("/favicon.svg")).html).toContain("Φ");
  });
});
