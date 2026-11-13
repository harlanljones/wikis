# Number formats

A number format decides how many bits a value takes and how they are split between range (how big or small it can be) and precision (how finely it can be told apart), and models have moved from 32-bit floats to 16, 8 and now 4 bits.

## Floating point

A floating-point number has a **sign** bit, **exponent** bits that set its scale, and **mantissa** bits that set its precision within that scale.

| Format | Bits | Exponent | Mantissa | Largest value | Used for |
| --- | --- | --- | --- | --- | --- |
| FP32 | 32 | 8 | 23 | about 3.4 × 10³⁸ | Optimizer state, master weights |
| FP16 | 16 | 5 | 10 | 65,504 | Inference, older training |
| BF16 | 16 | 8 | 7 | about 3.4 × 10³⁸ | Training and the original release of most models |
| FP8 E4M3 | 8 | 4 | 3 | 448 | Inference and training on recent data-center cards |
| FP8 E5M2 | 8 | 5 | 2 | 57,344 | Gradients in FP8 training |
| FP4 E2M1 | 4 | 2 | 1 | 6 | Inside block formats such as MXFP4 and NVFP4 |

**BF16** ("brain float", from Google) keeps FP32's exponent and cuts the mantissa. It has the same range as FP32, so training does not overflow, at the cost of precision. It is the format most open models are released in.

**FP4 E2M1** can only represent 0, 0.5, 1, 1.5, 2, 3, 4 and 6, positive or negative. It is useful only with a shared scale per small block, as in [[quantization/other-methods#Microscaling formats: MXFP4 and NVFP4|MXFP4 and NVFP4]].

## Integers

An integer format has evenly spaced levels: **int8** has 256, **int4** has 16. On its own an integer cannot represent 0.0371, so integer quantization always pairs the integers with a **scale** (and often a **zero point**) per block of weights. See [[quantization/how-it-works|How quantization works]].

Evenly spaced levels waste some of their range on trained weights, which cluster near zero in a bell shape. That observation leads to non-uniform formats.

## Non-uniform formats

- **NF4** (NormalFloat 4), from the [[training/lora#QLoRA|QLoRA]] paper, places its 16 levels at the quantiles of a normal distribution, so each level is used about equally often for normally distributed weights.
- **IQ4_NL** in llama.cpp is a 4-bit type with a non-linear table of levels for the same reason.
- **Codebook formats** go further and store an index into a table of whole vectors rather than single values. See [[quantization/k-quants#I-quants|i-quants]] and [[quantization/other-methods|Other methods]].

## Bits per weight

Quantized formats are compared by their **bits per weight** (bpw), including the overhead of scales. Q4_0 stores 32 four-bit values plus one 16-bit scale: (32 × 4 + 16) ÷ 32 = 4.5 bpw. A file's average bpw also includes any tensors kept at higher precision, which is why a "4-bit" file is often 4.5 to 5 bpw overall.

## Hardware support

Formats only speed up arithmetic when the hardware has instructions for them. Recent Nvidia data-center cards (Hopper) have FP8 tensor cores, and the Blackwell generation adds FP4. On consumer hardware, and for single-user generation in general, the gain from low-bit formats comes mostly from reading fewer bytes, and values are expanded to 16-bit just before the arithmetic. That is why llama.cpp can run 2-bit and 3-bit formats that no hardware supports natively.

## See also

- [[quantization/how-it-works|How quantization works]], next on the reading path
