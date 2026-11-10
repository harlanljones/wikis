import { escapeHtml } from "./html.ts";
import type { Page } from "./pages.ts";
import { renderSearchForm } from "./search.ts";
import { renderMetaTags } from "./seo.ts";

export interface LayoutOptions {
  /** Name of the wiki, shown in the header and the browser tab. */
  wikiTitle: string;
  /** Title of the current page. */
  pageTitle: string;
  /** Slug of the current page, used to highlight it in the navigation. */
  slug?: string;
  /** Every page, for the navigation. */
  pages: Iterable<Page>;
  /** Rendered HTML for the page body. */
  body: string;
  /** Summary of the page for search results and link previews. */
  description?: string;
  /** Any CSS color, used for links and highlights. */
  accent?: string;
  /** Absolute URL of the page, used for the canonical link and link previews. */
  url?: string;
  /** Absolute URL of the image shown in link previews. */
  image?: string;
  /** Absolute URL of the page's markdown source. */
  markdown?: string;
  /** Whether to show the search box in the header. It submits to `/search`. */
  search?: boolean;
  /** Asks search engines to leave the page out of their index. */
  noindex?: boolean;
  /** Schema.org data for the page, embedded as JSON-LD. */
  structuredData?: unknown;
}

/**
 * Asks the browser to load a page in the background once the reader hovers over its link,
 * so that following the link is instant. Browsers without speculation rules ignore it.
 * Search results, static files and links to pages that do not exist are left alone.
 */
const SPECULATION_RULES = JSON.stringify({
  prerender: [
    {
      where: {
        and: [
          { href_matches: "/*" },
          { not: { href_matches: "/search*" } },
          { not: { href_matches: "/public/*" } },
          { not: { selector_matches: ".missing" } },
        ],
      },
      eagerness: "moderate",
    },
  ],
});

/** Wraps rendered page content in the shared wiki page shell. */
export function renderLayout(options: LayoutOptions): string {
  const { wikiTitle, pageTitle, slug, body, accent } = options;
  const title = pageTitle === wikiTitle ? wikiTitle : `${pageTitle} · ${wikiTitle}`;
  const pages = [...options.pages].sort((a, b) => a.slug.localeCompare(b.slug));

  const nav = pages
    .map((page) => {
      const depth = page.slug === "" ? 0 : page.slug.split("/").length - 1;
      const current = page.slug === slug ? ' aria-current="page"' : "";
      return `<li style="--depth: ${depth}"><a href="/${escapeHtml(page.slug)}"${current}>${escapeHtml(page.title)}</a></li>`;
    })
    .join("\n          ");

  const meta = renderMetaTags({
    siteName: wikiTitle,
    title: slug === "" ? wikiTitle : pageTitle,
    description: options.description,
    url: options.url,
    image: options.image,
    markdown: options.markdown,
    home: slug === "",
    noindex: options.noindex,
    structuredData: options.structuredData,
  });

  return `<!doctype html>
<html lang="en"${accent ? ` style="--accent: ${escapeHtml(accent)}"` : ""}>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    ${meta}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/wiki.css">
    <script type="speculationrules">${SPECULATION_RULES}</script>
  </head>
  <body>
    <header class="site-header">
      <a href="/">${escapeHtml(wikiTitle)}</a>${options.search ? `\n      ${renderSearchForm("", true)}` : ""}
    </header>
    <div class="site-body">
      <nav class="site-nav" aria-label="Pages">
        <ul>
          ${nav}
        </ul>
      </nav>
      <main>
        <article>
${body}
        </article>
      </main>
    </div>
  </body>
</html>
`;
}
