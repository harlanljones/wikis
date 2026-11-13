# Serving models

To share a local model with other programs or people, run it as a server with an OpenAI-compatible API, and if many requests arrive at once, use an engine built for batching such as vLLM or SGLang.

## One user, many programs

Both [[local/llama-cpp|llama-server]] and [[local/ollama|Ollama]] expose an OpenAI-compatible API. Code editors, chat front ends such as Open WebUI, and your own scripts can all use it by setting a base URL:

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8080/v1", api_key="not-needed")
reply = client.chat.completions.create(
    model="local",
    messages=[{"role": "user", "content": "Explain the KV cache in one sentence."}],
)
print(reply.choices[0].message.content)
```

Most servers also support streaming, tool calling (if the model and chat template do), JSON-schema-constrained output, and embeddings.

## Many users at once

A single conversation leaves a graphics card mostly idle: [[fundamentals/kv-cache|decoding]] reads all the weights to produce one token. Running many conversations at once reads the weights once for all of them, so total throughput rises almost linearly until arithmetic becomes the limit. This is the core economics of serving.

### Continuous batching

Instead of waiting for a whole batch of requests to finish, the server adds and removes conversations at every step. A short request does not wait for a long one. vLLM, SGLang, TGI and llama-server (with `-np` parallel slots) all do this.

### Paged attention

vLLM's PagedAttention (2023) stores the KV cache in small fixed-size blocks, like pages of virtual memory, so that memory is allocated as conversations grow rather than reserved for the maximum length. It nearly eliminates wasted cache memory and allows sharing blocks between requests with the same prefix.

### Prefix caching

Requests that share a beginning, such as a long system prompt or a document, reuse its cached keys and values. SGLang's RadixAttention keeps a tree of cached prefixes for this.

## Choosing a server

| Situation | Choice |
| --- | --- |
| One person, any hardware | llama-server or Ollama |
| A small team on one machine with a good card | llama-server with several slots, or Ollama with `OLLAMA_NUM_PARALLEL` |
| Many users, Nvidia or AMD data-center or workstation cards | vLLM or SGLang |
| Maximum speed on Nvidia, willing to compile per model | TensorRT-LLM |

## Security

A model server is an open door to your hardware. Keep it bound to `localhost` unless you need otherwise, put it behind authentication and a reverse proxy if it must be reachable, and remember that anyone with access can make the model read and write whatever tools you connect to it.

## See also

- [[quantization|Quantization]], the next section on the reading path
