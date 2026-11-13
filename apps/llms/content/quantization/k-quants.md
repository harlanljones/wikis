# k-quants and i-quants

The k-quants are llama.cpp's family of block quantization types (Q2_K to Q6_K, in S, M and L mixes), i-quants are a newer family (IQ1 to IQ4) that use lattice codebooks to do better at low bit widths, and both improve with an importance matrix.

## The legacy types

llama.cpp's first types quantize blocks of 32 weights:

| Type | Stores | Bits per weight |
| --- | --- | --- |
| `Q4_0` | 4-bit values, one 16-bit scale | 4.5 |
| `Q4_1` | 4-bit values, a scale and a minimum | 5.0 |
| `Q5_0` | 5-bit values, one scale | 5.5 |
| `Q5_1` | 5-bit values, a scale and a minimum | 6.0 |
| `Q8_0` | 8-bit values, one scale | 8.5 |

`Q8_0` is still widely used. `Q4_0` survives because its simple layout has fast kernels on some processors and phones, and because some quantization-aware training targets it (see [[quantization/other-methods#Quantization-aware training|Gemma 3 QAT]]).

## k-quants

Introduced by Iwan Kawrakow in June 2023, k-quants use **super-blocks** of 256 weights divided into sub-blocks of 16 or 32. Each sub-block has its own scale (and for some types a minimum), and those scales are themselves quantized to 4 to 8 bits against a 16-bit super-block scale. This gives fine-grained scales at low overhead.

| Base type | Bits per weight |
| --- | --- |
| `Q2_K` | 2.5625 (about 2.6) |
| `Q3_K` | 3.4375 |
| `Q4_K` | 4.5 |
| `Q5_K` | 5.5 |
| `Q6_K` | 6.5625 |

## What S, M and L mean

A file type such as `Q4_K_M` is a **recipe** that assigns different base types to different tensors:

- **S (small):** mostly the base type throughout.
- **M (medium):** sensitive tensors, such as the attention value projection and the MLP down projection in some layers, get a larger type (for `Q4_K_M`, some of them `Q6_K`).
- **L (large):** more tensors upgraded, where offered (`Q3_K_L`).

The output layer is usually kept at `Q6_K` or higher. That is why a `Q4_K_M` file averages about 4.8 to 4.9 bits per weight. The exact rules depend on the architecture and are in `llama-quant.cpp` in the llama.cpp source.

## I-quants

From early 2024, Kawrakow added the **IQ** types, inspired by QuIP#. Instead of rounding each weight to an even grid, they quantize groups of 8 weights at once to the nearest point in a **codebook** built from a lattice (the E8 lattice for several types), which packs points more efficiently in many dimensions than a square grid.

| Type | Bits per weight | Notes |
| --- | --- | --- |
| `IQ1_S`, `IQ1_M` | about 1.56 and 1.75 | Last resort for very large models |
| `IQ2_XXS`, `IQ2_XS`, `IQ2_S`, `IQ2_M` | about 2.06 to 2.7 | Usable for very large models, noticeably degraded on small ones |
| `IQ3_XXS`, `IQ3_S`, `IQ3_M` | about 3.06 to 3.7 | Often better than `Q3_K` at the same size |
| `IQ4_XS` | 4.25 | Close to `Q4_K_S` quality, a little smaller |
| `IQ4_NL` | 4.5 | Non-linear 4-bit levels in blocks of 32 |

I-quants need an importance matrix to be any good below 4 bits. They are slower than k-quants on some processors and older GPU backends, because decoding a codebook takes more work, but on CUDA and Metal the difference is usually small.

## The importance matrix

An **imatrix** is a set of statistics from running sample text through the full-precision model: for each weight column, how large its input activations typically are. During quantization, rounding errors are **weighted** by these values, so the weights that matter most to the output are rounded most carefully. It is the GGUF counterpart of the activation-awareness in [[quantization/awq|AWQ]].

```sh
llama-imatrix -m model-f16.gguf -f calibration.txt -o imatrix.dat --chunks 200
llama-quantize --imatrix imatrix.dat model-f16.gguf model-IQ3_M.gguf IQ3_M
```

It helps at every size and matters most at 4 bits and below. Calibration text is usually a mix of general prose, code and several languages. There has been long debate in the community about the best calibration set. A broad mix is the safe default.

## Dynamic and custom recipes

Beyond the built-in mixes, some uploaders choose types tensor by tensor, measured for each model. Unsloth's "dynamic" GGUFs and many large-MoE releases keep attention and shared layers at 6 to 8 bits while squeezing the experts to 2 or 3 bits. `llama-quantize` accepts `--tensor-type` overrides for this.

## See also

- [[quantization/other-methods|Other methods]], next on the reading path
- [[local/gguf|GGUF]]
