# Performance tuning

Get every layer onto the graphics card, size the context to what you need, turn on flash attention, and for mixture-of-experts models move the experts rather than whole layers to system memory.

## Measure first

`llama-bench` reports prompt processing (`pp`) and generation (`tg`) speed:

```sh
llama-bench -m model.gguf -ngl 99 -fa 1 -p 512 -n 128
```

In normal use, llama.cpp prints both speeds after each answer, and `ollama run --verbose` does the same. Compare against the bandwidth ceiling on the [[local/hardware|hardware page]]. Generation far below 60 percent of the ceiling usually means something is running on the processor.

## Offloading

When a model does not fit on the card, some of it must run from system memory.

- **Dense models:** `-ngl N` puts N layers on the card and the rest on the processor. Speed falls steeply as layers move off the card, because the processor's memory is ten or more times slower. A model that only half fits often runs at about a third of full speed.
- **MoE models:** move the **experts**, not whole layers. Attention, shared experts and the router stay on the card. Only the few chosen experts per token are read from system memory. In llama.cpp, `--n-cpu-moe N` keeps the experts of the first N layers in system memory, or use a tensor override such as `-ot ".ffn_.*_exps.=CPU"` for all of them. This is how people run 100B-plus MoE models on one 24 GB card with 64 to 128 GB of system RAM.

## Context and the KV cache

- **Set the context you need.** The [[fundamentals/kv-cache|KV cache]] for the full advertised context of a modern model can be larger than the model.
- **Quantize the cache** to `q8_0` for about half the memory and little loss. See [[quantization/kv-cache|Quantizing the KV cache]].
- **Reuse prompts.** With a long fixed system prompt, keep it identical between requests so the server can reuse its cache.

## Flash attention

`-fa on` in llama.cpp, `OLLAMA_FLASH_ATTENTION=1` in Ollama. It reduces memory use and speeds up long contexts on most hardware. It is required for a quantized V cache.

## Batch sizes

llama.cpp processes prompts in batches (`-b`, default 2048) and micro-batches (`-ub`, default 512). Larger micro-batches can speed up prompt processing on fast cards at the cost of more working memory. Rarely worth changing unless you process long prompts often.

## Threads

For work on the processor, set `-t` to the number of **physical performance cores**, not logical threads. Generation on a processor is limited by memory bandwidth, so more threads past that point do not help and can hurt.

## Speculative decoding

A small **draft model** from the same family (sharing the tokenizer) proposes several tokens, and the main model checks them all in one pass, which costs about the same as generating one token. Accepted tokens are free speed, and the output is exactly what the main model alone would sample.

```sh
llama-server -m big-model.gguf -md small-draft.gguf -ngl 99 -ngld 99 --draft-max 16
```

Gains of 1.5 to 2.5 times are common for code and other predictable text, less for creative writing. Some models ship built-in draft heads (multi-token prediction) for the same purpose. A related trick, n-gram or prompt-lookup decoding, drafts tokens by copying from the prompt, and helps when editing a document.

## Memory mapping and loading

llama.cpp memory-maps GGUF files by default, so loading is fast and the operating system can share the file between processes. `--mlock` stops the operating system from swapping it out. `--no-mmap` loads the whole file into memory, which can help on some network or slow drives.

## A checklist when it is slow

1. Is everything on the graphics card? Check the load log, or `ollama ps`.
2. Is the context much larger than you need?
3. Is flash attention on?
4. Is another program using VRAM? Browsers and games can hold gigabytes.
5. Is it an MoE model being offloaded by whole layers instead of by experts?
6. On a laptop: is it plugged in and set to a performance power mode?

## See also

- [[local/serving|Serving models]], next on the reading path
