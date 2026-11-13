# Steering

Steering changes a model's behaviour at run time by adding a direction to its activations, or removing one, with no training, and it works well enough that refusal can be switched off in open models this way.

## Steering vectors

The simplest recipe, sometimes called **contrastive activation addition**:

1. Write pairs of prompts that differ in the behaviour you want: happy against sad, formal against casual, honest against flattering.
2. Run both sets through the model and record the residual stream at one layer.
3. Take the average difference. That is the steering vector.
4. At generation time, add the vector (times a strength) to the residual stream at that layer, at every token.

Positive strength pushes toward the behaviour, negative pushes away. Too much strength makes the output incoherent. A middle layer usually works best.

Related methods: **ActAdd** (Turner and others, 2023) used a single pair of prompts. **Representation engineering** (Zou and others, 2023) built "reading" and "control" vectors for honesty, power-seeking and emotions. **Inference-time intervention** (Li and others, 2023) shifted specific attention heads to make answers more truthful. Steering with a [[interpretability/sparse-autoencoders|sparse autoencoder]] feature, as in Golden Gate Claude, is the same idea with a learned direction.

## Refusal direction and abliteration

Arditi and others (2024) found that, in many open chat models, **refusal is mediated by a single direction** in the residual stream. Adding it makes the model refuse harmless requests. Removing it (projecting it out of every layer's activations) makes the model comply with requests it would normally refuse.

Because the projection can be folded into the weights, the community began releasing **"abliterated"** models: copies with the refusal direction removed from the weight matrices. They behave like the original without refusals, often with some loss of quality, and they also lose safeguards the model maker intended. The technique shows how shallow some safety training is, which is useful knowledge for both attackers and defenders.

## Persona and trait vectors

Steering-style directions have also been used to monitor models. Anthropic's 2025 work on **persona vectors** extracted directions for traits such as sycophancy and a tendency to make things up, used them to detect when fine-tuning data would push a model toward those traits, and steered against them during training.

## Steering locally

- **llama.cpp** supports control vectors: build one with `llama-cvector-generator` from pairs of prompts, then load it with `--control-vector` and a strength. See [[local/llama-cpp|llama.cpp]].
- **repeng** is a small Python library for training and applying control vectors to Hugging Face models.
- **TransformerLens** and **nnsight** can add any vector at any layer in a few lines. See [[interpretability/tools|Tools]].

## Limits

Steering is blunt. A vector found from one set of prompts can carry other differences along with it, effects vary between layers and prompts, and strong steering degrades fluency. It is better at style, tone and broad dispositions than at precise behaviours.

## See also

- [[interpretability/tools|Tools]], next on the reading path
