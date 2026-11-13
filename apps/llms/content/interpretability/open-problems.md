# Open problems in interpretability

Interpretability can now find many real features and trace some real circuits, but it cannot yet explain most of what a large model does, and its findings are easiest to overstate.

## What works

- Finding **features** for a wide range of concepts in large models, with [[interpretability/sparse-autoencoders|sparse autoencoders]] and [[interpretability/probing|probes]].
- **Localising** behaviours to layers and components with [[interpretability/activation-patching|patching]].
- **Explaining specific circuits** for narrow tasks in small models, and tracing single prompts in large ones with [[interpretability/attribution-graphs|attribution graphs]].
- **Steering** style, tone and some dispositions, and removing refusal. See [[interpretability/steering|Steering]].
- **Detecting** some properties of the model's state, such as whether it knows an answer, from activations.

## What does not, yet

- **Completeness.** Even the best feature dictionaries leave a large share of each activation unexplained, and the unexplained part matters for the model's loss.
- **Attention.** Most feature methods explain MLPs and the residual stream. Why heads attend where they do is far less understood.
- **Scale of effort.** A circuit can take weeks to work out by hand. Frontier models do millions of things. Automation, including using language models to do interpretability, is the main hope.
- **Validation.** There is no agreed ground truth for "the model really uses feature X for Y". Interventions help, but a story that survives a few interventions can still be wrong.
- **Units.** Whether SAE features are the model's real units or partly artefacts of the method (dictionary size, sparsity penalty) is unsettled.
- **Non-linear features.** Not everything is a direction. Circular representations of days and months, and multi-dimensional features, are known exceptions.

## Questions with practical stakes

- Can interpretability **audit** a model for hidden goals, back doors or deception? Anthropic reported in 2025 that teams using interpretability tools could find a deliberately hidden objective in a test model, which is an encouraging but small-scale result.
- Can activations be used to **monitor** deployed models more reliably than reading their outputs or chains of thought?
- Can findings in one model **transfer** to others, or to the next version of the same model?
- Can interpretability help **fix** behaviour, not just describe it, without the side effects of blunt steering?

## How to read interpretability claims

1. **Which model, and how big?** A result in a 2-layer toy model or GPT-2 small may not hold in a 70B model.
2. **One prompt or many?** A beautiful graph for one prompt is an anecdote.
3. **Was it tested causally?** Correlation from a probe or a feature's top examples is weaker than an intervention that changes behaviour as predicted.
4. **What is left unexplained?** Good papers report reconstruction error, faithfulness or the share of effect explained.
5. **Who labelled the features?** Automatic labels are guesses.

## See also

- [[history|A short history]]
- [[reading-list|Reading list]]
