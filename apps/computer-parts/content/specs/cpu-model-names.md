# Processor model names

> **In one sentence:** the generation number matters more than the tier name, and the letters at the end tell you what kind of chip it is.

A processor name has four parts: a brand, a tier, a model number that encodes the generation, and a suffix. Once you can pick those apart, most of the confusion goes away.

For the chips on sale today and their prices, see [[market#Processors|The market right now]].

## Intel

### Current naming (2023 onward)

Take **Intel Core Ultra 7 265K**:

| Piece | Meaning |
| --- | --- |
| Core Ultra | The brand. "Core Ultra" is the current mainstream and high-end line |
| 7 | The tier: 3, 5, 7 or 9. Higher is faster and dearer |
| 2 | The series, which is the generation. Series 2 launched in late 2024 |
| 65 | Position within the tier. Higher is faster |
| K | The suffix. See below |

A chip sold as "Plus", such as Core Ultra 7 270K Plus, is a 2026 refresh of the same generation with more cores for the money.

### Older naming (up to 2023)

Take **Intel Core i5-14400F**:

| Piece | Meaning |
| --- | --- |
| Core i5 | Brand and tier: i3, i5, i7 or i9 |
| 14 | The generation: 14th |
| 400 | Position within the tier |
| F | The suffix |

A four-digit number such as i7-8700 is 8th generation. A five-digit number such as i7-12700 is 12th.

### Intel suffixes

| Suffix | Where | Meaning |
| --- | --- | --- |
| (none) | Desktop | Standard chip, with integrated graphics |
| K | Desktop | Unlocked for overclocking, and the fastest version |
| F | Desktop | No integrated graphics. You must have a graphics card |
| KF | Desktop | Unlocked, and no integrated graphics |
| T | Desktop | Low power, for small PCs |
| U | Laptop | Low power, for thin and light laptops |
| V | Laptop | Series 2 efficiency chips with memory built into the processor package |
| H | Laptop | Higher performance, for larger laptops |
| HX | Laptop | Desktop-class chips for big gaming and workstation laptops |

In Series 3 laptop chips, an **X** before the tier number, as in Core Ultra X7 358H, marks a model with much stronger integrated graphics.

### Intel names to be wary of

- **"Intel Core 5" or "Core 7" without "Ultra"** are older designs sold under the new naming style.
- **"Intel Processor N100", "N150", "Core 3 N355"** are very low-power chips. Fine for a basic mini PC or a home server. Slow for a main computer.
- **Celeron and Pentium** are discontinued budget brands. Avoid them in anything you plan to use daily.
- **A listing that says only "Intel Core i7"** is concealing the generation.

## AMD

### Desktop

Take **AMD Ryzen 7 9800X3D**:

| Piece | Meaning |
| --- | --- |
| Ryzen 7 | Brand and tier: 3, 5, 7 or 9 |
| 9 | The series. 9000 is the current desktop generation |
| 800 | Position within the tier. Higher is faster |
| X3D | The suffix |

Desktop series and what they are:

| Series | Socket | Memory | Status |
| --- | --- | --- | --- |
| 5000 | AM4 | DDR4 | Older, still sold, good value with existing DDR4 |
| 7000 | AM5 | DDR5 | Previous generation |
| 8000G | AM5 | DDR5 | Chips with strong integrated graphics |
| 9000 | AM5 | DDR5 | Current |

### AMD desktop suffixes

| Suffix | Meaning |
| --- | --- |
| (none) | Standard, lower-power version |
| X | Higher performance version |
| X3D | Extra cache for gaming. See [[parts/cpu#Cache, and what X3D means\|what X3D means]] |
| F | No integrated graphics |
| G | Strong integrated graphics, for PCs without a graphics card |
| XT | A small speed bump over the X model |

### Laptop

AMD's laptop naming has changed several times and is the hardest to read.

**Current "Ryzen AI" names**, such as **Ryzen AI 9 HX 370** or **Ryzen AI 7 350**:

| Piece | Meaning |
| --- | --- |
| Ryzen AI | The current laptop brand |
| 9 | Tier: 5, 7 or 9 |
| HX | A higher-power variant. Absent on most models |
| 3 | The series. 300 launched in 2024, 400 in 2026 |
| 70 | Position within the series |

**Ryzen AI Max** chips are a separate high-end family with very powerful integrated graphics, used in compact workstations and some gaming laptops.

**Names to be wary of:** laptop chips called Ryzen 5 or Ryzen 7 followed by a three-digit number in the 100s or 200s, with no "AI", are older designs under new names. They can be perfectly good value. Just price them as older chips.

**The 2023 to 2024 scheme** used four digits, as in Ryzen 5 7520U. The first digit was the model year and the **third digit was the actual chip design**. A Ryzen 5 7520U (third digit 2) is a 2019-era design, while a Ryzen 5 7640U (third digit 4) was current. If you are shopping used or clearance laptops, read the third digit.

## Apple

Apple's names are simple: **M** plus a generation number, plus an optional tier.

| Name | Meaning |
| --- | --- |
| M5 | The base chip. Fast for everyday and moderate creative work |
| M5 Pro | More cores, more memory options, more display outputs |
| M5 Max | Many more graphics cores and much higher memory limits |
| Ultra | Two Max chips' worth of power, in desktops only |

A higher tier of an older generation usually beats the base chip of a newer one for heavy work: an M4 Max is far faster than a plain M5 at video export. For everyday use the base chip is plenty. The MacBook Neo uses an **A-series** chip, the kind found in iPhones.

Apple's memory and storage upgrades are expensive and nothing can be changed later, so the configuration matters more than the chip. See [[buying/laptops|How to choose a laptop]].

## Qualcomm

**Snapdragon X** chips power Windows on Arm laptops.

| Name | Meaning |
| --- | --- |
| Snapdragon X Plus, X Elite | First generation, 2024 |
| Snapdragon X2 Plus, X2 Elite | Second generation, 2026 |
| X2 Elite Extreme | The top version |

Longer codes such as X2E-88-100 identify the exact variant. See [[buying/laptops#Windows on Arm|Windows on Arm]] for what runs on them.

## The rule that replaces all of this

When you are unsure, search for the **exact model number** plus the word "benchmark", and compare its score with a chip you know. A single number from a consistent test tells you more than any naming scheme. See [[specs/benchmarks|Reading benchmarks and reviews]].

## See also

- [[parts/cpu|Processor]]
- [[specs/gpu-model-names|Graphics card model names]]
