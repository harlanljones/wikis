import { createWiki } from "@wikis/core";

const wiki = createWiki({
  title: "Photography Wiki",
  description:
    "A plain-language guide to modern mirrorless and DSLR cameras: how they work, what the specs mean, and how to choose one.",
  contentDir: `${import.meta.dir}/../content`,
  publicDir: `${import.meta.dir}/../public`,
});

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3003),
  fetch: wiki.fetch,
});

console.log(`Photography Wiki is running at ${server.url}`);
