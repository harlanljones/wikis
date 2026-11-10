# Marketing terms to ignore

> **In one sentence:** if a term has no number and no standard behind it, it is decoration, and if it has a suspiciously large number, check how it was measured.

This page lists words and figures that appear on boxes and listings and tell you little. Some are meaningless. Others are real but routinely misused.

## Words with no definition

| Term | What it means in practice |
| --- | --- |
| Gaming | Nothing specific. Applied to chairs, routers, memory and SSDs. Usually adds lighting and price |
| Pro, Ultra, Elite, Extreme, Max | Product tier names chosen by the maker. Only comparable within one product line |
| Military grade, aircraft grade | Sometimes refers to a real durability test, usually to nothing |
| Premium, flagship, next-gen | Nothing |
| Future-proof | Nothing lasts forever. See below |
| Studio, creator | A color-accurate screen, sometimes. Check the measured color coverage instead |
| AI-powered, AI-enhanced | Could be a real feature or a renamed old one |
| Ready (VR ready, 4K ready, 8K ready) | It will technically run. No promise about how well |

## Real numbers, measured generously

| Claim | The catch |
| --- | --- |
| 1ms response time | Measured in the most favorable mode, often one that causes visible artifacts. See [[parts/monitor#Response time\|response time]] |
| Dynamic contrast ratio 100,000,000:1 | Compares the brightest and darkest the backlight can ever be. The real contrast is about 1,000:1 for IPS and 3,000:1 for VA |
| HDR, HDR10, HDR400 | The screen accepts an HDR signal. It cannot display one convincingly. See [[parts/monitor#HDR\|HDR]] |
| Up to 7,000MB/s | Peak speed for one large file on an empty drive. Everyday use is far slower on every drive |
| Up to 20 hours battery | Measured playing local video at low brightness. Expect half to two thirds in real use |
| Up to 5.8GHz | A brief boost on one core |
| 26,000 DPI | A sensitivity nobody uses. See [[parts/peripherals#Sensor and DPI\|mouse sensors]] |
| Wi-Fi speeds like "BE19000" | Every band's theoretical maximum added together |
| 1,200W peak power | Only continuous wattage counts on a power supply |
| 24 cores | May be 8 fast cores and 16 small ones. See [[parts/cpu#Performance cores and efficiency cores\|core types]] |
| 240fps with frame generation | Most of those frames are interpolated. The game responds at the lower real frame rate |
| 45% NTSC | A dull laptop screen covering about 60% of sRGB |
| 7.1 surround sound | Software processing on two speakers |
| 16GB graphics memory on an entry-level card | More memory on a slow card does not make it fast |

## Terms that are real but oversold

### "AI PC" and "Copilot+ PC"

A Copilot+ PC is a Windows laptop that meets Microsoft's requirements: a neural processing unit rated at 40 TOPS or more, 16GB of memory and 256GB of storage. It unlocks a set of Windows features such as live captions with translation and webcam effects. The memory requirement is the useful part, because it guarantees 16GB. The AI features themselves are minor for most people, and the cloud AI assistants people actually use run on any computer with a browser.

An NPU does not help you run large AI models locally. That needs a graphics card with plenty of VRAM. See [[use-cases/local-ai|Running AI models locally]].

### "Intel Core i7" or "Ryzen 7" with nothing after it

The tier name with the model number removed. The chip could be current or several years old. See [[specs/cpu-model-names|Processor model names]].

### "Liquid cooled"

A liquid cooler is not automatically better than an air cooler. A small 120mm liquid cooler in a prebuilt PC is often worse than a $35 air cooler. See [[parts/cooling|Cooling]].

### "RGB"

Lighting. It has no effect on performance. It is a perfectly good reason to choose a part if you like it, and a poor reason to pay more if you do not.

### "Overclocked" and "OC edition"

Factory overclocks on graphics cards add 1% to 3%. On prebuilt PCs, "overclocked" often just means the memory profile was switched on, which should be standard.

### "Dedicated graphics" on a cheap laptop

Entry-level laptop graphics chips can be slower than the best integrated graphics. Check the exact model. See [[specs/gpu-model-names#Laptop graphics|Laptop graphics]].

### "SSD storage" in tiny amounts, or "eMMC"

A laptop with 64GB or 128GB of **eMMC** storage has a slow, soldered chip of the kind used in cheap tablets. Windows barely fits and updates will fail for lack of space.

### "Expandable" and "upgradable"

Ask what, specifically. One free memory slot and one free M.2 slot is a real answer. "Upgradable" with everything soldered is not.

### "Refurbished" and "renewed"

These range from factory-restored with a full warranty to wiped and reboxed by a third party. The seller and the warranty length are what matter. See [[buying/used-and-refurbished|Buying used and refurbished]].

## Pricing tricks

- **A crossed-out "list price"** that the product has never sold at. Check price history on a tracker such as PCPartPicker or CamelCamelCamel.
- **Last year's model at this year's price**, particularly around big sales.
- **A strong processor and graphics card, with the saving hidden elsewhere:** a single stick of memory, a tiny SSD, a dim screen, a no-name power supply. See [[buying/prebuilt-desktops|How to choose a prebuilt desktop]].
- **Bundles** padded with accessories you would not have bought.
- **Model numbers unique to one retailer**, which prevent price comparison. They are usually a standard model with one component changed.
- **Extended warranties.** Rarely worth it for desktops. Sometimes worth it for an expensive laptop that travels.

## About "future-proofing"

In normal years, hardware gets faster and cheaper. Paying a large premium now for power you might need in four years usually loses to buying sensibly now and upgrading later with the money saved.

There are a few places where a little headroom does pay off, because they are cheap now and awkward to change later:

- A power supply with spare capacity.
- A motherboard on a socket that will get new processors.
- A case that fits larger graphics cards.
- Enough memory and storage in a laptop where both are soldered.

Late 2026 is an unusual moment in which memory and graphics cards have become more expensive over time. That does not change the principle. It only means buying less of the expensive parts now and leaving room to add later. See [[market|The market right now]].

## A simple test

For any claim on a box, ask three questions:

1. **Is there a number?** If not, ignore it.
2. **Is there a standard or an independent measurement behind the number?** If not, treat it as a best case.
3. **Would I notice the difference?** If not, do not pay for it.

## See also

- [[specs/benchmarks|Reading benchmarks and reviews]]
- [[buying/common-mistakes|Common mistakes]]
- [[glossary|Glossary]]
