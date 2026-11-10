# Photo, video and 3D work

> **In one sentence:** creative software rewards memory, processor cores and a trustworthy screen, and which graphics card to buy depends on the exact application.

Creative work is not one workload. Photo editing, video editing, 3D rendering and music production stress different parts. Find your main application below.

## At a glance

| Work | Processor | Graphics card | Memory | Storage | Screen |
| --- | --- | --- | --- | --- | --- |
| Photo editing | Fast single core, 8 or more cores | Modest. Helps with AI tools | 32GB | Fast SSD, large library drive | Color accuracy first |
| 1080p and light 4K video | 8 or more cores | Mid-range | 32GB | 1TB or more NVMe, separate media drive | Good color, 1440p or 4K |
| Heavy 4K, 8K, RAW video, color grading | 12 to 16 cores | High end, 16GB or more | 64GB or more | Several fast NVMe drives | Calibrated, HDR-capable |
| 3D modelling | Fast single core | Mid-range or better | 32GB | 1TB | Large and sharp |
| 3D rendering | Many cores, or the graphics card instead | As much as you can afford, with plenty of VRAM | 32GB to 64GB | 1TB | |
| Music production | Fast single core, 8 or more cores | None needed | 32GB | Large SSD for sample libraries | |
| Graphic design and illustration | Mid-range | Modest | 16GB to 32GB | 512GB to 1TB | Color accuracy first |

## Photo editing

Lightroom, Photoshop, Capture One and similar.

- **Memory matters most.** 16GB is workable. 32GB is comfortable with large files, panoramas and many layers.
- **Single-core speed** drives how responsive the sliders and brushes feel. Core count helps exports and batch work.
- **The graphics card** accelerates AI features such as noise reduction, subject masking and generative fill. A mid-range card with 8GB to 12GB makes these several times faster than integrated graphics.
- **Storage:** keep the catalogue and current work on an SSD. An archive of older photos can live on hard drives, with a backup.
- **The screen** is the most important part. Look for close to 100% sRGB for web work, and wide Adobe RGB or DCI-P3 coverage for print or professional work, with a Delta E under 2. Calibrate it. See [[parts/monitor#Color gamut and accuracy|Color gamut and accuracy]].

## Video editing

Premiere Pro, DaVinci Resolve, Final Cut Pro.

- **Processor:** 8 cores for 1080p and light 4K, 12 to 16 for heavy 4K. Intel chips with Quick Sync decode common camera formats (H.264 and H.265) very smoothly, which is valued for timeline scrubbing.
- **Graphics card:** DaVinci Resolve leans heavily on it for effects, color grading and noise reduction. Premiere uses it for effects and export. VRAM matters: 8GB for 1080p, 12GB to 16GB for 4K, more for 8K and heavy effects.
- **Memory:** 32GB for 1080p and 4K. 64GB or more for long 4K timelines, 8K or heavy compositing.
- **Storage:** three drives is the classic arrangement. One for the system and apps, one fast NVMe drive for current footage, one for cache and scratch files. Footage is large: an hour of 4K can be 20GB to 300GB depending on the format.
- **Proxy editing** (working with small stand-in files) lets a modest computer edit footage it could not otherwise play smoothly.

## 3D work

Blender, Cinema 4D, Maya, Unreal Engine, CAD.

- **Modelling and viewport work** depend on single-core speed and a reasonable graphics card.
- **Rendering** is either done on the processor, which scales with core count, or on the graphics card, which is usually much faster. For GPU rendering, the scene must fit in VRAM, so memory on the card is the limit.
- **Nvidia cards are strongly favored** in most rendering software, through its OptiX and CUDA technologies. Check your renderer's supported hardware.
- **CAD software** (SolidWorks, AutoCAD, Revit) is mostly single-threaded. Some vendors certify only workstation graphics cards for support purposes.

## Music production

Ableton Live, Logic Pro, FL Studio, Pro Tools.

- **Processor:** single-core speed sets how many plugins you can run on one track, and core count sets how many tracks.
- **Memory:** 16GB for light work, 32GB to 64GB for large orchestral sample libraries.
- **Storage:** sample libraries run to hundreds of gigabytes and load much faster from an SSD.
- **Silence:** a quiet computer matters when recording. Fanless or slow-fan machines are worth paying for.
- **An audio interface** matters far more than the computer's built-in sound.
- **No graphics card needed.**

## Mac or PC for creative work

| | Mac | Windows PC |
| --- | --- | --- |
| Strengths | Efficient, quiet, excellent screens on laptops, full speed on battery, Final Cut and Logic | More performance per dollar at the high end, upgradable, Nvidia graphics, wider hardware choice |
| Weaknesses | Costly memory and storage, no upgrades, weak for Nvidia-dependent 3D and AI tools | Laptops are louder and slower on battery. More variation in screen quality |
| Best for | Photo, video and music work, especially on a laptop | 3D rendering, visual effects, heavy desktop workstations |

Apple's chips share one pool of memory between the processor and graphics, so a Mac with 64GB can give its graphics far more memory than most graphics cards have. That helps with very large video and 3D projects.

## Graphics card choice by application

| Application | Guidance |
| --- | --- |
| Adobe Photoshop, Lightroom | Any mid-range card. Brand matters little |
| Adobe Premiere Pro | Nvidia slightly favored. Intel Quick Sync helps decoding |
| DaVinci Resolve | Uses the graphics card heavily. Buy as much as the budget allows. Nvidia favored |
| Blender | Nvidia strongly favored for rendering |
| Unreal Engine | Nvidia favored. 12GB or more of VRAM |
| After Effects | Processor and memory matter more than the card |

Puget Systems publishes benchmark results for these applications on current hardware, and is the best source for a specific choice. See [[specs/benchmarks|Reading benchmarks and reviews]].

## Where not to spend

- A 240Hz gaming monitor instead of a color-accurate one.
- The fastest gaming processor. X3D chips are no faster for creative work than their cheaper siblings.
- PCIe 5.0 SSDs, unless you move very large files constantly.
- A workstation graphics card, unless your software vendor requires one.

## Late 2026 note

Creative work is where the memory shortage hurts most, because 32GB to 64GB is a real requirement and not a luxury. Reuse existing memory where you can, buy the amount your projects need now, and choose a board with free slots. See [[market#Memory prices|The market right now]].

## See also

- [[parts/monitor|Monitor]]
- [[parts/memory|Memory]] and [[parts/storage|Storage]]
- [[buying/budget-tiers#Workstation add-ons|Workstation add-ons]]
