import { PeleError, render } from "pele";
import { escapeHtml, unescapeHtml } from "./html.ts";

const MERMAID_BLOCK = /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g;

/**
 * Replaces every fenced `mermaid` code block in rendered HTML with the diagram it describes.
 *
 * Diagrams are drawn on the server by Pele as inline SVG, so the page needs no script
 * and the diagram takes its colors from the wiki's stylesheet in both light and dark themes.
 * A block that cannot be drawn is left as code, with the reason underneath.
 */
export function renderDiagrams(html: string): string {
  let count = 0;
  return html.replace(MERMAID_BLOCK, (_match, code: string) => {
    const source = unescapeHtml(code);
    count += 1;
    try {
      // The prefix keeps the ids inside one diagram from clashing with another's on the same page.
      const { svg } = render(source, { idPrefix: `diagram-${count}-` });
      return `<figure class="diagram">${svg}</figure>`;
    } catch (error) {
      if (!(error instanceof PeleError)) throw error;
      return (
        `<figure class="diagram diagram-error"><pre><code>${escapeHtml(source)}</code></pre>` +
        `<figcaption>This diagram could not be drawn: ${escapeHtml(firstLine(error.message))}</figcaption></figure>`
      );
    }
  });
}

function firstLine(text: string): string {
  return text.split("\n", 1)[0]?.replace(/[\s:]+$/, "") ?? "";
}
