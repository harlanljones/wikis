import { escapeHtml, unescapeHtml } from "./html.ts";
import { slugify, type PageIndex } from "./pages.ts";

const WIKI_LINK = /<x-wikilink data-target="([^"]*)">([\s\S]*?)<\/x-wikilink>/g;

/**
 * Renders a page's markdown to HTML with Bun's built-in parser.
 *
 * `[[Page Name]]` and `[[Page Name|label]]` become links to the matching page.
 * Links whose target is not in `pages` get the `missing` class so they can be styled,
 * and `rel="nofollow"` so crawlers do not chase pages that have not been written.
 */
export function renderMarkdown(source: string, pages: PageIndex): string {
  const html = Bun.markdown.html(source, {
    wikiLinks: true,
    autolinks: true,
    headings: { ids: true },
  });
  return html.replace(WIKI_LINK, (_match, target: string, label: string) => {
    const [name = "", anchor] = unescapeHtml(target).split("#", 2);
    const slug = slugify(name);
    const href = `/${slug}${anchor ? `#${slugify(anchor)}` : ""}`;
    const attributes = pages.has(slug) ? 'class="wikilink"' : 'class="wikilink missing" rel="nofollow"';
    return `<a href="${escapeHtml(href)}" ${attributes}>${label}</a>`;
  });
}
