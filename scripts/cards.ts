/**
 * Draws the link preview image for each wiki: the 1200 by 630 card that chat apps
 * and social sites show when a page is shared.
 *
 *   bun run cards [name...]
 *
 * With no names, every wiki under `apps/` gets a card. Each is written to
 * `apps/<name>/public/card.png`, which the wiki then uses on every page.
 *
 * The card is a small web page, photographed by the browser built into Bun
 * (`Bun.WebView`). That needs macOS, or Chrome, Chromium, Edge or Brave installed.
 * Run it again after changing a wiki's title, description, accent color or favicon.
 */
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const WIDTH = 1200;
const HEIGHT = 630;
/** Wikis are started one at a time on a port well away from the ones they normally use. */
const PORT = 4173;

const appsDir = join(import.meta.dir, "..", "apps");
const wanted = Bun.argv.slice(2);

const names: string[] = [];
for (const entry of await readdir(appsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  if (await Bun.file(join(appsDir, entry.name, "src", "server.ts")).exists()) names.push(entry.name);
}
names.sort();

const unknown = wanted.filter((name) => !names.includes(name));
if (unknown.length > 0) {
  console.error(`No wiki named ${unknown.join(", ")}. The wikis are: ${names.join(", ")}`);
  process.exit(1);
}

/** What the card shows, read from the wiki's own home page so the two cannot drift apart. */
interface Site {
  title: string;
  description: string;
  accent: string;
  /** The wiki's own `public/favicon.svg`, when it has one. */
  favicon?: string;
}

const READ_SITE = `(() => {
  const meta = (selector) => document.querySelector(selector)?.content ?? "";
  return {
    title: meta('meta[property="og:site_name"]'),
    description: meta('meta[name="description"]'),
    accent: getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(),
  };
})()`;

function escape(text: string): string {
  return text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

function cardHtml(site: Site): string {
  const accent = /^[#\w(),.%\s-]+$/.test(site.accent) ? site.accent : "#2563eb";
  // A long title is set smaller so that it still fits on two lines.
  const titleSize = site.title.length > 34 ? 68 : site.title.length > 22 ? 80 : 92;
  // Without a favicon of its own, a wiki gets the built-in one: its first letter on its accent color.
  const mark = site.favicon
    ? `<img src="data:image/svg+xml;base64,${Buffer.from(site.favicon).toString("base64")}" alt="">`
    : `<div class="mark">${escape(([...site.title.trim()][0] ?? "W").toUpperCase())}</div>`;
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      html, body { margin: 0; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
      body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 72px 80px 80px;
        border-bottom: 18px solid ${accent};
        background: #ffffff;
        color: #1c1e21;
        font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      }
      img, .mark { display: block; width: 96px; height: 96px; }
      .mark {
        border-radius: 21px;
        background: ${accent};
        color: #ffffff;
        font-size: 60px;
        font-weight: 700;
        line-height: 96px;
        text-align: center;
      }
      h1 { margin: 0 0 24px; font-size: ${titleSize}px; font-weight: 750; line-height: 1.08; letter-spacing: -0.02em; }
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin: 0;
        max-width: 960px;
        color: #535961;
        font-size: 34px;
        line-height: 1.4;
      }
    </style>
  </head>
  <body>
    ${mark}
    <div>
      <h1>${escape(site.title)}</h1>
      <p>${escape(site.description)}</p>
    </div>
  </body>
</html>`;
}

async function waitUntilUp(origin: string, server: Bun.Subprocess): Promise<void> {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error("the wiki stopped before it could be read");
    try {
      if ((await fetch(`${origin}/healthz`)).ok) return;
    } catch {
      // Not listening yet.
    }
    await Bun.sleep(100);
  }
  throw new Error("the wiki did not start within 10 seconds");
}

async function drawCard(view: Bun.WebView, name: string): Promise<number> {
  const appDir = join(appsDir, name);
  const origin = `http://localhost:${PORT}`;
  const server = Bun.spawn(["bun", "src/server.ts"], {
    cwd: appDir,
    env: { ...Bun.env, PORT: String(PORT), NODE_ENV: "production" },
    stdout: "ignore",
    stderr: "inherit",
  });

  try {
    await waitUntilUp(origin, server);
    await view.navigate(`${origin}/`);
    const read = (await view.evaluate(READ_SITE)) as Omit<Site, "favicon">;
    if (!read.title) throw new Error("its home page has no title to put on the card");
    const ownFavicon = Bun.file(join(appDir, "public", "favicon.svg"));
    const favicon = (await ownFavicon.exists()) ? await ownFavicon.text() : undefined;

    await view.navigate(`data:text/html;charset=utf-8,${encodeURIComponent(cardHtml({ ...read, favicon }))}`);
    await view.evaluate("document.fonts.ready.then(() => true)");
    const shot = (await view.screenshot({ format: "png", encoding: "buffer" })) as Buffer;

    const { width, height } = await new Bun.Image(shot).metadata();
    if (width !== WIDTH || height !== HEIGHT) {
      throw new Error(`the browser drew ${width} by ${height} pixels instead of ${WIDTH} by ${HEIGHT}`);
    }
    // The card is flat color and text, so a small palette keeps the file small without a visible change.
    return await new Bun.Image(shot)
      .png({ palette: true, colors: 128, compressionLevel: 9 })
      .write(join(appDir, "public", "card.png"));
  } finally {
    server.kill();
    await server.exited;
  }
}

await using view = new Bun.WebView({ width: WIDTH, height: HEIGHT });
// The size passed above is the window's. The page has to be sized after the first navigation.
await view.navigate("about:blank");
await view.resize(WIDTH, HEIGHT);

let failed = false;
for (const name of wanted.length > 0 ? wanted : names) {
  try {
    const bytes = await drawCard(view, name);
    console.log(`apps/${name}/public/card.png  ${Math.round(bytes / 1024)} KB`);
  } catch (error) {
    failed = true;
    console.error(`Could not draw a card for ${name}: ${error instanceof Error ? error.message : error}`);
  }
}
process.exit(failed ? 1 : 0);
