import { describe, expect, test } from "bun:test";
import { loadPages, slugFromFile, slugify, titleFromMarkdown } from "../src/pages.ts";

const contentDir = `${import.meta.dir}/fixtures/content`;

describe("slugify", () => {
  test("lowercases and hyphenates", () => {
    expect(slugify("Getting Started")).toBe("getting-started");
    expect(slugify("  Crème brûlée!  ")).toBe("creme-brulee");
  });

  test("keeps slashes as separators and drops empty or dot segments", () => {
    expect(slugify("Guides/First Page")).toBe("guides/first-page");
    expect(slugify("/guides//setup/")).toBe("guides/setup");
    expect(slugify("../../etc/passwd")).toBe("etc/passwd");
  });
});

describe("slugFromFile", () => {
  test("maps index files to their directory", () => {
    expect(slugFromFile("index.md")).toBe("");
    expect(slugFromFile("guides/index.md")).toBe("guides");
    expect(slugFromFile("guides/setup.md")).toBe("guides/setup");
    expect(slugFromFile("Getting Started.md")).toBe("getting-started");
  });
});

describe("titleFromMarkdown", () => {
  test("uses the first level-one heading", () => {
    expect(titleFromMarkdown("intro\n\n# The Title #\n\n# Another")).toBe("The Title");
  });

  test("ignores headings inside code fences and deeper headings", () => {
    expect(titleFromMarkdown("```sh\n# comment\n```\n## Sub\n")).toBeUndefined();
  });
});

describe("loadPages", () => {
  test("indexes every markdown file by slug", async () => {
    const pages = await loadPages(contentDir);
    expect([...pages.keys()].sort()).toEqual(["", "getting-started", "guides", "guides/setup"]);
    expect(pages.get("")?.title).toBe("Welcome");
    expect(pages.get("getting-started")?.title).toBe("Getting started");
    expect(pages.get("guides/setup")?.title).toBe("Setup");
  });

  test("fails clearly when the content directory is missing", async () => {
    await expect(loadPages(`${contentDir}/missing`)).rejects.toThrow("Could not read wiki content directory");
  });
});
