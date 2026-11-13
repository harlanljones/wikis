/**
 * The memory calculator on the hardware page: how much memory a model needs to run,
 * from its size, its quantization, its shape and the context length.
 *
 * It is a plain form that submits to the same page, so the sum is done here on the server
 * and the page needs no script.
 */

/** Typical average bits per weight of a whole GGUF file, embeddings and output layer included. */
export const QUANTS = [
  { id: "F16", bits: 16 },
  { id: "Q8_0", bits: 8.5 },
  { id: "Q6_K", bits: 6.6 },
  { id: "Q5_K_M", bits: 5.7 },
  { id: "Q4_K_M", bits: 4.9 },
  { id: "IQ4_XS", bits: 4.4 },
  { id: "Q3_K_M", bits: 3.9 },
  { id: "IQ3_XXS", bits: 3.1 },
  { id: "IQ2_XXS", bits: 2.1 },
] as const;

/** Bytes per stored number in the KV cache for each cache type llama.cpp offers. */
export const CACHE_TYPES = [
  { id: "f16", bytes: 2 },
  { id: "q8_0", bytes: 34 / 32 },
  { id: "q4_0", bytes: 18 / 32 },
] as const;

/** Memory for the compute buffers and the runtime itself, in gigabytes. A rough allowance. */
export const OVERHEAD_GB = 0.8;

const GB = 1e9;

export interface VramInput {
  /** Parameters, in billions. */
  params: number;
  quant: string;
  /** Context length, in tokens. */
  context: number;
  layers: number;
  kvHeads: number;
  headDim: number;
  cacheType: string;
}

export const DEFAULTS: VramInput = {
  params: 8,
  quant: "Q4_K_M",
  context: 8192,
  layers: 32,
  kvHeads: 8,
  headDim: 128,
  cacheType: "f16",
};

export interface VramEstimate {
  weightsGb: number;
  cacheGb: number;
  overheadGb: number;
  totalGb: number;
  /** Bytes of KV cache for each token of context. */
  cacheBytesPerToken: number;
}

/**
 * Weights take parameters times bits per weight. The KV cache stores a key and a value
 * vector for every layer, every KV head and every token of context.
 */
export function estimate(input: VramInput): VramEstimate {
  const bits = QUANTS.find((quant) => quant.id === input.quant)?.bits ?? 16;
  const bytes = CACHE_TYPES.find((type) => type.id === input.cacheType)?.bytes ?? 2;
  const weightsGb = (input.params * 1e9 * bits) / 8 / GB;
  const cacheBytesPerToken = 2 * input.layers * input.kvHeads * input.headDim * bytes;
  const cacheGb = (cacheBytesPerToken * input.context) / GB;
  return {
    weightsGb,
    cacheGb,
    overheadGb: OVERHEAD_GB,
    totalGb: weightsGb + cacheGb + OVERHEAD_GB,
    cacheBytesPerToken,
  };
}

function numberParam(params: URLSearchParams, name: string, fallback: number, min: number, max: number): number {
  const value = Number(params.get(name));
  if (!params.has(name) || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

/** Reads the form's fields from a query string, falling back to the defaults and clamping to sane ranges. */
export function parseInput(params: URLSearchParams): VramInput {
  const quant = params.get("quant") ?? "";
  const cacheType = params.get("cache") ?? "";
  return {
    params: numberParam(params, "params", DEFAULTS.params, 0.1, 2000),
    quant: QUANTS.some((entry) => entry.id === quant) ? quant : DEFAULTS.quant,
    context: Math.round(numberParam(params, "context", DEFAULTS.context, 256, 2_000_000)),
    layers: Math.round(numberParam(params, "layers", DEFAULTS.layers, 1, 400)),
    kvHeads: Math.round(numberParam(params, "kvheads", DEFAULTS.kvHeads, 1, 256)),
    headDim: Math.round(numberParam(params, "headdim", DEFAULTS.headDim, 16, 1024)),
    cacheType: CACHE_TYPES.some((entry) => entry.id === cacheType) ? cacheType : DEFAULTS.cacheType,
  };
}

/**
 * How much of a card's memory a model can use, in the same decimal gigabytes as the estimate.
 * Memory sizes are sold in binary units (a "24 GB" card holds 24 GiB, about 25.8 GB),
 * and about 5% is kept back for the display, the driver and everything else.
 */
export function usableGb(size: number): number {
  return size * 1.073741824 * 0.95;
}

/** Common amounts of fast memory, from small graphics cards to large unified-memory machines. */
const MEMORY_SIZES = [8, 12, 16, 24, 32, 48, 64, 96, 128];

const gb = (value: number) => (value < 10 ? value.toFixed(1) : Math.round(value).toString());

function field(label: string, name: string, value: number, step: string, hint: string): string {
  return (
    `<label><span>${label}</span>` +
    `<input type="number" name="${name}" value="${value}" min="0" step="${step}" inputmode="decimal">` +
    `<small>${hint}</small></label>`
  );
}

function select(label: string, name: string, options: readonly { id: string }[], value: string, hint: string): string {
  const choices = options
    .map((option) => `<option${option.id === value ? " selected" : ""}>${option.id}</option>`)
    .join("");
  return `<label><span>${label}</span><select name="${name}">${choices}</select><small>${hint}</small></label>`;
}

/** The form, filled in with `input`, and the estimate underneath it. */
export function renderCalculator(input: VramInput, action: string): string {
  const result = estimate(input);
  const fits = MEMORY_SIZES.map((size) => {
    const usable = usableGb(size);
    const verdict = result.totalGb <= usable ? "fits" : result.weightsGb + result.overheadGb <= usable ? "tight" : "no";
    const text = { fits: "Fits", tight: "Weights fit, shorten the context", no: "Does not fit" }[verdict];
    return `<li class="fit-${verdict}"><strong>${size} GB</strong> ${text}</li>`;
  }).join("");

  return (
    `<form class="vram-form" method="get" action="${action}#memory-calculator">` +
    field("Parameters (billions)", "params", input.params, "0.1", "The B in 8B. For a mixture of experts, the total, not the active count.") +
    select("Quantization", "quant", QUANTS, input.quant, "The GGUF file type.") +
    field("Context (tokens)", "context", input.context, "256", "How long a conversation you want to hold.") +
    field("Layers", "layers", input.layers, "1", "num_hidden_layers in the model's config.json.") +
    field("KV heads", "kvheads", input.kvHeads, "1", "num_key_value_heads.") +
    field("Head size", "headdim", input.headDim, "1", "head_dim, or hidden_size divided by num_attention_heads.") +
    select("KV cache type", "cache", CACHE_TYPES, input.cacheType, "f16 unless you set --cache-type-k and -v.") +
    `<button type="submit">Estimate</button>` +
    `</form>` +
    `<div class="vram-result" role="status">` +
    `<p class="vram-total"><strong>About ${gb(result.totalGb)} GB</strong> of fast memory</p>` +
    `<table><tbody>` +
    `<tr><td>Weights</td><td>${gb(result.weightsGb)} GB</td></tr>` +
    `<tr><td>KV cache</td><td>${gb(result.cacheGb)} GB (${Math.round(result.cacheBytesPerToken / 1024)} KB per token)</td></tr>` +
    `<tr><td>Runtime and buffers</td><td>${gb(result.overheadGb)} GB</td></tr>` +
    `</tbody></table>` +
    `<ul class="vram-fits">${fits}</ul>` +
    `</div>`
  );
}
