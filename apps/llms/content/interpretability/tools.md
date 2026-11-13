# Interpretability tools

You can do real interpretability on a home computer with small open models, using TransformerLens or nnsight to read and edit activations, SAELens for sparse autoencoders, and Neuronpedia to browse features without writing code.

## The main libraries

| Tool | What it is | Good for |
| --- | --- | --- |
| TransformerLens | A Python library, started by Neel Nanda, that reimplements many open models with a "hook" at every activation | Learning, [[interpretability/activation-patching\|patching]], [[interpretability/attention-heads\|attention]] analysis on models up to a few billion parameters |
| nnsight | A library from Northeastern University's Bau lab that wraps any PyTorch model and lets you read and write activations inside a `trace` block | Working with the original Hugging Face models, including large ones through the NDIF remote service |
| SAELens | Loads, trains and analyses [[interpretability/sparse-autoencoders\|sparse autoencoders]] | Using Gemma Scope and other open SAEs |
| Neuronpedia | A website for browsing SAE features, steering and [[interpretability/attribution-graphs\|attribution graphs]] | Exploring without code |
| circuit-tracer | Anthropic's open-source library for attribution graphs | Tracing prompts on Gemma and Llama models |
| pyvene | Stanford's library for interventions, including trained ones | Causal abstraction experiments |
| CircuitsVis | Interactive attention pattern views in notebooks | Looking at what heads attend to |

## A first experiment

Patching a fact in GPT-2 small with TransformerLens:

```python
from transformer_lens import HookedTransformer

model = HookedTransformer.from_pretrained("gpt2")
clean = "The Eiffel Tower is in the city of"
corrupt = "The Colosseum is in the city of"

paris, rome = model.to_single_token(" Paris"), model.to_single_token(" Rome")
_, clean_cache = model.run_with_cache(clean)

def patch_resid(resid, hook, pos):
    resid[:, pos] = clean_cache[hook.name][:, pos]
    return resid

for layer in range(model.cfg.n_layers):
    logits = model.run_with_hooks(
        corrupt,
        fwd_hooks=[(f"blocks.{layer}.hook_resid_pre", lambda r, hook: patch_resid(r, hook, -1))],
    )
    print(layer, (logits[0, -1, paris] - logits[0, -1, rome]).item())
```

This needs the two prompts to have the same number of tokens. Check with `model.to_str_tokens`. The ARENA course (below) builds this up properly.

## Hardware

- **GPT-2 small, Pythia up to 1B, Gemma 2 2B, Llama 3.2 1B:** a laptop processor or any graphics card. Most teaching material uses these.
- **7B to 9B models:** a 24 GB card for caching activations. SAE training needs more.
- **Larger:** remote services such as NDIF, or cloud graphics cards.

Interpretability needs full-precision or 16-bit models with access to internals, so it uses Hugging Face weights and PyTorch, not [[local/gguf|GGUF]] files. llama.cpp's [[interpretability/steering#Steering locally|control vectors]] are the exception.

## Learning resources

- **ARENA** (Alignment Research Engineer Accelerator): free notebooks covering transformers from scratch, TransformerLens, induction heads, IOI, superposition and SAEs.
- **Neel Nanda's guides and "200 open problems" lists** for getting started in research.
- **The Transformer Circuits Thread** (transformer-circuits.pub), Anthropic's series of long-form papers.
- The [[reading-list|Reading list]] in this wiki lists the key papers in order.

## See also

- [[interpretability/open-problems|Open problems]], next on the reading path
