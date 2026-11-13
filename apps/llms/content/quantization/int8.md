# 8-bit quantization

At 8 bits, weights can be stored with almost no measurable loss, and the hard part, which LLM.int8() and SmoothQuant solved in 2022, is quantizing the activations as well despite their outliers.

## Weights only: nearly free

With 256 levels per block, the rounding error on weights is tiny. llama.cpp's `Q8_0` (blocks of 32 with one 16-bit scale, 8.5 bits per weight) is, by [[quantization/measuring-quality|perplexity and KL divergence]], almost indistinguishable from the 16-bit original for nearly every model. If it fits, it is the safe choice. In practice most people prefer a larger model at 4 to 6 bits.

## LLM.int8()

Tim Dettmers and colleagues (August 2022) set out to multiply both weights and activations in int8, to halve memory for inference of models such as OPT-175B. They found that naive int8 worked up to about 6.7B parameters and then collapsed.

The cause was **emergent outlier features**: a few hidden dimensions with very large values in almost every token. Scaling a whole row of activations to fit those values crushed all the others to zero.

Their solution, **mixed-precision decomposition**:

1. Find the activation columns with values above a threshold (6.0 by default). These are roughly 0.1 percent of values.
2. Multiply those columns in 16-bit.
3. Multiply everything else in int8, with **vector-wise** scales (one per row of activations and one per column of weights).
4. Add the results.

This kept full quality at 175B. It is implemented in the bitsandbytes library as `load_in_8bit`. It saved memory but was often slower than 16-bit, because splitting each multiplication has overhead.

## SmoothQuant

Xiao and others (November 2022) took a different route for fast W8A8 (8-bit weights and activations) inference. Activations have outliers in a few channels and weights do not, so they **migrate** the difficulty: divide each activation channel by a factor and multiply the matching weight row by the same factor. The product is unchanged:

```
Y = X W = (X diag(s)⁻¹) (diag(s) W)
```

The factors are chosen from calibration data so that both the smoothed activations and the adjusted weights are easy to quantize. The division can be folded into the previous layer's normalization, so it costs nothing at run time. With both sides in int8, the multiplication runs on fast int8 hardware.

## FP8

On hardware that supports it (Nvidia Hopper and later, recent AMD accelerators), **FP8** has become the common 8-bit format for serving: its exponent gives more range, so outliers need less special handling, and scales per tensor or per channel are often enough. Some large models, such as DeepSeek-V3, were trained partly in FP8 and are released in it. vLLM and SGLang serve FP8 directly.

## Where 8 bits fits today

| Use | Common choice |
| --- | --- |
| Local, weights only, maximum fidelity | GGUF `Q8_0` |
| KV cache, to halve its memory | `q8_0` cache. See [[quantization/kv-cache\|Quantizing the KV cache]] |
| Data-center serving on recent cards | FP8 weights and activations |
| Older cards, W8A8 serving | SmoothQuant-style int8 |

## See also

- [[quantization/gptq|GPTQ]], next on the reading path
