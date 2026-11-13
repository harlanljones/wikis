import { fetch } from "./wiki.ts";

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3005),
  fetch,
});

console.log(`LLM Wiki is running at ${server.url}`);
