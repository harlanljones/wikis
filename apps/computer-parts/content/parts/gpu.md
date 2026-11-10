# Graphics card (GPU)

> **In one sentence:** the graphics card decides how games look and run, and if you do not play games, edit video, do 3D work or run AI models, you do not need one.

## What it does

The GPU (graphics processing unit) draws the picture. It is built to do millions of small, similar calculations at once, which is what drawing a 3D scene requires. That same talent makes it useful for video effects, 3D rendering and AI.

There are two kinds:

- **Integrated graphics** is built into the [[parts/cpu|processor]]. It shares the computer's main memory. It handles video, office work, photo editing and light or older games.
- **A dedicated graphics card** is a separate part with its own memory and cooling. It is five to fifty times faster.

## What to buy

Start from your monitor. The resolution and refresh rate you want decide the card.

| You want | Card class | Graphics memory |
| --- | --- | --- |
| No gaming at all | Integrated graphics | None needed |
| Light games, older games, esports titles at 1080p | Entry level | 8GB |
| Modern games at 1080p, high settings | Lower mid-range | 8GB minimum, 12GB preferred |
| Modern games at 1440p | Mid-range | 12GB to 16GB |
| 4K, or 1440p at very high frame rates | High end | 16GB |
| Local AI models, heavy 3D rendering | As much memory as you can afford | 16GB to 32GB |

For the cards in each class today and what they cost, see [[market#Graphics cards|The market right now]]. Prices are well above normal in late 2026, so that page matters more than usual.

## The specs, explained

### The model tier

**Matters: most of all.**

The model number tells you the class of card. For Nvidia and AMD, the last two digits are the tier: 50 and 60 are entry and mainstream, 70 is upper mid-range, 80 and 90 are high end. Suffixes such as **Ti**, **Super** and **XT** mean "a step up from the plain version". See [[specs/gpu-model-names|Graphics card model names]].

Two cards with the same tier from different board makers (Asus, MSI, Gigabyte, Sapphire and so on) perform within a few percent of each other. They differ in cooler size, noise and price. Buy the cheapest one with good reviews for noise.

### VRAM (graphics memory)

**Matters: a lot, as a threshold.**

VRAM is the card's own memory, where it keeps textures and the scene it is drawing. More VRAM does not make a card faster. Too little makes a game stutter badly or forces you to lower texture quality.

- **8GB:** enough for 1080p in most games, with some settings lowered in the most demanding ones.
- **12GB:** comfortable for 1440p.
- **16GB:** comfortable for 4K and likely to last.
- **24GB to 32GB:** for AI work and professional rendering. Games do not need it.

A slow card with lots of VRAM is still a slow card. Some budget cards are sold with 16GB mainly because it looks good on the box.

### Resolution and frame rate targets

**Matters: this is what you are actually buying.**

Performance is measured in **frames per second (fps)**. 60fps is smooth. 100fps and above feels noticeably more responsive if your [[parts/monitor|monitor]] can show it. Higher resolutions are much harder to draw: 1440p has 78% more pixels than 1080p, and 4K has four times as many.

Reviews test each card at each resolution. That is the number to look for. See [[specs/benchmarks|Reading benchmarks and reviews]].

### Upscaling and frame generation (DLSS, FSR, XeSS)

**Matters: a lot in practice.**

**Upscaling** renders the game at a lower resolution and uses AI to rebuild a sharp full-resolution image. It gives 30% to 100% more fps for a small loss in image quality, and most people leave it on. Nvidia's version is **DLSS**, AMD's is **FSR**, Intel's is **XeSS**. DLSS generally looks best, and the latest FSR is close.

**Frame generation** inserts AI-made frames between real ones. It makes motion look smoother. It does not make the game respond faster, and it works badly when the starting frame rate is low. Advertised fps figures that rely on frame generation, especially "multi frame generation", overstate how the game will feel.

### Ray tracing

**Matters: if you care about it.**

Ray tracing simulates how light really behaves, giving accurate reflections and shadows. It is expensive to compute. Nvidia cards handle it best, current AMD cards are now competitive in most games, and a few new games require it. On entry-level cards you will usually turn it off.

### Power draw and connectors

**Matters: for your power supply.**

A graphics card is the most power-hungry part in a gaming PC, from about 130W for entry cards to 575W for the fastest. Every card lists a recommended [[parts/power-supply|power supply]] wattage. Mid-range and high-end Nvidia cards use a single small **12V-2x6** connector. Most AMD, Intel and entry-level Nvidia cards use one to three older **8-pin** connectors.

### Size

**Matters: check before you buy.**

High-end cards can be 35cm long and three or four slots thick. Check the card's length against your [[parts/case|case]]'s maximum GPU length.

## Specs you can mostly ignore

- **The board maker's "OC" or "Gaming X Trio" branding.** Factory overclocks add 1% to 3%.
- **Core clock speed in MHz.**
- **CUDA core or shader counts**, when comparing across generations or brands.
- **"VR ready", "8K ready", "AI ready".** See [[specs/marketing-terms|Marketing terms to ignore]].
- **Number of fans.** Reviews of noise and temperature tell you what you need.
- **PCIe 5.0 support.** Current cards lose almost nothing in a PCIe 4.0 slot. See the exception under Going deeper.

## Nvidia, AMD or Intel?

| | Nvidia GeForce | AMD Radeon | Intel Arc |
| --- | --- | --- | --- |
| Strengths | Best upscaling and ray tracing, widest software support for AI and creative apps | Usually more performance and VRAM per dollar, good Linux support | Cheapest capable cards, generous VRAM for the price |
| Weaknesses | Costs more for the same raw speed | Weaker in some professional and AI software | Entry level only, occasional driver problems in older games |
| Choose it if | You use AI tools, Blender, or creative apps that favor it, or you want the best features | You mainly play games and want value | You are building on a tight budget |

For video editing and local AI, check your specific software before choosing. Many AI tools assume Nvidia's CUDA. See [[use-cases/creative|Photo, video and 3D work]] and [[use-cases/local-ai|Running AI models locally]].

## Going deeper

- **VRAM allocation is not VRAM use.** Monitoring tools show how much a game reserved. Stutter and texture pop-in are the real signs of running out.
- **Some cards use only 8 PCIe lanes.** Several entry and mainstream cards are wired x8 to save cost. In an older PCIe 3.0 motherboard that halves the bandwidth, and can cost 5% to 15% when VRAM is also short. This matters when upgrading an old PC.
- **Laptop GPUs depend on wattage.** The same laptop chip may be given 60W in a thin laptop and 140W in a thick one, with a large performance gap. Listings call this TGP. See [[specs/gpu-model-names#Laptop graphics|Laptop graphics]].
- **Video encoding.** All three vendors have good hardware encoders for streaming and recording, and all current cards support AV1. Intel's Quick Sync, found even in Intel integrated graphics, is valued by video editors for smooth timeline playback of H.264 and H.265 footage.
- **The 12V-2x6 connector** replaced the earlier 12VHPWR design after reports of melted plugs on very high-wattage cards. Seat it fully, with no visible gap, and do not bend the cable sharply near the plug.
- **Multi-GPU setups for games are dead.** SLI and CrossFire are no longer supported. Multiple cards are still useful for rendering and AI.
- **Used cards from the previous generation** can be good value, particularly in a market like the current one. See [[buying/used-and-refurbished|Buying used and refurbished]].

## Common mistakes

- Buying a graphics card for a computer that will never run a game.
- Choosing by VRAM alone. A 16GB entry-level card is slower than a 12GB mid-range one.
- Plugging the monitor into the motherboard instead of the graphics card, which uses the integrated graphics and ignores the card.
- Buying a card too long for the case, or too hungry for the power supply.
- Buying a 4K-class card for a 1080p 60Hz monitor, or the other way round.
- Believing fps claims that include frame generation.

## See also

- [[specs/gpu-model-names|Graphics card model names]]
- [[parts/monitor|Monitor]], which should be chosen together with the card
- [[use-cases/gaming|Gaming]]
