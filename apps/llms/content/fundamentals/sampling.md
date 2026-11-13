# Sampling and decoding

The model gives a probability for every possible next token, and the sampler decides which one to use, trading predictability against variety with settings such as temperature, top-p and min-p.

## Greedy decoding

Always take the most likely token. It is deterministic and fine for short factual answers, but over long text it tends to fall into loops and bland phrasing, because the single most likely next word is rarely what a person would write.

## Temperature

Before the softmax, divide every logit by the **temperature**.

- **Below 1** sharpens the distribution: likely tokens become more likely. At 0, it becomes greedy decoding.
- **1** leaves the model's distribution as trained.
- **Above 1** flattens it: unlikely tokens get more chances, and text becomes more varied and, eventually, incoherent.

Typical settings: 0 to 0.3 for code and extraction, 0.6 to 0.8 for general chat, around 1 for creative writing. Model makers often publish a recommended setting, and it is worth following.

## Cutting off the tail

Temperature alone still gives every one of 100,000 tokens some chance. Truncation methods remove the long tail of nonsense before sampling.

| Method | Keeps | Notes |
| --- | --- | --- |
| Top-k | The *k* most likely tokens | Simple, but a fixed *k* is too many when the model is sure and too few when it is not |
| Top-p (nucleus) | The smallest set whose probabilities add up to *p*, such as 0.9 or 0.95 | Adapts to the model's confidence. The most common setting |
| Min-p | Tokens whose probability is at least *p* times the top token's | Works well at higher temperatures. Popular in local tools |
| Typical sampling, XTC, DRY and others | Various | Mostly found in local runtimes. Useful for creative writing, rarely needed otherwise |

Samplers are applied as a chain, and the order matters. [[local/llama-cpp|llama.cpp]] lets you set the order with `--samplers`.

## Repetition penalties

**Repetition**, **frequency** and **presence** penalties lower the scores of tokens that have already appeared. They reduce loops in small models, but they also penalise words that should repeat, such as variable names in code. Modern instruction-tuned models usually need little or none.

## Constrained decoding

A sampler can be forced to follow a grammar. Any token that would break the grammar gets its probability set to zero. This guarantees valid JSON or output matching a schema, and it is how "structured output" and reliable tool calling are often implemented. llama.cpp supports grammars in its GBNF format and JSON schemas. Other runtimes use libraries such as Outlines or XGrammar.

## Seeds and determinism

With a fixed **seed**, sampling is repeatable on the same software and hardware. In practice, batching and the order of floating-point operations on a graphics card can still change results slightly between runs, so do not count on bit-for-bit repeatability across machines.

## Beam search and speculative decoding

- **Beam search** keeps several candidate continuations and picks the best overall. It suits translation and is rarely used for chat.
- **Speculative decoding** uses a small, fast draft model to guess several tokens, which the large model then checks in one pass. The output follows the large model's distribution exactly. It is a speed technique, not a sampler. See [[local/performance#Speculative decoding|Performance tuning]].

## See also

- [[fundamentals/kv-cache|The KV cache and context length]], next on the reading path
