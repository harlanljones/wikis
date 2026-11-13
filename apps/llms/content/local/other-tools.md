# Other tools

Beyond llama.cpp and Ollama, there are desktop apps for browsing and chatting, engines tuned for Apple silicon or for fast single-card GPU inference, servers for many users, and front ends that connect to any of them.

## At a glance

| Tool | Kind | Formats | Best for |
| --- | --- | --- | --- |
| LM Studio | Desktop app | GGUF, MLX | Browsing, trying and comparing models without a terminal |
| MLX and mlx-lm | Apple framework and command line | MLX | The fastest route on Apple silicon for many models, and fine-tuning on a Mac |
| vLLM | Server | Hugging Face weights, GPTQ, AWQ, FP8 and more | Many users at once on Nvidia or AMD cards |
| SGLang | Server | Similar to vLLM | Fast serving, structured output, prefix reuse |
| ExLlamaV2 and V3 | GPU engine | EXL2, EXL3 | Fast single-user inference on Nvidia cards at fractional bit widths |
| KoboldCpp | llama.cpp build with a web interface | GGUF | Fiction, role-play and long-form writing |
| text-generation-webui | Web interface over several engines | Many | Switching between engines and formats in one place |
| Jan | Desktop app | GGUF | A simple, open-source offline chat app |
| Open WebUI | Web front end | Talks to Ollama or any OpenAI-style API | A ChatGPT-like interface for a household or team |
| llamafile | Single-file executable | GGUF inside | Handing someone a model that just runs |

## LM Studio

A desktop app for Windows, macOS and Linux with a model browser that searches Hugging Face, shows which quantizations fit your memory, and downloads them. It runs llama.cpp everywhere and MLX on Macs, and can serve an OpenAI-compatible API (on port 1234 by default) for other programs. The app is free to use but not open source.

## MLX

Apple's array framework for its own chips, from Apple's machine learning research group. The `mlx-lm` package runs and fine-tunes language models:

```sh
pip install mlx-lm
mlx_lm.generate --model mlx-community/SomeModel-4bit --prompt "Hello"
```

MLX has its own quantized format (group-wise 4-bit, 6-bit and 8-bit, plus newer types), and the `mlx-community` organisation on Hugging Face publishes converted models. On Apple silicon it is often a little faster than llama.cpp for generation. [[training/lora|LoRA]] fine-tuning with `mlx_lm.lora` is one of the easiest ways to fine-tune on a Mac.

## vLLM and SGLang

Python servers built for throughput: [[local/serving#Continuous batching|continuous batching]], paged KV cache memory, tensor parallelism across cards, and high-performance kernels. They load Hugging Face weights directly, plus [[quantization/gptq|GPTQ]], [[quantization/awq|AWQ]], FP8 and other formats. They are the right choice for a shared server, and overkill for one person on one card. See [[local/serving|Serving models]].

## ExLlamaV2 and ExLlamaV3

GPU inference libraries by turboderp, for Nvidia cards. EXL2 files let you pick any average bit width, such as 4.65 bits, with the bits spread across layers by measured importance. EXL3, introduced in 2025, is based on trellis-coded quantization (the QTIP method) and aims for better quality at the same size. TabbyAPI is the usual server for them. See [[quantization/other-methods#EXL2 and EXL3|Other quantization methods]].

## Phones and browsers

- **Phones:** llama.cpp builds for Android and iOS, and apps built on it, run 1B to 4B models. MLC LLM compiles models for phone graphics chips.
- **Browsers:** WebLLM and Transformers.js run small models in a web page using WebGPU.

## See also

- [[local/choosing-a-model|Choosing a model]], next on the reading path
