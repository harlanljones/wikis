# Gaming

> **In one sentence:** choose the monitor and the graphics card together, give the graphics card the biggest share of the budget, and buy a sensible mid-range processor.

## What matters

| Part | How much | Notes |
| --- | --- | --- |
| Graphics card | The most | Sets the resolution and settings you can play at |
| Monitor | A lot | Sets what you can see of it |
| Processor | Moderate | Matters more at high frame rates and in simulation and strategy games |
| Memory | 16GB works, 32GB is comfortable | Two sticks |
| Storage | NVMe SSD, 1TB or more | Games are large |
| Power supply, cooling, case | Enough to support the graphics card | |

## Start with a target

Decide the resolution and frame rate you want. Everything else follows.

| Target | Graphics card class | Processor | Monitor |
| --- | --- | --- | --- |
| 1080p, 60fps, high settings | Entry, 8GB | Any current 6-core | 24-inch 1080p |
| 1080p, 144fps | Mainstream, 8GB to 12GB | Current 6-core | 24- or 27-inch 1080p, 144Hz or faster |
| 1440p, 60 to 100fps | Upper mid-range, 12GB to 16GB | Current 6-core | 27-inch 1440p, 144Hz |
| 1440p, 144fps and above | High end, 16GB | A fast 6- or 8-core, ideally X3D | 27-inch 1440p, 165Hz to 240Hz |
| 4K, 60fps and above | High end, 16GB | A fast 6- or 8-core | 27- or 32-inch 4K, 120Hz or more |

For which cards sit in each class today, see [[market#Graphics cards|The market right now]]. For complete part lists, see [[buying/budget-tiers|Builds by budget]].

## What kind of games?

Different games stress different parts.

| Games | Lean on | Notes |
| --- | --- | --- |
| Competitive shooters and esports titles | Processor and a fast monitor | Light on the graphics card. Very high frame rates are easy to reach |
| Big-budget single-player games | Graphics card and VRAM | The hardest games to run |
| Strategy, simulation, city builders, large modded games | Processor and memory | X3D chips make the biggest difference here |
| Indie and older games | Almost nothing | Integrated graphics often suffices |
| Virtual reality | Graphics card | Needs high, steady frame rates |
| Flight and racing simulators | Processor, graphics card and memory | Among the most demanding of all |

## Settings that cost the most

When a game runs poorly, these settings give back the most performance for the least visual loss:

1. **Turn on upscaling** (DLSS, FSR or XeSS) at the "Quality" setting.
2. **Lower ray tracing**, or turn it off.
3. **Lower shadows and volumetric effects** by one step.
4. **Lower the resolution** only as a last resort.

Texture quality costs VRAM and almost no speed. Keep it as high as your card's memory allows. See [[parts/gpu|Graphics card]].

## Desktop, laptop, handheld or console

| Option | For | Against |
| --- | --- | --- |
| Gaming desktop | Most performance per dollar, upgradable, quiet | Not portable |
| Gaming laptop | Portable | Costs more for the same performance, loud, short battery life |
| Handheld gaming PC | Play anywhere, good value | Low resolution, modest performance |
| Console | Cheap for what it does, simple | Fewer kinds of game, paid online play, no upgrades |
| Cloud gaming | No hardware to buy | Needs a fast, steady connection. Monthly fee |

A console remains the cheapest way into current games. A PC costs more and offers higher frame rates, cheaper games over time, mods, and a machine that does everything else too.

## Common questions

**Is 8GB of VRAM enough?** At 1080p, yes for most games, with textures lowered in a few. At 1440p it is tight. In normal times 12GB to 16GB is the better buy. At current prices the 16GB versions of mid-range cards cost too much. See [[market#Graphics cards|The market right now]].

**Do I need an X3D processor?** Only if you have a high-end graphics card and a high refresh monitor, or play simulation and strategy games. With a mid-range card, a standard six-core chip gives nearly the same frame rates.

**16GB or 32GB of memory?** 16GB runs nearly every game. 32GB helps if you keep a browser, chat and streaming software open, or play heavily modded games. At current memory prices, 16GB with two slots left free is a reasonable start.

**Nvidia or AMD?** See the comparison under [[parts/gpu#Nvidia, AMD or Intel?|Nvidia, AMD or Intel?]].

**Will my processor bottleneck my graphics card?** Watch usage in a game. If the graphics card sits near 100%, no. See [[specs/benchmarks#Benchmarking your own computer|Benchmarking your own computer]].

**Does a gaming PC need liquid cooling?** No. See [[parts/cooling|Cooling]].

## After you buy

1. Plug the monitor into the graphics card.
2. Set the monitor's refresh rate in Windows display settings.
3. Enable XMP or EXPO for the memory. See [[building/assembly#First boot|First boot]].
4. Install the current graphics driver.
5. Turn on variable refresh rate (G-Sync or FreeSync) in the driver.
6. Cap the frame rate a few frames below the monitor's refresh rate for smooth, tear-free play.

## Streaming and recording

Streaming your gameplay adds load. Current graphics cards have dedicated encoders that handle it with little performance cost. Add memory (32GB), and consider an 8-core processor if you also run overlays, chat and a browser. A second monitor helps more than any internal part.

## Linux and gaming

Gaming on Linux has become practical thanks to Valve's Proton compatibility layer, which runs most Windows games. AMD graphics cards have the smoothest driver support. The main gap is online games whose anti-cheat does not support Linux. Check a game on ProtonDB before relying on it.

## See also

- [[buying/budget-tiers|Builds by budget]]
- [[parts/gpu|Graphics card]] and [[parts/monitor|Monitor]]
- [[specs/gpu-model-names|Graphics card model names]]
