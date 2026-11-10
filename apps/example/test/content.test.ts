import { expect, test } from "bun:test";
import { createWiki } from "@wikis/core";

const wiki = createWiki({
  title: "Example Wiki",
  contentDir: `${import.meta.dir}/../content`,
  cache: true,
});

async function render(slug: string): Promise<string> {
  const response = await wiki.fetch(new Request(`http://wiki.test/${slug}`));
  expect(response.status).toBe(200);
  return response.text();
}

test("every page has a level-one heading", async () => {
  const pages = await wiki.pages();
  expect(pages.size).toBeGreaterThan(4);
  for (const slug of pages.keys()) expect(await render(slug), `/${slug}`).toMatch(/<h1[ >]/);
});

test("every diagram can be drawn", async () => {
  let diagrams = 0;
  for (const slug of (await wiki.pages()).keys()) {
    const html = await render(slug);
    expect(html, `/${slug} has a mermaid block that could not be drawn`).not.toContain("diagram-error");
    diagrams += html.split('<figure class="diagram">').length - 1;
  }
  expect(diagrams).toBe(3);
});
