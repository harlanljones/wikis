# The KV cache and context length

To avoid recomputing the whole conversation for every new token, the model keeps each past token's keys and values in memory, and that cache grows with every token until it can rival the size of the model itself.

## Why there is a cache

To generate token 1,001, [[fundamentals/attention|attention]] needs the keys and values of tokens 1 to 1,000 at every layer. Those do not change once computed, because of the causal mask. So they are computed once and stored. Each new token only computes its own query, key and value, attends to the stored ones, and appends its key and value to the store.

This splits generation into two phases:

- **Prefill,** or prompt processing: the whole prompt is run through at once, filling the cache. Many tokens are processed in parallel, so this is limited by arithmetic speed and is fast per token.
- **Decode,** or generation: one token at a time, each reading every weight and the whole cache. This is limited by memory bandwidth.

Runtimes report the two speeds separately, often as "prompt eval" and "eval" tokens per second.

## How big it gets

For each token, the cache holds a key and a value vector for every layer and every KV head:

```
bytes per token = 2 × layers × KV heads × head size × bytes per number
```

| Model (shape) | Per token at 16-bit | 8K context | 32K context | 128K context |
| --- | --- | --- | --- | --- |
| Llama 3.1 8B (32 layers, 8 KV heads, 128) | 128 KB | 1 GB | 4 GB | 16 GB |
| Llama 3.1 70B (80 layers, 8 KV heads, 128) | 320 KB | 2.6 GB | 10.5 GB | 42 GB |
| A 7B model without GQA (32 layers, 32 KV heads, 128) | 512 KB | 4 GB | 16 GB | 64 GB |

The last row is why [[fundamentals/attention#Sharing keys and values: MQA, GQA and MLA|grouped-query attention]] became standard. The [[local/hardware#Memory calculator|memory calculator]] does this sum for any model.

## Context length in practice

- **The cache is allocated up front** in most local runtimes, sized to the context you ask for. Asking for 128K "just in case" can push a model out of graphics memory and make it several times slower.
- **Set the context you need.** In [[local/llama-cpp|llama.cpp]] it is `-c`. In [[local/ollama|Ollama]] it is the `num_ctx` parameter, and its default is much smaller than most models support.
- **The cache can be quantized.** Storing it at 8 bits halves its size with little loss. See [[quantization/kv-cache|Quantizing the KV cache]].
- **When the context is full,** something has to give: the oldest messages are dropped or summarized, or generation stops.

## Prompt caching

If two requests start with the same text (a long system prompt, a document you ask several questions about), the cache from the first can be reused for the second, and prefill for that part is skipped. llama.cpp's server reuses the cache for the shared start of a conversation, and cloud APIs offer prompt caching as a discount for the same reason.

## Serving many users

A server holding hundreds of conversations at once spends most of its memory on KV caches, not weights. Systems such as vLLM manage cache memory in small pages, the way an operating system manages memory, so that conversations of different lengths do not waste space. See [[local/serving|Serving models]].

## See also

- [[fundamentals/mixture-of-experts|Mixture of experts]], next on the reading path
- [[quantization/kv-cache|Quantizing the KV cache]]
