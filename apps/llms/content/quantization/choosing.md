# Choosing a quantization

For most people the answer is a `Q4_K_M` or `Q5_K_M` GGUF of the largest model that fits, `Q8_0` if you have plenty of memory, and an imatrix i-quant if you need to go below 4 bits.

## For llama.cpp, Ollama and LM Studio

| Your situation | Pick |
| --- | --- |
| Plenty of memory, want maximum fidelity | `Q8_0` |
| Comfortable fit, want quality with margin | `Q6_K` or `Q5_K_M` |
| The usual choice | `Q4_K_M` |
| A little short of memory | `IQ4_XS` or `Q4_K_S` |
| Need to squeeze a larger model in | `IQ3_M` or `Q3_K_M`, with an importance matrix |
| Very large MoE models on limited memory | `IQ2` to `IQ3` dynamic or custom mixes, experts squeezed hardest |
| The model maker offers a QAT file | That file, at its bit width |

## Bigger and lower, or smaller and higher?

At the same memory, a larger model at lower bit width usually beats a smaller one at higher bit width, down to about 4 bits. Below about 3.5 bits it becomes a closer call, and below 3 bits the smaller model often wins, unless the larger model is very large. A 70B model at 3 bits is generally better than a 32B at 6 bits, but an 8B at 2 bits is generally worse than a 4B at 5 bits.

## For GPU servers

| Hardware | Common choice |
| --- | --- |
| Nvidia Hopper or Blackwell, AMD MI300 and later | FP8 weights and activations, or NVFP4 or MXFP4 on Blackwell |
| Ampere and Ada (RTX 30, RTX 40, A100) | AWQ or GPTQ 4-bit with Marlin kernels, or int8 W8A8 |
| Single-user, Nvidia, want to fill the card exactly | EXL3 or EXL2 at a chosen bit width |

## Things that matter more than the last half-bit

- **The right chat template and sampler settings.** A perfect quantization with a broken template is worse than a rough one with the right one.
- **A recent file.** Converters and quantizers have had bug fixes. Files from 2023 may predate them.
- **A good uploader.** Files with an importance matrix and documented settings are more reliable.
- **Context length that fits.** A model that spills off the graphics card is slow whatever its quantization.

## See also

- [[interpretability|Interpretability]], the next section on the reading path
- [[local/hardware#Memory calculator|The memory calculator]]
