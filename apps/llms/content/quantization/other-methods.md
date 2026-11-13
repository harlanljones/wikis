# Other quantization methods

Beyond GPTQ, AWQ and GGUF types there is a zoo of methods, from simple on-the-fly formats for fine-tuning to codebook schemes that reach 2 bits, hardware formats such as MXFP4, and models trained from the start to live in low precision.

## bitsandbytes and NF4

The bitsandbytes library, by Tim Dettmers, quantizes Hugging Face models as they load, with no separate file: 8-bit with [[quantization/int8|LLM.int8()]] or 4-bit with **NF4** or FP4, in blocks of 64. NF4 is the format used by [[training/lora#QLoRA|QLoRA]]. It is the standard way to fine-tune on a 4-bit base. For inference it is convenient but slower and somewhat lower quality than GPTQ, AWQ or GGUF at the same size.

## HQQ

Half-Quadratic Quantization (Mobius Labs, 2023) needs **no calibration data**. It optimizes each block's scale and zero point directly to minimize weight error, using a robust loss that tolerates outliers. It quantizes a 70B model in minutes and is useful when you want to quantize quickly or avoid calibration bias.

## EXL2 and EXL3

ExLlamaV2's **EXL2** format measures each layer's sensitivity, then assigns bit widths (from 2 to 8) layer by layer and within layers to hit any target average, such as 4.25 or 5.5 bits. It uses GPTQ-style error correction. This lets you fill a graphics card exactly.

**EXL3**, from ExLlamaV3 (2025), is based on **QTIP**, a trellis-coded quantization method from the same group as QuIP#. It encodes long runs of weights through a small state machine and gets better quality per bit than EXL2, especially at 2 to 3 bits. See [[local/other-tools#ExLlamaV2 and ExLlamaV3|Other tools]].

## QuIP# and AQLM

Two 2024 research methods that made 2-bit models usable:

- **QuIP#** first multiplies weights by random Hadamard matrices, which spreads outliers evenly ("incoherence processing"), then quantizes groups of 8 weights to an E8 lattice codebook. llama.cpp's [[quantization/k-quants#I-quants|i-quants]] borrow the lattice idea.
- **AQLM** (additive quantization) represents each group of weights as the **sum** of entries from several learned codebooks, and fine-tunes the codebooks. It held the quality record at 2 bits for a time, at the cost of slow quantization.

## Rotation methods for W4A4

To quantize **activations** to 4 bits as well, QuaRot and SpinQuant (2024) rotate the hidden space with orthogonal matrices so that no single dimension carries an outlier. The rotation can be folded into the weights. These matter for data-center serving with 4-bit arithmetic, not for local weight-only use.

## Microscaling formats: MXFP4 and NVFP4

Hardware formats that pair tiny floating-point values with a shared scale per small block:

| Format | Block | Value | Scale | Bits per weight |
| --- | --- | --- | --- | --- |
| MXFP4 (OCP Microscaling standard, 2023) | 32 values | FP4 E2M1 | 8-bit power of two (E8M0) | 4.25 |
| NVFP4 (Nvidia, Blackwell) | 16 values | FP4 E2M1 | FP8 E4M3, plus one FP32 per tensor | about 4.5 |

OpenAI released **gpt-oss** (August 2025) with its MoE weights already in MXFP4, having trained it to be used that way, so the 120b model fits on one 80 GB card and the 20b model in about 16 GB. llama.cpp added an `MXFP4` GGUF type for it. Blackwell cards (data-center and RTX 50 series) run FP4 arithmetic natively.

## Quantization-aware training

**Post-training** quantization is applied to a finished model. **Quantization-aware training** (QAT) simulates the quantization during training (or a final stretch of it), so the model learns weights that survive rounding.

- **Gemma 3 QAT** (Google, April 2025) checkpoints were trained for `Q4_0`, and are much closer to the 16-bit model than an ordinary 4-bit file.
- **gpt-oss** was post-trained with its MXFP4 format in place.
- Several labs have reported QAT for 4-bit releases of their models since.

When a model maker offers an official QAT file, prefer it at that bit width.

## BitNet and ternary models

**BitNet b1.58** (Microsoft Research, February 2024) trains models whose weights are only −1, 0 or +1 (log₂ 3 ≈ 1.58 bits), with 8-bit activations. Multiplications become additions and subtractions. Microsoft released a 2B-parameter model trained on 4 trillion tokens in this format in April 2025, with an inference library, `bitnet.cpp`. Ternary models must be trained that way from the start. Quantizing an ordinary model to 1.58 bits after training destroys it.

## Pruning and sparsity

A different way to shrink a model is to remove weights. **2:4 sparsity** (two zeros in every four weights) has hardware support on Nvidia cards. SparseGPT and Wanda prune large models in one shot. Pruning stacks with quantization but is much less used locally.

## See also

- [[quantization/kv-cache|Quantizing the KV cache]], next on the reading path
