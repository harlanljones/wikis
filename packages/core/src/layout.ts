import { escapeHtml } from "./html.ts";
import type { Page } from "./pages.ts";

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
  description?: string;
  /** Any CSS color, used for links and highlights. */
  accent?: string;
}

/** Wraps rendered page content in the shared wiki page shell. */
export function renderLayout(options: LayoutOptions): string {
  const { wikiTitle, pageTitle, slug, body, description, accent } = options;
  const title = pageTitle === wikiTitle ? wikiTitle : `${pageTitle} · ${wikiTitle}`;
  const pages = [...options.pages].sort((a, b) => a.slug.localeCompare(b.slug));

  const nav = pages
    .map((page) => {
      const depth = page.slug === "" ? 0 : page.slug.split("/").length - 1;
      const current = page.slug === slug ? ' aria-current="page"' : "";
      return `<li style="--depth: ${depth}"><a href="/${escapeHtml(page.slug)}"${current}>${escapeHtml(page.title)}</a></li>`;
    })
    .join("\n          ");

  return `<!doctype html>
<html lang="en"${accent ? ` style="--accent: ${escapeHtml(accent)}"` : ""}>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>${
      description ? `\n    <meta name="description" content="${escapeHtml(description)}">` : ""
    }
    <link rel="stylesheet" href="/assets/wiki.css">
  </head>
  <body>
    <header class="site-header">
      <a href="/">${escapeHtml(wikiTitle)}</a>
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
