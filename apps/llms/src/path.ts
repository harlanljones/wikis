/**
 * The reading path: every page in the five main sections, in the order they are best read.
 *
 * The sidebar is sorted by file name, which is not the order the ideas build on each other,
 * so each page on this list ends with links to the pages before and after it. The tests
 * check that every page in a section folder is on the list, so a new page cannot be missed.
 */
export const SECTIONS = [
  {
    id: "fundamentals",
    title: "How LLMs work",
    pages: [
      "what-is-an-llm",
      "tokens",
      "embeddings",
      "attention",
      "transformer",
      "positions",
      "sampling",
      "kv-cache",
      "mixture-of-experts",
      "scaling-laws",
    ],
  },
  {
    id: "training",
    title: "Training",
    pages: ["pretraining", "data", "fine-tuning", "lora", "preference-tuning", "reasoning", "distillation", "evaluation"],
  },
  {
    id: "local",
    title: "Running models locally",
    pages: [
      "why-local",
      "hardware",
      "gguf",
      "llama-cpp",
      "ollama",
      "other-tools",
      "choosing-a-model",
      "performance",
      "serving",
    ],
  },
  {
    id: "quantization",
    title: "Quantization",
    pages: [
      "number-formats",
      "how-it-works",
      "int8",
      "gptq",
      "awq",
      "k-quants",
      "other-methods",
      "kv-cache",
      "measuring-quality",
      "choosing",
    ],
  },
  {
    id: "interpretability",
    title: "Interpretability",
    pages: [
      "features-and-neurons",
      "superposition",
      "probing",
      "logit-lens",
      "attention-heads",
      "activation-patching",
      "circuits",
      "sparse-autoencoders",
      "attribution-graphs",
      "steering",
      "tools",
      "open-problems",
    ],
  },
] as const;

/** Every slug on the reading path, each section's index page first. */
export const PATH: readonly string[] = SECTIONS.flatMap((section) => [
  section.id,
  ...section.pages.map((page) => `${section.id}/${page}`),
]);

/** The pages before and after `slug` on the reading path, or undefined if it is not on it. */
export function neighboursOf(slug: string): { prev?: string; next?: string } | undefined {
  const index = PATH.indexOf(slug);
  if (index === -1) return undefined;
  return { prev: PATH[index - 1], next: PATH[index + 1] };
}
