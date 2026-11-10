import { resolve, sep } from "node:path";
import { escapeHtml } from "./html.ts";
import { renderLayout } from "./layout.ts";
import { loadPages, slugify, type Page, type PageIndex } from "./pages.ts";
import { renderMarkdown } from "./render.ts";
import {
  descriptionFromHtml,
  parseSiteUrl,
  renderFavicon,
  renderRobots,
  renderSitemap,
  siteOrigin,
  structuredData,
} from "./seo.ts";

export interface WikiOptions {
  /** Name of the wiki, shown in the header and the browser tab. */
  title: string;
  /** Directory of markdown files. Each file is a page. */
  contentDir: string;
  /** Optional directory of static files, served under `/public/`. */
  publicDir?: string;
  /**
   * One or two sentences about the wiki, for search results and link previews.
   * Used on the home page. Other pages are described by their first paragraph.
   */
  description?: string;
  /**
   * Public address of the wiki, such as `https://wiki.example.com`. Used for canonical
   * links, link previews and the sitemap. Defaults to the `SITE_URL` environment
   * variable, and then to the address each request was made to.
   */
  siteUrl?: string;
  /**
   * Image shown when a page is shared, as a path such as `/public/card.png` or a full URL.
   * 1200 by 630 pixels suits most sites.
   */
  image?: string;
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
/** A file directly under the site root, such as `/robots.txt` or `/favicon.ico`. */
const ROOT_FILE = /^\/[^/.][^/]*\.[a-z0-9]+$/i;

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
  const configuredSiteUrl = options.siteUrl ?? Bun.env.SITE_URL;
  const siteUrl = configuredSiteUrl ? parseSiteUrl(configuredSiteUrl) : undefined;
  const cacheControl = cache ? "public, max-age=3600" : "no-cache";

  let cached: Promise<PageIndex> | undefined;
  function pages(): Promise<PageIndex> {
    if (!cache) return loadPages(contentDir, options.title);
    return (cached ??= loadPages(contentDir, options.title));
  }

  interface Rendered {
    title: string;
    body: string;
    /** The page being shown. Left out for the 404 page. */
    page?: Page;
  }

  function html(index: PageIndex, origin: string, rendered: Rendered, status = 200) {
    const { page, title, body } = rendered;
    // The home page speaks for the whole wiki. Every other page is summed up by its own opening paragraph.
    const summary = descriptionFromHtml(body);
    const description = page?.slug === "" ? (options.description ?? summary) : (summary ?? options.description);
    const document = renderLayout({
      wikiTitle: options.title,
      pageTitle: title,
      slug: page?.slug,
      pages: index.values(),
      body,
      accent: options.accent,
      description,
      url: page && `${origin}/${page.slug}`,
      image: options.image && new URL(options.image, origin).href,
      noindex: !page,
      structuredData:
        page && structuredData({ origin, siteName: options.title, description, page, pages: index }),
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
      return new Response(Bun.file(STYLESHEET), { headers: { "cache-control": cacheControl } });
    }
    if (path.startsWith("/public/")) {
      const file = publicDir && (await publicFile(publicDir, path.slice("/public/".length)));
      return file ? new Response(file) : new Response("Not found", { status: 404 });
    }

    const origin = siteOrigin(request, siteUrl);
    if (ROOT_FILE.test(path)) {
      // A wiki's own robots.txt, favicon or site verification file wins over the built-in ones.
      const file = publicDir && (await publicFile(publicDir, path.slice(1)));
      if (file) return new Response(file);
      if (path === "/robots.txt") return text(renderRobots(origin), "text/plain; charset=utf-8");
      if (path === "/sitemap.xml") {
        return text(renderSitemap(await pages(), origin), "application/xml; charset=utf-8");
      }
      if (path === "/favicon.svg") return text(renderFavicon(options.title, options.accent), "image/svg+xml");
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
      return html(index, origin, { title: page.title, page, body: renderMarkdown(source, index) });
    }

    const body = [
      "<h1>Page not found</h1>",
      `<p>There is no page at <code>${escapeHtml(path)}</code>.</p>`,
      `<p>Add <code>${escapeHtml(slug || "index")}.md</code> to this wiki's content directory to create it.</p>`,
    ].join("\n");
    return html(index, origin, { title: "Page not found", body }, 404);
  }

  function text(body: string, contentType: string) {
    return new Response(body, { headers: { "content-type": contentType, "cache-control": cacheControl } });
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
