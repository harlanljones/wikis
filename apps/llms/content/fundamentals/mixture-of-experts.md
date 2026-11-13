# Mixture of experts

A mixture-of-experts (MoE) model replaces each feed-forward network with many smaller "experts" and a router that sends each token to only a few of them, so the model has a huge number of parameters but uses only a small share for each token.

## How it works

In each MoE layer:

1. A small **router** network scores every expert for the current token.
2. The top few experts (often 2 to 8 out of 8 to 256) are chosen.
3. The token passes through only those experts, and their outputs are combined, weighted by the router's scores.

Attention layers stay shared. Some designs also keep one or two **shared experts** that every token uses. "Expert" is a misleading name: experts do not specialise in neat human topics like "biology" or "French". Their specialisation is usually about token types and patterns that are hard to name.

## Total and active parameters

MoE models are described with two numbers:

- **Total parameters:** everything in the file. This sets how much **memory** you need.
- **Active parameters:** what is used per token. This sets how much **compute and bandwidth** each token costs, and so roughly how fast it runs.

| Model | Total | Active per token |
| --- | --- | --- |
| Mixtral 8x7B (2023) | 47B | 13B |
| DeepSeek-V3 and R1 (2024 to 2025) | 671B | 37B |
| Qwen3-30B-A3B (2025) | 30B | 3B |
| gpt-oss-120b (2025) | 117B | 5.1B |
| gpt-oss-20b (2025) | 21B | 3.6B |

Qwen's naming makes the split explicit: "A3B" means about 3B active.

## Why MoE suits local use in an unexpected way

A dense 30B model and a 30B-total, 3B-active MoE model need about the same memory. But the MoE model reads only a tenth as many weights per token, so on the same hardware it generates several times faster.

Better still, the experts do not all need to be in graphics memory. Each token only touches a few, so a common setup keeps attention and shared layers on the graphics card and the experts in ordinary system memory. A machine with a 24 GB card and 128 GB of system RAM can run a model far larger than the card, at usable speed. In [[local/llama-cpp|llama.cpp]] this is done with `--n-cpu-moe` or with `--override-tensor` patterns. See [[local/performance#Offloading|Performance tuning]].

## The catch

- **Memory.** You still have to hold every expert somewhere.
- **Quality per total parameter** is lower than a dense model of the same total size. A rough folk rule, not a law, puts an MoE model's quality near a dense model the size of the geometric mean of its total and active parameters.
- **Training is harder.** Routers can collapse onto a few experts, so training adds balancing terms to keep load even.
- **Quantization** affects experts and shared layers differently. Good quantized MoE files keep the shared and attention weights at higher precision.

## See also

- [[fundamentals/scaling-laws|Scaling laws]], next on the reading path
- [[local/choosing-a-model|Choosing a model]]
