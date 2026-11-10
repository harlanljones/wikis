import { fetch } from "./wiki.ts";

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? 3004),
  fetch,
});

console.log(`Philosophy and Political Theory Wiki is running at ${server.url}`);
