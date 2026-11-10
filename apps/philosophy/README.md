# Philosophy and Political Theory Wiki

A plain-language guide to political philosophy, organised around thirty-five thinkers from Plato to Martha Nussbaum, with pages on the ideas they argued about, the traditions they belong to and the best-known debates between them.

```sh
bun run --filter @wikis/philosophy dev   # http://localhost:3004
```

## Layout

```
content/
  index.md            Home page, with the lifespan chart.
  thinkers/           One page per thinker, plus an index by period.
  ideas/              Concepts: the social contract, liberty, justice, sovereignty and so on.
  traditions/         Liberalism, conservatism, socialism and seven more.
  debates/            Six disputes set out side by side.
  timeline.md         The lifespan chart, and works and events by period.
  glossary.md         Short definitions that link to the full pages.
  reading-list.md     Where to start with the original texts.
  about.md            Scope, gaps and how far to trust the facts.
public/philosophy.css Accent color, the folded navigation, the chart and the thinker footer.
public/favicon.svg    Replaces the built-in favicon.
src/thinkers.ts       Every thinker's dates and period. The chart and the tests read this.
src/timeline.ts       Draws the lifespan chart and the links between thinker pages.
src/wiki.ts           The wiki, plus the page adjustments below.
src/server.ts         Bun.serve.
```

## What this app adds to the shared wiki

`src/wiki.ts` passes every HTML page from `@wikis/core` through `HTMLRewriter`, in the same way as `apps/california`:

- The navigation lists all 75 pages, so only the section being read is expanded, and small screens get a toggle to open it.
- `<div data-timeline></div>` in a page is filled with the lifespan chart. Each bar links to a thinker page. A living thinker's bar runs to the current year.
- Each thinker page ends with links to the thinkers born just before and just after, so the pages can be read in order.

## Writing conventions

- **Thinker pages share a shape:** a summary paragraph, an "At a glance" table (Lived, Wrote, Big idea, Belongs with, and Argued with or Built on), then `## Life`, the main ideas, criticism and influence, and `## Where to start`.
- **State a view fairly before criticising it.** Each page gives the thinker's position in its own terms, then the main objections. On questions that are still disputed, give each side its strongest case.
- **Record the bad along with the good.** Where a thinker defended slavery, empire or dictatorship, or acted on it, the page says so.
- **Quote sparingly and exactly.** Use well-known lines from standard translations and say where they come from.
- **Use British spelling** in the text (organise, labour, defence). Titles and quotations keep their original spelling.
- Wiki links inside a table need an escaped pipe: `[[thinkers/hobbes\|Hobbes]]`.

## Adding a thinker

1. Write `content/thinkers/<name>.md` in the shape above. The "Lived" row must give the dates exactly as `lifespan()` in `src/thinkers.ts` formats them, such as `1588–1679`, `c. 428–348 BC` or `born 1933`.
2. Add the thinker to `THINKERS` in `src/thinkers.ts`, in order of birth.
3. Add a row to the right period table in `content/thinkers/index.md` and a link in the list on `content/index.md`.
4. Link to the new page from the ideas, traditions and debates pages where the thinker matters.

`bun test apps/philosophy` fails if any of the first three steps is missed. It also checks that every wiki link points at a real page, that no link was left unparsed, and that every page can be reached from the home page.

## Keeping it current

Almost nothing here goes out of date, with two exceptions.

- **Living thinkers.** When one dies, add `died` to their entry in `src/thinkers.ts` and update the "Lived" row and the tense of their page, the row in `content/thinkers/index.md`, and the note in `content/about.md`.
- **`content/about.md`** says when recent facts were last checked (November 2026) and what has not been verified against printed sources. Update it when you check more.
