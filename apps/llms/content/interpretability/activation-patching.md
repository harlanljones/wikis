# Activation patching

Activation patching runs the model on two inputs, copies an activation from one run into the other, and watches the output, which shows which parts of the model cause a behaviour rather than merely correlate with it.

## The basic experiment

Take two prompts that differ in one detail:

- **Clean:** "The Eiffel Tower is in the city of" (answer: Paris)
- **Corrupted:** "The Colosseum is in the city of" (answer: Rome)

1. Run both and save every activation.
2. Run the corrupted prompt again, but at one place (say, layer 15's MLP output at the "Tower" position) replace the activation with the one from the clean run.
3. Measure how far the output moves back toward "Paris", often as the change in the logit difference between " Paris" and " Rome".
4. Repeat for every layer, position and component, and draw a map.

Places where patching restores the clean answer are the places that carry the information that matters.

## Variants

- **Causal tracing,** from the ROME paper (Meng and others, 2022), corrupts the subject by adding noise to its embeddings, then restores clean states one at a time. It found that factual recall depends strongly on **middle-layer MLPs at the last token of the subject**, and that editing those MLPs could change a stored fact.
- **Denoising versus noising.** Patching clean into corrupted asks "is this enough to restore the behaviour?". Patching corrupted into clean asks "is this necessary?". The two can give different answers when a model has backup paths.
- **Path patching** patches only the effect of one component on another, to trace the edges between components, not just the components.
- **Attribution patching** uses a gradient to approximate the effect of every patch at once in a single backward pass. It is much faster and less accurate for large changes.
- **Ablation** sets an activation to zero or to its average instead of to another run's value. Mean ablation is usually safer than zero ablation, which can push the model off its normal range.

## Choosing good prompts

The corrupted prompt should change only the thing being studied and keep the same number of tokens, so positions line up. "Paris" against "Rome" isolates the location fact. A corrupted prompt that changes grammar too will light up grammar circuits as well.

## What patching can and cannot tell you

It is the standard tool for **localisation**: where in the model a behaviour is carried. It does not, by itself, explain **what** the component computes. That needs looking at weights, attention patterns or [[interpretability/sparse-autoencoders|features]]. Models also have redundancy: a component can matter little when patched alone because others compensate (the "hydra effect").

## See also

- [[interpretability/circuits|Circuits]], next on the reading path
