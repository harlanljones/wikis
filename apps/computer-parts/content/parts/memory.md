# Memory (RAM)

> **In one sentence:** memory is working space, 16GB is the right amount for most people, and having more than you use does nothing.

## What it does

RAM (random access memory) holds everything that is open right now: the operating system, your browser tabs, the document you are editing, the game you are playing. It is very fast and it is wiped when the power goes off. In the [[basics|kitchen analogy]] it is counter space.

When memory fills up, the computer starts using the storage drive as overflow, which is far slower. That is the moment a computer "gets slow with lots of tabs open".

Memory is not [[parts/storage|storage]]. A laptop with "16GB memory and 512GB storage" has 16GB of working space and 512GB of space for files.

## What to buy

| You do | Amount |
| --- | --- |
| A Chromebook, or very light use | 8GB |
| Web, office, streaming, schoolwork | 16GB |
| Gaming | 16GB works. 32GB is comfortable |
| Photo editing, programming, many apps at once | 32GB |
| 4K video editing, 3D, virtual machines, large datasets | 64GB or more |

Then:

- **Buy two matching sticks, not one.** Two sticks run in "dual channel", which is noticeably faster, especially with integrated graphics.
- **Buy the type your motherboard takes.** DDR4 and DDR5 are not interchangeable.
- **For a desktop on current hardware, a DDR5-6000 kit with CL30 or CL36 timings** is the sensible default.
- **In a laptop, check whether memory is soldered.** If it is, you can never add more, so buy what you will need for the life of the machine.

> **Late 2026 note.** Memory costs four to five times what it did in mid-2025. The old advice to "just get 32GB, it's cheap" no longer holds. Buy 16GB if that covers your use, leave two slots free on a desktop, and add more when prices fall. Reuse memory from an old computer if it is the right type. See [[market#Memory prices|The market right now]].

## The specs, explained

### Capacity (GB)

**Matters: most of all.**

This is the amount of working space. Having enough makes a large difference. Having more than enough makes none. You can see what you use today: on Windows open Task Manager and look at the Performance tab, on a Mac open Activity Monitor and look at Memory Pressure.

### Type (DDR4, DDR5)

**Matters: for compatibility.**

DDR generations have different notches and cannot be mixed or swapped. **DDR5** is the current standard and the only type that current AMD (AM5) and Intel (LGA 1851) desktops accept. **DDR4** is used by older platforms that are still sold. The motherboard's product page says which it takes.

### Speed (MHz)

**Matters: a little, mainly for gaming.**

Written as "DDR5-6000" or "6000MHz", this is how fast data moves in and out. Faster memory gives a few percent more performance in games and little elsewhere. Typical values:

- DDR4: 3200 to 3600 is the sweet spot.
- DDR5: 5600 to 6400 is the sweet spot. Kits rated 7200 and above cost more and are hard to run stably on many systems.

### Timings (CL)

**Matters: a little.**

Written as "CL30" or "30-36-36-76". The first number, **CAS latency**, is the delay before memory responds. Lower is better, but only compare CL at the same speed. DDR5-6000 CL30 is quicker than DDR5-6000 CL40. DDR5-6000 CL30 and DDR5-7200 CL36 are about the same.

### Kit size (2x16GB)

**Matters: more than people expect.**

"32GB (2x16GB)" means two 16GB sticks. Use two sticks on a normal desktop board. One stick halves the memory bandwidth. Four sticks work, but DDR5 systems often cannot run four at the kit's rated speed, so two larger sticks are better than four smaller ones.

### XMP and EXPO

**Matters: you must turn it on.**

Memory runs at a slow default speed out of the box. The rated speed on the label is stored as a profile called **XMP** (Intel's name) or **EXPO** (AMD's name). You enable it once in the motherboard's setup screen (the BIOS). Many people never do, and run expensive memory at budget speeds. See [[building/assembly#First boot|First boot]].

### Form factor

**Matters: for fit.**

- **DIMM** (also UDIMM): full-size desktop sticks.
- **SO-DIMM:** shorter sticks for laptops and mini PCs.
- **Soldered (LPDDR5, LPDDR5X):** chips fixed to the laptop's board. Faster and more power-efficient, not upgradable.
- **CAMM2 and LPCAMM2:** a newer flat, replaceable module found in a few laptops.

## Specs you can mostly ignore

- **RGB lighting.** It costs extra and adds nothing.
- **Tall heat spreaders.** Memory does not run hot. Very tall sticks can collide with a large [[parts/cooling|air cooler]].
- **Speeds far above the sweet spot.**
- **Brand.** Every stick uses chips from Samsung, SK Hynix or Micron. Buy on spec, price and warranty.
- **"Gaming" memory.**

## Going deeper

- **MHz is really MT/s.** DDR memory transfers on both edges of the clock, so "6000MHz" is 6000 megatransfers per second on a 3000MHz clock. Everyone says MHz anyway.
- **Real latency in nanoseconds** is CL x 2000 / speed. DDR5-6000 CL30 is 10ns. DDR4-3200 CL16 is also 10ns. This is why DDR5's higher CL numbers are not a step backwards.
- **AMD AM5 has a specific sweet spot.** Around DDR5-6000 to 6400 the memory controller runs in a 1:1 ratio with the memory clock. Above that it drops to 1:2 and you need roughly DDR5-8000 to get back to the same performance.
- **Intel's current desktop platform scales higher** and supports **CUDIMMs**, sticks with a built-in clock driver that make very high speeds stable.
- **Rank and density.** Larger sticks (32GB and up) are often dual-rank or use denser chips, which can limit top speed slightly. 24GB and 48GB "non-binary" sticks are normal and work well.
- **ECC memory** detects and corrects bit errors. It is standard in servers and worthwhile for a [[use-cases/home-server|home server]] that holds data you care about. It needs board and processor support.
- **Mixing kits** usually works at the slowest kit's settings, sometimes only at default speed, and occasionally not at all. Matched kits are tested together.
- **Integrated graphics uses system memory as its VRAM**, so fast dual-channel memory matters much more on a machine without a graphics card.

## Common mistakes

- Buying one stick instead of two.
- Never enabling XMP or EXPO.
- Putting two sticks in the wrong slots. The manual says which pair to use, usually the second and fourth from the processor.
- Buying DDR4 for a DDR5 board or the reverse.
- Paying for 64GB for gaming.
- Buying a laptop with 8GB soldered and Windows, then finding it cannot be upgraded.

## See also

- [[parts/storage|Storage]], which memory is often confused with
- [[parts/motherboard|Motherboard]]
- [[buying/upgrading|Upgrade or replace?]]
