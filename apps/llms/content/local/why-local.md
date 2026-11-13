# Why run models locally

Running a model yourself keeps your data on your machine, costs nothing per token, works offline and gives you full control, at the price of lower capability than the best cloud models and an up-front cost in hardware.

## Reasons people do it

- **Privacy.** Prompts and documents never leave your computer. This matters for medical, legal and company data, and for anything you would not paste into a website.
- **Cost at volume.** Once you own the hardware, a million tokens costs only electricity. For batch jobs such as tagging thousands of documents, this adds up.
- **Offline and reliable.** No account, no rate limits, no outages, no model being retired or changed under you.
- **Control.** You choose the exact model, version, [[fundamentals/sampling|sampler settings]], [[fundamentals/what-is-an-llm#Base models and assistants|system prompt]] and context length. Results stay reproducible.
- **Learning and research.** You can inspect activations, try [[interpretability/steering|steering]], fine-tune, and run [[interpretability|interpretability]] experiments, none of which a closed API allows.
- **Latency.** A small model on a local card can answer before a network round trip would finish.

## Where cloud models are still better

- **Capability.** The strongest commercial models are larger than anything most people can run and are usually ahead of the best open-weight models by some months. Hard coding, long agentic tasks and expert questions show the gap most.
- **Long context at speed.** Holding hundreds of thousands of tokens needs memory that home hardware rarely has.
- **No hardware to manage.** No drivers, no memory arithmetic, no fan noise.

## The cost question

Buying hardware only to save money rarely pays off for light, conversational use: a subscription or pay-per-token API is cheaper unless you run models many hours a day. Local makes economic sense for heavy batch work, for privacy that is worth paying for, or when you already own a capable graphics card or a Mac with plenty of memory.

## Open weights, open source

"Open-weight" means the trained weights are downloadable. It does not always mean the training data or code is available, or that any use is allowed. A few models, such as AI2's OLMo family, publish data, code and checkpoints as well. Licences range from Apache 2.0 and MIT to custom licences with usage restrictions. See [[local/choosing-a-model#Licences|Choosing a model]].

## See also

- [[local/hardware|Hardware and memory]], next on the reading path
