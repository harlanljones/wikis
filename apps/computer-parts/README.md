# Computer Parts Wiki

A plain-English guide to choosing computer hardware, for technical and non-technical readers. It explains what each part does, what every spec means, and what to buy.

```sh
bun run --filter @wikis/computer-parts dev
```

It runs at <http://localhost:3002>. Set `PORT` to change that.

## Content layout

| Path | What it holds |
| --- | --- |
| `content/index.md` | Home page with three reading paths |
| `content/basics.md` | How a computer works |
| `content/parts/` | One page per component, each with its specs explained |
| `content/specs/` | Model names, ports, benchmarks and marketing terms |
| `content/buying/` | Buying guides: laptops, prebuilts, budgets, used, timing, mistakes, upgrades |
| `content/use-cases/` | What to buy for a given kind of work |
| `content/building/` | Compatibility checklist and assembly |
| `content/glossary.md` | Short definitions of every term |
| `content/market.md` | Dated snapshot of prices and current product generations |

## Keeping it current

Prices and current model names go out of date quickly, so they are kept in two places:

- `content/market.md` holds current prices, product generations and sources. Update its date when you change it.
- `content/buying/budget-tiers.md` holds part lists priced from the market page.

Other pages refer to those two for anything time-sensitive, apart from short "late 2026" notes about the memory shortage. Search for `2026` to find them.

## Writing conventions

- Part pages share the same headings: what it does, what to buy, the specs explained, specs you can mostly ignore, going deeper, common mistakes.
- Each spec states how much it matters before explaining it.
- Wiki links inside a table need an escaped pipe: `[[parts/cpu\|CPU]]`.

## Tests

`bun test apps/computer-parts` renders every page and checks that no wiki link is missing or left unparsed, that links to headings resolve, and that every page can be reached from the home page.
