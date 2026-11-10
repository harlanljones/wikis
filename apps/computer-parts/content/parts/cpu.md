# Processor (CPU)

> **In one sentence:** the processor does the general thinking, and a current mid-range one is fast enough for nearly everyone.

## What it does

The CPU (central processing unit) runs your programs. Every click, every web page, every line of a spreadsheet passes through it. In the [[basics|kitchen analogy]] it is the head chef.

Two things make a processor fast:

- **How quickly one core works.** This affects everything, and matters most for games and everyday snappiness.
- **How many cores it has.** This matters when work can be split up: video exports, 3D rendering, compiling code, running many apps at once.

## What to buy

| You do | Look for | Typical desktop price |
| --- | --- | --- |
| Web, office, streaming, schoolwork | Any current 6-core chip, or a recent 4-core in a budget laptop | $130 to $200 |
| Gaming | A current 6- or 8-core chip. AMD's X3D models are the fastest for games | $170 to $480 |
| Photo and video editing, streaming while gaming | 8 to 16 cores | $250 to $600 |
| 3D rendering, heavy code compiling, virtual machines | 16 cores or more | $500 and up |

For current model names and prices, see [[market#Processors|The market right now]]. For laptops, the processor family matters more than the exact model. See [[buying/laptops|How to choose a laptop]].

Most people overspend here. In games, the difference between a $180 processor and a $480 one is small unless you also own a top-end graphics card. Put the difference into the [[parts/gpu|graphics card]] or the [[parts/monitor|monitor]].

## The specs, explained

### Cores and threads

**Matters: a lot, up to the number your work can use.**

A **core** is one independent worker inside the chip. A **thread** is a task a core can handle. Some cores can juggle two threads at once (Intel calls this Hyper-Threading, AMD calls it SMT), which adds perhaps 20% to 30% more throughput, far short of a second core.

- 4 cores: fine for basic use. Starting to feel tight.
- 6 cores: the sensible minimum for a new desktop, and plenty for gaming.
- 8 cores: comfortable for gaming plus background apps, and light creative work.
- 12 to 16 cores: for work that uses them, such as video export and rendering.
- 24 or more: workstations.

More cores do nothing for a program that only uses a few. Most games use six to eight.

### Performance cores and efficiency cores

**Matters: when comparing Intel core counts with AMD ones.**

Recent Intel chips (and Apple, Qualcomm and some AMD laptop chips) mix two kinds of core: fast **P-cores** (performance) and smaller, slower **E-cores** (efficiency). An Intel chip listed as "24 cores" may have 8 fast cores and 16 small ones. It is a good design, but 24 Intel cores do not equal 24 full-size AMD cores. Compare benchmarks, not core counts. See [[specs/benchmarks|Reading benchmarks and reviews]].

### Clock speed (GHz)

**Matters: only within the same generation and brand.**

Clock speed is how many cycles a core runs per second. A 5.0GHz chip from 2026 is far faster than a 5.0GHz chip from 2016, because newer designs do more work in each cycle. Use GHz to compare two chips in the same family. Never use it to compare across brands or years.

"Up to 5.7GHz" is the **boost** or **turbo** speed, reached for short bursts on one or two cores. The lower "base" speed is rarely relevant on desktops.

### Generation

**Matters: more than the tier name.**

A new mid-range chip usually beats an old high-end one. A current Core Ultra 5 is faster than a Core i7 from five years ago. Store listings that say only "Intel Core i7" without a model number are hiding the generation, which is usually old. See [[specs/cpu-model-names|Processor model names]].

### Cache, and what X3D means

**Matters: for gaming.**

Cache is a small pool of very fast memory inside the processor. Games benefit from a lot of it. AMD's **X3D** chips stack extra cache on top of the processor, which makes them the fastest gaming chips by a clear margin, often 15% to 25% ahead of the equivalent non-X3D model in games. They are no faster for most other work. If you do not game, do not pay for X3D.

### Socket

**Matters: for compatibility and future upgrades.**

The socket is the physical connector on the [[parts/motherboard|motherboard]]. The processor and motherboard must share one. Current desktop sockets are AMD's **AM5** and Intel's **LGA 1851**. AMD tends to keep a socket for many years, so you can drop in a newer chip later without replacing the board. Intel changes sockets more often.

### Integrated graphics

**Matters: if you are not buying a graphics card.**

Most processors include a basic graphics chip that can run a display, play video and handle light games. Check for it if your build has no graphics card:

- Intel chips ending in **F** have no integrated graphics.
- AMD desktop chips ending in **F** have none either. AMD chips ending in **G** have unusually strong integrated graphics.
- In laptops, integrated graphics quality varies a great deal between chips, and it decides whether light gaming is possible.

### Power draw and TDP

**Matters: for choosing a cooler and a power supply.**

**TDP** (thermal design power) is a number in watts that is supposed to describe heat output. In practice it is closer to a category label. A "65W" AMD chip can draw about 88W, a "170W" one about 230W, and Intel's top chips can draw 250W. What it tells you:

- 65W class: any decent $30 air cooler will do.
- 105W to 125W class: a good tower air cooler.
- Top-end chips: a large air cooler or a liquid cooler. See [[parts/cooling|Cooling]].

In laptops, a lower-power chip means longer battery life and a thinner body, and less sustained speed.

## Specs you can mostly ignore

- **Nanometers (process node).** "3nm" and "18A" are manufacturing labels that stopped being literal measurements years ago. Compare results, not nodes.
- **Base clock speed** on a desktop chip.
- **NPU and "TOPS".** A neural processing unit speeds up a handful of on-device AI features such as webcam background blur. Windows requires 40 TOPS for its Copilot+ features. Few people will notice whether they have one. It has nothing to do with running large AI models, which needs a [[parts/gpu|graphics card]]. See [[use-cases/local-ai|Running AI models locally]].
- **"Unlocked" (Intel K, most AMD chips)** unless you plan to overclock, which is rarely worth the effort now.
- **The bundled cooler.** Most mid-range and better chips no longer include one.

## Going deeper

- **Single-thread performance is the product of clock speed and IPC** (instructions per cycle). IPC gains are why generations matter. Both vendors gain roughly 5% to 15% per generation.
- **Memory speed affects processor performance**, especially in games. AMD's AM5 chips are happiest around DDR5-6000 with low latency. Intel's current chips scale to faster kits. See [[parts/memory|Memory]].
- **X3D trade-offs.** Current 9000-series X3D chips place the cache under the cores, which fixed the heat and clock-speed penalties of earlier generations. The 16-core X3D models put extra cache on only one of their two core clusters and rely on the operating system to schedule games onto it.
- **Intel's current desktop chips have no Hyper-Threading.** Their thread count equals their core count.
- **AVX-512** is supported on AMD's current desktop chips and absent from Intel's consumer ones. It matters for some scientific, emulation and encoding workloads.
- **Power limits are settings.** AMD's Eco Mode and Intel's power limits let you trade a few percent of multi-core speed for much less heat and noise. A 170W chip run at 105W often loses under 10%.
- **Reliability history.** Intel's 13th and 14th generation desktop chips had a voltage fault that degraded some processors. Microcode updates addressed it. If you buy one used, update the motherboard BIOS before anything else.

## Common mistakes

- Buying on tier name ("it's an i7") without checking the generation.
- Pairing a top-end processor with a weak graphics card for gaming. The reverse is the better imbalance.
- Buying an F-suffix chip for a build with no graphics card, and getting no picture.
- Buying a processor and motherboard with different sockets. See [[building/compatibility|Compatibility checklist]].
- Assuming more cores will make games faster.
- Forgetting that most chips need a cooler bought separately.

## See also

- [[specs/cpu-model-names|Processor model names]]
- [[parts/motherboard|Motherboard]] and [[parts/cooling|Cooling]]
- [[market#Processors|Current processors and prices]]
