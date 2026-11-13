# How LLMs work

The ideas behind every large language model, in the order they build on each other: from turning text into numbers, through attention and the transformer, to how models are scaled up.

No mathematics is needed for the opening of each page. The later parts of some pages use a little algebra (vectors, matrix multiplication, a softmax) and explain it as they go.

## Reading order

| Page | The question it answers |
| --- | --- |
| [[fundamentals/what-is-an-llm\|What a language model is]] | What does "predict the next token" really mean, and why does it lead to anything useful? |
| [[fundamentals/tokens\|Tokens and tokenizers]] | How is text cut into the pieces a model reads? |
| [[fundamentals/embeddings\|Embeddings and the residual stream]] | How does a token become a list of numbers, and where do those numbers go? |
| [[fundamentals/attention\|Attention]] | How does each token gather information from the ones before it? |
| [[fundamentals/transformer\|The transformer block]] | What is in each of the dozens of repeated layers? |
| [[fundamentals/positions\|Position and RoPE]] | How does the model know word order? |
| [[fundamentals/sampling\|Sampling and decoding]] | How is one token chosen from the model's scores? |
| [[fundamentals/kv-cache\|The KV cache and context length]] | Why does a long conversation use so much memory? |
| [[fundamentals/mixture-of-experts\|Mixture of experts]] | How can a model have hundreds of billions of parameters but run like a small one? |
| [[fundamentals/scaling-laws\|Scaling laws]] | Why did models keep getting bigger, and what decides how big? |

## The vocabulary in brief

- **Parameter** or **weight:** one of the learned numbers. "8B" means eight billion of them.
- **Token:** a piece of text, often a word or part of a word.
- **Context window:** how many tokens the model can look at at once.
- **Layer:** one transformer block. Models have from about 16 to over 100.
- **Hidden size** or **model dimension:** the length of the vector that represents each token inside the model, often 2,048 to 16,384.
- **Inference:** running a trained model. **Training:** setting its weights.

The [[glossary|Glossary]] has the rest.
