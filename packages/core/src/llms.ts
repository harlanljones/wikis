import { titleFromSlug, type Page } from "./pages.ts";

/** The address of a page's markdown source: `/guides/setup.md`, and `/index.md` for the home page. */
export function markdownPath(slug: string): string {
  return `/${slug || "index"}.md`;
}

/**
 * Renders `/llms.txt`: a markdown index of the wiki for AI assistants and other
 * readers that want the text without the page around it. Every entry links to
 * the page's markdown source, with its opening paragraph as a summary.
 *
 * The layout follows https://llmstxt.org: a title, a summary in a block quote,
 * then one section of links for each folder of the wiki.
 */
export function renderLlmsTxt(options: {
  title: string;
  description?: string;
  origin: string;
  pages: Iterable<{ page: Page; description?: string }>;
}): string {
  const { title, description, origin } = options;
  const entries = [...options.pages].sort((a, b) => a.page.slug.localeCompare(b.page.slug));
  const titles = new Map(entries.map(({ page }) => [page.slug, page.title]));

  // Pages are grouped by their top folder. A page at the top level that has no folder of its own goes under "Pages".
  const folders = new Set(entries.flatMap(({ page }) => (page.slug.includes("/") ? [topFolder(page.slug)] : [])));
  const groups = new Map<string, string[]>();
  for (const { page, description: summary } of entries) {
    const folder = page.slug.includes("/") || folders.has(page.slug) ? topFolder(page.slug) : "";
    const line = `- [${inline(page.title)}](${origin}${markdownPath(page.slug)})${summary ? `: ${inline(summary)}` : ""}`;
    groups.set(folder, [...(groups.get(folder) ?? []), line]);
  }

  const lines = [`# ${inline(title)}`, ""];
  if (description) lines.push(`> ${inline(description)}`, "");
  lines.push("Every page is also available as markdown: add `.md` to its address.", "");
  for (const [folder, links] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`## ${folder ? inline(titles.get(folder) ?? titleFromSlug(folder)) : "Pages"}`, "", ...links, "");
  }
  return lines.join("\n");
}

function topFolder(slug: string): string {
  return slug.split("/", 1)[0] ?? "";
}

/** Keeps text on one line and stops it from closing the link it is written into. */
function inline(text: string): string {
  return text.replace(/\s+/g, " ").replace(/[[\]]/g, "\\$&").trim();
}
