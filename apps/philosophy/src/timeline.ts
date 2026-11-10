import type { PageIndex } from "@wikis/core";
import { lifespan, slugOf, THINKERS, type Thinker } from "./thinkers.ts";

// Drawing units. The chart is drawn 680 units wide and scales with the page.
const WIDTH = 680;
const MARGIN = 10;
const AXIS_HEIGHT = 26;
const ROW_HEIGHT = 20;
const BAR_HEIGHT = 8;
const LABEL_GAP = 7;
/** Rough width of one character of a label, for deciding which side of a bar it fits on. */
const CHAR_WIDTH = 6.8;

/**
 * One stretch of history, drawn to its own scale. Two thousand years separate Plato from
 * Machiavelli and five hundred hold everyone since, so a single scale would crush the moderns.
 */
interface Panel {
  caption: string;
  from: number;
  to: number;
  ticks: readonly number[];
}

const EARLY: Panel = {
  caption: "Antiquity to the Renaissance",
  from: -460,
  to: 1560,
  ticks: [-400, 1, 400, 800, 1200],
};

const MODERN: Panel = {
  caption: "Hobbes to the present",
  from: 1560,
  to: 2040,
  ticks: [1600, 1700, 1800, 1900, 2000],
};

function escape(text: string): string {
  return text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);
}

const round = (value: number) => Math.round(value * 10) / 10;

function tickLabel(year: number): string {
  if (year < 0) return `${-year} BC`;
  return year < 1000 ? `AD ${year}` : String(year);
}

function renderPanel(panel: Panel, pages: PageIndex, thisYear: number): string {
  const thinkers = THINKERS.filter((thinker) => thinker.born >= panel.from && thinker.born < panel.to);
  const scale = (WIDTH - 2 * MARGIN) / (panel.to - panel.from);
  const x = (year: number) => MARGIN + (year - panel.from) * scale;
  const height = AXIS_HEIGHT + thinkers.length * ROW_HEIGHT + 6;

  const grid = panel.ticks
    .map(
      (year) =>
        `<line class="timeline-grid" x1="${round(x(year))}" y1="${AXIS_HEIGHT - 6}" x2="${round(x(year))}" y2="${height}"/>` +
        `<text class="timeline-tick" x="${round(x(year))}" y="13" text-anchor="middle">${tickLabel(year)}</text>`,
    )
    .join("");

  const rows = thinkers
    .map((thinker, index) => {
      const page = pages.get(slugOf(thinker));
      if (!page) return "";
      const top = AXIS_HEIGHT + index * ROW_HEIGHT;
      const middle = top + ROW_HEIGHT / 2;
      const start = x(thinker.born);
      const end = x(thinker.died ?? thisYear);
      const fitsRight = end + LABEL_GAP + thinker.name.length * CHAR_WIDTH <= WIDTH - MARGIN;
      const label = fitsRight
        ? `<text class="timeline-name" x="${round(end + LABEL_GAP)}" y="${middle + 4}">${escape(thinker.name)}</text>`
        : `<text class="timeline-name" x="${round(start - LABEL_GAP)}" y="${middle + 4}" text-anchor="end">${escape(thinker.name)}</text>`;
      // A living thinker's bar runs to the present and ends in an arrowhead, not a rounded cap.
      const arrow =
        thinker.died === undefined
          ? `<path class="timeline-bar" d="M${round(end)},${middle - 6} L${round(end + 7)},${middle} L${round(end)},${middle + 6}Z"/>`
          : "";
      return (
        `<a href="/${slugOf(thinker)}" class="timeline-row"><title>${escape(page.title)}, ${lifespan(thinker)}</title>` +
        `<rect class="timeline-hit" x="0" y="${top}" width="${WIDTH}" height="${ROW_HEIGHT}"/>` +
        `<rect class="timeline-bar" x="${round(start)}" y="${middle - BAR_HEIGHT / 2}" width="${round(Math.max(end - start, BAR_HEIGHT))}" height="${BAR_HEIGHT}" rx="${BAR_HEIGHT / 2}"/>` +
        `${arrow}${label}</a>`
      );
    })
    .join("");

  return (
    `<figure><figcaption>${panel.caption}</figcaption>` +
    `<svg viewBox="0 0 ${WIDTH} ${height}" role="img" aria-label="Lifespans of thinkers, ${panel.caption.toLowerCase()}. Each bar links to a page.">` +
    `${grid}${rows}</svg></figure>`
  );
}

/** The lifespan chart: one bar per thinker, in order of birth, each linking to its page. */
export function renderTimeline(pages: PageIndex, thisYear = new Date().getFullYear()): string {
  return `<div class="timeline">${renderPanel(EARLY, pages, thisYear)}${renderPanel(MODERN, pages, thisYear)}</div>`;
}

/** Links to the thinkers born just before and just after this one, for the foot of a thinker page. */
export function renderNeighbours(thinker: Thinker, pages: PageIndex): string {
  const index = THINKERS.indexOf(thinker);
  const link = (neighbour: Thinker | undefined, rel: "prev" | "next") => {
    const page = neighbour && pages.get(slugOf(neighbour));
    if (!neighbour || !page) return "<span></span>";
    const arrow = rel === "prev" ? "← " : " →";
    const title = escape(page.title);
    return (
      `<a href="/${slugOf(neighbour)}" rel="${rel}" class="thinker-${rel}">` +
      `<small>${rel === "prev" ? "Born before" : "Born after"}</small>` +
      `${rel === "prev" ? arrow : ""}${title}${rel === "next" ? arrow : ""}` +
      `<small>${lifespan(neighbour)}</small></a>`
    );
  };
  return (
    `<nav class="thinker-nav" aria-label="Thinkers in order of birth">` +
    `${link(THINKERS[index - 1], "prev")}${link(THINKERS[index + 1], "next")}</nav>`
  );
}
