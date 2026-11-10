import { createWiki } from "@wikis/core";

const wiki = createWiki({
  title: "Example Wiki",
  description: "A starting point for a new wiki.",
  contentDir: `${import.meta.dir}/../content`,
  publicDir: `${import.meta.dir}/../public`,
});

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3000),
  fetch: wiki.fetch,
});

console.log(`Example Wiki is running at ${server.url}`);
