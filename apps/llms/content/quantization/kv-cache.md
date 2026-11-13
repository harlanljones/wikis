# Quantizing the KV cache

The KV cache can be stored at 8 bits for half the memory with almost no loss, or at 4 bits for a quarter with some loss, which matters most for long contexts where the cache rivals the weights in size.

## Why bother

At long contexts the [[fundamentals/kv-cache|KV cache]] dominates. A Llama 3.1 8B model at `Q4_K_M` is about 4.9 GB, while its 16-bit cache at 128K tokens is about 16 GB. Quantizing the cache to 8 bits saves 8 GB, more than the model itself.

## In llama.cpp

```sh
llama-server -m model.gguf -ngl 99 -c 65536 -fa on --cache-type-k q8_0 --cache-type-v q8_0
```

- Types include `f16` (default), `q8_0`, `q5_1`, `q5_0`, `q4_1`, `q4_0` and others.
- A quantized **V** cache requires flash attention (`-fa on`).
- Keys tend to be more sensitive than values, so `--cache-type-k q8_0 --cache-type-v q4_0` is a reasonable compromise if memory is tight.

In [[local/ollama|Ollama]], set `OLLAMA_FLASH_ATTENTION=1` and `OLLAMA_KV_CACHE_TYPE=q8_0` on the server.

## How much quality it costs

| Cache type | Memory against f16 | Typical effect |
| --- | --- | --- |
| `q8_0` | about 53% | Hard to measure. A sensible default for long contexts |
| `q5_1`, `q5_0` | about 34 to 38% | Small loss |
| `q4_0` | about 28% | Measurable loss on some models, especially for long-range retrieval |

These are general findings from community measurements, not guarantees. Models with few KV heads (aggressive [[fundamentals/attention#Sharing keys and values: MQA, GQA and MLA|GQA]]) pack more into each cached value and can be more sensitive. Test on your own long-context tasks.

## Research methods

Keys have outlier channels, much like activations. Methods such as KIVI (keys quantized per channel, values per token) and KVQuant reach 2 to 3 bits with modest loss, and newer methods quantize keys after rotating them. Serving engines such as vLLM support FP8 caches on hardware that has FP8.

A different way to shrink the cache is architectural: [[fundamentals/attention#Sharing keys and values: MQA, GQA and MLA|MLA]], sliding-window layers and hybrid models with linear-attention layers all store less per token to begin with.

## See also

- [[quantization/measuring-quality|Measuring quality]], next on the reading path
