# Superposition

Superposition is a model storing more features than it has dimensions by giving them nearly perpendicular directions, which works because most features are rarely active at the same time, and it is why neurons look like a jumble.

## The intuition

In a space of *n* dimensions there are only *n* exactly perpendicular directions. But there are vastly more directions that are **almost** perpendicular. In high dimensions, random directions are nearly perpendicular to each other with high probability, and a space of a few thousand dimensions can hold far more than a few thousand directions with only small overlaps.

Overlaps cause **interference**: activating feature A slightly activates the direction of feature B. If A and B are rarely active together, that interference is rare, and a non-linearity can filter out small false signals. So the model trades a little noise for a great deal of capacity.

## Toy Models of Superposition

Anthropic's 2022 paper *Toy Models of Superposition* (Elhage and others) made this concrete. They trained tiny networks to compress many synthetic features into a few dimensions and reconstruct them.

- When features were **dense** (often active together), the network stored only the most important ones, one per dimension, and dropped the rest. No superposition.
- When features were **sparse** (rarely active), the network stored many more features than dimensions, arranged in geometric patterns: pairs of opposite directions, triangles, pentagons and other shapes.
- The switch between regimes was sharp, like a phase change, and depended on each feature's importance and sparsity.
- With a non-linearity, the network could even do some computation while in superposition.

## What it implies

- **Neurons are the wrong unit.** If features are spread across neurons, looking at one neuron at a time shows a mixture. See [[interpretability/features-and-neurons|Features and neurons]].
- **We need to un-mix.** If features are sparse directions, a method that looks for a sparse, overcomplete set of directions should recover them. That is the motivation for [[interpretability/sparse-autoencoders|sparse autoencoders]].
- **Quantization interacts with it.** Packed, nearly perpendicular directions are sensitive to noise, one reason heavily trained models lose more at very low bit widths. This is a plausible link rather than a settled result.
- **Robustness.** Interference between features may be one source of adversarial examples, though this too is debated.

## Related ideas

- **Polysemanticity** is the observable symptom: neurons that respond to unrelated things. Superposition is one explanation, though not the only possible one.
- **Privileged basis:** a layer has a privileged basis when something in the architecture, such as an element-wise non-linearity, makes the neuron directions special. MLP hidden layers have one. The residual stream largely does not, which is why features there are almost never aligned with single dimensions.

## See also

- [[interpretability/probing|Probing]], next on the reading path
- [[interpretability/sparse-autoencoders|Sparse autoencoders]]
