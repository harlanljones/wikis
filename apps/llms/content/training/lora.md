# LoRA and QLoRA

LoRA fine-tunes a model by freezing all its weights and training a pair of small matrices beside each chosen layer, which cuts the memory and storage needed by orders of magnitude, and QLoRA does the same on a 4-bit copy of the model.

## The idea

A weight matrix *W* in a transformer might be 4,096 × 4,096: about 16.8 million numbers. Full fine-tuning learns a change Δ*W* of the same size.

LoRA (low-rank adaptation, Hu and others, 2021) assumes the change has low **rank**: it can be written as the product of two thin matrices, *B* (4,096 × *r*) and *A* (*r* × 4,096), with *r* small, such as 16. That is about 131,000 trainable numbers instead of 16.8 million, under 1 percent.

During training *W* is frozen and only *A* and *B* are learned. The layer computes *W x* + (*α* / *r*) *B A x*, where *α* is a scaling setting. *B* starts at zero, so training begins from the original model exactly.

## Why it works so well

- **Memory.** Gradients and optimizer state are only needed for the small matrices, so the roughly 16 bytes per parameter of [[training/pretraining#Memory during training|full training]] shrinks to little more than the frozen weights themselves.
- **Storage.** An adapter is megabytes, not gigabytes. You can keep dozens for one base model and swap them at load time.
- **No cost at inference after merging.** *B A* can be added into *W* once, giving an ordinary model of the original size and speed.

## Settings that matter

| Setting | Typical value | Effect |
| --- | --- | --- |
| Rank *r* | 8 to 64 | Capacity of the adapter. Higher for bigger changes |
| Alpha *α* | Equal to or twice *r* | Scales the adapter's contribution |
| Target modules | All attention and MLP projections | Adapting all linear layers usually beats attention only |
| Learning rate | Around 1 × 10⁻⁴ to 2 × 10⁻⁴ | Higher than full fine-tuning, because the adapter starts at zero |

## QLoRA

QLoRA (Dettmers and others, 2023) stores the frozen base model in 4 bits, using a format called **NF4** ("4-bit NormalFloat"), whose 16 levels are spaced to match the bell-shaped distribution of trained weights. The adapter is trained in 16-bit on top of it. It also introduced **double quantization** (quantizing the scale factors themselves) and paged optimizers to survive memory spikes.

The result: a 65B model could be fine-tuned on one 48 GB card, with results close to 16-bit fine-tuning. NF4 is part of the bitsandbytes library and is covered with the other formats in [[quantization/other-methods|Other quantization methods]].

## Relatives

- **DoRA** splits each weight into a direction and a magnitude and adapts them separately.
- **rsLoRA** changes the scaling so that higher ranks train stably.
- **LoftQ** and similar methods initialise the adapter to cancel some of the error from quantizing the base.
- **Prefix tuning** and **prompt tuning** learn virtual tokens instead of weight changes. They are rarely used now.

## See also

- [[training/preference-tuning|Preference tuning]], next on the reading path
- [[training/fine-tuning|Fine-tuning]]
