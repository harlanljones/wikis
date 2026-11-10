import { expect, test } from "bun:test";
import { createWiki } from "@wikis/core";

const wiki = createWiki({
  title: "Photography Wiki",
  contentDir: `${import.meta.dir}/../content`,
  cache: true,
});

async function render(slug: string): Promise<string> {
  const response = await wiki.fetch(new Request(`http://wiki.test/${slug}`));
  expect(response.status).toBe(200);
  return response.text();
}

/** The rendered page body, without the navigation that links to every page. */
function article(html: string): string {
  return html.slice(html.indexOf("<article>"), html.indexOf("</article>"));
}

test("every page has a level-one heading", async () => {
  const pages = await wiki.pages();
  expect(pages.size).toBeGreaterThan(40);
  for (const slug of pages.keys()) {
    expect(article(await render(slug)), `/${slug}`).toMatch(/<h1[ >]/);
  }
});

test("every internal link points at a page and heading that exist", async () => {
  const pages = await wiki.pages();
  const rendered = new Map<string, string>();
  for (const slug of pages.keys()) rendered.set(slug, article(await render(slug)));

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
    const unparsed = html.replace(/<(code|pre)[\s\S]*?<\/\1>/g, "").match(/\[\[[^\]]*\]\]/);
    if (unparsed) broken.push(`/${slug} has an unparsed wiki link: ${unparsed[0]}`);
  }
  expect(broken).toEqual([]);
});
