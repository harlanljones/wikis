# Glossary

Short definitions of the terms used across the wiki, each linked to the page that explains it properly.

## A to F

- **Activation:** a number computed inside the model while it runs, as opposed to a weight. See [[fundamentals/embeddings|Embeddings and the residual stream]].
- **Activation patching:** copying an activation from one run into another to test what causes an output. See [[interpretability/activation-patching|Activation patching]].
- **Attention:** the step where each token gathers information from earlier tokens. See [[fundamentals/attention|Attention]].
- **Attribution graph:** a diagram of which features caused which for one prompt. See [[interpretability/attribution-graphs|Attribution graphs]].
- **AWQ:** activation-aware weight quantization. See [[quantization/awq|AWQ]].
- **Base model:** a model after pretraining only, which continues text rather than answering. See [[fundamentals/what-is-an-llm|What a language model is]].
- **BF16:** a 16-bit floating-point format with a wide range, used for training. See [[quantization/number-formats|Number formats]].
- **Bits per weight (bpw):** the average storage per parameter, including scales. See [[quantization/number-formats#Bits per weight|Number formats]].
- **Calibration data:** sample text used by some quantization methods. See [[quantization/how-it-works|How quantization works]].
- **Chat template:** the layout of special tokens that marks system, user and assistant turns. See [[local/gguf|GGUF]].
- **Circuit:** a part of a model that performs a specific task. See [[interpretability/circuits|Circuits]].
- **Context window:** the most tokens a model can consider at once. See [[fundamentals/kv-cache|The KV cache and context length]].
- **Distillation:** training a small model to imitate a large one. See [[training/distillation|Distillation]].
- **DPO:** direct preference optimisation. See [[training/preference-tuning|Preference tuning]].
- **Embedding:** the vector that represents a token. See [[fundamentals/embeddings|Embeddings]].
- **Feature:** a direction in activation space that stands for a concept. See [[interpretability/features-and-neurons|Features and neurons]].
- **Fine-tuning:** further training on a targeted dataset. See [[training/fine-tuning|Fine-tuning]].
- **Flash attention:** a faster, memory-saving way to compute exact attention. See [[fundamentals/attention#The cost of attention|Attention]].
- **FP8, FP4:** 8-bit and 4-bit floating-point formats. See [[quantization/number-formats|Number formats]].

## G to M

- **GGUF:** the single-file model format used by llama.cpp. See [[local/gguf|GGUF]].
- **GPTQ:** an error-correcting post-training quantization method. See [[quantization/gptq|GPTQ]].
- **GQA:** grouped-query attention, where heads share keys and values. See [[fundamentals/attention#Sharing keys and values: MQA, GQA and MLA|Attention]].
- **Hallucination:** a fluent, confident and wrong answer. See [[fundamentals/what-is-an-llm|What a language model is]].
- **Importance matrix (imatrix):** activation statistics used to quantize GGUF files more carefully. See [[quantization/k-quants#The importance matrix|k-quants]].
- **Induction head:** an attention head that continues repeated patterns. See [[interpretability/attention-heads|Attention heads]].
- **Inference:** running a trained model.
- **I-quants:** llama.cpp's codebook quantization types, such as IQ3_M. See [[quantization/k-quants#I-quants|k-quants and i-quants]].
- **k-quants:** llama.cpp's super-block quantization types, such as Q4_K_M. See [[quantization/k-quants|k-quants]].
- **KL divergence:** a measure of how far one probability distribution is from another. See [[quantization/measuring-quality|Measuring quality]].
- **KV cache:** stored keys and values of past tokens. See [[fundamentals/kv-cache|The KV cache]].
- **Logit:** a raw score for a token before the softmax. See [[fundamentals/embeddings#Unembedding|Unembedding]].
- **Logit lens:** reading predictions from intermediate layers. See [[interpretability/logit-lens|The logit lens]].
- **LoRA:** low-rank adaptation, fine-tuning a small add-on. See [[training/lora|LoRA and QLoRA]].
- **Mixture of experts (MoE):** a model that uses only some of its feed-forward experts per token. See [[fundamentals/mixture-of-experts|Mixture of experts]].
- **MLP:** the feed-forward network in each transformer block. See [[fundamentals/transformer|The transformer block]].
- **MXFP4:** a 4-bit floating-point block format with a shared scale. See [[quantization/other-methods#Microscaling formats: MXFP4 and NVFP4|Other methods]].

## N to Z

- **NF4:** a 4-bit format with levels spaced for normally distributed weights. See [[quantization/number-formats#Non-uniform formats|Number formats]].
- **Offloading:** running part of a model from system memory. See [[local/performance#Offloading|Performance tuning]].
- **Parameter:** one learned number. See [[fundamentals/what-is-an-llm|What a language model is]].
- **Perplexity:** the exponential of the average next-token loss. See [[training/pretraining#The objective|Pretraining]].
- **Polysemantic:** a neuron that responds to several unrelated things. See [[interpretability/features-and-neurons|Features and neurons]].
- **Prefill and decode:** processing the prompt, then generating one token at a time. See [[fundamentals/kv-cache|The KV cache]].
- **Probe:** a classifier trained on activations. See [[interpretability/probing|Probing]].
- **Quantization:** storing numbers in fewer bits. See [[quantization|Quantization]].
- **Residual stream:** the running vector per token that every layer adds to. See [[fundamentals/embeddings#The residual stream|The residual stream]].
- **RLHF:** reinforcement learning from human feedback. See [[training/preference-tuning|Preference tuning]].
- **RoPE:** rotary position embeddings. See [[fundamentals/positions|Position and RoPE]].
- **Sampling:** choosing the next token from the model's probabilities. See [[fundamentals/sampling|Sampling and decoding]].
- **Sparse autoencoder (SAE):** a network that learns a dictionary of interpretable features. See [[interpretability/sparse-autoencoders|Sparse autoencoders]].
- **Speculative decoding:** a small model drafts tokens for a large model to check. See [[local/performance#Speculative decoding|Performance tuning]].
- **Steering vector:** a direction added to activations to change behaviour. See [[interpretability/steering|Steering]].
- **Superposition:** storing more features than dimensions. See [[interpretability/superposition|Superposition]].
- **Temperature:** a setting that sharpens or flattens the next-token distribution. See [[fundamentals/sampling#Temperature|Sampling]].
- **Token:** a piece of text from the tokenizer's vocabulary. See [[fundamentals/tokens|Tokens]].
- **Tokens per second:** generation speed. See [[local/hardware|Hardware and memory]].
- **Transcoder:** a sparse, interpretable stand-in for an MLP. See [[interpretability/attribution-graphs|Transcoders]].
- **VRAM:** a graphics card's own memory. See [[local/hardware|Hardware and memory]].
