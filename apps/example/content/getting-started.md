# Getting started

## Run the wiki

```sh
bun install
bun run --filter @wikis/example dev
```

Then open <http://localhost:3000>. Edits to markdown files show up when you reload the page.

## Add a page

Create a markdown file in `content/`. Its path becomes its URL.

| File                        | URL               |
| --------------------------- | ----------------- |
| `content/index.md`          | `/`               |
| `content/getting-started.md`| `/getting-started`|
| `content/guides/index.md`   | `/guides`         |
| `content/guides/linking.md` | `/guides/linking` |

The first `# heading` in the file is the page's title in the sidebar.

## Link between pages

Write `[[Getting Started]]` to link to a page by name, or see [[guides/linking|the linking guide]] for the other forms.
