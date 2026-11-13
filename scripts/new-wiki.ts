/**
 * Scaffolds a new wiki app under `apps/`.
 *
 *   bun run new-wiki <name> [--title "Display Title"] [--description "One sentence"] [--port 3001]
 */
import { parseArgs } from "node:util";
import { mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const appsDir = join(import.meta.dir, "..", "apps");
const FIRST_PORT = 3000;

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    title: { type: "string" },
    description: { type: "string" },
    port: { type: "string" },
  },
  allowPositionals: true,
});

const name = positionals[0];
if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  console.error(
    'Usage: bun run new-wiki <name> [--title "Display Title"] [--description "One sentence"] [--port 3001]',
  );
  console.error("The name must be lowercase letters, numbers and hyphens, for example: field-notes");
  process.exit(1);
}

const appDir = join(appsDir, name);
if (await Bun.file(join(appDir, "package.json")).exists()) {
  console.error(`apps/${name} already exists.`);
  process.exit(1);
}

const title =
  values.title ?? name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
// Shown in search results and link previews. Without one, the home page's first paragraph is used.
const description = values.description ? `\n  description: ${JSON.stringify(values.description)},` : "";
const port = values.port ? Number(values.port) : await nextPort();
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`Invalid port: ${values.port}`);
  process.exit(1);
}

const files: Record<string, string> = {
  "package.json": `${JSON.stringify(
    {
      name: `@wikis/${name}`,
      version: "0.0.0",
      private: true,
      type: "module",
      scripts: {
        dev: "bun --hot src/server.ts",
        start: "NODE_ENV=production bun src/server.ts",
      },
      dependencies: { "@wikis/core": "workspace:*" },
    },
    null,
    2,
  )}\n`,
  "src/server.ts": `import { createWiki } from "@wikis/core";

const wiki = createWiki({
  title: ${JSON.stringify(title)},${description}
  contentDir: \`\${import.meta.dir}/../content\`,
  publicDir: \`\${import.meta.dir}/../public\`,
});

const server = Bun.serve({
  port: Number(Bun.env.PORT ?? ${port}),
  fetch: wiki.fetch,
});

console.log(\`${title.replace(/[`$\\]/g, "\\$&")} is running at \${server.url}\`);
`,
  "content/index.md": `# ${title}\n\nWelcome to ${title}. Edit \`content/index.md\` to get started.\n`,
  "public/.gitkeep": "",
};

for (const [path, contents] of Object.entries(files)) {
  await Bun.write(join(appDir, path), contents);
}

// Link the new workspace so `@wikis/core` resolves.
const install = Bun.spawnSync(["bun", "install"], {
  cwd: join(import.meta.dir, ".."),
  stdout: "inherit",
  stderr: "inherit",
});
if (install.exitCode !== 0) console.error("`bun install` failed. Run it again from the repo root.");

console.log(`\nCreated apps/${name}. Start it with:\n\n  bun run --filter @wikis/${name} dev\n`);
console.log(`Draw its link preview image with:\n\n  bun run cards ${name}\n`);

/** One above the highest default port used by an existing app. */
async function nextPort(): Promise<number> {
  await mkdir(appsDir, { recursive: true });
  let highest = FIRST_PORT - 1;
  for (const entry of await readdir(appsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const server = Bun.file(join(appsDir, entry.name, "src", "server.ts"));
    if (!(await server.exists())) continue;
    const match = (await server.text()).match(/Bun\.env\.PORT \?\? (\d+)/);
    if (match?.[1]) highest = Math.max(highest, Number(match[1]));
  }
  return highest + 1;
}
