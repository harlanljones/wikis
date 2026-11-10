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
    expect(html).toContain('<a href="/not-written-yet" class="wikilink missing">Not Written Yet</a>');
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
