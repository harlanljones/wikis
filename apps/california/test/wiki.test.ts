import { describe, expect, test } from "bun:test";
import { PLACES, SECTIONS } from "../src/places.ts";
import { fetch, wiki } from "../src/wiki.ts";

async function get(path: string) {
  const response = await fetch(new Request(`http://wiki.test${path}`));
  return { status: response.status, html: await response.text() };
}

describe("content", () => {
  test("every page renders and every wiki link points at a real page", async () => {
    const broken: string[] = [];
    for (const page of (await wiki.pages()).values()) {
      const { status, html } = await get(`/${page.slug}`);
      expect(status).toBe(200);
      for (const match of html.matchAll(/<a href="([^"]*)" class="wikilink missing">/g)) {
        broken.push(`/${page.slug} links to ${match[1]}`);
      }
    }
    expect(broken).toEqual([]);
  });

  test("every section and every place on the map has a page", async () => {
    const pages = await wiki.pages();
    const expected = [...SECTIONS.map((section) => section.slug), ...PLACES.map((place) => place.slug)];
    expect(expected.filter((slug) => !pages.has(slug))).toEqual([]);
  });

  test("every place page is listed on the hike list page", async () => {
    const { html } = await get("/hike-list");
    expect(PLACES.filter((place) => !html.includes(`href="/${place.slug}"`))).toEqual([]);
  });
});

describe("page shell", () => {
  test("only the section being read is expanded in the navigation", async () => {
    const { html } = await get("/desert/death-valley");
    expect(html).toContain('<a href="/desert/joshua-tree">');
    expect(html).toContain('<a href="/bay-area/lands-end" class="nav-folded">');
    expect(html).toContain('<a href="/bay-area">');
  });

  test("the home page map has a pin for every place", async () => {
    const { html } = await get("/");
    for (const place of PLACES) expect(html).toContain(`<a href="/${place.slug}" class="map-pin`);
  });

  test("the app stylesheet is linked and served", async () => {
    const { html } = await get("/");
    expect(html).toContain('<link rel="stylesheet" href="/public/california.css">');
    expect((await get("/public/california.css")).status).toBe(200);
  });
});
