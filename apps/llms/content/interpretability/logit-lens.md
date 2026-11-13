# The logit lens

The logit lens applies the model's final unembedding to the residual stream at an intermediate layer, to see what the model "would predict" if it stopped there, which shows predictions forming layer by layer.

## How it works

The [[fundamentals/embeddings#Unembedding|unembedding]] turns the final residual stream into scores over the vocabulary. Because every layer adds to the same residual stream, you can apply the final normalization and unembedding at **any** layer and read off a distribution.

Run on "The Eiffel Tower is in the city of", a typical pattern is:

| Layer | Top prediction |
| --- | --- |
| Early | Tokens related to the input words, or generic tokens |
| Middle | Plausible but vague guesses, such as " the" or " France" |
| Late | " Paris", with confidence rising toward the last layer |

The technique was introduced in a 2020 blog post by the pseudonymous author nostalgebraist, using GPT-2.

## The tuned lens

The raw logit lens works poorly in some models, because intermediate layers use the residual stream in ways the final layer does not. The **tuned lens** (Belrose and others, 2023) trains a small affine translator for each layer that maps its residual stream into the final layer's space. Its readouts are more reliable and more faithful across models.

## What it is used for

- **Seeing when an answer is decided.** For easy facts the right token often appears in the middle layers. For hard questions it appears late or not at all.
- **Multilingual processing.** Logit-lens studies of Llama 2 (Wendler and others, 2024) found that, when translating between two non-English languages, intermediate layers often lean toward the **English** word before the target-language word appears, suggesting a concept space closer to English in the middle of the model.
- **Early exit and speculative decoding** ideas, which skip later layers when an early layer is already confident.
- **Debugging.** Watching where a wrong answer appears can show where something went astray.

## Limits

The logit lens reads the residual stream in the vocabulary's basis. Much of what a middle layer represents is not "about to output token X", so the lens sees only the part of the computation that is already about the output. Treat it as a quick look, not a full explanation.

## See also

- [[interpretability/attention-heads|Attention heads and induction]], next on the reading path
