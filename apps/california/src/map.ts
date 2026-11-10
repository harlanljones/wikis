import type { PageIndex } from "@wikis/core";
import { PLACES, SECTIONS } from "./places.ts";

// An equirectangular projection fitted to the state: 400 units wide, 461 tall.
const WEST = -124.48;
const NORTH = 42.01;
const SCALE = 48.584075;
const LNG_SQUASH = 0.795473;

const OUTLINE =
  "M48.2,0.2 L81.2,-0.1 L133.1,0.7 L173.1,0.7 L173.3,84.8 L173.1,146.3 L222.8,189.9 L269.8,232.7 L306.8,267.6 L333.5,293.4 L380.5,340.5 L380.5,346.6 L386.9,354.6 L392.1,367.4 L399.8,374.3 L395.1,380.7 L389.0,383.9 L384.3,392.4 L385.8,403.8 L384.7,411.0 L376.9,417.9 L379.4,436.0 L384.7,436.3 L386.9,445.4 L384.7,449.6 L377.1,451.5 L325.9,456.0 L284.2,460.3 L279.5,453.9 L279.3,443.8 L276.4,431.8 L270.9,423.3 L258.8,411.6 L243.3,400.7 L240.4,403.6 L234.5,401.7 L235.3,396.9 L228.5,387.1 L219.4,389.2 L203.3,382.0 L201.0,376.2 L190.2,369.0 L177.9,369.3 L167.8,366.1 L154.9,367.4 L148.1,361.0 L149.6,347.4 L147.2,345.3 L148.7,335.7 L138.6,328.5 L138.1,318.7 L134.3,318.2 L128.0,309.7 L123.5,307.8 L121.6,302.5 L106.8,282.5 L99.8,276.7 L98.3,261.0 L101.3,262.3 L104.1,253.0 L98.6,244.5 L91.8,245.5 L82.9,237.8 L79.7,231.7 L80.4,225.8 L75.9,218.1 L75.9,205.3 L83.1,205.3 L80.1,187.5 L77.0,189.4 L76.3,198.2 L68.7,200.0 L59.6,193.4 L58.1,181.9 L52.2,172.9 L44.4,167.3 L40.1,160.9 L28.7,148.4 L30.6,144.7 L25.3,128.4 L27.7,119.4 L24.3,105.8 L14.3,92.5 L4.6,85.1 L2.7,76.3 L12.4,55.0 L14.3,47.8 L12.4,42.2 L16.0,27.6 L12.8,14.3 L8.6,11.1 L10.3,0.5 L48.2,0.2Z";

const CITIES: readonly (readonly [string, number, number])[] = [
  ["San Francisco", 37.7749, -122.4194],
  ["Sacramento", 38.5816, -121.4944],
  ["Los Angeles", 34.0522, -118.2437],
  ["San Diego", 32.7157, -117.1611],
  ["Redding", 40.5865, -122.3917],
  ["Fresno", 36.7378, -119.7871],
];

interface View {
  label: string;
  /** North-west and south-east corners, as [lat, lng]. */
  corners: readonly [readonly [number, number], readonly [number, number]];
}

const STATE: View = { label: "California", corners: [[42.01, -124.48], [32.53, -114.13]] };
const BAY: View = { label: "Bay Area close-up", corners: [[38.75, -123.3], [36.35, -121.0]] };

function project(lat: number, lng: number): [number, number] {
  return [(lng - WEST) * LNG_SQUASH * SCALE, (NORTH - lat) * SCALE];
}

function escape(text: string): string {
  return text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);
}

const round = (value: number) => Math.round(value * 10) / 10;

function renderView(view: View, pages: PageIndex): string {
  const [left, top] = project(...view.corners[0]);
  const [right, bottom] = project(...view.corners[1]);
  const width = right - left;
  const height = bottom - top;
  // Marks are sized in screen terms, so a zoomed-in view does not get giant pins.
  const unit = width / 400;
  const inView = (x: number, y: number) => x >= left && x <= right && y >= top && y <= bottom;

  const cities = CITIES.map(([name, lat, lng]) => {
    const [x, y] = project(lat, lng);
    if (!inView(x, y)) return "";
    return (
      `<circle class="map-city" cx="${round(x)}" cy="${round(y)}" r="${round(1.6 * unit)}"/>` +
      `<text class="map-city-label" x="${round(x + 4 * unit)}" y="${round(y + 3 * unit)}" font-size="${round(9 * unit)}">${name}</text>`
    );
  }).join("");

  const pins = PLACES.map((place) => {
    const page = pages.get(place.slug);
    const [x, y] = project(place.lat, place.lng);
    if (!page || !inView(x, y)) return "";
    const section = place.slug.split("/")[0];
    return (
      `<a href="/${place.slug}" class="map-pin pin-${section}"><title>${escape(page.title)}</title>` +
      `<circle class="map-hit" cx="${round(x)}" cy="${round(y)}" r="${round(9 * unit)}"/>` +
      `<circle class="map-dot" cx="${round(x)}" cy="${round(y)}" r="${round(4.4 * unit)}"/></a>`
    );
  }).join("");

  return (
    `<figure><svg viewBox="${round(left)} ${round(top)} ${round(width)} ${round(height)}" role="img" aria-label="Map of ${view.label} with a pin for each reading">` +
    `<path class="map-land" d="${OUTLINE}"/>${cities}${pins}</svg>` +
    `<figcaption>${view.label}</figcaption></figure>`
  );
}

/** The home page map: the whole state, a Bay Area close-up, and a legend of sections. */
export function renderMap(pages: PageIndex): string {
  const legend = SECTIONS.map(
    (section) =>
      `<li><a href="/${section.slug}"><i class="pin-${section.slug}"></i>${escape(section.label)}</a></li>`,
  ).join("");
  return `<div class="map-views">${renderView(STATE, pages)}${renderView(BAY, pages)}</div><ul class="map-legend">${legend}</ul>`;
}
