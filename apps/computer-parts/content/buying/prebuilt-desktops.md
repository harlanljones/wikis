# How to choose a prebuilt desktop

> **In one sentence:** a prebuilt is judged by the parts the listing does not mention: the power supply, the motherboard, the memory layout and the cooling.

A prebuilt desktop arrives assembled, tested, with Windows installed and one warranty covering everything. In late 2026 it is often also the cheaper route, because system builders buy memory and graphics cards on contracts that individual buyers cannot match. See [[market|The market right now]].

## The short answer

- **For office and home use:** a mini PC or a business desktop with 16GB and a 512GB SSD. $350 to $700.
- **For gaming:** a tower from a system builder that uses standard parts, with the graphics card as the biggest share of the price. $1,000 and up.
- **Before paying:** add up the same parts on PCPartPicker. If the prebuilt costs no more than about $100 to $150 over the parts, it is a fair deal. If it costs less, it is a good one.

## Kinds of prebuilt

| Kind | What it is | Good for |
| --- | --- | --- |
| Mini PC | A palm-sized box with laptop-class parts | Office, home, media, light gaming with the right chip |
| Business desktop | Dell OptiPlex, HP EliteDesk, Lenovo ThinkCentre and similar | Reliable office machines. Excellent value refurbished |
| All-in-one | The computer is inside the monitor | Tidy desks. Not upgradable |
| Big-brand gaming tower | Alienware, HP Omen, Lenovo Legion, Asus ROG and similar | Often good sale prices. Some use proprietary parts |
| System integrator tower | Companies that assemble standard retail parts | The closest thing to building it yourself |
| Boutique build | Hand-built, high-end, heavily tested | Excellent quality at a clear premium |

**Standard parts** are the dividing line. A tower built from an ordinary ATX motherboard, an ordinary power supply and an ordinary case can be repaired and upgraded with any retail part for the next decade. A tower with a custom-shaped motherboard and power supply can only be fixed with the maker's own parts.

## What to check

A listing will give you the processor, the graphics card, the amount of memory and the size of the SSD. Those are the parts that sell the machine. Savings are made in the parts that are not named.

### Power supply

Look for the brand, the wattage and an efficiency rating. "500W power supply" with no brand is a warning. An unbranded unit feeding an expensive graphics card is the most common weak point in a cheap gaming prebuilt. See [[parts/power-supply|Power supply]].

### Motherboard

Find the chipset and, if possible, the model. Check how many memory slots and M.2 slots are free, and whether it is a standard size. Big-brand towers often use proprietary boards with unusual power connectors.

### Memory layout

"16GB" might be one 16GB stick or two 8GB sticks. One stick runs in single-channel mode and costs real performance. Look for "2x8GB" or "dual channel". Also check that the memory profile (XMP or EXPO) is enabled when it arrives. See [[parts/memory|Memory]].

### Cooling and case

Look at photos. A solid glass or plastic front with no vents means hot, loud running. Count the fans. Check what the processor cooler is: a small stock cooler on a high-end chip will be loud. See [[parts/case|Case]] and [[parts/cooling|Cooling]].

### Storage

Find the drive's capacity, and its model if given. A 500GB drive in a gaming PC fills after a handful of games. Check for a free M.2 slot.

### The graphics card's exact model

"RTX 5060 Ti" comes in 8GB and 16GB versions. "RTX 5070" from an unnamed maker is fine. An older-generation card priced as a current one is not.

### Wi-Fi

Not every desktop has it. Check if you need it.

### Warranty and support

One year is normal, two or three is better. Find out whether you must ship the whole tower back for a single failed part, and who pays.

## Judging the price

1. List the processor, graphics card, memory, SSD, and a reasonable guess for the rest: motherboard $130, power supply $80, case $80, cooler $35, Windows licence $100 or more.
2. Total the parts at current prices on PCPartPicker.
3. Compare.

Assembly, testing, a single warranty and an installed operating system are worth something. In ordinary years a fair premium was $100 to $200. With component prices as they are, many prebuilts now cost less than their parts.

## Balance

Prebuilts are frequently unbalanced to make a headline. Watch for:

| Listing emphasises | Check for |
| --- | --- |
| A Core i9 or Ryzen 9 processor | A weak graphics card. For gaming this is backwards |
| A strong graphics card | 8GB or single-stick memory, a tiny SSD, a no-name power supply |
| "32GB RAM" | An old or slow processor |
| "Liquid cooled" | A small 120mm unit that performs worse than a decent air cooler |
| RGB lighting everywhere | Everything else |

For gaming, the graphics card should be the single most expensive part. See [[parts|The parts]] for sensible budget splits.

## Mini PCs

Mini PCs deserve more attention than they get.

- **Basic models** with low-power Intel N-series chips cost $150 to $300 and are fine for web, office work and media.
- **Mid-range models** with current laptop-class Ryzen or Core Ultra chips cost $400 to $800 and are fast general-purpose computers that can handle light gaming.
- **High-end models** with powerful integrated graphics or a built-in graphics chip can replace a mid-range gaming tower in a fraction of the space, at a higher price.
- **The Mac mini** is among the fastest small computers for its price. Its memory and storage cannot be changed, and Apple's upgrades are costly.

Check which parts are replaceable (most Windows mini PCs let you change memory and SSD), how many monitors it can drive, and fan noise in reviews.

## When it arrives

1. Inspect for shipping damage. Open the side panel and remove any packing foam from inside.
2. Check that the graphics card and memory are firmly seated, because they can shake loose in transit.
3. Plug the monitor into the graphics card, not the motherboard.
4. Run Windows Update, then install the latest graphics driver.
5. Open Task Manager and confirm the amount of memory and its speed. Enable XMP or EXPO if the speed is lower than advertised. See [[building/assembly#First boot|First boot]].
6. Uninstall trial antivirus and other preinstalled software you do not want.
7. Play a demanding game or run a stress test for an hour inside the return window.

## Going deeper

- **Proprietary designs** to look for: 12V-only motherboards with non-standard power connectors, power supplies in custom shapes, cases with a fixed rear I/O panel, and front-panel connectors that fit only the original board. Any of these means the case, board and power supply must be replaced together.
- **BIOS limits.** Some big-brand boards lock memory speed or processor power limits. Reviews of the specific tower will mention it.
- **Component lottery.** A listing that says "1TB NVMe SSD" or "750W Gold PSU" without a model lets the builder use whatever is cheapest that month. Builders that name every part are more trustworthy.
- **Windows licences.** Prebuilts include one. Building your own means buying one, or using Linux.
- **Refurbished business desktops** paired with a low-profile or mid-range graphics card make inexpensive 1080p gaming machines, within the limits of their power supplies. See [[buying/used-and-refurbished|Buying used and refurbished]].

## See also

- [[buying/budget-tiers|Builds by budget]]
- [[buying/common-mistakes|Common mistakes]]
- [[buying/desktop-or-laptop|Desktop or laptop?]]
