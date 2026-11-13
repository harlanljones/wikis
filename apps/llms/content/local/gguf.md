# GGUF

GGUF is a single-file format for model weights used by llama.cpp and the tools built on it, holding the quantized tensors, the tokenizer, the chat template and every setting needed to run the model.

## What is inside

A GGUF file has three parts:

1. **A header** with the format version and counts.
2. **Metadata,** as typed key-value pairs: the architecture (`llama`, `qwen3`, `gemma3` and so on), layer count, hidden size, context length, [[fundamentals/positions|RoPE]] settings, the full [[fundamentals/tokens|tokenizer]] vocabulary and merges, special token IDs, and the [[fundamentals/what-is-an-llm#Base models and assistants|chat template]] as a Jinja template.
3. **Tensors,** each with a name, shape and [[quantization/k-quants|quantization type]], laid out so the file can be memory-mapped straight from disk.

Because everything is in one file, a GGUF model needs no `config.json`, no tokenizer files and no Python to run.

GGUF replaced the older GGML file format in August 2023. The name is usually expanded as "GGML Universal File" or "GPT-Generated Unified Format", depending on who you ask.

## Mixed types inside one file

A file called `Q4_K_M` is not entirely 4-bit. Different tensors get different types: for example, the token embeddings and some attention and feed-forward tensors that matter most are stored at higher precision, while the bulk of the MLP weights get 4-bit k-quants. That is why the file's average comes out at about 4.8 to 4.9 bits per weight rather than 4.5. See [[quantization/k-quants|k-quants]].

## Reading a file name

`Qwen3-14B-Instruct-Q4_K_M.gguf` (an illustrative name) tells you:

| Part | Meaning |
| --- | --- |
| `Qwen3` | Model family and generation |
| `14B` | About 14 billion parameters. MoE models may show both, such as `30B-A3B` |
| `Instruct` | A chat-tuned model, not a base model |
| `Q4_K_M` | The quantization type. See [[quantization/k-quants\|k-quants]] |

Other common tags: `IQ4_XS` and other `IQ` types are [[quantization/k-quants#I-quants|i-quants]]. `imat` or "imatrix" means an [[quantization/k-quants#The importance matrix|importance matrix]] was used. `UD` in Unsloth's files means their "dynamic" mixed recipes. `-00001-of-00003.gguf` means a model split into parts. llama.cpp loads the first part and finds the rest.

## Where to get files

- **Hugging Face** hosts most GGUF files. Search for the model name plus "GGUF". Well-known uploaders, such as the official model makers, `ggml-org`, `bartowski`, `unsloth` and `lmstudio-community`, produce files with documented settings and importance matrices.
- **Ollama's library** stores models in its own registry, as GGUF-based layers. See [[local/ollama|Ollama]].
- **Convert your own** with llama.cpp's `convert_hf_to_gguf.py`, then quantize with `llama-quantize`. This is the only route for a model that nobody has converted yet, or for your own [[training/fine-tuning|fine-tune]].

## Making one yourself

```sh
# From a Hugging Face model folder to a 16-bit GGUF
python convert_hf_to_gguf.py ./Model-Folder --outfile model-f16.gguf --outtype f16

# Optional, recommended below 5 bits: an importance matrix from sample text
llama-imatrix -m model-f16.gguf -f calibration.txt -o imatrix.dat

# Quantize
llama-quantize --imatrix imatrix.dat model-f16.gguf model-Q4_K_M.gguf Q4_K_M
```

## Common problems

- **Wrong or missing chat template:** answers that ramble, never stop, or print raw tags like `<|im_start|>`. Use a recent file and runtime, and in llama.cpp the `--jinja` option, which uses the template stored in the file.
- **"Unknown architecture":** the runtime is older than the model. Update it.
- **A file made with an old converter:** tokenizer bugs have been fixed in converters over time. Re-download from an uploader who keeps files current.

## See also

- [[local/llama-cpp|llama.cpp]], next on the reading path
- [[quantization/k-quants|k-quants and i-quants]]
