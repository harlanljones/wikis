# Contributing

Thanks for helping. Fixes to facts, clearer wording, new pages and improvements to the engine are all welcome.

## Set up

Install [Bun](https://bun.sh) (the version in `.bun-version`), then:

```sh
bun install
bun run --filter @wikis/photography dev    # or any other wiki
```

Edits to markdown files appear when you reload the page.

## Editing a wiki

Pages live in `apps/<wiki>/content/`. The [README](README.md#writing-pages) explains how files map to URLs. A few conventions keep the wikis consistent:

- **Write for a reader who is new to the subject.** Lead with the short answer, then give the detail.
- **Open each page with a one-paragraph summary.** It becomes the page's description in search results.
- **Link by path.** A page at `content/basics/aperture.md` is linked as `[[basics/aperture|aperture]]`. Inside a table, escape the pipe: `[[basics/aperture\|aperture]]`.
- **Keep dated facts in one place.** Prices and current model names go stale. Each wiki keeps them on a few dated pages (for example `whats-new.md` or `market.md`) and says when they were last checked. Update that date when you update the facts.
- **Say where a fact came from** in the pull request when you change a spec, a price or a date.

Some wikis have their own notes in `apps/<wiki>/README.md`. Read those first.

## Changing the engine

The shared code is in `packages/core`. Keep it free of dependencies beyond Bun, and add a test in `packages/core/test` for any behavior you add or change.

## Before you open a pull request

```sh
bun run typecheck
bun test
```

The tests render every page of each wiki and fail on wiki links that point at a missing page or heading.

## Licensing

By contributing you agree that your changes to code are released under the [MIT License](LICENSE), and your changes to wiki content under [CC BY-SA 4.0](LICENSE-CONTENT).
