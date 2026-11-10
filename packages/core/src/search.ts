import { escapeHtml, unescapeHtml } from "./html.ts";
import type { Page } from "./pages.ts";

/** A word of page text, in the form it is matched in and where it sits in the text. */
interface Word {
  /** Lower case, without accents. */
  term: string;
  start: number;
  end: number;
}

/** A heading inside a page, and where the text under it begins. */
interface Section {
  id: string;
  title: string;
  /** Offset into the page's text. */
  start: number;
  words: Word[];
}

/** One page, prepared for searching. */
export interface SearchEntry {
  page: Page;
  /** The page's opening paragraph, shown when a search matches only its title. */
  description?: string;
  titleWords: Word[];
  /** The page's text without markup. */
  text: string;
  words: Word[];
  sections: Section[];
}

/** One page that matches a search. */
export interface SearchResult {
  page: Page;
  score: number;
  /** How many of the words searched for are on the page. */
  matched: number;
  /** A passage around the first match, as HTML with the matching words in `<mark>`. */
  excerpt: string;
  /** The heading the first match falls under, when it is not in the page's introduction. */
  section?: { id: string; title: string };
}

const WORD = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
const HEADING = /<h([2-6])(?: id="([^"]*)")?>([\s\S]*?)<\/h\1>/g;
/** Markup whose text would only add noise: diagrams and other drawings, and the title, which is searched on its own. */
const SKIPPED = /<figure class="diagram[\s\S]*?<\/figure>|<(svg|h1|script|style)\b[\s\S]*?<\/\1>/g;
const EXCERPT_BEFORE = 60;
const EXCERPT_LENGTH = 200;
const MAX_TERMS = 8;
/** How many results the search page lists. */
const MAX_SHOWN = 30;

/** Folds a word to the form searches are matched in: `Café` and `cafe` are the same word. */
function fold(word: string): string {
  return word
    .normalize("NFKD")
    .replace(/[̀-ͯ'’]/g, "")
    .toLowerCase();
}

function wordsOf(text: string): Word[] {
  return [...text.matchAll(WORD)].map((match) => ({
    term: fold(match[0]),
    start: match.index,
    end: match.index + match[0].length,
  }));
}

const INLINE_TAG = /<\/?(?:a|abbr|b|code|del|em|i|kbd|mark|s|span|strong|sub|sup|u)\b[^>]*>/g;

/** The text of a piece of rendered HTML, with markup removed and white space collapsed. */
function textOf(html: string): string {
  // Inline markup sits inside words, as in `<em>re</em>read`. Every other tag ends one.
  const spaced = html
    .replace(INLINE_TAG, "")
    // Table cells run together when read as a sentence, so they are set apart.
    .replace(/<\/t[dh]>\s*<t[dh]\b[^>]*>/g, " · ")
    .replace(/<[^>]+>/g, " ");
  return unescapeHtml(spaced)
    .replace(/\s+/g, " ")
    .trim();
}

/** Prepares a rendered page for searching. */
export function searchEntry(page: Page, html: string, description?: string): SearchEntry {
  const body = html.replace(SKIPPED, " ");
  const sections: Section[] = [];
  let text = "";
  let position = 0;
  const append = (fragment: string) => {
    const plain = textOf(fragment);
    if (plain) text += (text ? " " : "") + plain;
  };

  // Headings are kept out of the text, where they would run into the sentences around them.
  for (const match of body.matchAll(HEADING)) {
    append(body.slice(position, match.index));
    position = match.index + match[0].length;
    const title = textOf(match[3] ?? "");
    if (match[2] && title) sections.push({ id: match[2], title, start: text.length, words: wordsOf(title) });
  }
  append(body.slice(position));

  return { page, description, titleWords: wordsOf(page.title), text, words: wordsOf(text), sections };
}

/** Splits what someone typed into the words to look for. */
export function searchTerms(query: string): string[] {
  const terms = wordsOf(query).map((word) => word.term);
  return [...new Set(terms)].slice(0, MAX_TERMS);
}

/** How well a word answers a search term: a whole-word match beats the start of a longer word. */
function closeness(word: string, term: string): number {
  if (word === term) return 1;
  // One or two letters only match whole words, or `a` would match half the wiki.
  return term.length > 2 && word.startsWith(term) ? 0.6 : 0;
}

function best(words: Word[], term: string): number {
  let top = 0;
  for (const word of words) {
    top = Math.max(top, closeness(word.term, term));
    if (top === 1) break;
  }
  return top;
}

/**
 * Finds the pages that contain every word of the query, best match first.
 * When no page has every word, the pages with the most of them are returned instead.
 *
 * A word in the title counts most, then a word in a heading, then how often it
 * appears in the text. The start of a word matches too, so `expos` finds `exposure`.
 */
export function search(entries: Iterable<SearchEntry>, query: string): SearchResult[] {
  const terms = searchTerms(query);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];
  for (const entry of entries) {
    let score = 0;
    let matched = 0;
    for (const term of terms) {
      const inTitle = best(entry.titleWords, term);
      let inHeadings = 0;
      for (const section of entry.sections) inHeadings = Math.max(inHeadings, best(section.words, term));
      let inText = 0;
      for (const word of entry.words) inText += closeness(word.term, term);

      if (inTitle === 0 && inHeadings === 0 && inText === 0) continue;
      matched += 1;
      // Repeats count for less each time, so a long page does not win on length alone.
      score += inTitle * 12 + inHeadings * 4 + Math.log2(1 + inText);
    }
    if (matched === 0) continue;
    // The home page is an index of everything, so it tends to match and rarely answers.
    if (entry.page.slug === "") score *= 0.5;
    results.push({ page: entry.page, score, matched, ...passage(entry, terms) });
  }

  const most = Math.max(0, ...results.map((result) => result.matched));
  return results
    .filter((result) => result.matched === most)
    .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title));
}

/**
 * The passage to show for a result: the stretch of text that holds the most of the
 * words searched for, or the page's description when they are only in its headings.
 */
function passage(entry: SearchEntry, terms: string[]): Pick<SearchResult, "excerpt" | "section"> {
  const termOf = (word: Word) => terms.findIndex((term) => closeness(word.term, term) > 0);
  const matches = (word: Word) => termOf(word) !== -1;
  const found = entry.words.filter(matches);
  let first = found[0];
  if (!first) {
    const heading = entry.sections.find((section) => section.words.some(matches));
    return {
      excerpt: escapeHtml(entry.description ?? ""),
      section: heading && { id: heading.id, title: heading.title },
    };
  }
  if (terms.length > 1) {
    let most = 0;
    for (const [index, candidate] of found.entries()) {
      const inReach = new Set<number>();
      for (let next = index; next < found.length; next++) {
        const word = found[next];
        if (!word || word.end > candidate.start + EXCERPT_LENGTH - EXCERPT_BEFORE) break;
        inReach.add(termOf(word));
      }
      if (inReach.size > most) {
        most = inReach.size;
        first = candidate;
      }
      if (most === terms.length) break;
    }
  }

  let from = Math.max(0, first.start - EXCERPT_BEFORE);
  let to = Math.min(entry.text.length, from + EXCERPT_LENGTH);
  // Start and end on whole words.
  if (from > 0) from = entry.text.indexOf(" ", from) + 1 || from;
  if (to < entry.text.length) to = entry.text.lastIndexOf(" ", to);
  if (to <= first.end) to = first.end;

  let excerpt = from > 0 ? "… " : "";
  let position = from;
  for (const word of entry.words) {
    if (word.start < from || word.end > to || !matches(word)) continue;
    excerpt += `${escapeHtml(entry.text.slice(position, word.start))}<mark>${escapeHtml(entry.text.slice(word.start, word.end))}</mark>`;
    position = word.end;
  }
  excerpt += escapeHtml(entry.text.slice(position, to)) + (to < entry.text.length ? " …" : "");

  const section = entry.sections.findLast((candidate) => candidate.start <= first.start);
  return { excerpt, section: section && { id: section.id, title: section.title } };
}

/** The search box. `compact` is the small one in the page header. */
export function renderSearchForm(query = "", compact = false): string {
  const input = `<input type="search" name="q" value="${escapeHtml(query)}" placeholder="Search" aria-label="Search this wiki"${compact ? "" : " autofocus"}>`;
  return compact
    ? `<form class="site-search" action="/search" role="search">${input}</form>`
    : `<form class="search-form" action="/search" role="search">${input}<button type="submit">Search</button></form>`;
}

/** The body of the search page: the search box and, when something was typed, what it found. */
export function renderSearchPage(query: string, results: SearchResult[]): string {
  const lines = ["<h1>Search</h1>", renderSearchForm(query)];
  if (searchTerms(query).length === 0) return lines.join("\n");

  const shown = `<strong>${escapeHtml(query.trim())}</strong>`;
  if (results.length === 0) {
    lines.push(`<p class="search-count">No pages match ${shown}. Try fewer or different words.</p>`);
    return lines.join("\n");
  }

  const count = results.length === 1 ? "1 page" : `${results.length} pages`;
  const every = results.every((result) => result.matched === searchTerms(query).length);
  const summary = every
    ? `${count} ${results.length === 1 ? "matches" : "match"} ${shown}.`
    : `No page has every word of ${shown}. ${count} ${results.length === 1 ? "has" : "have"} some of them.`;
  const cut = results.length > MAX_SHOWN ? ` The best ${MAX_SHOWN} are shown.` : "";
  lines.push(`<p class="search-count">${summary}${cut}</p>`, '<ol class="search-results">');
  for (const { page, excerpt, section } of results.slice(0, MAX_SHOWN)) {
    const href = `/${escapeHtml(page.slug)}`;
    const under = section
      ? ` <span class="search-section">in <a href="${href}#${escapeHtml(section.id)}">${escapeHtml(section.title)}</a></span>`
      : "";
    lines.push(
      `<li><a class="search-title" href="${href}">${escapeHtml(page.title)}</a>${under}` +
        (excerpt ? `<p>${excerpt}</p>` : "") +
        "</li>",
    );
  }
  lines.push("</ol>");
  return lines.join("\n");
}
