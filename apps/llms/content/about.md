# About this wiki

What the LLM Wiki covers, what it leaves out, and how far to trust it.

## Scope

The wiki is written for a curious reader who wants to understand large language models well enough to run them, choose between them and follow research about them. It has five sections, meant to be read in order:

1. [[fundamentals|How LLMs work]]: tokens, embeddings, attention, the transformer, sampling, the KV cache, mixture of experts and scaling.
2. [[training|Training]]: pretraining, data, fine-tuning, LoRA, preference tuning, reasoning, distillation and evaluation.
3. [[local|Running models locally]]: hardware, GGUF, llama.cpp, Ollama and other tools, choosing a model, performance and serving.
4. [[quantization|Quantization]]: number formats, the main methods (int8, GPTQ, AWQ, k-quants and i-quants, and others), the KV cache, and measuring quality.
5. [[interpretability|Interpretability]]: features, superposition, probing, the logit lens, attention heads, patching, circuits, sparse autoencoders, attribution graphs and steering.

## What is left out

- **Image, audio and video models,** except where they share ideas with language models.
- **Agents and tool use** beyond a mention, and retrieval-augmented generation beyond a paragraph.
- **AI safety and policy** as subjects in their own right. Interpretability is covered as a technique.
- **Cloud APIs and commercial products,** apart from where they introduced an idea.
- **A live list of models and benchmark scores.** These change monthly. [[local/choosing-a-model|Choosing a model]] gives families, not rankings.

## How far to trust it

The text was drafted in November 2026 from general knowledge of the field, not checked line by line against sources. In particular:

- **Dates, author lists and paper titles** in the [[history|history]] and [[reading-list|reading list]] are believed correct but were **not** individually verified.
- **Hardware specifications** (memory bandwidth, capacity) on the [[local/hardware|hardware page]] are manufacturer figures as remembered, not checked against current data sheets.
- **Bits per weight** of GGUF types are from the llama.cpp design as described in its pull requests. The averages for whole files (for example 4.9 for `Q4_K_M`) are typical values and vary by model.
- **Command-line options** for llama.cpp and Ollama change between versions. They were correct for 2025 builds as far as known. `--help` is the authority.
- **Model shapes** in the calculator's table (layers, KV heads, head size) were not checked against each model's `config.json`.
- **The model landscape** on [[local/choosing-a-model|Choosing a model]] was lightly checked against public roundups in November 2026 and will go out of date fastest.
- **Research findings** are summarised as their authors reported them. Interpretability results in particular are often narrower than headlines suggest. See [[interpretability/open-problems#How to read interpretability claims|How to read interpretability claims]].

Corrections are welcome. The [[reading-list|reading list]] points to the primary sources.

## Conventions

- Every page opens with a one-sentence summary.
- Numbers are given with their units and, where they are rules of thumb, are labelled as such.
- Pages on the reading path end with links to the previous and next page.
