import { describe, expect, test } from "bun:test";
import { descriptionFromHtml } from "../src/seo.ts";

describe("descriptionFromHtml", () => {
  test("uses the first paragraph as plain text", () => {
    const html = '<h1>Aperture</h1>\n<p>The <a href="/lens">lens</a> opening,\nwritten as <code>f/2.8</code> &amp; so on.</p>\n<p>More.</p>';
    expect(descriptionFromHtml(html)).toBe("The lens opening, written as f/2.8 & so on.");
  });

  test("skips paragraphs with no text, such as an image", () => {
    expect(descriptionFromHtml('<p><img src="/public/a.png" alt=""></p>\n<p>Words.</p>')).toBe("Words.");
  });

  test("prefers body text to an opening block quote", () => {
    const callout = "<blockquote>\n<p><strong>Note:</strong> a callout.</p>\n</blockquote>";
    expect(descriptionFromHtml(`${callout}\n<p>The body.</p>`)).toBe("The body.");
    expect(descriptionFromHtml(callout)).toBe("Note: a callout.");
  });

  test("cuts long paragraphs at a word boundary", () => {
    const description = descriptionFromHtml(`<p>${"Every word counts, more or less. ".repeat(10)}</p>`) ?? "";
    expect(description.length).toBeLessThanOrEqual(160);
    expect(description).toEndWith("more or…");
  });

  test("returns nothing for a page without a paragraph", () => {
    expect(descriptionFromHtml("<h1>Empty</h1>")).toBeUndefined();
  });
});
