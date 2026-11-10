import { createWiki } from "@wikis/core";

const wiki = createWiki({
  title: "Computer Parts Wiki",
  description:
    "A plain-English guide to choosing computer hardware: what each part does, what every spec means, and what to buy.",
  contentDir: `${import.meta.dir}/../content`,
  publicDir: `${import.meta.dir}/../public`,
  accent: "#7c3aed",
});

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3002),
  fetch: wiki.fetch,
});

console.log(`Computer Parts Wiki is running at ${server.url}`);
