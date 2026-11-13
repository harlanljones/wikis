# How quantization works

Quantization splits the weights into small blocks, finds a scale for each block that maps its range onto a handful of integer levels, rounds every weight to the nearest level, and stores the integers plus the scale.

## The basic recipe

Take a block of weights, say 32 of them, ranging from −0.12 to 0.09.

**Symmetric quantization** to 4 bits (levels −8 to 7):

1. Find the largest absolute value: 0.12.
2. Set the scale *s* = 0.12 ÷ 7 ≈ 0.0171.
3. Store each weight *w* as *q* = round(*w* ÷ *s*), a whole number from −8 to 7.
4. To use it, compute *w* ≈ *q* × *s*.

**Asymmetric quantization** adds a **zero point** or minimum, so the levels cover exactly −0.12 to 0.09 rather than −0.12 to 0.12, wasting fewer levels. It costs one more stored number per block.

The rounding error is at most half a step. With 16 levels over a range of 0.21, a step is about 0.014, so each weight is off by up to about 0.007.

## Why blocks

One scale for a whole matrix would let a single large weight stretch the range and crush every small weight into the same few levels. Smaller blocks adapt to local ranges.

| Granularity | Scale per | Overhead | Quality |
| --- | --- | --- | --- |
| Per tensor | Whole matrix | Negligible | Poor at 4 bits |
| Per channel | Row or column | Small | Fine at 8 bits |
| Per group | Every 32 to 128 weights | 0.1 to 0.5 bits per weight | Standard for 4 bits and below |

[[quantization/k-quants|k-quants]] use a two-level scheme: super-blocks of 256 weights with a 16-bit scale, divided into sub-blocks whose own scales are themselves quantized to 6 or 8 bits, which keeps the overhead small.

## Outliers

Transformer weights are mostly well behaved, but **activations** (the numbers flowing through the network) are not. In models above a few billion parameters, a small number of hidden dimensions carry values 10 to 100 times larger than the rest, consistently across tokens. Some "massive activations" serve as fixed biases or attention sinks.

Outliers are the central problem of quantization:

- For **weight-only** quantization (what local tools use), the activations stay at 16 bits, so outliers in them do not need quantizing. But weights that multiply large activations matter more, and rounding them carelessly does disproportionate harm. [[quantization/awq|AWQ]] and the [[quantization/k-quants#The importance matrix|importance matrix]] exist for this reason.
- For **weight and activation** quantization (W8A8, W4A4, used in data-center serving for faster arithmetic), outliers must be handled directly: kept at higher precision ([[quantization/int8|LLM.int8()]]), moved into the weights ([[quantization/int8#SmoothQuant|SmoothQuant]]), or spread out by rotating the space (QuaRot, SpinQuant).

## Round to nearest is not optimal

Rounding each weight independently to its nearest level minimizes each weight's error, but not the error of the layer's **output**, which is what matters. Errors in different weights can add up or cancel. Better methods choose roundings together:

- [[quantization/gptq|GPTQ]] rounds weights one column at a time and adjusts the remaining ones to cancel the error so far.
- [[quantization/awq|AWQ]] rescales channels before rounding so the important ones lose less.
- Codebook methods choose groups of weights jointly from a table.

All of these use a little **calibration data**: a few hundred samples of ordinary text, run through the model to see which inputs each layer actually gets.

## What is not quantized

Most schemes keep some tensors at higher precision: normalization weights (tiny and sensitive), often the embeddings and output layer, and sometimes the first and last few layers. MoE router weights are usually kept at high precision too.

## See also

- [[quantization/int8|8-bit quantization]], next on the reading path
