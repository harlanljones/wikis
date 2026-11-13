# Evaluation

Benchmarks give a rough ranking of models, but they saturate, leak into training data and miss what matters for any one use, so the best test is a small set of your own tasks.

## Kinds of benchmark

| Kind | Examples | What it measures |
| --- | --- | --- |
| Knowledge, multiple choice | MMLU, MMLU-Pro, GPQA | Broad and graduate-level knowledge |
| Maths | GSM8K, MATH, AIME problems | From grade-school word problems to competition maths |
| Code | HumanEval, LiveCodeBench, SWE-bench | Writing functions, solving fresh problems, fixing real repository issues |
| Instruction following | IFEval | Obeying checkable instructions ("answer in under 50 words") |
| Long context | Needle-in-a-haystack, RULER | Finding and using information across a long input |
| Human preference | LMArena (formerly Chatbot Arena) | Which answer people pick in blind side-by-side votes |
| Very hard questions | Humanity's Last Exam | Expert-written questions designed to resist current models |

## Why scores mislead

- **Saturation.** Once top models score above 90 percent, a benchmark stops separating them. GSM8K and the original MMLU reached this point by 2024.
- **Contamination.** Benchmark questions leak onto the web and into training data. A model can score well by having seen the answers. "Live" benchmarks with new questions over time, such as LiveCodeBench, try to resist this.
- **Prompt sensitivity.** Small changes in prompt format, few-shot examples or answer extraction can move scores by several points.
- **Optimising for the leaderboard.** Arena-style rankings reward style, length and formatting as well as correctness.
- **Quantized and local versions differ.** Published scores are for the full-precision model with the publisher's settings. A [[quantization|4-bit]] copy with a different chat template and sampler will score differently. See [[quantization/measuring-quality|Measuring quantization quality]].

## Testing a model for your own use

1. Write 20 to 50 prompts that look like your real work, including a few hard ones and a few that should be refused or should say "I don't know".
2. Decide what a good answer looks like before you run them.
3. Run each candidate model with its recommended sampler settings and the correct chat template.
4. Compare blind if you can: shuffle the answers so you do not know which model wrote which.
5. Re-run the same set when you change model, quantization or settings.

For automated checks, the `lm-evaluation-harness` from EleutherAI runs most public benchmarks against local models, and llama.cpp's `llama-perplexity` measures how far a quantized model drifts from the original.

## See also

- [[local|Running models locally]], the next section on the reading path
- [[local/choosing-a-model|Choosing a model]]
