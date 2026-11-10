const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const UNESCAPES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

/** Escapes text for use in HTML content or a quoted attribute value. */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char);
}

/** Reverses {@link escapeHtml}. */
export function unescapeHtml(html: string): string {
  return html.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => UNESCAPES[entity] ?? entity);
}
