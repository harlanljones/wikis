# AWQ

AWQ (activation-aware weight quantization) finds the small share of weight channels that multiply large activations and scales them up before quantizing, so they lose less precision, without any retraining or error correction.

## Background

AWQ was published by Ji Lin, Song Han and colleagues at MIT in June 2023 and won a best paper award at MLSys 2024. It is a weight-only method, usually at 4 bits with groups of 128.

## The observation

Not all weights matter equally. The authors found that keeping just **about 1 percent** of weight channels at 16-bit, chosen by the size of the **activations** they multiply (not by the size of the weights themselves), recovered most of the quality lost at 4 bits.

Keeping mixed precision is awkward for hardware, though. So instead of keeping those channels at full precision, AWQ protects them by **scaling**.

## The trick

Multiply a weight channel by a factor *s* greater than one, and divide the matching input activation by *s*. The layer's output is unchanged. But the scaled-up weights now span more of the quantization grid, so their **relative** rounding error shrinks.

The scale for each channel is found by a simple search: try a range of exponents applied to each channel's average activation size, quantize, measure the layer's output error on calibration data, and keep the best. No gradients, no backpropagation, no column-by-column updates as in [[quantization/gptq|GPTQ]].

The activation division is folded into the preceding operation, so inference costs nothing extra.

## AWQ compared with GPTQ

| | AWQ | GPTQ |
| --- | --- | --- |
| Core idea | Rescale important channels before rounding | Correct rounding errors as you go |
| Uses calibration data | Yes, a small amount, mainly to find activation sizes | Yes, for the Hessian |
| Sensitivity to calibration data | Lower: it only needs activation statistics | Higher: it can overfit the calibration set |
| Quality at 4 bits | Similar, often slightly better | Similar |
| Speed of quantizing | Fast | Fast |
| Runs in | vLLM, SGLang, Transformers, TensorRT-LLM, MLC | vLLM, SGLang, Transformers, ExLlamaV2 |

Both are mainly used for GPU serving. For llama.cpp, the equivalent idea lives in the [[quantization/k-quants#The importance matrix|importance matrix]], which also weights rounding error by activation statistics.

## Tools

AWQ models are usually made with the AutoAWQ library or with newer toolkits that cover several methods, such as llm-compressor (from the vLLM project) and NVIDIA's ModelOpt. Many popular models have ready-made AWQ versions on Hugging Face, often labelled `-AWQ`.

## See also

- [[quantization/k-quants|k-quants and i-quants]], next on the reading path
