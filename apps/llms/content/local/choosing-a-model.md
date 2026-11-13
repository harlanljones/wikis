# Choosing a model

Pick the largest good model whose 4-bit file fits in your fast memory with a few gigabytes to spare, prefer a recent generation over an older larger one, and check the licence before you build anything on it.

## The order of decisions

1. **Memory.** Work out your budget with the [[local/hardware#Memory calculator|memory calculator]].
2. **Task.** General chat, coding, reasoning, a language other than English, vision, or tool use. Some families are much better at some of these.
3. **Dense or mixture of experts.** If you have lots of system RAM but a modest card, a [[fundamentals/mixture-of-experts|MoE]] model with a small active count can be far faster than a dense model of the same size.
4. **Size, then quantization.** A larger model at about 4.5 bits usually beats a smaller one at 8 bits in the same memory. Below about 3.5 bits, quality falls faster. See [[quantization/choosing|Choosing a quantization]].
5. **Recency.** A good 8B model from 2026 typically beats a 13B model from 2023 by a wide margin. Training data and methods improve quickly.

## Families to know

These are the open-weight families most used for local inference through 2025 and into 2026. Each publishes several sizes, and new versions appear every few months, so check for the latest generation of each.

| Family | Maker | Notes |
| --- | --- | --- |
| Qwen (Qwen2.5, Qwen3 and later) | Alibaba | Wide range of sizes from under 1B to large MoE models. Strong at coding, maths and many languages. Mostly Apache 2.0 |
| Llama (Llama 3.x, Llama 4) | Meta | Llama 3.1 and 3.3 were standard choices through 2024. Custom community licence with conditions |
| Gemma (Gemma 2, Gemma 3 and later) | Google | Small to mid-size, good multilingual and vision support. Gemma licence with use terms |
| Mistral (Mistral, Mistral Small, Magistral, Devstral) | Mistral AI | Efficient mid-size models. Many under Apache 2.0 |
| DeepSeek (V3, R1 and later) | DeepSeek | Very large MoE models, MIT licensed, too large for most home setups at full size. The small "R1 distill" models are Qwen and Llama models trained on R1's output. See [[training/distillation\|Distillation]] |
| gpt-oss (20b, 120b) | OpenAI | MoE reasoning models released in August 2025 under Apache 2.0, shipped natively in [[quantization/other-methods#Microscaling formats: MXFP4 and NVFP4\|MXFP4]] |
| Phi | Microsoft | Small models trained heavily on synthetic data. MIT licence |
| Granite | IBM | Business-oriented, Apache 2.0, including small hybrid models |
| OLMo | AI2 | Fully open: data, code and checkpoints published |
| GLM, Kimi, MiniMax | Zhipu, Moonshot, MiniMax | Large MoE models that compete with the strongest open models. Mostly beyond single-card setups |

This table was drafted from general knowledge as of mid-2026 and lightly checked against public roundups in November 2026. It will go out of date. See [[about|About this wiki]].

## Variants of the same model

- **Base** versus **Instruct** or **Chat:** for an assistant, use instruct.
- **Thinking** or **reasoning** variants spend tokens on a chain of thought. Better for maths and code, slower for chat. See [[training/reasoning|Reasoning models]].
- **Coder** variants are tuned for programming and code completion.
- **Vision** or **VL** models accept images. In llama.cpp they need a second file, the projector (`mmproj`).
- **Abliterated** or **uncensored** community variants have had refusal behaviour removed, often by [[interpretability/steering#Refusal direction and abliteration|directional ablation]]. They can be less capable and less reliable.

## Licences

| Licence | Typical conditions |
| --- | --- |
| Apache 2.0, MIT | Use, modify and redistribute, including commercially, with attribution |
| Llama community licence | Commercial use allowed below a very large user threshold, naming and attribution rules, acceptable-use policy |
| Gemma terms | Commercial use allowed, with a prohibited-use policy |
| Research or non-commercial licences | No commercial use |

Read the actual licence for anything beyond personal use.

## See also

- [[local/performance|Performance tuning]], next on the reading path
- [[training/evaluation#Testing a model for your own use|Testing a model for your own use]]
