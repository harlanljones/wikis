import { createWiki } from "@wikis/core";
import { neighboursOf } from "./path.ts";
import { parseInput, renderCalculator } from "./vram.ts";

export const wiki = createWiki({
  title: "LLM Wiki",
  description:
    "How large language models work, from tokens and attention to running them on your own hardware, quantizing them, and looking inside them.",
  contentDir: `${import.meta.dir}/../content`,
  publicDir: `${import.meta.dir}/../public`,
});

const STYLESHEET = '<link rel="stylesheet" href="/public/llms.css">';
const NAV_TOGGLE =
  '<input type="checkbox" id="nav-toggle" class="nav-toggle">' +
  '<label for="nav-toggle" class="nav-toggle-label">Browse all pages</label>';

/** The first path segment: `/local/gguf` is in the `local` section. */
function sectionOf(path: string): string {
  return path.split("/").filter(Boolean)[0] ?? "";
}

function escape(text: string): string {
  return text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);
}

/**
 * Serves the wiki, then adjusts each HTML page: the navigation only expands the section
 * being read, small screens get a toggle for it, `<div data-memory-calculator></div>` is
 * filled with the memory calculator, and each page on the reading path ends with links
 * to the pages before and after it.
 */
export async function fetch(request: Request): Promise<Response> {
  const response = await wiki.fetch(request);
  if (!response.headers.get("content-type")?.startsWith("text/html")) return response;

  const url = new URL(request.url);
  const path = url.pathname;
  const current = sectionOf(path);
  const pages = await wiki.pages();
  const neighbours = response.ok ? neighboursOf(path.slice(1)) : undefined;

  const footer = () => {
    if (!neighbours) return "";
    const link = (slug: string | undefined, rel: "prev" | "next") => {
      const page = slug === undefined ? undefined : pages.get(slug);
      if (!page || slug === undefined) return "<span></span>";
      const label = rel === "prev" ? "Previous" : "Next";
      return `<a href="/${slug}" rel="${rel}"><small>${label}</small>${escape(page.title)}</a>`;
    };
    return `<nav class="reading-path" aria-label="Reading path">${link(neighbours.prev, "prev")}${link(neighbours.next, "next")}</nav>`;
  };

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
    .on("[data-memory-calculator]", {
      element(placeholder) {
        placeholder.setAttribute("class", "vram");
        placeholder.setInnerContent(renderCalculator(parseInput(url.searchParams), path), { html: true });
      },
    })
    .on("article", {
      element(article) {
        article.append(footer(), { html: true });
      },
    })
    .transform(response);
}
