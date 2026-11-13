# LLM Wiki

A plain-language guide to large language models, in five sections meant to be read in order: how they work, how they are trained, how to run them on your own hardware, how quantization shrinks them, and what interpretability research has found inside them.

```sh
bun run --filter @wikis/llms dev   # http://localhost:3005
```

## Layout

```
content/
  index.md              Home page: where to start, the whole subject in one diagram, a hardware table.
  fundamentals/         Tokens, embeddings, attention, the transformer, RoPE, sampling, KV cache, MoE, scaling.
  training/             Pretraining, data, fine-tuning, LoRA, preference tuning, reasoning, distillation, evaluation.
  local/                Hardware and the memory calculator, GGUF, llama.cpp, Ollama, other tools, choosing, tuning, serving.
  quantization/         Number formats, the basics, int8, GPTQ, AWQ, k-quants and i-quants, other methods, KV cache, quality.
  interpretability/     Features, superposition, probing, logit lens, heads, patching, circuits, SAEs, attribution graphs, steering.
  history.md            2017 to 2025, with a timeline diagram.
  glossary.md           Short definitions that link to the full pages.
  reading-list.md       The papers each section is built on.
  about.md              Scope, gaps and how far to trust the facts.
public/llms.css         Accent color, the folded navigation, the reading-path links and the calculator.
public/favicon.svg      Replaces the built-in favicon.
src/path.ts             The reading order of every page in the five sections.
src/vram.ts             The memory calculator: the arithmetic and the form.
src/wiki.ts             The wiki, plus the page adjustments below.
src/server.ts           Bun.serve.
```

## What this app adds to the shared wiki

`src/wiki.ts` passes every HTML page from `@wikis/core` through `HTMLRewriter`, in the same way as `apps/philosophy`:

- **Folded navigation.** Only the section being read is expanded, and small screens get a toggle.
- **A reading path.** The sidebar is sorted by file name, which is not the order the ideas build on each other. Every page listed in `src/path.ts` ends with links to the page before and after it, so the whole wiki reads as one course.
- **A memory calculator.** `<div data-memory-calculator></div>` on `local/hardware.md` is replaced with a form that submits to the same page. The sum is done on the server from the query string, so it works with no script: weights from parameters and the GGUF type's typical bits per weight, KV cache from layers, KV heads, head size, context and cache type, plus a fixed allowance for buffers. It then shows which common memory sizes it fits.

## Writing conventions

- **Every page opens with a one-sentence summary** as its first paragraph. That sentence is also the page's description in search results.
- **Pages on the reading path end with a "See also" list** whose first item is the next page.
- **Numbers carry units and say when they are rules of thumb.**
- **No em-dashes.** The tests check.
- Wiki links inside a table need an escaped pipe: `[[local/gguf\|GGUF]]`.
- Mermaid diagrams are welcome. The tests fail on one that cannot be drawn.

## Adding a page

1. Write it in the right section folder.
2. Add its file name to that section's list in `src/path.ts`, at the point in the reading order where it belongs.
3. Add a row to the table on the section's `index.md`, in the same order.
4. Update the "See also" of the page before it, which names the next page.

`bun test apps/llms` fails if step 2 or 3 is missed, if any wiki link points at a missing page or heading, if a link was left unparsed, if a diagram cannot be drawn, or if a page cannot be reached from the home page.

## Keeping it current

Most pages describe ideas that do not go out of date. Three do:

- **`local/choosing-a-model.md`** lists model families. Review it every few months.
- **`local/llama-cpp.md` and `local/ollama.md`** quote command-line options that change between versions.
- **`local/hardware.md`** lists graphics cards and machines.

When any fact is checked against a source, say so in `content/about.md`.
