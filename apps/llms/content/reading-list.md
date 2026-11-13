# Reading list

The papers and posts each section of this wiki is built on, in a sensible reading order, with a line on why each one matters. Titles are given so they can be found with any search engine.

## How LLMs work

1. Vaswani and others, *Attention Is All You Need* (2017). The transformer.
2. Radford and others, *Language Models are Unsupervised Multitask Learners* (2019). GPT-2.
3. Brown and others, *Language Models are Few-Shot Learners* (2020). GPT-3 and in-context learning.
4. Su and others, *RoFormer: Enhanced Transformer with Rotary Position Embedding* (2021). RoPE.
5. Shazeer, *GLU Variants Improve Transformer* (2020). SwiGLU.
6. Ainslie and others, *GQA* (2023). Grouped-query attention.
7. Dao and others, *FlashAttention* (2022).
8. Kaplan and others, *Scaling Laws for Neural Language Models* (2020).
9. Hoffmann and others, *Training Compute-Optimal Large Language Models* (2022). Chinchilla.
10. Fedus, Zoph and Shazeer, *Switch Transformers* (2021), and Jiang and others, *Mixtral of Experts* (2024).

For a hands-on route, Andrej Karpathy's video series *Neural Networks: Zero to Hero* builds a GPT from scratch.

## Training

1. Ouyang and others, *Training language models to follow instructions with human feedback* (2022). InstructGPT and RLHF.
2. Bai and others, *Constitutional AI* (2022).
3. Rafailov and others, *Direct Preference Optimization* (2023).
4. Hu and others, *LoRA* (2021), and Dettmers and others, *QLoRA* (2023).
5. Zhou and others, *LIMA: Less Is More for Alignment* (2023).
6. Wei and others, *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models* (2022).
7. DeepSeek-AI, *DeepSeek-R1* (2025). Reasoning by reinforcement learning, and distillation.
8. Penedo and others, *The FineWeb Datasets* (2024). How web data is filtered.
9. The Llama 3 technical report, *The Llama 3 Herd of Models* (2024), for a full modern recipe.

## Running models locally

- The llama.cpp repository's README and `docs` folder, and its discussions on quantization types and performance.
- The GGUF specification in the ggml repository.
- Kwon and others, *Efficient Memory Management for Large Language Model Serving with PagedAttention* (2023). vLLM.
- Leviathan and others, *Fast Inference from Transformers via Speculative Decoding* (2022).

## Quantization

1. Dettmers and others, *LLM.int8()* (2022).
2. Xiao and others, *SmoothQuant* (2022).
3. Frantar and others, *GPTQ* (2022).
4. Lin and others, *AWQ* (2023).
5. The llama.cpp pull requests introducing k-quants (2023) and i-quants (2024), which explain each type.
6. Tseng and others, *QuIP#* (2024) and *QTIP* (2024).
7. Egiazarian and others, *AQLM* (2024).
8. Ma and others, *The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits* (2024). BitNet b1.58.
9. The OCP *Microscaling Formats (MX) Specification* (2023).

## Interpretability

1. Olah and others, *Zoom In: An Introduction to Circuits* (2020, Distill).
2. Elhage and others, *A Mathematical Framework for Transformer Circuits* (2021).
3. Olsson and others, *In-context Learning and Induction Heads* (2022).
4. Elhage and others, *Toy Models of Superposition* (2022).
5. nostalgebraist, *interpreting GPT: the logit lens* (2020), and Belrose and others, *Eliciting Latent Predictions from Transformers with the Tuned Lens* (2023).
6. Meng and others, *Locating and Editing Factual Associations in GPT* (2022). ROME and causal tracing.
7. Wang and others, *Interpretability in the Wild* (2022). The IOI circuit.
8. Nanda and others, *Progress measures for grokking via mechanistic interpretability* (2023).
9. Bricken and others, *Towards Monosemanticity* (2023), and Templeton and others, *Scaling Monosemanticity* (2024).
10. Gao and others, *Scaling and evaluating sparse autoencoders* (2024).
11. Lieberum and others, *Gemma Scope* (2024).
12. Arditi and others, *Refusal in Language Models Is Mediated by a Single Direction* (2024).
13. Ameisen, Lindsey and others, *Circuit Tracing* and *On the Biology of a Large Language Model* (2025).

Anthropic's papers are on transformer-circuits.pub. Most others are on arXiv.
