# GPTQ

GPTQ quantizes a layer's weights one column at a time and, after each column, nudges the not-yet-quantized weights to cancel the error it just made, using second-order information from a little calibration data.

## Background

GPTQ (Frantar, Ashkboos, Hoefler and Alistarh, October 2022) was the first method to quantize models with over 100 billion parameters to 3 and 4 bits with modest loss, and it did it in a few GPU-hours. It made 4-bit GPU inference common in 2023, well before GGUF k-quants with importance matrices caught up.

It builds on **Optimal Brain Surgeon** and **Optimal Brain Quantization**, older methods for pruning and quantizing networks that use the curvature of the loss to decide how to compensate for each change.

## The idea

For one linear layer with weights *W* and calibration inputs *X*, the goal is to find quantized weights *Ŵ* that make *Ŵ X* as close as possible to *W X*. The error depends on *X*: weights that multiply large or correlated inputs matter more. That dependence is captured by the matrix *H* = 2 *X Xᵀ*, a Hessian of the layer's squared error.

The algorithm:

1. Run calibration text (often 128 samples of 2,048 tokens) through the model and record each layer's inputs.
2. For each layer, compute *H* and its inverse (with a small damping term added for stability).
3. Go through the weight columns in order. Round the current column to the quantization grid.
4. Spread that column's rounding error onto the columns not yet quantized, in proportion to the inverse Hessian, so the layer's output stays as close as possible.
5. Repeat until all columns are done. Process columns in blocks, with lazy batch updates, to keep it fast on a GPU.

Because errors are compensated rather than ignored, the result is much better than rounding each weight to its nearest level.

## Settings you will see

| Setting | Typical value | Meaning |
| --- | --- | --- |
| Bits | 4 (sometimes 3 or 8) | Bits per stored weight |
| Group size | 128 | Weights per scale. Smaller is more accurate and larger. `-1` means one scale per column |
| Act order (`desc_act`) | True for accuracy | Quantize columns in order of decreasing importance, so the most important ones get the most compensation |
| Damping | 0.01 | Stability term for the Hessian inverse |
| Symmetric | Usually true | Whether a zero point is stored |

## Using GPTQ models

GPTQ files are Hugging Face-style folders of `safetensors` with a quantization config. They run on GPUs through:

- **vLLM** and **SGLang**, with fast kernels such as Marlin for 4-bit,
- **Hugging Face Transformers**, through the GPTQModel library (successor to AutoGPTQ),
- **ExLlamaV2**, which can load GPTQ as well as its own EXL2.

llama.cpp does not run GPTQ files. GGUF files are made from the original 16-bit weights instead.

## Strengths and weaknesses

- **Strengths:** good quality at 4 bits, fast GPU kernels, widely supported by servers.
- **Weaknesses:** quality depends on the calibration data, and a model calibrated only on English web text can degrade more on code or other languages. At 3 bits and below, newer methods do better.

The same error-correcting idea reappears elsewhere: ExLlamaV2's EXL2 format is built on GPTQ-style optimization with mixed bit widths.

## See also

- [[quantization/awq|AWQ]], next on the reading path
- [[quantization/how-it-works#Round to nearest is not optimal|Why rounding to nearest is not optimal]]
