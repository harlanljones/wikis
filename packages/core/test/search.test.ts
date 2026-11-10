import { describe, expect, test } from "bun:test";
import type { Page } from "../src/pages.ts";
import { renderSearchPage, search, searchEntry, searchTerms } from "../src/search.ts";

function entry(slug: string, title: string, html: string, description?: string) {
  const page: Page = { slug, title, file: `${slug}.md` };
  return searchEntry(page, `<h1>${title}</h1>\n${html}`, description);
}

const entries = [
  entry("", "Camera Wiki", "<p>Everything about aperture, shutter speed and lenses.</p>"),
  entry(
    "basics/aperture",
    "Aperture",
    '<p>The opening inside the lens.</p>\n<h2 id="f-numbers">Reading f-numbers</h2>\n<p>A <em>wide</em> aperture blurs the background, which photographers call bokeh.</p>',
    "The opening inside the lens.",
  ),
  entry(
    "basics/shutter-speed",
    "Shutter speed",
    '<p>How long the sensor is exposed.</p>\n<h2 id="long-exposures">Long exposures</h2>\n<p>Use a tripod. A small aperture helps.</p>',
  ),
  entry("places/cafe", "Café Müller", "<p>Coffee & <strong>cake</strong>s.</p><svg><text>hidden drawing</text></svg>"),
  entry(
    "lenses",
    "Lenses",
    "<table><tr><th>Mount</th><th>Maker</th></tr><tr><td>RF</td><td>Canon</td></tr></table>",
    "Every lens mount.",
  ),
];

const slugs = (query: string) => search(entries, query).map((result) => result.page.slug);

describe("searchTerms", () => {
  test("splits a query into lower-case words without accents or repeats", () => {
    expect(searchTerms("  Café  CAFE don't f/1.8 ")).toEqual(["cafe", "dont", "f", "1", "8"]);
    expect(searchTerms("  ?! ")).toEqual([]);
  });
});

describe("search", () => {
  test("ranks a match in the title above a match in the text", () => {
    expect(slugs("aperture")).toEqual(["basics/aperture", "basics/shutter-speed", ""]);
  });

  test("needs every word, in any order and anywhere on the page", () => {
    expect(slugs("bokeh aperture")).toEqual(["basics/aperture"]);
    expect(slugs("tripod shutter")).toEqual(["basics/shutter-speed"]);
  });

  test("falls back to pages with some of the words when none has them all", () => {
    const results = search(entries, "bokeh tripod");
    expect(results.map((result) => result.page.slug).sort()).toEqual(["basics/aperture", "basics/shutter-speed"]);
    expect(results.every((result) => result.matched === 1)).toBe(true);
    expect(renderSearchPage("bokeh tripod", results)).toContain("No page has every word");
  });

  test("matches the start of a word, but not for one or two letters", () => {
    expect(slugs("expos")).toEqual(["basics/shutter-speed"]);
    expect(slugs("ap")).toEqual([]);
  });

  test("ignores capitals and accents", () => {
    expect(slugs("CAFE muller")).toEqual(["places/cafe"]);
  });

  test("finds words in headings and names the section a match is under", () => {
    expect(slugs("reading")).toEqual(["basics/aperture"]);
    const [result] = search(entries, "bokeh");
    expect(result?.section).toEqual({ id: "f-numbers", title: "Reading f-numbers" });
    expect(search(entries, "opening")[0]?.section).toBeUndefined();
  });

  test("leaves drawings out and keeps words joined across inline markup", () => {
    expect(slugs("hidden")).toEqual([]);
    expect(slugs("cakes")).toEqual(["places/cafe"]);
  });

  test("returns nothing for an empty search", () => {
    expect(search(entries, "")).toEqual([]);
    expect(search(entries, " ... ")).toEqual([]);
  });
});

describe("excerpts", () => {
  test("mark the matching words and escape the text around them", () => {
    const [result] = search(entries, "coffee");
    expect(result?.excerpt).toBe("<mark>Coffee</mark> &amp; cakes.");
  });

  test("set table cells apart", () => {
    expect(search(entries, "canon")[0]?.excerpt).toBe("Mount · Maker RF · <mark>Canon</mark>");
  });

  test("fall back to the page's description when only the title matches", () => {
    expect(search(entries, "lenses").find((result) => result.page.slug === "lenses")?.excerpt).toBe(
      "Every lens mount.",
    );
  });

  test("show the stretch of text with the most of the words searched for", () => {
    const filler = "word ".repeat(80);
    const long = entry("long", "Long", `<p>alpha ${filler} beta ${filler} alpha beta together.</p>`);
    const excerpt = search([long], "alpha beta")[0]?.excerpt ?? "";
    expect(excerpt).toContain("<mark>alpha</mark> <mark>beta</mark> together.");
    expect(excerpt).toStartWith("… ");
  });
});

describe("renderSearchPage", () => {
  test("shows only the search box before anything is typed", () => {
    const html = renderSearchPage("", []);
    expect(html).toContain('<form class="search-form" action="/search" role="search">');
    expect(html).not.toContain("search-count");
  });

  test("escapes the query wherever it is shown", () => {
    const html = renderSearchPage('"><script>', []);
    expect(html).toContain('value="&quot;&gt;&lt;script&gt;"');
    expect(html).toContain("<strong>&quot;&gt;&lt;script&gt;</strong>");
    expect(html).not.toContain("<script>");
  });

  test("links each result to its page and to the section it matched in", () => {
    const html = renderSearchPage("bokeh", search(entries, "bokeh"));
    expect(html).toContain("1 page matches <strong>bokeh</strong>.");
    expect(html).toContain('<a class="search-title" href="/basics/aperture">Aperture</a>');
    expect(html).toContain('in <a href="/basics/aperture#f-numbers">Reading f-numbers</a>');
  });
});

test("the search page lists the best thirty and says how many matched", () => {
  const many = Array.from({ length: 34 }, (_, index) => entry(`page-${index}`, `Page ${index}`, "<p>Same words.</p>"));
  const html = renderSearchPage("same", search(many, "same"));
  expect(html).toContain("34 pages match <strong>same</strong>.");
  expect(html).toContain("The best 30 are shown.");
  expect(html.split("<li>").length - 1).toBe(30);
});
