# Motherboard

> **In one sentence:** the motherboard decides what fits and how many of each thing you can plug in, and it has almost no effect on speed.

## What it does

The motherboard is the large circuit board that every other part connects to. It carries power and data between them. In the [[basics|kitchen analogy]] it is the floor plan and the plumbing.

A $130 board and a $500 board with the same processor produce the same frame rates. The extra money buys more ports, more drive slots, sturdier power delivery for top-end processors, and conveniences.

## What to buy

Work through these in order:

1. **Socket.** It must match your [[parts/cpu|processor]]. AMD's current socket is AM5. Intel's is LGA 1851.
2. **Size.** It must fit your [[parts/case|case]]. ATX is the standard size, Micro-ATX is shorter, Mini-ITX is tiny.
3. **Chipset tier.** A mid-range chipset (a "B" board on both AMD and Intel) suits nearly everyone.
4. **The things you will plug in.** Count the M.2 slots, USB ports and fan headers you need. Check for Wi-Fi if you want it, because many boards do not include it.

| You are building | Board class |
| --- | --- |
| Office or budget gaming PC | Entry or mid-range chipset, Micro-ATX, about $100 to $150 |
| Mainstream gaming PC | Mid-range chipset, ATX or Micro-ATX, about $150 to $220 |
| High-end processor, many drives, fastest USB | High-end chipset, about $250 to $400 |
| Small form factor | Mini-ITX, about $200 to $350 |

## The specs, explained

### Socket

**Matters: essential.**

The socket is where the processor sits. A processor fits exactly one socket type. See [[building/compatibility|Compatibility checklist]].

### Chipset

**Matters: for features.**

The chipset is the letter-and-number code in the board's name, such as B850 or Z890. It sets the feature tier.

| Tier | AMD (AM5) | Intel (LGA 1851) | What you get |
| --- | --- | --- | --- |
| Entry | A620, B840 | H810 | Basic ports, no processor overclocking, fewer fast slots |
| Mid-range | B650, B850 | B860 | The sweet spot. Enough of everything for most builds |
| High-end | X870, X870E | Z890 | More and faster USB and M.2, and processor overclocking on Intel |

The first letter is the tier and the number is the generation. A higher number in the same tier is newer, with modest changes.

### Form factor

**Matters: for fit and expansion.**

| Size | Dimensions | Memory slots | Notes |
| --- | --- | --- | --- |
| ATX | 305 x 244mm | 4 | Most slots and ports |
| Micro-ATX (mATX) | up to 244 x 244mm | 2 or 4 | Often the best value |
| Mini-ITX | 170 x 170mm | 2 | One expansion slot. Costs more |
| E-ATX | wider than ATX | 4 or more | Needs a large case |

### Memory support

**Matters: for compatibility.**

The board takes either DDR4 or DDR5, never both. It also lists a maximum capacity and tested speeds. See [[parts/memory|Memory]].

### M.2 slots

**Matters: count them.**

Each M.2 slot holds one NVMe SSD. Two slots is a sensible minimum, so you can add a drive later without replacing the first. The listing gives the PCIe generation of each slot. See [[parts/storage|Storage]].

### Expansion slots (PCIe)

**Matters: for the graphics card, and little else.**

The long slot nearest the processor holds the [[parts/gpu|graphics card]]. It is called a PCIe x16 slot. Its generation (4.0 or 5.0) makes almost no difference to current graphics cards. Other slots take add-in cards for Wi-Fi, capture, extra USB or networking, which most people never use.

### Rear ports

**Matters: a lot day to day.**

Look at a photo of the back panel. Count the USB ports and note their speeds, check for USB-C, and check the network port (2.5Gb Ethernet is now standard on mid-range boards). See [[specs/ports-and-cables|Ports and cables]].

The HDMI and DisplayPort outputs on a motherboard only work with the processor's integrated graphics. With a graphics card installed, plug the monitor into the card.

### Wi-Fi and Bluetooth

**Matters: if you need them.**

Boards with Wi-Fi usually have "WiFi" or "AX" in the name and cost $15 to $30 more. Without it, a desktop needs an Ethernet cable or an add-in adapter. See [[parts/networking|Networking]].

### Power delivery (VRM)

**Matters: for high-end processors.**

The VRM (voltage regulator module) is the circuitry around the socket that feeds the processor. Listings describe it as "14+2 phase" and similar. Any current board handles a 65W-class processor. For a 16-core or top Intel chip under long heavy loads, choose a mid-range board or better, and check a review.

## Specs you can mostly ignore

- **Phase counts, quoted alone.** More phases with poor components is worse than fewer good ones.
- **"Military grade" capacitors and armor plating.**
- **RGB headers and lighting zones**, unless you want the lights.
- **PCIe 5.0 for the graphics slot.**
- **Audio codec model numbers.** If you care about audio, use an external interface or USB headset. See [[parts/peripherals|Keyboard, mouse and audio]].
- **Overclocking features**, for most buyers.

## Going deeper

- **Platform lifespan.** AMD has kept AM5 current since 2022 and is expected to continue with its next desktop generation. Intel's next desktop generation is reported to need a new socket. For an upgrade path, AM5 is the safer bet. See [[market#Processors|The market right now]].
- **BIOS updates.** A board manufactured before a processor was released may need a BIOS update to recognise it. Look for **BIOS Flashback** (a button that updates the board from a USB stick with no processor installed). It removes this problem entirely.
- **Lane sharing.** Processors and chipsets provide a fixed number of PCIe lanes. Boards share them: filling a certain M.2 slot may drop the graphics slot from x16 to x8 or disable SATA ports. The manual's storage section documents every case.
- **USB4 and Thunderbolt.** AMD's X870 boards include USB4 as standard. Intel's Z890 boards typically include Thunderbolt 4. On other boards it is optional.
- **Internal headers.** Check for a front-panel USB-C header if your case has a front USB-C port, enough fan headers for your fans, and a USB 2.0 header if you use a liquid cooler with a controller.
- **Back-connect boards** (sold as Asus BTF, MSI Project Zero, Gigabyte Stealth) move the cable sockets to the rear of the board for a tidier look. They need a matching case.
- **Memory overclocking.** XMP and EXPO work on all current mid-range boards. Intel restricts processor overclocking to Z-series boards. AMD allows it on B and X boards.
- **Debug aids.** Four small diagnostic LEDs (CPU, DRAM, VGA, BOOT) or a two-digit code display make a first build far easier to troubleshoot.

## Common mistakes

- Buying a board with the wrong socket, or the wrong memory type.
- Assuming a board has Wi-Fi.
- Buying an ATX board for a Micro-ATX case.
- Spending $400 on a board for a $200 processor.
- Not checking that the board's BIOS supports a newly released processor.
- Forgetting the rear I/O shield on boards that have a separate one.

## See also

- [[building/compatibility|Compatibility checklist]]
- [[parts/cpu|Processor]] and [[parts/case|Case]]
