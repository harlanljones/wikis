import { describe, expect, test } from "bun:test";
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
