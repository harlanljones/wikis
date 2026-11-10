# Graphics card model names

> **In one sentence:** the first digits are the generation, the last two are the tier, and a laptop chip shares a name with a desktop card without sharing its performance.

For the cards on sale today and their prices, see [[market#Graphics cards|The market right now]].

## Nvidia GeForce

Take **GeForce RTX 5070 Ti**:

| Piece | Meaning |
| --- | --- |
| GeForce | Nvidia's consumer graphics brand |
| RTX | Supports ray tracing and DLSS. Older "GTX" cards do not |
| 50 | The generation |
| 70 | The tier |
| Ti | A step up from the plain 5070 |

Generations: 20 series (2018), 30 series (2020), 40 series (2022), 50 series (2025).

Tiers:

| Tier | Class | Typical target |
| --- | --- | --- |
| 50 | Entry | 1080p, reduced settings |
| 60 | Mainstream | 1080p |
| 70 | Upper mid-range | 1440p |
| 80 | High end | 4K |
| 90 | Flagship | 4K at maximum settings, professional work |

Suffixes, slowest to fastest within a tier: plain, then **Super**, then **Ti**, then **Ti Super**.

## AMD Radeon

Take **Radeon RX 9070 XT**:

| Piece | Meaning |
| --- | --- |
| Radeon RX | AMD's consumer graphics brand |
| 9 | The generation: the 9000 series. The previous desktop generation was 7000 |
| 070 | The tier, deliberately lined up with Nvidia's numbering |
| XT | A step up from the plain 9070 |

Other suffixes: **XTX** was the top model in the 7000 series. **GRE** marks a cut-down variant of a card, cheaper and sometimes with less memory.

## Intel Arc

Take **Arc B580**:

| Piece | Meaning |
| --- | --- |
| Arc | Intel's graphics brand |
| B | The generation. A-series came first, then B-series |
| 5 | The tier: 3, 5 or 7 |
| 80 | Position within the tier |

## Comparing across generations

A useful rule of thumb: **a new card performs roughly like the previous generation's card one tier up.** A 60-class card from the current generation lands near the previous 70-class card. It is only a rough guide, and it has been less reliable in recent generations, so check a benchmark chart before relying on it. See [[specs/benchmarks|Reading benchmarks and reviews]].

It follows that a tier name alone tells you little. An RTX 3080 from 2020 and an RTX 5060 Ti from 2025 are in the same performance neighborhood despite the very different names.

## The second name: who built the card

Nvidia, AMD and Intel design the chips. Other companies build the cards around them, adding their own cooler and name: Asus, MSI, Gigabyte, Sapphire, PowerColor, XFX, Zotac, PNY and others. A listing such as "MSI GeForce RTX 5070 Ventus 2X OC 12G" breaks down as:

| Piece | Meaning |
| --- | --- |
| MSI | The board maker |
| GeForce RTX 5070 | The chip. This decides performance |
| Ventus 2X | MSI's cooler line. Here, the basic two-fan model |
| OC | A small factory overclock, worth 1% to 3% |
| 12G | 12GB of VRAM |

Each maker has budget, mid-range and premium cooler lines. Premium lines run a little quieter and cooler and cost $50 to $300 more. Performance is nearly identical. **Founders Edition** is Nvidia's own design.

## Watch for same name, different card

Some model names are sold with two memory sizes, such as an 8GB and a 16GB version of the same card. They are otherwise the same chip, but the smaller one runs out of memory sooner. Read the full listing, because the memory size is sometimes the only difference in the title.

## Laptop graphics

Laptop graphics chips reuse desktop names and are slower, sometimes by a full tier or more. A laptop "RTX 5080" is not a desktop RTX 5080.

Two things to check:

**VRAM.** Laptop versions often have less memory than the desktop card of the same name.

| Laptop chip | VRAM |
| --- | --- |
| RTX 5050, 5060, 5070 | 8GB |
| RTX 5070 Ti | 12GB |
| RTX 5080 | 16GB |
| RTX 5090 | 24GB |

**Wattage (TGP).** Laptop makers choose how much power to give the chip. The same chip might get 60W in a thin laptop and 115W or more in a thick one, and perform very differently. Good listings state the TGP in watts. If it is missing, look for a review.

## Integrated graphics names

| Name | Found in | Capability |
| --- | --- | --- |
| Intel UHD Graphics, Intel Graphics | Older and budget Intel chips | Video and office work only |
| Intel Arc Graphics (130V, 140V, 140T) | Core Ultra Series 2 laptops | Light gaming at low settings |
| Intel Arc B390 | Core Ultra Series 3 "X" models | Real 1080p gaming at medium settings |
| AMD Radeon 840M, 860M | Ryzen AI 5 and 7 laptops | Light gaming |
| AMD Radeon 880M, 890M | Ryzen AI 9 laptops | Solid 1080p gaming at low to medium settings |
| AMD Radeon 8050S, 8060S | Ryzen AI Max | Comparable to a mid-range laptop graphics chip |
| Apple M-series graphics | Macs | Strong, especially in Pro and Max chips, though fewer games are available |
| Qualcomm Adreno | Snapdragon laptops | Light gaming, limited by game compatibility |

## Workstation cards

Nvidia's **RTX PRO** (formerly Quadro and RTX A-series) and AMD's **Radeon Pro** cards are built for engineering and visualisation software, with certified drivers and large memory. They cost far more than gaming cards of the same speed. Unless your software vendor requires one, buy a gaming card.

## See also

- [[parts/gpu|Graphics card]]
- [[specs/cpu-model-names|Processor model names]]
- [[use-cases/gaming|Gaming]]
