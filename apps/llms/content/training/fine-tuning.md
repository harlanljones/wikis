# Fine-tuning

Fine-tuning continues training a pretrained model on a much smaller, targeted dataset, most often example conversations, so that it behaves in a particular way.

## Supervised fine-tuning

**Supervised fine-tuning** (SFT), also called instruction tuning, trains on pairs of prompts and ideal responses, formatted with the model's [[fundamentals/what-is-an-llm#Base models and assistants|chat template]]. The loss is the same next-token loss as [[training/pretraining|pretraining]], usually counted only on the response tokens, so the model learns to produce answers rather than to imitate questions.

A few thousand to a few million examples is typical. The 2023 LIMA paper showed that about 1,000 carefully chosen examples could produce a capable assistant from a strong base model, which supports the view that SFT mostly teaches **format and style**, while knowledge comes from pretraining.

## What fine-tuning is good and bad at

| Good for | Poor for |
| --- | --- |
| A consistent format, tone or persona | Teaching many new facts reliably |
| A narrow task done well (classification, extraction, a house style) | Keeping up with changing information |
| Following a specific tool-call or output schema | Making a small model as capable as a large one in general |
| Shortening prompts by baking instructions in | Removing deep-seated behaviours safely |

For facts that change or that you need cited, **retrieval** (searching your documents and putting the results in the prompt) usually works better than fine-tuning. The two combine well: fine-tune for the format, retrieve for the facts.

## Catastrophic forgetting

Training hard on a narrow dataset can erode general abilities. Low learning rates, few epochs, mixing in general data, and [[training/lora|LoRA]] (which changes far fewer weights) all reduce it.

## Fine-tuning a model yourself

A typical home setup in 2025 and 2026:

1. **Choose a base.** Usually the instruct version of an open model, so you start from a working assistant.
2. **Prepare data** as conversations in JSON lines, a few hundred to tens of thousands of examples. Quality beats quantity.
3. **Train a LoRA adapter** on a [[training/lora#QLoRA|4-bit quantized]] copy of the model, using a library such as Hugging Face TRL with PEFT, Unsloth or Axolotl. MLX does the same on Apple silicon.
4. **Evaluate** on held-out examples, not on the training set.
5. **Merge and export.** Merge the adapter into the full-precision weights, convert to [[local/gguf|GGUF]] and quantize for [[local/llama-cpp|llama.cpp]] or [[local/ollama|Ollama]]. llama.cpp can also load a LoRA adapter separately with `--lora`.

## Licences

Fine-tuned models inherit the base model's licence. Some open-weight licences, such as Llama's community licence, add naming rules and usage restrictions. Apache 2.0 and MIT licensed models, such as many from Qwen, Mistral and OpenAI's gpt-oss, have fewer conditions. Check before you publish a fine-tune.

## See also

- [[training/lora|LoRA and QLoRA]], next on the reading path
- [[training/preference-tuning|Preference tuning]]
