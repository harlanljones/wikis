import { createWiki } from "@wikis/core";
import { renderMap } from "./map.ts";

export const wiki = createWiki({
  title: "California on Foot",
  description: "Fun readings on the geography and history behind a statewide California hike list.",
  contentDir: `${import.meta.dir}/../content`,
  publicDir: `${import.meta.dir}/../public`,
});

const STYLESHEET = '<link rel="stylesheet" href="/public/california.css">';
const NAV_TOGGLE =
  '<input type="checkbox" id="nav-toggle" class="nav-toggle">' +
  '<label for="nav-toggle" class="nav-toggle-label">Browse all readings</label>';

/** The first path segment: `/desert/death-valley` is in the `desert` section. */
function sectionOf(path: string): string {
  return path.split("/").filter(Boolean)[0] ?? "";
}

/**
 * Serves the wiki, then adjusts each HTML page for a wiki this size:
 * the navigation only expands the section being read, small screens get a
 * toggle for it, and the home page gets its map of every place.
 */
export async function fetch(request: Request): Promise<Response> {
  const response = await wiki.fetch(request);
  if (!response.headers.get("content-type")?.startsWith("text/html")) return response;

  const current = sectionOf(new URL(request.url).pathname);
  const pages = await wiki.pages();

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
    .on("[data-california-map]", {
      element(placeholder) {
        placeholder.setInnerContent(renderMap(pages), { html: true });
      },
    })
    .transform(response);
}
