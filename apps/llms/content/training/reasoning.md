# Reasoning models

Reasoning models are trained with reinforcement learning on problems whose answers can be checked, and they learn to write a long chain of thought before answering, which lets them spend more computation on harder questions.

## Chain of thought

As early as 2022, researchers found that asking a model to "think step by step" improved its accuracy on maths and logic. Writing out intermediate steps gives the model more tokens, and so more computation, before it commits to an answer, and lets later steps build on earlier ones.

Reasoning models make this the default and train it directly.

## Reinforcement learning with verifiable rewards

The recipe that OpenAI's o1 (September 2024) demonstrated and DeepSeek-R1 (January 2025) published in detail:

1. Gather many problems with checkable answers: maths with a known result, code with unit tests, puzzles with a verifier.
2. Have the model write a reasoning trace and an answer for each.
3. Reward it when the answer is right, and nothing else. No human ratings and no judging of the reasoning itself.
4. Update the model with a policy-gradient method. DeepSeek used **GRPO**, which compares several answers to the same problem against each other instead of training a separate value model.

Over training, the reasoning traces grow longer, and behaviours such as checking work, backtracking ("wait, that is wrong") and trying another approach appear without being demonstrated. DeepSeek's R1-Zero experiment showed this happening from a base model with no supervised examples at all, though its output was hard to read, so the released R1 added a supervised warm-up.

## Thinking at inference time

A reasoning model's answer has two parts: a thinking section, often wrapped in special tokens such as `<think>`, and the final answer. Consequences for local use:

- **More tokens per answer.** A question that a normal model answers in 200 tokens might take 2,000 to 20,000 tokens of thinking. Generation speed matters more, and the [[fundamentals/kv-cache|KV cache]] needs room for it.
- **Adjustable effort.** Many models accept a setting for how much to think, such as a "reasoning effort" level in gpt-oss or a switch to turn thinking off in Qwen3.
- **Front ends hide the thinking.** Tools such as [[local/ollama|Ollama]] and [[local/llama-cpp|llama-server]] can separate the thinking from the answer if the [[local/gguf|chat template]] is right.
- **Do not penalise repetition** heavily in reasoning models. Their traces legitimately repeat terms.

## Is the chain of thought faithful?

The written reasoning is not guaranteed to be the computation the model actually used. Studies have found models reaching answers for reasons they do not state, such as a hint in the prompt. Whether chains of thought can be relied on to monitor what models are doing is an active safety research question, and [[interpretability|interpretability]] tools are one way to check.

## See also

- [[training/distillation|Distillation]], next on the reading path
- [[fundamentals/scaling-laws#Test-time compute|Test-time compute]]
