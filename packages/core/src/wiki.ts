import { resolve, sep } from "node:path";
import { escapeHtml } from "./html.ts";
import { renderLayout } from "./layout.ts";
import { loadPages, slugify, type PageIndex } from "./pages.ts";
import { renderMarkdown } from "./render.ts";

export interface WikiOptions {
  /** Name of the wiki, shown in the header and the browser tab. */
  title: string;
  /** Directory of markdown files. Each file is a page. */
  contentDir: string;
  /** Optional directory of static files, served under `/public/`. */
  publicDir?: string;
  /** Used for the page's meta description. */
  description?: string;
  /** Any CSS color, used for links and highlights. */
  accent?: string;
  /**
   * Whether to scan the content directory once and keep the page index in memory.
   * When off, the directory is scanned on every request so edits show up on reload.
   * Defaults to on when `NODE_ENV` is `production`.
   */
  cache?: boolean;
}

export interface Wiki {
  /** Request handler to pass to `Bun.serve`. */
  fetch(request: Request): Promise<Response>;
  /** The wiki's pages, keyed by slug. */
  pages(): Promise<PageIndex>;
}

const STYLESHEET = resolve(import.meta.dir, "wiki.css");
const HTML_HEADERS = { "content-type": "text/html; charset=utf-8" };

/**
 * Creates a wiki from a directory of markdown files.
 *
 * The result does not listen on a port. Pass its `fetch` to `Bun.serve`, which
 * leaves each app free to add its own routes in front of the wiki.
 */
export function createWiki(options: WikiOptions): Wiki {
  const contentDir = resolve(options.contentDir);
  const publicDir = options.publicDir ? resolve(options.publicDir) : undefined;
  const cache = options.cache ?? Bun.env.NODE_ENV === "production";

  let cached: Promise<PageIndex> | undefined;
  function pages(): Promise<PageIndex> {
    if (!cache) return loadPages(contentDir, options.title);
    return (cached ??= loadPages(contentDir, options.title));
  }

  function html(index: PageIndex, page: { title: string; slug?: string; body: string }, status = 200) {
    const document = renderLayout({
      wikiTitle: options.title,
      pageTitle: page.title,
      slug: page.slug,
      pages: index.values(),
      body: page.body,
      description: options.description,
      accent: options.accent,
    });
    return new Response(document, { status, headers: HTML_HEADERS });
  }

  async function fetch(request: Request): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }

    const url = new URL(request.url);
    let path: string;
    try {
      path = decodeURIComponent(url.pathname);
    } catch {
      return new Response("Bad request", { status: 400 });
    }

    if (path === "/healthz") return new Response("ok");
    if (path === "/assets/wiki.css") {
      return new Response(Bun.file(STYLESHEET), {
        headers: { "cache-control": cache ? "public, max-age=3600" : "no-cache" },
      });
    }
    if (path.startsWith("/public/")) {
      const file = publicDir && (await publicFile(publicDir, path.slice("/public/".length)));
      return file ? new Response(file) : new Response("Not found", { status: 404 });
    }

    // URLs are matched against the page index and never used to build file paths.
    const index = await pages();
    const requested = path.slice(1);
    const slug = slugify(requested);
    const page = index.get(slug);

    if (page && requested !== slug) {
      // `/Getting Started` and `/getting-started/` both redirect to `/getting-started`.
      return new Response(null, { status: 308, headers: { location: `/${slug}${url.search}` } });
    }
    if (page) {
      const source = await Bun.file(page.file).text();
      return html(index, { title: page.title, slug, body: renderMarkdown(source, index) });
    }

    const body = [
      "<h1>Page not found</h1>",
      `<p>There is no page at <code>${escapeHtml(path)}</code>.</p>`,
      `<p>Add <code>${escapeHtml(slug || "index")}.md</code> to this wiki's content directory to create it.</p>`,
    ].join("\n");
    return html(index, { title: "Page not found", body }, 404);
  }

  return { fetch, pages };
}

/** Resolves a file inside `publicDir`, refusing paths that escape it. */
async function publicFile(publicDir: string, relativePath: string) {
  const path = resolve(publicDir, relativePath);
  if (!path.startsWith(publicDir + sep)) return undefined;
  const file = Bun.file(path);
  return (await file.exists()) ? file : undefined;
}
