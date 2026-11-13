# Measuring quantization quality

Compare a quantized model against its own full-precision original, ideally with KL divergence on the full token distribution, because perplexity alone hides errors and benchmark scores are noisy.

## Perplexity

[[training/pretraining#The objective|Perplexity]] on a test text (WikiText-2 is traditional) measures how well the model predicts it. Lower is better. The quantized model's perplexity is compared with the original's, often as a percentage increase.

It is quick to compute and easy to compare, but it has a flaw: errors can cancel. A quantized model can be more confident than it should be on some tokens and less on others, and the average log probability barely moves.

## KL divergence

**Kullback-Leibler divergence** measures how far the quantized model's whole next-token distribution is from the original's, token by token. Zero means identical. It catches changes that perplexity misses, and its distribution across tokens shows whether the damage is spread thinly or concentrated in a few badly wrong predictions.

A related measure, **"same top token"**, reports how often both models would choose the same most likely token.

## Doing it with llama.cpp

```sh
# 1. Save the original model's distributions
llama-perplexity -m model-f16.gguf -f wiki.test.raw --kl-divergence-base base-logits.bin -ngl 99

# 2. Compare a quantized file against them
llama-perplexity -m model-Q4_K_M.gguf --kl-divergence-base base-logits.bin --kl-divergence -ngl 99
```

The output reports perplexity, mean KL divergence, its percentiles, and the share of tokens where the top choice agrees. The base file can be very large for models with big vocabularies.

## Rough expectations

Across many community measurements of mid-sized models, the pattern is consistent, though the numbers vary by model:

| Bits per weight | Typical result |
| --- | --- |
| 8 and above | Indistinguishable in practice |
| 5 to 6.5 | Very small loss. Hard to notice in use |
| 4.25 to 5 | Small loss. The usual sweet spot |
| 3.5 to 4 | Noticeable on careful tests, often fine in use |
| 2.5 to 3.5 | Clear degradation on small models. Usable on very large models |
| Below 2.5 | Large models only, and with care |

Larger models tolerate low bit widths better than small ones, and heavily trained small models (many tokens per parameter) tolerate them worse.

## Benchmarks

Task benchmarks (MMLU, GSM8K, code tests) measure what you care about, but they need many questions to detect small differences, and random variation between runs is often larger than the gap between 5-bit and 6-bit files. Use them to catch large losses, not to rank close quantizations. For the same reason, treat single anecdotes ("Q4 broke my model") with caution, and check the chat template and sampler first.

## See also

- [[quantization/choosing|Choosing a quantization]], next on the reading path
- [[training/evaluation|Evaluation]]
