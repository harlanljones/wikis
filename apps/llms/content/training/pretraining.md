# Pretraining

Pretraining shows the model trillions of tokens of text and nudges every weight, billions of times, to make the real next token a little more likely.

## The objective

For each position in a training sequence, the model predicts a probability for every possible next token. The loss is the **cross-entropy**: minus the log of the probability it gave to the token that actually came next. If the model gave the right token a probability of 0.5, the loss for that position is about 0.69. If it gave 0.01, the loss is about 4.6.

The average loss over a sequence is turned into a gradient by **backpropagation**, which says how much each weight contributed to the error, and the optimizer adjusts every weight slightly in the direction that lowers it.

A related number is **perplexity**, the exponential of the average loss. A perplexity of 8 means the model is, on average, as uncertain as if it were choosing evenly among 8 tokens. It is used to compare [[quantization/measuring-quality|quantized models]] with the original.

## The recipe

- **Optimizer:** almost always AdamW, which keeps two running averages per weight. Some recent runs use newer optimizers such as Muon.
- **Learning rate schedule:** a short warm-up, then a long decay (cosine, or a constant stretch followed by a fast cooldown).
- **Batch size:** millions of tokens per step.
- **Precision:** weights and arithmetic in [[quantization/number-formats|bfloat16]], with master copies and optimizer state at 32-bit. Some recent runs train large parts in FP8.
- **Sequence length:** a few thousand tokens for most of the run, then a stage on longer documents to extend the context.
- **Annealing:** near the end, the data mix shifts toward the highest-quality sources (curated text, code, maths), which gives a measurable boost.

## Memory during training

Training needs far more memory than running. Per parameter, with mixed precision and AdamW:

| Item | Bytes per parameter |
| --- | --- |
| bf16 weights | 2 |
| bf16 gradients | 2 |
| fp32 master weights | 4 |
| Adam first and second moments, fp32 | 8 |
| **Total, before activations** | **about 16** |

So fully training a 7B model needs over 110 GB before counting activations, which is why full fine-tuning of even small models needs data-center hardware and why [[training/lora|LoRA]] exists.

## Spreading across many chips

Large runs split the work across thousands of accelerators:

- **Data parallelism:** each group of chips processes different examples, and gradients are averaged. ZeRO and FSDP also split the optimizer state and weights across the group.
- **Tensor parallelism:** single matrix multiplications are split across chips in one server.
- **Pipeline parallelism:** different layers live on different chips.
- **Expert parallelism:** in [[fundamentals/mixture-of-experts|mixture-of-experts]] models, different experts live on different chips.

## What it costs

Training compute is roughly **6 × parameters × tokens** floating-point operations. Llama 3 8B, at 8 billion parameters and 15 trillion tokens, comes to about 7 × 10<sup>23</sup> operations. At a realistic 40 percent of the peak speed of a modern accelerator, that is around half a million GPU-hours. Meta's model card for Llama 3.1 reported about 1.5 million H100 GPU-hours for the 8B model and about 31 million for the 405B model, and those figures leave out the many smaller experiments that came before.

## See also

- [[training/data|Training data]], next on the reading path
- [[fundamentals/scaling-laws|Scaling laws]]
