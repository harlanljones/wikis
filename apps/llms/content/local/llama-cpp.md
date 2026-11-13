# llama.cpp

The llama.cpp project is an open-source C and C++ engine for running language models on almost any hardware, and it is the foundation under Ollama, LM Studio and many other local tools.

## Background

Georgi Gerganov released llama.cpp in March 2023, days after Meta's LLaMA weights became available, to run them on a MacBook's processor. It grew into the reference engine for local inference, with its tensor library **ggml**, the [[local/gguf|GGUF]] file format, the [[quantization/k-quants|k-quant]] family of quantization types, and support for CUDA, Metal, Vulkan, ROCm, SYCL and plain processors. The project now lives at `github.com/ggml-org/llama.cpp` and releases new builds many times a week.

## Installing

- **macOS and Linux:** `brew install llama.cpp`.
- **Windows:** `winget install llama.cpp`, or download a release zip for your graphics card from the GitHub releases page.
- **Build from source** for the newest features or an unusual setup:

```sh
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build -DGGML_CUDA=ON      # or -DGGML_VULKAN=ON, -DGGML_HIP=ON; Metal is on by default on a Mac
cmake --build build --config Release -j
```

## Running a model

Chat in the terminal, downloading a model from Hugging Face on first use:

```sh
llama-cli -hf ggml-org/gemma-3-4b-it-GGUF
```

Run a local file with the most common options:

```sh
llama-cli -m model-Q4_K_M.gguf -ngl 99 -c 16384 -fa on --jinja
```

Serve it as an API with a built-in chat page:

```sh
llama-server -m model-Q4_K_M.gguf -ngl 99 -c 16384 -fa on --jinja --port 8080
```

Then open `http://localhost:8080`, or point any OpenAI-compatible client at `http://localhost:8080/v1`.

## The options that matter most

| Option | What it does |
| --- | --- |
| `-m file.gguf` | The model file |
| `-hf user/repo[:quant]` | Download from Hugging Face, such as `-hf bartowski/SomeModel-GGUF:Q4_K_M` |
| `-ngl N` | How many layers to put on the graphics card. A large number such as 99 means all of them |
| `-c N` | Context length in tokens. Sizes the [[fundamentals/kv-cache\|KV cache]] |
| `-fa on` | [[fundamentals/attention#The cost of attention\|Flash attention]]. Faster, and needed for a quantized V cache. Older builds take `-fa` with no value |
| `--cache-type-k`, `--cache-type-v` | Store the KV cache as `q8_0` or `q4_0` to save memory. See [[quantization/kv-cache\|Quantizing the KV cache]] |
| `--jinja` | Use the chat template stored in the GGUF file |
| `-t N` | Processor threads, for any work done on the processor |
| `--n-cpu-moe N` | Keep the experts of the first N layers of a [[fundamentals/mixture-of-experts\|MoE model]] in system memory |
| `-ot pattern=device` | Place tensors by name, the general form of the option above |
| `--temp`, `--top-p`, `--min-p` | [[fundamentals/sampling\|Sampler]] settings |
| `-np N` | Parallel slots in `llama-server`, to serve several requests at once |

Options change between versions. `llama-cli --help` is the reference.

## The other tools

| Program | Use |
| --- | --- |
| `llama-bench` | Measures prompt and generation speed for given settings |
| `llama-quantize` | Converts a GGUF file to another [[quantization\|quantization]] type |
| `llama-imatrix` | Builds an [[quantization/k-quants#The importance matrix\|importance matrix]] |
| `llama-perplexity` | Measures perplexity and KL divergence. See [[quantization/measuring-quality\|Measuring quality]] |
| `llama-gguf-split` | Splits or joins multi-part files |

## Forks and relatives

- **ik_llama.cpp,** a fork by Iwan Kawrakow, the author of the k-quants and i-quants, with newer quantization types and faster processor and hybrid processor-plus-GPU paths, especially for large MoE models.
- **llamafile,** from Mozilla, packages llama.cpp and a model into one executable that runs on most operating systems.
- **KoboldCpp,** a llama.cpp build with a story-writing interface. See [[local/other-tools|Other tools]].

## See also

- [[local/ollama|Ollama]], next on the reading path
- [[local/performance|Performance tuning]]
