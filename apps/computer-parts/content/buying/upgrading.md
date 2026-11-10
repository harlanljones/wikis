# Upgrade or replace?

> **In one sentence:** find out which part is slow before spending anything, because a $60 fix often does more than a new computer.

## The short answer

| Symptom | Likely fix | Cost |
| --- | --- | --- |
| Slow to start, apps take ages to open, disk light always on | Replace a hard drive with an SSD | $60 to $160 |
| Slows down with many tabs or apps open | Add memory | See [[market#Memory prices\|current prices]] |
| Games run poorly, everything else is fine | A new graphics card | $330 and up |
| Got slow gradually over years | A clean reinstall of the operating system, and a dust clean | Free |
| Hot and loud, slows down under load | Clean the dust out, replace thermal paste | $10 |
| Laptop battery lasts an hour | A new battery | $40 to $120 |
| Cannot run Windows 11 | Replace, or switch to Linux | |
| Processor is the limit and the motherboard has no newer chip to offer | Replace the processor, motherboard and probably memory together | $450 and up |

## Step 1: find the bottleneck

Do the thing that feels slow and watch what is busy.

- **Windows:** press Ctrl+Shift+Esc for Task Manager, then open the Performance tab.
- **Mac:** open Activity Monitor.

| What you see | Meaning |
| --- | --- |
| Disk at 100% while everything waits | The drive is the problem. If it is a hard drive, an SSD will transform the computer |
| Memory at 85% or more | More memory will help |
| Processor at 100% across all cores during ordinary tasks | The processor is too slow, or something is running that should not be |
| Graphics card at 100% in games | Normal. For more frames you need a faster card or lower settings |
| Graphics card well below 100% in games while the frame rate is low | The processor is the limit |
| Nothing is busy and it is still slow | Software. Try a clean reinstall |

See [[specs/benchmarks#Benchmarking your own computer|Benchmarking your own computer]].

## Step 2: try the free fixes

1. **Restart it**, if it has been on for weeks.
2. **Check what starts with the computer** and disable what you do not need.
3. **Free up storage.** A drive more than 90% full slows down.
4. **Update** the operating system and graphics driver.
5. **Clean the dust** from fans, vents and filters.
6. **Scan for unwanted software.**
7. **Reinstall the operating system** from scratch. Back up first. This fixes most "it got slow over the years" complaints.

## Step 3: the upgrades, in order of value

### Hard drive to SSD

The best upgrade there is for any computer still booting from a hard drive. A ten-year-old machine becomes pleasant to use. Free tools clone the old drive to the new one. See [[parts/storage|Storage]].

### More memory

Effective if, and only if, you are running out. Going from 8GB to 16GB helps most people. Going from 16GB to 32GB helps heavy multitaskers and creative work. Match the type your computer takes, and check how many slots are free. Memory is expensive at present, so confirm you need it first. See [[parts/memory|Memory]].

### Graphics card

The upgrade that matters for games. Before buying, check four things:

1. **The power supply** has enough wattage and the right connectors.
2. **The case** is long enough.
3. **The processor** is not so old that it will hold the new card back. A processor more than about six years old usually will.
4. **The motherboard's graphics slot generation**, if the new card uses only 8 lanes. See [[parts/gpu#Going deeper|the note on PCIe lanes]].

### Processor

Worth doing when a much faster chip fits your existing motherboard.

- **AMD AM4 boards** (2017 to 2022) can often take a Ryzen 5 5600 or a Ryzen 7 5700X3D after a BIOS update. This is one of the best-value upgrades available and keeps your DDR4 memory.
- **AMD AM5 boards** take every Ryzen 7000, 8000 and 9000 chip, and are expected to take the next generation.
- **Intel boards** usually support two generations. Check the board's processor support list.

Update the BIOS before swapping the chip.

### Monitor, keyboard and mouse

Not a speed upgrade, and often the one you will notice most. See [[parts/monitor|Monitor]].

### Storage space

Add a second drive. It is the easiest upgrade to do, and nothing needs reinstalling.

## What you can upgrade in a laptop

| Part | Usually possible? |
| --- | --- |
| SSD | Often, on Windows laptops. Never on current Macs |
| Memory | Sometimes. Thin laptops usually solder it |
| Battery | Usually, with some disassembly |
| Wi-Fi card | Sometimes |
| Processor, graphics, screen | No |

Search for your exact model plus "upgrade" or "teardown" before buying parts. The service manual, if the maker publishes one, is the best source.

## When to replace instead

- **It cannot run a supported operating system**, and you do not want Linux.
- **The fix costs more than half of a replacement.**
- **Several parts are at their limit at once.** A new processor needs a new motherboard, which needs new memory. That is most of a new computer.
- **It is a laptop with soldered parts** that no longer meets your needs.
- **It has become unreliable** in ways that are not traced to one part.

When you do replace a desktop, carry over what still works: the case, the power supply if it is a good one under ten years old, the SSDs, the fans, and the memory if the type matches.

## A platform upgrade, step by step

Replacing the processor, motherboard and memory while keeping everything else:

1. Check the new parts against the [[building/compatibility|Compatibility checklist]], including whether your cooler has a mounting kit for the new socket.
2. Back up your files.
3. Swap the parts. See [[building/assembly|Putting it together]].
4. Windows will usually start on the new hardware, but a clean install avoids leftover drivers and is recommended.
5. Reactivate Windows. A licence linked to your Microsoft account can be moved through the activation troubleshooter.

## Late 2026 note

High memory and graphics card prices tilt the decision toward upgrading and reusing:

- Memory you already own is valuable. Keeping a DDR4 platform going with a better processor is cheaper than moving to DDR5.
- A used previous-generation graphics card may be the sensible upgrade. See [[buying/used-and-refurbished|Buying used and refurbished]].
- An SSD is still a worthwhile upgrade for a hard-drive machine, even at higher prices.

## See also

- [[buying/when-to-buy|When to buy]]
- [[parts|The parts]]
- [[market|The market right now]]
