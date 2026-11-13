# Position and RoPE

Attention on its own ignores word order, so models add position information, and most current models do it with rotary position embeddings (RoPE), which rotate queries and keys by an angle that depends on position.

## Why attention needs help

The attention score between two tokens is a dot product of a query and a key. Nothing in that sum says how far apart they are. Without extra information, "dog bites man" and "man bites dog" would look the same to every attention head, apart from the causal mask.

## Ways of adding position

- **Learned absolute embeddings.** Add a learned vector for position 0, 1, 2 and so on to each token's embedding. Used by GPT-2. Simple, but the model has no vector for positions beyond those it was trained on.
- **Sinusoidal embeddings.** The original transformer added fixed sine and cosine waves of different frequencies.
- **Relative biases.** ALiBi, used by some models, subtracts a penalty from the attention score that grows with distance.
- **Rotary position embeddings (RoPE).** The current default, used by the Llama, Qwen, Mistral, Gemma and DeepSeek families among others.

## How RoPE works

RoPE splits each query and key vector into pairs of numbers and treats each pair as a point on a plane. Before the dot product, it rotates each pair by an angle equal to the token's position times a frequency. Different pairs rotate at different frequencies, from fast to very slow.

The key property: when a query at position *m* is compared with a key at position *n*, the rotations combine so that the score depends only on *m* − *n*, the distance between them. Relative position falls out of the arithmetic for free.

The base of the frequencies, called **rope theta**, sets how slowly the slowest pairs turn. Larger values suit longer contexts. Llama 2 used 10,000, Llama 3 uses 500,000.

## Stretching the context

A model trained on 8,000-token sequences has never seen the rotation angles of position 100,000, and it does badly there. Several methods adapt it:

- **Position interpolation** squeezes the new, longer range into the angles seen in training.
- **NTK-aware scaling** and **YaRN** stretch the slow frequencies more than the fast ones, keeping short-range precision, and are usually followed by a little extra training on long text.

Model configs record which scaling the model was trained with, and runtimes such as [[local/llama-cpp|llama.cpp]] read it from the [[local/gguf|GGUF]] file. Overriding it by hand (`--rope-scaling`, `--rope-freq-base`) is rarely needed and easy to get wrong.

A model's **advertised** context length is not always its **useful** one. Many models retrieve facts well from the whole window but reason less well over material far back in it. Long-context benchmarks exist because of this gap.

## See also

- [[fundamentals/sampling|Sampling and decoding]], next on the reading path
- [[fundamentals/kv-cache|The KV cache and context length]]
