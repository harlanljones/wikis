import { escapeHtml, unescapeHtml } from "./html.ts";
import type { Page, PageIndex } from "./pages.ts";

/** What search engines and link previews need to know about one page. */
export interface PageMeta {
  /** Name of the wiki. */
  siteName: string;
  /** Title of the page, without the wiki's name. */
  title: string;
  description?: string;
  /** Absolute URL of the page. Left out for pages that should not be indexed, such as a 404. */
  url?: string;
  /** Absolute URL of the image shown in link previews. */
  image?: string;
  /** Absolute URL of the page's markdown source, for readers that prefer it to HTML. */
  markdown?: string;
  /** Whether this is the wiki's home page. */
  home?: boolean;
  /** Asks search engines to leave the page out of their index. */
  noindex?: boolean;
  /** Schema.org data, embedded as JSON-LD. */
  structuredData?: unknown;
}

const DESCRIPTION_LENGTH = 160;

/** Renders the meta, Open Graph and structured data tags for a page's `<head>`. */
export function renderMetaTags(meta: PageMeta): string {
  const tags: string[] = [];
  const add = (tag: string, attribute: string, name: string, value: string | undefined) => {
    if (value) tags.push(`<${tag} ${attribute}="${name}" ${tag === "link" ? "href" : "content"}="${escapeHtml(value)}">`);
  };

  add("meta", "name", "description", meta.description);
  if (meta.noindex) add("meta", "name", "robots", "noindex");
  add("link", "rel", "canonical", meta.url);
  if (meta.markdown) {
    tags.push(`<link rel="alternate" type="text/markdown" href="${escapeHtml(meta.markdown)}">`);
  }
  add("meta", "property", "og:site_name", meta.siteName);
  add("meta", "property", "og:type", meta.home ? "website" : "article");
  add("meta", "property", "og:title", meta.title);
  add("meta", "property", "og:description", meta.description);
  add("meta", "property", "og:url", meta.url);
  add("meta", "property", "og:image", meta.image);
  add("meta", "name", "twitter:card", meta.image ? "summary_large_image" : "summary");
  if (meta.structuredData) {
    // `<` is escaped so that page text can never close the script element.
    const json = JSON.stringify(meta.structuredData).replaceAll("<", "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  return tags.join("\n    ");
}

/**
 * A plain-text summary of a rendered page, taken from its first paragraph and
 * cut at a word boundary to the length search engines show.
 *
 * Pages often open with a callout in a block quote, so body text is preferred
 * and a quoted paragraph is only used when the page has nothing else.
 */
export function descriptionFromHtml(html: string): string | undefined {
  const text = firstParagraph(html.replace(/<blockquote[\s\S]*?<\/blockquote>/g, "")) ?? firstParagraph(html);
  return text && truncate(text, DESCRIPTION_LENGTH);
}

function firstParagraph(html: string): string | undefined {
  for (const [, paragraph = ""] of html.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
    const text = unescapeHtml(paragraph.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
    if (text) return text;
  }
  return undefined;
}

function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  const cut = text.slice(0, length - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > length / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!?]+$/, "")}…`;
}

/**
 * Schema.org data for a page: the site itself on the home page, and the trail
 * of parent pages everywhere else, which search engines show in place of the URL.
 */
export function structuredData(options: {
  origin: string;
  siteName: string;
  description?: string;
  page: Page;
  pages: PageIndex;
}): unknown {
  const { origin, siteName, description, page, pages } = options;
  if (page.slug === "") {
    return { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: `${origin}/`, description };
  }

  const trail = [{ name: siteName, slug: "" }];
  const segments = page.slug.split("/");
  for (let depth = 1; depth <= segments.length; depth++) {
    const ancestor = pages.get(segments.slice(0, depth).join("/"));
    if (ancestor) trail.push({ name: ancestor.title, slug: ancestor.slug });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}/${item.slug}`,
    })),
  };
}

/** Renders `/sitemap.xml`, listing every page of the wiki. */
export function renderSitemap(pages: PageIndex, origin: string): string {
  const urls = [...pages.keys()]
    .sort()
    .map((slug) => `  <url><loc>${escapeHtml(`${origin}/${slug}`)}</loc></url>`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

/** Renders `/robots.txt`, which allows every crawler and points at the sitemap. */
export function renderRobots(origin: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
}

/** Renders the default `/favicon.svg`: the wiki's first letter on its accent color. */
export function renderFavicon(title: string, accent = "#2563eb"): string {
  const letter = ([...title.trim()][0] ?? "W").toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${escapeHtml(accent)}"/>
  <text x="16" y="23" font-family="system-ui, sans-serif" font-size="20" font-weight="700" text-anchor="middle" fill="#fff">${escapeHtml(letter)}</text>
</svg>
`;
}

/**
 * The public origin of the wiki, such as `https://wiki.example.com`.
 *
 * A configured site URL wins. Without one the origin is read from the request,
 * including the headers a reverse proxy sets when it terminates TLS.
 */
export function siteOrigin(request: Request, siteUrl?: string): string {
  if (siteUrl) return siteUrl;
  const url = new URL(request.url);
  const proto = forwarded(request, "x-forwarded-proto");
  const host = forwarded(request, "x-forwarded-host");
  if (proto === "http" || proto === "https") url.protocol = proto;
  if (host) {
    try {
      url.host = new URL(`http://${host}`).host;
    } catch {
      // Keep the host the request was made to.
    }
  }
  return url.origin;
}

function forwarded(request: Request, header: string): string | undefined {
  return request.headers.get(header)?.split(",")[0]?.trim().toLowerCase() || undefined;
}

/** Normalizes a configured site URL to its origin, or throws if it is not a URL. */
export function parseSiteUrl(siteUrl: string): string {
  let url: URL;
  try {
    url = new URL(siteUrl);
  } catch (error) {
    throw new Error(`Invalid wiki site URL: ${siteUrl}. Expected something like https://wiki.example.com`, {
      cause: error,
    });
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Invalid wiki site URL: ${siteUrl}. It must start with http:// or https://`);
  }
  return url.origin;
}
