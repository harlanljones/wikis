# wikis

A monorepo for a collection of wikis. Each wiki is its own web app, served by a native [Bun](https://bun.sh) server (`Bun.serve`, no framework). Pages are markdown files.

## Layout

```
apps/
  example/            One wiki. Copy this shape for each new one.
    content/          Markdown pages. The file path is the URL.
    public/           Static files, served under /public/.
    src/server.ts     The Bun server for this wiki.
packages/
  core/               @wikis/core: page loading, rendering and layout shared by every wiki.
scripts/
  new-wiki.ts         Scaffolds a new app under apps/.
```

The repo uses [Bun workspaces](https://bun.sh/docs/install/workspaces). Apps depend on shared packages with `"@wikis/core": "workspace:*"`, and packages are imported as TypeScript source, so there is no build step.

## Getting started

Install [Bun](https://bun.sh) (the version in `.bun-version`), then:

```sh
bun install
bun run dev          # run every wiki, with hot reload
```

The example wiki is at <http://localhost:3000>.

| Command                               | What it does                                    |
| ------------------------------------- | ----------------------------------------------- |
| `bun run dev`                         | Run every wiki with hot reload                  |
| `bun run --filter @wikis/example dev` | Run one wiki                                    |
| `bun run start`                       | Run every wiki in production mode               |
| `bun test`                            | Run the tests                                   |
| `bun run typecheck`                   | Type check the whole repo                       |
| `bun run new-wiki <name>`             | Create a new wiki app                           |

## Adding a wiki

```sh
bun run new-wiki field-notes --title "Field Notes"
bun run --filter @wikis/field-notes dev
```

This creates `apps/field-notes` with its own server and a starter home page. Each wiki gets its own default port, counting up from 3000. Set `PORT` to override it.

## Writing pages

Every markdown file in a wiki's `content/` directory is a page.

| File                        | URL                |
| --------------------------- | ------------------ |
| `content/index.md`          | `/`                |
| `content/getting-started.md`| `/getting-started` |
| `content/guides/index.md`   | `/guides`          |
| `content/guides/linking.md` | `/guides/linking`  |

- The first `# heading` is the page's title in the sidebar and browser tab.
- `[[Page Name]]` links to a page by name, and `[[Page Name|label]]` sets the link text. Links to pages that do not exist yet are shown in a different color.
- GitHub-flavored markdown (tables, task lists, strikethrough, autolinks) is supported through Bun's built-in `Bun.markdown` parser.
- Raw HTML in markdown is passed through as written, so only publish content you trust.

In development the content directory is read on every request, so edits appear on reload. With `NODE_ENV=production` the list of pages is read once at startup, so restart the server after adding or renaming pages.

## How a wiki app works

An app is a few lines. `createWiki` returns a request handler, and the app owns the server:

```ts
import { createWiki } from "@wikis/core";

const wiki = createWiki({
  title: "Example Wiki",
  contentDir: `${import.meta.dir}/../content`,
  publicDir: `${import.meta.dir}/../public`,
  accent: "#0f766e", // optional, any CSS color
});

Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  fetch: wiki.fetch,
});
```

Because each app calls `Bun.serve` itself, a wiki can add its own endpoints with `routes` and let everything else fall through to `wiki.fetch`:

```ts
Bun.serve({
  routes: {
    "/api/hello": () => Response.json({ hello: "world" }),
  },
  fetch: wiki.fetch,
});
```

Besides pages, every wiki serves `/assets/wiki.css` (the shared stylesheet), `/public/*` (the app's static files) and `/healthz`.
