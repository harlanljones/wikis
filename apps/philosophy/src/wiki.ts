import { createWiki } from "@wikis/core";
import { slugOf, THINKERS } from "./thinkers.ts";
import { renderNeighbours, renderTimeline } from "./timeline.ts";

export const wiki = createWiki({
  title: "Philosophy and Political Theory Wiki",
  description:
    "A plain-language guide to political philosophy through its thinkers, from Plato and Aristotle through Hobbes, Locke and Rousseau to Rawls and Habermas.",
  contentDir: `${import.meta.dir}/../content`,
  publicDir: `${import.meta.dir}/../public`,
});

const STYLESHEET = '<link rel="stylesheet" href="/public/philosophy.css">';
const NAV_TOGGLE =
  '<input type="checkbox" id="nav-toggle" class="nav-toggle">' +
  '<label for="nav-toggle" class="nav-toggle-label">Browse all pages</label>';

/** The first path segment: `/thinkers/hobbes` is in the `thinkers` section. */
function sectionOf(path: string): string {
  return path.split("/").filter(Boolean)[0] ?? "";
}

/**
 * Serves the wiki, then adjusts each HTML page for a wiki of this size and shape:
 * the navigation only expands the section being read, small screens get a toggle for it,
 * `<div data-timeline></div>` is filled with the lifespan chart, and each thinker page
 * ends with links to the thinkers born before and after.
 */
export async function fetch(request: Request): Promise<Response> {
  const response = await wiki.fetch(request);
  if (!response.headers.get("content-type")?.startsWith("text/html")) return response;

  const path = new URL(request.url).pathname;
  const current = sectionOf(path);
  const pages = await wiki.pages();
  const thinker = response.ok ? THINKERS.find((candidate) => `/${slugOf(candidate)}` === path) : undefined;

  return new HTMLRewriter()
    .on("head", {
      element(head) {
        head.append(STYLESHEET, { html: true });
      },
    })
    .on("nav.site-nav ul", {
      element(list) {
        list.before(NAV_TOGGLE, { html: true });
      },
    })
    .on("nav.site-nav a", {
      element(link) {
        const segments = (link.getAttribute("href") ?? "").split("/").filter(Boolean);
        if (segments.length > 1 && segments[0] !== current) link.setAttribute("class", "nav-folded");
      },
    })
    .on("[data-timeline]", {
      element(placeholder) {
        placeholder.setInnerContent(renderTimeline(pages), { html: true });
      },
    })
    .on("article", {
      element(article) {
        if (thinker) article.append(renderNeighbours(thinker, pages), { html: true });
      },
    })
    .transform(response);
}
