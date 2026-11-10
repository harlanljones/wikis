import { fetch } from "./wiki.ts";

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3001),
  fetch,
});

console.log(`California on Foot is running at ${server.url}`);
