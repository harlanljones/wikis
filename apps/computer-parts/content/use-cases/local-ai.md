# Running AI models locally

> **In one sentence:** a model has to fit in graphics memory to run quickly, so VRAM is the spec that matters, and everything else is secondary.

"Local AI" means running language models, image generators or speech models on your own computer instead of through a cloud service. People do it for privacy, to avoid subscription fees, to work offline, or to experiment.

You do not need any special hardware to use cloud AI assistants. Those run on any computer with a browser. This page is only about running models yourself.

## The one idea to understand

A model is a large file of numbers. To run quickly, the whole file must be loaded into the graphics card's memory (VRAM). If it does not fit, the overflow runs on the processor and main memory, which is 5 to 20 times slower.

So the question is always: **how much fast memory do you have, and how large is the model?**

## How much memory for which models

Language model sizes are described by their parameter count, in billions ("8B"). Models are usually run in a compressed form called **quantization**, which shrinks them to roughly a quarter to a half of full size with little quality loss.

| Model size | Memory needed (4-bit quantized) | Capable of |
| --- | --- | --- |
| 3B to 4B | 3GB to 4GB | Simple chat, summarising, autocomplete |
| 7B to 9B | 6GB to 8GB | Good general chat and writing help |
| 12B to 14B | 9GB to 12GB | Noticeably better reasoning |
| 20B to 32B | 14GB to 24GB | Strong general and coding ability |
| 70B | 40GB to 48GB | Near the quality of large cloud models from a year or two ago |
| 100B and above | 64GB and up | Specialist setups |

Add 1GB to 4GB on top for the conversation's working memory, which grows with the length of the context.

Image generation models need 6GB to 8GB for older models and 12GB to 24GB for the latest ones at full quality. Video generation needs more still.

## Hardware routes

### Nvidia graphics card

The default choice. Nearly all AI software is built first for Nvidia's CUDA platform, so everything works with the least effort.

| VRAM | What it runs |
| --- | --- |
| 8GB | Small language models, older image models |
| 12GB | 12B to 14B language models, most image models |
| 16GB | 20B-class models, current image models |
| 24GB | 30B-class models comfortably. The enthusiast sweet spot |
| 32GB | The largest single consumer card |

For AI use, more VRAM on an older or slower card beats less VRAM on a newer, faster one. This is why used 24GB cards from earlier generations are sought after. See [[buying/used-and-refurbished|Buying used and refurbished]].

### Apple silicon Mac

Macs share one pool of memory between the processor and graphics, so a Mac with 64GB or 128GB of memory can load models that no single consumer graphics card can hold. Generation speed is lower than a high-end Nvidia card for models that fit on one, and it is a quiet, power-efficient way to run large models. Buy as much memory as you can, since it cannot be added later.

### PCs with large shared memory

Some high-end AMD and Intel laptop-class chips, such as the Ryzen AI Max family, pair strong integrated graphics with up to 128GB of shared memory in mini PCs and laptops. Like Macs, they trade speed for capacity.

### AMD and Intel graphics cards

They work, with more setup and less software support. AMD cards run common language model tools well. Image and video tools are more likely to assume Nvidia. Intel Arc cards offer a lot of VRAM for the money and the least mature software.

### Processor only

Possible for small models, using main memory. Expect a few words per second from a 7B model on a modern processor. Fine for trying things out.

### Multiple graphics cards

Language model software can split a model across two or more cards. Two 16GB cards hold a model that needs 30GB. It needs a motherboard with enough slots, a large power supply and a case with room.

## The rest of the computer

| Part | Guidance |
| --- | --- |
| Processor | Any current 6- or 8-core chip. It matters little once the model is on the graphics card |
| Main memory | At least as much as your VRAM, and preferably double. 32GB is a sensible minimum |
| Storage | Models are 4GB to 50GB each and collections grow fast. 1TB to 2TB of NVMe |
| Power supply | Sized for the graphics card, with headroom for a second card if you plan one |
| Cooling | AI workloads hold the graphics card at full load for long periods. Good case airflow matters |

## What an NPU does not do

Laptops marketed as "AI PCs" have a neural processing unit. It runs small built-in features such as background blur and live captions efficiently. It does not run large language or image models, and the "TOPS" figure quoted for it says nothing about that. For local models, look at VRAM or shared memory. See [[specs/marketing-terms#"AI PC" and "Copilot+ PC"|AI PC]].

## Speed

Language model speed is measured in **tokens per second**. A token is about three quarters of a word.

- Under 5 tokens per second feels slow.
- 15 to 30 is comfortable to read as it appears.
- 50 or more feels instant.

Speed depends on the model's size, the card's memory bandwidth, and whether the whole model fits in VRAM. A model that fits entirely on a mid-range card is far faster than a larger one that spills over on a high-end card.

## Getting started

1. Check how much VRAM you have: Task Manager, Performance tab, GPU, "Dedicated GPU memory". On a Mac, your total memory.
2. Install a tool that handles downloads and settings for you. Ollama and LM Studio are popular for language models. ComfyUI is common for image generation.
3. Start with a model that fits comfortably, at 4-bit quantization.
4. Move up in size until speed becomes annoying.

Try this on the hardware you own before buying anything. Small models on ordinary computers are enough to learn whether you want to go further.

## Training

Fine-tuning a model needs considerably more memory than running it, and training from scratch is beyond home hardware for anything but small models. Renting cloud graphics cards by the hour is usually cheaper for occasional training than buying hardware.

## Late 2026 note

This is the most expensive hobby in computing at the moment. The same memory shortage that raised prices is caused by AI data centers, and it has pushed high-VRAM cards furthest: the top consumer card is hard to buy at any sensible price, and 16GB cards carry a heavy premium. See [[market#Graphics cards|The market right now]].

Practical options:

- Use the hardware you have with smaller models.
- Look at used 24GB cards from earlier generations.
- Consider a Mac or a shared-memory mini PC if capacity matters more than speed.
- Rent cloud hardware for occasional heavy jobs.

## See also

- [[parts/gpu|Graphics card]]
- [[use-cases/programming|Programming]]
- [[specs/marketing-terms|Marketing terms to ignore]]
