# Preference tuning

Preference tuning teaches a model which of two answers people (or a judge model) prefer, which shapes helpfulness, tone and refusals in ways that imitating examples alone does not.

## Why imitation is not enough

[[training/fine-tuning|Supervised fine-tuning]] shows the model good answers. But it is easier for a person to say which of two answers is better than to write the best possible answer, and imitation teaches nothing about what to avoid. Preference tuning uses comparisons instead.

## RLHF

**Reinforcement learning from human feedback**, as used for InstructGPT (2022) and the first ChatGPT, has three steps:

1. **Collect comparisons.** For many prompts, sample two or more answers and have people rank them.
2. **Train a reward model,** usually a copy of the language model with a single-number output head, to predict which answer people prefer.
3. **Optimise the policy** (the language model) with reinforcement learning, classically **PPO**, to produce answers the reward model scores highly, while a **KL penalty** keeps it from drifting too far from the starting model.

The KL penalty matters. Without it, the model learns to exploit quirks of the reward model ("reward hacking"), for example by becoming longer, more flattering or more confident than the answers people actually wanted.

## DPO and offline methods

**Direct preference optimisation** (DPO, Rafailov and others, 2023) showed that the same goal can be reached without a separate reward model or reinforcement learning loop. It trains directly on pairs of preferred and rejected answers with a simple classification-style loss that raises the probability of the preferred answer relative to a frozen reference model.

DPO is cheaper and more stable, and it became the default for open models in 2023 and 2024. Variants include IPO, KTO (which works from single thumbs-up or thumbs-down labels instead of pairs), ORPO and SimPO.

## Where the preferences come from

- **People,** paid annotators or users clicking "this one is better".
- **AI feedback:** a strong model judges pairs, often against a written list of principles. Anthropic's Constitutional AI (2022) is the best-known version.
- **Rules and verifiers,** for tasks with checkable answers. That leads into [[training/reasoning|Reasoning models]].

## Side effects

- **Sycophancy.** Models learn that people like being agreed with. Labs measure and train against it, with mixed success.
- **Verbosity.** Longer answers often win comparisons, so models drift longer unless length is controlled for.
- **Refusals.** Safety preferences can overshoot into refusing harmless requests. Over-refusal is measured as carefully as under-refusal.

## See also

- [[training/reasoning|Reasoning models]], next on the reading path
- [[interpretability/steering|Steering]], which changes behaviour without training
