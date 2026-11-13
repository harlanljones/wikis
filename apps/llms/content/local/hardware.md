# Hardware and memory

The model must fit in fast memory, and once it does, generation speed is set almost entirely by how fast that memory can be read, so capacity and bandwidth are the two numbers that matter.

## The two rules

1. **Capacity decides what you can run.** The weights, the [[fundamentals/kv-cache|KV cache]] and some working buffers must all fit in the graphics card's VRAM, or in the unified memory of a Mac or shared-memory PC. Whatever does not fit runs from slower system memory, or does not run.
2. **Bandwidth decides how fast it generates.** To produce each token, the model reads every active weight once. So:

```
tokens per second ≈ memory bandwidth ÷ bytes read per token
```

A 4.9 GB file (an 8B model at `Q4_K_M`) on a card with 1,000 GB/s of bandwidth has a ceiling of about 200 tokens per second. Real speeds reach roughly 60 to 80 percent of that ceiling. On dual-channel DDR5 system memory at about 90 GB/s, the same file tops out near 18 tokens per second.

Prompt processing (prefill) is different: it is limited by arithmetic, which is why graphics cards are many times faster than processors at reading long documents even when generation speeds are closer.

For a [[fundamentals/mixture-of-experts|mixture-of-experts]] model, "bytes read per token" counts only the active parameters, which is why those models are fast for their size.

## Memory calculator

Fill in the model's numbers and the context you want. Layer count, KV heads and head size are in the model's `config.json` on Hugging Face, or in the model card. The defaults are Llama 3.1 8B.

<div data-memory-calculator></div>

The estimate assumes the whole model and cache are on one device. It does not cover models whose attention is unusual: sliding-window layers (Gemma 2 and 3) need less cache than this shows, and multi-head latent attention (DeepSeek-V3 and R1) needs much less.

| Model | Layers | KV heads | Head size |
| --- | --- | --- | --- |
| Llama 3.1 8B | 32 | 8 | 128 |
| Llama 3.1 and 3.3 70B | 80 | 8 | 128 |
| Mistral 7B | 32 | 8 | 128 |
| Qwen 2.5 7B | 28 | 4 | 128 |
| Qwen3 32B | 64 | 8 | 128 |

## Rules of thumb

- **Weights at about 4.5 to 5 bits** take roughly 0.6 GB per billion parameters. An 8B model is about 5 GB, a 32B model about 19 GB, a 70B model about 42 GB.
- **At 8 bits** it is about 1.06 GB per billion. **At 16 bits**, 2 GB per billion.
- **Leave 10 to 20 percent free** for the display, the driver and spikes.

## Options compared

| Hardware | Fast memory | Bandwidth (GB/s) | Notes |
| --- | --- | --- | --- |
| Processor with dual-channel DDR5 | System RAM | about 80 to 100 | Works for small models and MoE experts. Slow for large dense models |
| RTX 3060 12 GB | 12 GB | 360 | The cheapest sensible entry point |
| RTX 4060 Ti 16 GB | 16 GB | 288 | Capacity is good, bandwidth is low |
| RTX 3090 (used) | 24 GB | 936 | The long-running enthusiast favourite for its VRAM per pound |
| RTX 4090 | 24 GB | 1,008 | Fast, and as of 2026 often sold used |
| RTX 5090 | 32 GB | 1,792 | The fastest consumer card. Expensive and scarce in 2026 |
| Radeon RX 7900 XTX | 24 GB | 960 | Good with llama.cpp through ROCm or Vulkan. Less broad software support |
| Mac with M4 Pro | up to 64 GB | 273 | Unified memory, quiet, modest speed |
| Mac with M4 Max | up to 128 GB | up to 546 | Runs 70B dense models and large MoE models |
| Mac Studio with M3 Ultra | up to 512 GB | 819 | Can hold the largest open MoE models at low bit widths |
| Ryzen AI Max+ 395 mini PCs and laptops | up to 128 GB shared | about 256 | Large capacity, mid bandwidth, for MoE models |
| Nvidia DGX Spark | 128 GB unified | 273 | Small Nvidia box with full CUDA software, aimed at developers |

Figures are manufacturer specifications as best known when written. Check the current specification before buying.

## Nvidia, AMD, Intel and Apple

- **Nvidia (CUDA)** has the widest support. Every tool works first and best here.
- **AMD (ROCm, or Vulkan)** works well with [[local/llama-cpp|llama.cpp]] and [[local/ollama|Ollama]]. Python training tools and some fast serving engines lag behind.
- **Intel Arc** offers cheap VRAM. llama.cpp runs through SYCL or Vulkan, with the least mature support of the three.
- **Apple silicon** runs llama.cpp through Metal and Apple's own [[local/other-tools#MLX|MLX]]. The big advantage is capacity: no consumer graphics card offers 128 GB.

## More than one card

llama.cpp can split a model's layers across cards. Two 24 GB cards hold models that need about 44 GB. Splitting by layer does not make a single conversation faster, because the cards take turns, but it lets a bigger model fit. [[local/serving|vLLM]] can split each layer across cards (tensor parallelism), which does speed up generation, given a fast link between cards.

## What else matters

- **System RAM:** at least as much as your VRAM, ideally double, for loading and for any layers that spill over. 64 GB or more if you plan to run MoE models with experts in RAM.
- **Storage:** models are 2 GB to well over 100 GB. A fast NVMe drive cuts load times.
- **Power and cooling:** inference holds a card at high load for long stretches.
- **NPUs** in "AI PC" laptops are built for small background features, not for running large language models at speed. Look at memory instead.

## See also

- [[local/gguf|GGUF]], next on the reading path
- [[quantization/choosing|Choosing a quantization]]
