# California on Foot

Readings on the geography and history behind a statewide California hike list. One page per place on the list, grouped by region, plus a handful of longer pages that tie the places together.

```sh
bun run --filter @wikis/california dev   # http://localhost:3001
```

## Layout

```
content/
  index.md            Home page, with the map.
  hike-list.md        Every hike on the list and the reading that goes with it.
  big-picture/        Geology, first peoples, the Gold Rush, trees, fire, water, timeline.
  bay-area/ ...       One folder per region, with an index.md and a page per place.
public/california.css Styles for the map, the navigation and the "On your hike list" box.
src/places.ts         The regions, and the coordinates of each place for the map.
src/map.ts            Draws the home page map from places.ts.
src/wiki.ts           The wiki, plus the page adjustments below.
src/server.ts         Bun.serve.
```

## What this app adds to the shared wiki

`src/wiki.ts` passes every HTML page from `@wikis/core` through `HTMLRewriter`:

- The navigation lists all of the pages, so only the region being read is expanded, and small screens get a toggle to open it.
- `<div data-california-map></div>` in a page is filled with the map. Each pin links to a place page.

## Adding a place

1. Write `content/<region>/<place>.md`. Start with a `# Title` and an "On your hike list" blockquote, as the other pages do.
2. Add the place to `PLACES` in `src/places.ts` so it gets a pin.
3. Add it to the table in the region's `index.md` and to `content/hike-list.md`.

`bun test` checks that every wiki link points at a real page, that every pin has a page, and that every place is on the hike list page.
