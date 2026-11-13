# Attention

Attention lets each token look back at every earlier token, decide which ones are relevant, and pull information from them, with the relevance scores computed from the tokens themselves.

## The problem it solves

In "The trophy did not fit in the suitcase because **it** was too big", the model needs to work out that "it" means the trophy. Information has to move from one position to another. Attention is the only place in a transformer where that happens. Everything else works on each position separately.

## Queries, keys and values

For every token, attention computes three vectors from its residual stream, each by multiplying by a learned matrix:

- a **query**: what this token is looking for,
- a **key**: what this token offers to others looking for something,
- a **value**: the information it hands over if chosen.

Then, for the current token:

1. Compare its query with the key of every earlier token, using a dot product. A high score means a good match.
2. Divide the scores by the square root of the key length, which keeps them in a range where training is stable.
3. Apply a **softmax**, which turns the scores into weights that are positive and add up to one.
4. Take the weighted sum of the earlier tokens' values. That is what the token receives.

In matrix form, for a whole sequence at once:

```
Attention(Q, K, V) = softmax(Q Kᵀ / √d_k + mask) V
```

The **causal mask** sets the score for every later token to minus infinity, so a token can only attend to itself and what came before. That is what makes the model usable for generation: it never peeks at the answer.

## Many heads

One attention computation can only follow one kind of relationship at a time. So each layer runs many in parallel, called **heads**, each with its own smaller query, key and value matrices. A model with a hidden size of 4,096 might have 32 heads of size 128. Their outputs are joined and multiplied by an output matrix before being added to the residual stream.

Heads specialise. Interpretability research has found heads that attend to the previous token, heads that copy a name seen earlier, and **induction heads** that complete repeated patterns. See [[interpretability/attention-heads|Attention heads and induction]].

## Sharing keys and values: MQA, GQA and MLA

At generation time, keys and values for every past token are kept in the [[fundamentals/kv-cache|KV cache]], which can grow large. Several designs shrink it:

| Design | What it does | Used by (examples) |
| --- | --- | --- |
| Multi-head attention (MHA) | Every head has its own keys and values | The original transformer, GPT-2, Llama 1 |
| Multi-query attention (MQA) | All heads share one set of keys and values | PaLM, Falcon |
| Grouped-query attention (GQA) | Heads are grouped, each group shares keys and values | Llama 2 70B, Llama 3, Mistral, Qwen |
| Multi-head latent attention (MLA) | Keys and values are compressed into a small latent vector and expanded when needed | DeepSeek-V2, V3 and R1 |

GQA is the common default. A model with 32 query heads and 8 KV heads keeps a quarter of the cache that full multi-head attention would.

## The cost of attention

Every token compares itself with every earlier one, so the work for a whole sequence grows with the **square** of its length. Doubling the context quadruples the attention work during training and prompt processing.

Ways around this include:

- **FlashAttention,** which computes exactly the same result while never writing the full score matrix to memory. It is much faster in practice and is now standard. In [[local/llama-cpp|llama.cpp]] it is the `-fa` option.
- **Sliding-window attention,** where some layers only look back a fixed number of tokens. Mistral 7B and the Gemma 2 and 3 models use it in some or all layers.
- **Linear attention and state-space models** such as Mamba, which replace the softmax with something that grows linearly. Several recent models mix such layers with ordinary attention.

## See also

- [[fundamentals/transformer|The transformer block]], next on the reading path
- [[fundamentals/kv-cache|The KV cache and context length]]
- [[interpretability/attention-heads|Attention heads and induction]]
