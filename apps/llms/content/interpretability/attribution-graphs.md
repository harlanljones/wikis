# Transcoders and attribution graphs

Attribution graphs replace a model's MLPs with interpretable "transcoder" features, then trace, for one prompt, which features caused which, all the way from the input tokens to the output, giving a readable diagram of how the model reached its answer.

## Transcoders

A [[interpretability/sparse-autoencoders|sparse autoencoder]] explains what is in one activation. But to trace computation, you need to know how one layer's features produce the next layer's. MLPs are the obstacle: their neurons are polysemantic and non-linear.

A **transcoder** (Dunefsky and others, 2024) is trained to imitate an MLP: it reads the MLP's input, passes it through a wide, sparse layer of features, and predicts the MLP's output. Because the features are sparse and interpretable, the MLP's computation becomes a set of readable connections. A **cross-layer transcoder** lets each feature write to the outputs of all later layers, which matches how models really spread work across layers and makes the graphs simpler.

## Attribution graphs

In March 2025, Anthropic published *Circuit Tracing* (the method) and *On the Biology of a Large Language Model* (the findings), applying it to Claude 3.5 Haiku.

1. Build a **replacement model**: the original model with every MLP swapped for cross-layer transcoder features. For a given prompt, attention patterns are frozen at their real values, and **error nodes** hold whatever the transcoders failed to reconstruct, so the replacement reproduces the original's output exactly on that prompt.
2. With attention frozen, the remaining paths are linear, so the direct effect of every feature on every later feature and on the output can be computed exactly.
3. Prune to the features and edges that matter most for the chosen output, and group similar features into **supernodes**.
4. Check the resulting story with interventions: suppress or inject features in the **real** model and see whether the output changes as the graph predicts.

## What it showed

- **Multi-step reasoning in one forward pass.** For "the capital of the state containing Dallas", the graph showed a "Texas" feature being activated and then used to activate "Austin", rather than a shortcut from "Dallas" to "Austin".
- **Planning ahead.** When writing a rhyming couplet, the model activated features for candidate rhyme words **before** writing the second line, and wrote the line to end on one of them. Suppressing the planned word made it pick another rhyme and rewrite the line to fit.
- **Shared multilingual concepts.** Many features were language-independent, with language-specific features at the input and output.
- **Arithmetic by parallel paths.** Addition used one path for a rough magnitude and another for the exact last digit, which the model did not describe when asked how it added.
- **Why it hallucinates.** A default "I can't answer" circuit was suppressed by features for "known entity". Hallucinations happened when a name felt familiar enough to suppress the refusal without the model actually knowing the answer.
- **Unfaithful reasoning.** In some cases the written chain of thought did not match the computation shown in the graph. See [[training/reasoning#Is the chain of thought faithful?|Is the chain of thought faithful?]].

## Open tools

In May 2025 Anthropic released an open-source `circuit-tracer` library and, with Neuronpedia, an interactive viewer for attribution graphs on open models such as Gemma 2 2B and Llama 3.2 1B. You can type a prompt and explore its graph in a web browser. See [[interpretability/tools|Tools]].

## Limits

- Each graph explains **one prompt**. General claims need many graphs.
- **Attention** is frozen, not explained, so the "why" of what attention heads attend to is mostly missing.
- **Error nodes** can carry a large share of the effect on hard prompts.
- The authors estimated the method gave satisfying insight for only a minority of the prompts they tried.

## See also

- [[interpretability/steering|Steering]], next on the reading path
