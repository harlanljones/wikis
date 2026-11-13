# Probing

A probe is a small classifier, usually linear, trained to predict some property from a model's internal activations, and if it succeeds, the information is present there in an easily readable form.

## How it works

1. Collect inputs where you know the property: sentences labelled true or false, board positions, part of speech for each word.
2. Run them through the model and save the activations at a chosen layer and token position.
3. Train a **linear** classifier (logistic regression) from activations to labels, on part of the data.
4. Test it on the rest. Repeat for each layer to see where the information appears.

Linear probes are preferred because a powerful non-linear probe might learn the task itself from raw information, which says little about what the model computes. The direction a linear probe learns can then be used for [[interpretability/steering|steering]].

## Notable results

- **Syntax:** "structural probes" (Hewitt and Manning, 2019) recovered parse-tree distances between words from BERT's activations.
- **Othello-GPT:** a model trained only on legal move sequences of the board game Othello learned an internal map of the board. Li and others (2022) found it with non-linear probes. Neel Nanda (2023) then showed it was **linear** once you probe for "my piece or theirs" instead of "black or white", and editing that representation changed the model's moves.
- **Space and time:** Gurnee and Tegmark (2023) found linear representations of the latitude and longitude of places and the dates of events in Llama 2.
- **Truth:** several studies (for example, Marks and Tegmark's *Geometry of Truth*, 2023) found directions that separate true from false statements and generalise across topics.
- **Model knows it is wrong:** probes can often predict whether a model's answer will be correct, or whether it is hallucinating, from activations before it answers.

## Pitfalls

- **Present is not used.** A probe shows information can be read out, not that the model relies on it. Combine probing with [[interpretability/activation-patching|patching]] or steering to test causality.
- **Control tasks.** A probe can succeed by memorising quirks of the data. Comparing against probes for random labels (Hewitt and Liang, 2019) checks for this.
- **Spurious directions.** A "truth" probe might really be tracking "sounds like a common statement". Test generalisation to differently built datasets.

## Probes as a practical tool

Probes are cheap and often beat more complex methods at detecting specific things. In 2025 Google DeepMind's interpretability team reported that, for detecting harmful intent in prompts, simple linear probes did better than probes built on [[interpretability/sparse-autoencoders|sparse autoencoder]] features, which shifted some research effort toward probing. Using probes on activations to monitor deployed models is an active area of safety work.

## See also

- [[interpretability/logit-lens|The logit lens]], next on the reading path
