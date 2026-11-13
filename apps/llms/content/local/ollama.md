# Ollama

Ollama downloads, stores and runs models with one command, keeps a background service with an API, and hides most of the settings, which makes it the easiest way to start and occasionally confusing once you need control.

## Getting started

Install from ollama.com (macOS, Windows and Linux), then:

```sh
ollama run gemma3:4b         # download if needed, then chat
ollama pull qwen3:8b         # download only
ollama list                  # what is installed
ollama ps                    # what is loaded, and how much is on the GPU
ollama rm gemma3:4b          # delete
```

Model names follow `name:tag`. The tag usually picks a size, and sometimes a quantization, such as `:8b`, `:8b-q8_0`. Without a tag you get the library's default, typically a 4-bit quantization.

You can also run any GGUF file on Hugging Face directly:

```sh
ollama run hf.co/bartowski/SomeModel-GGUF:Q4_K_M
```

## How it relates to llama.cpp

Ollama is a Go program that manages models and serves an API. For running them it has relied on llama.cpp's ggml library, at first by bundling llama.cpp itself and, since 2025, increasingly through its own model implementations on top of ggml. On Apple silicon it has added an MLX-based path as well. The practical upshot: Ollama gets new model architectures and new features on its own schedule, sometimes ahead of and sometimes behind [[local/llama-cpp|llama.cpp]].

## The context length trap

Ollama's default context length is much smaller than most models support. Long documents are silently cut off from the start, and the model seems to forget instructions. Set it:

- for one session, inside `ollama run`: `/set parameter num_ctx 16384`,
- for every model, with the environment variable `OLLAMA_CONTEXT_LENGTH=16384` on the server,
- per request, with `"options": {"num_ctx": 16384}` in the API,
- or permanently in a Modelfile (below).

Then check `ollama ps`. If the PROCESSOR column shows a split such as "30%/70% CPU/GPU", the model plus its cache no longer fits on the card, and generation will be several times slower.

## Modelfiles

A Modelfile defines a model variant, much like a Dockerfile:

```
FROM qwen3:8b
PARAMETER num_ctx 16384
PARAMETER temperature 0.6
SYSTEM """You are a concise assistant for a hardware shop."""
```

```sh
ollama create shop-assistant -f Modelfile
ollama run shop-assistant
```

`FROM` can also point at a local GGUF file, or a folder of Hugging Face weights to import.

## Useful server settings

Set these as environment variables for the Ollama service:

| Variable | Effect |
| --- | --- |
| `OLLAMA_HOST` | Address to listen on, such as `0.0.0.0:11434` to allow other machines. Only do this on a trusted network |
| `OLLAMA_CONTEXT_LENGTH` | Default context length |
| `OLLAMA_FLASH_ATTENTION=1` | Turn on flash attention |
| `OLLAMA_KV_CACHE_TYPE` | `q8_0` or `q4_0` to [[quantization/kv-cache\|quantize the KV cache]]. Needs flash attention |
| `OLLAMA_KEEP_ALIVE` | How long a model stays loaded after use, such as `30m` or `-1` for always |
| `OLLAMA_MODELS` | Where models are stored |

## The API

The service listens on `http://localhost:11434`. It has its own API (`/api/chat`, `/api/generate`, `/api/embed`) and an OpenAI-compatible one under `/v1`, so most tools that speak to OpenAI can use a local model by changing the base URL.

## When to move to something else

- You want an exact quantization, sampler or option that Ollama does not expose: use [[local/llama-cpp|llama.cpp]] directly.
- You want a window to browse and try models: [[local/other-tools#LM Studio|LM Studio]].
- You are serving many users: [[local/serving|vLLM or SGLang]].

## See also

- [[local/other-tools|Other tools]], next on the reading path
