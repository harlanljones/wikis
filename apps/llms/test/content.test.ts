import { describe, expect, test } from "bun:test";
import { PATH, SECTIONS } from "../src/path.ts";
import { DEFAULTS, estimate, parseInput, usableGb } from "../src/vram.ts";
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
    for (const slug of ["", ...SECTIONS.map((section) => section.id), "history", "glossary", "reading-list", "about"]) {
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
      const unparsed = html.replace(/<(code|pre)[\s\S]*?<\/\1>/g, "").match(/\[\[|\]\]|\\\|/);
      if (unparsed) broken.push(`/${slug} has an unparsed wiki link: ${unparsed[0]}`);
    }
    expect(broken).toEqual([]);
  });

  test("every diagram can be drawn", () => {
    const failed = [...rendered].filter(([, html]) => html.includes("diagram-error")).map(([slug]) => slug);
    expect(failed).toEqual([]);
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

  test("no em-dashes in the text", () => {
    const found = [...rendered].filter(([, html]) => html.includes("—")).map(([slug]) => slug);
    expect(found).toEqual([]);
  });
});

describe("reading path", () => {
  test("lists every page in the section folders, and nothing else", () => {
    const sections = new Set<string>(SECTIONS.map((section) => section.id));
    const inFolders = [...pages.keys()].filter((slug) => sections.has(slug.split("/")[0] ?? "")).sort();
    expect([...PATH].sort()).toEqual(inFolders);
  });

  test("each section index lists its pages in reading order", () => {
    const wrong: string[] = [];
    for (const section of SECTIONS) {
      // The last table is the list of pages. The introduction above it, which may mention pages in any order.
      const html = rendered.get(section.id) ?? "";
      const index = html.slice(html.lastIndexOf("<table>"), html.lastIndexOf("</table>"));
      const positions = section.pages.map((page) => index.indexOf(`href="/${section.id}/${page}"`));
      if (positions.some((position) => position === -1)) wrong.push(`${section.id} is missing a page`);
      else if (positions.some((position, i) => i > 0 && position < (positions[i - 1] ?? 0))) {
        wrong.push(`${section.id} lists its pages out of order`);
      }
    }
    expect(wrong).toEqual([]);
  });

  test("pages link to the pages before and after them", async () => {
    const { html } = await get("/fundamentals/attention");
    expect(html).toContain('<a href="/fundamentals/embeddings" rel="prev">');
    expect(html).toContain('<a href="/fundamentals/transformer" rel="next">');
    // The last page of one section leads to the first of the next.
    expect((await get("/fundamentals/scaling-laws")).html).toContain('<a href="/training" rel="next">');
    expect((await get("/fundamentals")).html).not.toContain('rel="prev"');
    expect((await get("/interpretability/open-problems")).html).not.toContain('rel="next"');
    expect((await get("/glossary")).html).not.toContain('class="reading-path"');
  });
});

describe("page shell", () => {
  test("only the section being read is expanded in the navigation", async () => {
    const { html } = await get("/local/gguf");
    expect(html).toContain('<a href="/local/ollama">');
    expect(html).toContain('<a href="/quantization/gptq" class="nav-folded">');
    expect(html).toContain('<a href="/quantization">');
  });
});

describe("memory calculator", () => {
  test("Llama 3.1 8B at Q4_K_M with 8K of context comes to about 6.8 GB", () => {
    const result = estimate(DEFAULTS);
    expect(result.cacheBytesPerToken).toBe(131072);
    expect(result.weightsGb).toBeCloseTo(4.9, 1);
    expect(result.cacheGb).toBeCloseTo(1.07, 2);
    expect(result.totalGb).toBeCloseTo(6.77, 1);
  });

  test("a q8_0 cache is a little over half the size of f16", () => {
    const f16 = estimate(DEFAULTS).cacheGb;
    const q8 = estimate({ ...DEFAULTS, cacheType: "q8_0" }).cacheGb;
    expect(q8 / f16).toBeCloseTo(0.53, 2);
  });

  test("a 32B model at Q4_K_M with 16K of q8_0 cache fits a 24 GB card, as it does in practice", () => {
    const result = estimate({ ...DEFAULTS, params: 32, context: 16384, layers: 64, cacheType: "q8_0" });
    expect(result.totalGb).toBeLessThan(usableGb(24));
    expect(result.totalGb).toBeGreaterThan(usableGb(16));
  });

  test("bad input falls back to the defaults or is clamped", () => {
    const input = parseInput(new URLSearchParams("params=abc&quant=Q9&context=-5&layers=99999"));
    expect(input.params).toBe(DEFAULTS.params);
    expect(input.quant).toBe(DEFAULTS.quant);
    expect(input.context).toBe(256);
    expect(input.layers).toBe(400);
  });

  test("is drawn on the hardware page and follows the query string", async () => {
    const { html } = await get("/local/hardware?params=70&quant=Q4_K_M&context=8192&layers=80&kvheads=8&headdim=128&cache=f16");
    expect(html).toContain('<form class="vram-form" method="get" action="/local/hardware#memory-calculator">');
    expect(html).toContain('value="70"');
    expect(html).toContain("<option selected>Q4_K_M</option>");
    expect(html).toMatch(/About 4\d GB/);
    expect(html).toContain('<li class="fit-fits"><strong>48 GB</strong>');
    expect(html).toContain('<li class="fit-no"><strong>32 GB</strong>');
  });
});
