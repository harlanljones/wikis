# Features and neurons

A feature is a property of the input that the model represents, such as "this token is inside a quotation" or "the subject is a city in Europe", and features usually correspond to directions in activation space rather than to single neurons.

## What a feature is

There is no fully agreed definition. The working one in most research: a feature is a **direction** in some layer's activation space such that how far an activation points along it tracks a human-understandable property of the input, and the model uses that direction downstream.

Examples found in real models include features for DNA sequences, for Base64 text, for code with a security flaw, for the Golden Gate Bridge (in text and images), for sycophantic praise, and for "the model is uncertain about this name".

## Neurons

A **neuron** is one dimension of an MLP's hidden layer, after its non-linearity. Because the non-linearity acts on each neuron separately, neurons are a natural place to look, and early work in vision models (the "Zoom In" essays, 2020) found neurons that detected curves, dog heads and car wheels.

In language models, some neurons are clean, but most are **polysemantic**: they respond to several unrelated things. A 2023 OpenAI study had GPT-4 write explanations of every neuron in GPT-2 and score them, and only a small fraction got explanations that predicted their activity well.

## Why neurons are polysemantic

If a model needs to represent more features than it has neurons, it has to share. [[interpretability/superposition|Superposition]] is the theory of how it does so: features become directions that are not aligned with any single neuron, so each neuron sees parts of many features.

## The linear representation hypothesis

Many findings fit the idea that models represent features **linearly**: as directions, with intensity as the distance along them, combined by adding. Evidence includes:

- word-vector arithmetic in early embeddings,
- [[interpretability/probing|linear probes]] that read out truth, sentiment, position in space and time, and board states,
- [[interpretability/steering|steering]] by adding a direction, which changes behaviour in the expected way.

It is a hypothesis, not a law. Some features are known to be non-linear, such as days of the week and months of the year represented as points on a circle, and the full picture is still being worked out.

## Where to look

- **Residual stream:** the shared channel between layers. Most features are read here. See [[fundamentals/embeddings#The residual stream|The residual stream]].
- **MLP neurons:** where much non-linear processing happens.
- **Attention outputs and patterns:** which tokens a head looks at, and what it moves. See [[interpretability/attention-heads|Attention heads]].

## See also

- [[interpretability/superposition|Superposition]], next on the reading path
