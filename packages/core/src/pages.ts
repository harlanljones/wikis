/** A page in a wiki, discovered from a markdown file in its content directory. */
export interface Page {
  /** URL path without the leading slash. The home page has the slug `""`. */
  slug: string;
  /** The page's first `# heading`, or a title derived from its slug. */
  title: string;
  /** Absolute path of the markdown file. */
  file: string;
}

/** Every page of a wiki, keyed by slug. */
export type PageIndex = ReadonlyMap<string, Page>;

/**
 * Turns free text into a URL slug: `"Getting Started"` becomes `"getting-started"`.
 * Slashes are kept as separators, so `"Guides/First Page"` becomes `"guides/first-page"`.
 */
export function slugify(text: string): string {
  return text
    .split(/[\\/]/)
    .map((segment) =>
      segment
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean)
    .join("/");
}

/**
 * Maps a markdown file path, relative to the content directory, to its slug.
 * `index.md` files take the slug of their directory, so `guides/index.md` is `guides`.
 */
export function slugFromFile(relativePath: string): string {
  const slug = slugify(relativePath.replace(/\.md$/i, ""));
  if (slug === "index") return "";
  return slug.endsWith("/index") ? slug.slice(0, -"/index".length) : slug;
}

/** Returns the text of the first level-one heading outside a code fence, if any. */
export function titleFromMarkdown(source: string): string | undefined {
  let fence: string | undefined;
  for (const line of source.split("\n")) {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/)?.[1];
    if (marker) {
      if (!fence) fence = marker[0];
      else if (marker[0] === fence) fence = undefined;
      continue;
    }
    if (fence) continue;
    const heading = line.match(/^\s{0,3}#[ \t]+(.+?)(?:[ \t]+#+)?[ \t]*$/)?.[1];
    if (heading) return heading;
  }
  return undefined;
}

/** A readable title for a slug with no heading: `guides/first-page` becomes `First page`. */
export function titleFromSlug(slug: string): string {
  const words = (slug.split("/").at(-1) ?? "").replaceAll("-", " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Scans a content directory for markdown files and builds the page index. */
export async function loadPages(contentDir: string, homeTitle = "Home"): Promise<PageIndex> {
  const files: string[] = [];
  try {
    for await (const file of new Bun.Glob("**/*.md").scan({ cwd: contentDir })) files.push(file);
  } catch (error) {
    throw new Error(`Could not read wiki content directory: ${contentDir}`, { cause: error });
  }
  // Sorted so that a slug shared by two files always resolves to the same one.
  files.sort();

  const loaded = await Promise.all(
    files.map(async (relativePath): Promise<Page> => {
      const slug = slugFromFile(relativePath);
      const file = `${contentDir}/${relativePath}`;
      const heading = titleFromMarkdown(await Bun.file(file).text());
      return { slug, file, title: heading ?? (slug === "" ? homeTitle : titleFromSlug(slug)) };
    }),
  );

  const pages = new Map<string, Page>();
  for (const page of loaded) if (!pages.has(page.slug)) pages.set(page.slug, page);
  return pages;
}
