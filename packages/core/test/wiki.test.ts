import { describe, expect, test } from "bun:test";
import { rm } from "node:fs/promises";
import { createWiki } from "../src/index.ts";

const wiki = createWiki({
  title: "Test Wiki",
  contentDir: `${import.meta.dir}/fixtures/content`,
  publicDir: `${import.meta.dir}/fixtures/public`,
});

function get(path: string, init?: RequestInit) {
  return wiki.fetch(new Request(`http://wiki.test${path}`, init));
}

describe("pages", () => {
  test("serves the home page", async () => {
    const response = await get("/");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8");
    const html = await response.text();
    expect(html).toContain("<title>Welcome · Test Wiki</title>");
    expect(html).toContain('<h1 id="welcome">Welcome</h1>');
  });

  test("serves nested pages and directory index pages", async () => {
    expect((await get("/guides")).status).toBe(200);
    expect((await get("/guides/setup")).status).toBe(200);
  });

  test("lists every page in the navigation and marks the current one", async () => {
    const html = await (await get("/getting-started")).text();
    expect(html).toContain('<a href="/">Welcome</a>');
    expect(html).toContain('<a href="/getting-started" aria-current="page">Getting started</a>');
    expect(html).toContain('<a href="/guides/setup">Setup</a>');
  });

  test("redirects to the canonical URL", async () => {
    const spaced = await get("/Getting%20Started?from=test");
    expect(spaced.status).toBe(308);
    expect(spaced.headers.get("location")).toBe("/getting-started?from=test");

    const trailing = await get("/guides/");
    expect(trailing.status).toBe(308);
    expect(trailing.headers.get("location")).toBe("/guides");
  });

  test("returns a 404 page that names the file to create", async () => {
    const response = await get("/nope/<b>");
    expect(response.status).toBe(404);
    const html = await response.text();
    expect(html).toContain("<code>nope/b.md</code>");
    expect(html).not.toContain("<b>");
  });
});

describe("wiki links", () => {
  test("link to existing pages by name or slug, with an optional label", async () => {
    const html = await (await get("/")).text();
    expect(html).toContain('<a href="/getting-started" class="wikilink">Getting Started</a>');
    expect(html).toContain('<a href="/guides/setup" class="wikilink">the setup guide</a>');
  });

  test("mark links to pages that do not exist", async () => {
    const html = await (await get("/")).text();
    expect(html).toContain(
      '<a href="/not-written-yet" class="wikilink missing" rel="nofollow">Not Written Yet</a>',
    );
  });
});

describe("search engines and link previews", () => {
  const published = createWiki({
    title: "Test Wiki",
    description: 'A wiki for "testing" <things>.',
    contentDir: `${import.meta.dir}/fixtures/content`,
    publicDir: `${import.meta.dir}/fixtures/public`,
    siteUrl: "https://wiki.example.com/",
    image: "/public/card.png",
    accent: "#0f766e",
  });
  const page = async (path: string) =>
    (await published.fetch(new Request(`http://localhost:3000${path}`))).text();

  test("describes the home page with the wiki's description", async () => {
    const html = await page("/");
    expect(html).toContain('<meta name="description" content="A wiki for &quot;testing&quot; &lt;things&gt;.">');
    expect(html).toContain('<link rel="canonical" href="https://wiki.example.com/">');
    expect(html).toContain('<meta property="og:type" content="website">');
    expect(html).toContain('<meta property="og:title" content="Test Wiki">');
    expect(html).toContain('<meta property="og:url" content="https://wiki.example.com/">');
    expect(html).toContain('<meta property="og:image" content="https://wiki.example.com/public/card.png">');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
    expect(html).toContain('"@type":"WebSite"');
    expect(html).toContain("\\u003cthings>");
  });

  test("describes other pages with their first paragraph", async () => {
    const html = await page("/guides/setup");
    expect(html).toContain('<meta name="description" content="No heading here.">');
    expect(html).toContain('<link rel="canonical" href="https://wiki.example.com/guides/setup">');
    expect(html).toContain('<meta property="og:type" content="article">');
    expect(html).toContain('<meta property="og:title" content="Setup">');
    expect(html).toContain('<link rel="icon" href="/favicon.svg" type="image/svg+xml">');

    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1] ?? "");
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement.map((item: { name: string; item: string }) => [item.name, item.item])).toEqual([
      ["Test Wiki", "https://wiki.example.com/"],
      ["Guides", "https://wiki.example.com/guides"],
      ["Setup", "https://wiki.example.com/guides/setup"],
    ]);
  });

  test("falls back to the address of the request, as seen by a reverse proxy", async () => {
    expect(await (await get("/guides")).text()).toContain('<link rel="canonical" href="http://wiki.test/guides">');

    const proxied = await get("/guides", {
      headers: { "x-forwarded-proto": "https", "x-forwarded-host": "wiki.example.org" },
    });
    expect(await proxied.text()).toContain('<link rel="canonical" href="https://wiki.example.org/guides">');
  });

  test("keeps the 404 page out of search results", async () => {
    const html = await page("/nope");
    expect(html).toContain('<meta name="robots" content="noindex">');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain("og:url");
    expect(html).not.toContain("application/ld+json");
  });

  test("serves a sitemap of every page", async () => {
    const response = await published.fetch(new Request("http://localhost:3000/sitemap.xml"));
    expect(response.headers.get("content-type")).toBe("application/xml; charset=utf-8");
    const locations = [...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    expect(locations).toEqual([
      "https://wiki.example.com/",
      "https://wiki.example.com/getting-started",
      "https://wiki.example.com/guides",
      "https://wiki.example.com/guides/setup",
    ]);
  });

  test("serves a robots.txt that points at the sitemap", async () => {
    const response = await published.fetch(new Request("http://localhost:3000/robots.txt"));
    expect(response.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(await response.text()).toBe("User-agent: *\nAllow: /\n\nSitemap: https://wiki.example.com/sitemap.xml\n");
  });

  test("serves a default favicon in the wiki's accent color", async () => {
    const response = await published.fetch(new Request("http://localhost:3000/favicon.svg"));
    expect(response.headers.get("content-type")).toBe("image/svg+xml");
    const svg = await response.text();
    expect(svg).toContain('fill="#0f766e"');
    expect(svg).toContain(">T</text>");
  });

  test("lets a wiki replace root files from its public directory", async () => {
    const response = await get("/ads.txt");
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("placeholder\n");
    expect((await get("/missing.txt")).status).toBe(404);
    expect((await get("/.hidden.txt")).status).toBe(404);
  });

  test("rejects a site URL that is not a web address", () => {
    const options = { title: "Test Wiki", contentDir: `${import.meta.dir}/fixtures/content` };
    expect(() => createWiki({ ...options, siteUrl: "wiki.example.com" })).toThrow("Invalid wiki site URL");
    expect(() => createWiki({ ...options, siteUrl: "ftp://wiki.example.com" })).toThrow("Invalid wiki site URL");
  });
});

describe("search", () => {
  const article = (html: string) => html.slice(html.indexOf("<article>"), html.indexOf("</article>"));

  test("puts a search box in the header of every page", async () => {
    const box = '<form class="site-search" action="/search" role="search">';
    expect(await (await get("/")).text()).toContain(box);
    expect(await (await get("/nope")).text()).toContain(box);
  });

  test("finds pages by their text and links to the section that matched", async () => {
    const response = await get("/search?q=text+editor");
    expect(response.status).toBe(200);
    const html = await response.text();
    expect(html).toContain("<title>Search · Test Wiki</title>");
    expect(html).toContain('<meta name="robots" content="noindex">');
    expect(html).not.toContain('<meta name="description"');
    expect(article(html)).toContain('<a class="search-title" href="/guides/setup">Setup</a>');
    expect(article(html)).toContain('in <a href="/guides/setup#requirements">Requirements</a>');
    expect(article(html)).toContain("<mark>text</mark> <mark>editor</mark>");
    // The page has its own search box, so the one in the header is left out.
    expect(html).not.toContain('class="site-search"');
  });

  test("shows the search box alone when nothing was typed, and says when nothing matched", async () => {
    expect(article(await (await get("/search")).text())).not.toContain("search-count");
    expect(await (await get("/search?q=zzzz")).text()).toContain("No pages match <strong>zzzz</strong>.");
  });

  test("escapes what was typed", async () => {
    const html = await (await get(`/search?q=${encodeURIComponent('"><img src=x>')}`)).text();
    expect(html).not.toContain("<img src=x>");
  });

  test("gives way to a wiki's own page at /search", async () => {
    const dir = `${import.meta.dir}/fixtures/.tmp-own-search`;
    await Bun.write(`${dir}/search.md`, "# Finding things\n\nAsk at the desk.\n");
    try {
      const own = createWiki({ title: "Test Wiki", contentDir: dir });
      const html = await (await own.fetch(new Request("http://wiki.test/search?q=desk"))).text();
      expect(html).toContain('<h1 id="finding-things">Finding things</h1>');
      expect(html).not.toContain('class="site-search"');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("diagrams", () => {
  test("draws a mermaid code block as an inline diagram", async () => {
    const html = await (await get("/guides/setup")).text();
    expect(html).toContain('<figure class="diagram"><svg xmlns="http://www.w3.org/2000/svg" class="pele pele-flowchart"');
    expect(html).toContain(">The wiki</text>");
    expect(html).not.toContain("language-mermaid");
    // Other code blocks are left as code.
    expect(await (await get("/getting-started")).text()).toContain('<pre><code class="language-sh"># not a title');
  });

  test("leaves a diagram it cannot read as code, with the reason", async () => {
    const html = await (await get("/guides/setup")).text();
    expect(html).toContain('<figure class="diagram diagram-error"><pre><code>flowchart LR\n  broken --&gt;\n</code></pre>');
    expect(html).toContain("<figcaption>This diagram could not be drawn: Parse error on line 2</figcaption>");
  });

  test("keeps the text of a diagram out of search", async () => {
    expect(await (await get("/search?q=flowchart")).text()).toContain("No pages match");
  });
});

describe("markdown for other readers", () => {
  test("serves each page's markdown source at its address plus .md", async () => {
    const response = await get("/guides/setup.md");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("link")).toBe('<http://wiki.test/guides/setup>; rel="canonical"');
    expect(await response.text()).toStartWith("No heading here.\n\n## Requirements");

    expect(await (await get("/index.md")).text()).toStartWith("# Welcome");
    expect(await (await get("/guides.md")).text()).toStartWith("# Guides");
    expect(await (await get("/getting-started.md")).text()).toContain("# Getting started");
  });

  test("answers 404 for markdown that is not a page", async () => {
    expect((await get("/nope.md")).status).toBe(404);
    expect((await get("/public/hello.md")).status).toBe(404);
    expect((await get("/..%2f..%2fREADME.md")).status).toBe(404);
  });

  test("points each page at its markdown", async () => {
    expect(await (await get("/guides/setup")).text()).toContain(
      '<link rel="alternate" type="text/markdown" href="http://wiki.test/guides/setup.md">',
    );
    expect(await (await get("/")).text()).toContain(
      '<link rel="alternate" type="text/markdown" href="http://wiki.test/index.md">',
    );
    expect(await (await get("/nope")).text()).not.toContain("text/markdown");
  });

  test("serves an llms.txt that lists every page by section", async () => {
    const described = createWiki({
      title: "Test Wiki",
      description: "A wiki for testing.",
      contentDir: `${import.meta.dir}/fixtures/content`,
      siteUrl: "https://wiki.example.com",
    });
    const response = await described.fetch(new Request("http://localhost:3000/llms.txt"));
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await response.text()).toBe(
      [
        "# Test Wiki",
        "",
        "> A wiki for testing.",
        "",
        "Every page is also available as markdown: add `.md` to its address.",
        "",
        "## Pages",
        "",
        "- [Welcome](https://wiki.example.com/index.md): A wiki for testing.",
        "- [Getting started](https://wiki.example.com/getting-started.md): Back to home.",
        "",
        "## Guides",
        "",
        "- [Guides](https://wiki.example.com/guides.md)",
        "- [Setup](https://wiki.example.com/guides/setup.md): No heading here.",
        "",
      ].join("\n"),
    );
  });
});

describe("moving between pages", () => {
  test("asks the browser to load linked pages ahead of the click", async () => {
    const html = await (await get("/")).text();
    const rules = JSON.parse(html.match(/<script type="speculationrules">(.*?)<\/script>/)?.[1] ?? "");
    expect(rules.prerender[0].eagerness).toBe("moderate");
    expect(JSON.stringify(rules)).toContain('{"not":{"href_matches":"/search*"}}');
  });

  test("fades between pages unless the reader asked for less motion", async () => {
    const css = await (await get("/assets/wiki.css")).text();
    expect(css).toMatch(/@media \(prefers-reduced-motion: no-preference\) \{\s*@view-transition \{\s*navigation: auto;/);
  });
});

describe("link preview image", () => {
  test("uses card.png from the public directory when the wiki names no image", async () => {
    const dir = `${import.meta.dir}/fixtures/.tmp-card`;
    await Bun.write(`${dir}/card.png`, "not really a png");
    try {
      const options = { title: "Test Wiki", contentDir: `${import.meta.dir}/fixtures/content`, publicDir: dir };
      const home = (wiki: ReturnType<typeof createWiki>) =>
        wiki.fetch(new Request("http://wiki.test/")).then((response) => response.text());

      expect(await home(createWiki(options))).toContain(
        '<meta property="og:image" content="http://wiki.test/public/card.png">',
      );
      expect(await home(createWiki({ ...options, image: "https://cdn.example.com/own.png" }))).toContain(
        '<meta property="og:image" content="https://cdn.example.com/own.png">',
      );
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
    expect(await (await get("/")).text()).not.toContain("og:image");
  });
});

describe("other routes", () => {
  test("serves the stylesheet and a health check", async () => {
    const css = await get("/assets/wiki.css");
    expect(css.status).toBe(200);
    expect(css.headers.get("content-type")).toStartWith("text/css");
    expect(await (await get("/healthz")).text()).toBe("ok");
  });

  test("serves files from the public directory only", async () => {
    expect(await (await get("/public/hello.txt")).text()).toBe("hello\n");
    expect((await get("/public/missing.txt")).status).toBe(404);
    expect((await get("/public/%2e%2e%2fcontent%2findex.md")).status).toBe(404);
    expect((await get("/public/..%2f..%2f..%2fpackage.json")).status).toBe(404);
  });

  test("rejects methods other than GET and HEAD", async () => {
    const response = await get("/", { method: "POST" });
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET, HEAD");
  });
});
