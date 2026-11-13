# Scaling laws

A model's prediction error falls smoothly and predictably as you add parameters, data and compute, which is why labs could plan ever-larger training runs, and the main lesson since 2022 is to train on far more data than early models did.

## The finding

In 2020, researchers at OpenAI (Kaplan and others) showed that a model's test loss follows a **power law** in its parameter count, its dataset size and its training compute, over many orders of magnitude. Double the compute, and the loss falls by a predictable fraction. Nothing about the architecture's details mattered as much as scale.

This turned model building into something closer to engineering: train small models, fit the curve, and predict how a model a hundred times larger would do before spending the money.

## Chinchilla and compute-optimal training

In 2022, DeepMind's **Chinchilla** paper (Hoffmann and others) revisited the question: for a fixed compute budget, how should it be split between a bigger model and more data? Its answer was that parameters and training tokens should grow together, at roughly **20 tokens per parameter**. Many earlier large models, including GPT-3 at 175B parameters and about 300B tokens, were undertrained by this standard.

The 70B-parameter Chinchilla, trained on 1.4 trillion tokens, outperformed the 280B-parameter Gopher with the same compute.

## Beyond compute-optimal

"Compute-optimal" means the best model for a given **training** budget. But a model is trained once and run many times, so a smaller model trained much longer is cheaper overall. Modern open models go far past 20 tokens per parameter:

| Model | Parameters | Training tokens | Tokens per parameter |
| --- | --- | --- | --- |
| Chinchilla (2022) | 70B | 1.4T | 20 |
| Llama 2 7B (2023) | 7B | 2T | about 290 |
| Llama 3 8B (2024) | 8B | over 15T | about 1,900 |

This is good news for local use: small models are much better than the 2022 scaling laws alone would predict, because they have absorbed far more data. It also has a side effect on [[quantization|quantization]]: heavily trained models pack more information into each weight and tend to lose more quality at very low bit widths.

## Emergence

Some abilities, such as multi-step arithmetic, appeared to switch on suddenly at a certain scale. Later work argued that much of this suddenness comes from the measurement, such as all-or-nothing scoring, while the underlying loss improves smoothly. The debate is not fully settled, but "abilities appear unpredictably" is weaker than it once seemed.

## Test-time compute

Since 2024 a second scaling axis has become important: letting a model spend more computation when answering, by generating a long chain of reasoning before the final answer. Accuracy on hard problems rises with the length of that reasoning, much as it rises with model size. See [[training/reasoning|Reasoning models]].

## See also

- [[training|Training]], the next section on the reading path
- [[history|A short history]]
