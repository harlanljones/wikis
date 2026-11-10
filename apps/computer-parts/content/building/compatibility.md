# Compatibility checklist

> **In one sentence:** eleven checks cover nearly every way parts can fail to fit together, and the first three catch most of them.

Run a parts list through PCPartPicker first, since it catches most problems automatically. Then go through this list yourself, because it does not catch all of them.

## The checklist

### 1. Processor and motherboard socket

- [ ] The motherboard's socket matches the processor.

| Processor | Socket |
| --- | --- |
| AMD Ryzen 7000, 8000G, 9000 | AM5 |
| AMD Ryzen 1000 to 5000 | AM4 |
| Intel Core Ultra 200S series | LGA 1851 |
| Intel 12th, 13th, 14th generation Core | LGA 1700 |

### 2. Motherboard BIOS supports the processor

- [ ] The board's processor support list includes your chip, and you can meet the BIOS version it requires.

A board made before a processor's release may not recognise it until updated. Check the support list on the board maker's site. If an update is needed, choose a board with **BIOS Flashback**, which updates from a USB stick with no processor installed.

### 3. Memory type

- [ ] The memory type matches the board: DDR5 for DDR5 boards, DDR4 for DDR4 boards.
- [ ] It is desktop memory (DIMM), not laptop memory (SO-DIMM), unless the board is a small one that takes SO-DIMM.
- [ ] The kit's capacity and speed are within the board's limits.

For the smoothest experience, pick a kit from the board's tested memory list (the QVL), or a common speed such as DDR5-6000.

### 4. Motherboard fits the case

- [ ] The case supports the board's form factor.

| Case supports | Boards that fit |
| --- | --- |
| ATX | ATX, Micro-ATX, Mini-ITX |
| Micro-ATX | Micro-ATX, Mini-ITX |
| Mini-ITX | Mini-ITX only |

### 5. Graphics card fits the case

- [ ] The card's length is less than the case's maximum GPU length, with 10mm to spare.
- [ ] The card's thickness in slots fits the case and does not block a slot you need.
- [ ] If the case has front fans or a front radiator, the clearance figure accounts for them.

### 6. Cooler fits

- [ ] The cooler supports your socket.
- [ ] An air cooler's height is less than the case's maximum CPU cooler height.
- [ ] A large air cooler clears the memory. Check the cooler's stated memory clearance against your sticks' height.
- [ ] A liquid cooler's radiator size is supported in the position you plan to mount it, and does not collide with the motherboard's heatsinks or the memory when top-mounted.

### 7. Power supply is sufficient

- [ ] Wattage meets or exceeds the graphics card maker's recommendation.
- [ ] It has the connectors the graphics card needs: the right number of 8-pin PCIe cables, or a 12V-2x6 cable.
- [ ] It has the processor power connectors the board wants. One 8-pin is enough for nearly all builds, even when the board has two sockets.
- [ ] Its physical size fits the case: ATX or SFX, and length in compact cases.

See [[parts/power-supply|Power supply]].

### 8. Storage has somewhere to go

- [ ] The board has an M.2 slot for each NVMe drive.
- [ ] The M.2 slots support your drives' length, normally 2280.
- [ ] For SATA drives, the case has bays and you have SATA data cables. Boards include two.
- [ ] You have checked the manual for which slots disable which ports.

### 9. Something drives the display

- [ ] You have a graphics card, or a processor with integrated graphics.

Intel chips ending in F, and AMD chips ending in F, have no integrated graphics.

- [ ] The graphics card's outputs match your monitor's inputs: DisplayPort or HDMI, at a version that supports your refresh rate. See [[specs/ports-and-cables|Ports and cables]].

### 10. Case and motherboard connectors match

- [ ] If the case has a front USB-C port, the board has a front USB-C header.
- [ ] The board has enough fan headers for your fans, or you have a splitter or hub.
- [ ] If parts have addressable lighting, the board has the matching headers.
- [ ] A liquid cooler with software control has a free USB 2.0 header.

### 11. Everything else you need

- [ ] Wi-Fi and Bluetooth, if you need them, either on the board or as an add-in.
- [ ] An operating system, and a USB stick to install it from.
- [ ] A monitor cable. Monitors include one. Graphics cards do not.
- [ ] Case fans, if the case does not include enough.

## Things that are compatible but unwise

These combinations work and waste money or performance.

| Combination | Problem |
| --- | --- |
| A top-end graphics card with an old or budget processor | The processor limits frame rates |
| A top-end processor with a budget motherboard | Weak power delivery may limit it under sustained load |
| A 65W processor with a 360mm liquid cooler | Money spent on nothing |
| Four memory sticks at a high DDR5 speed | Often unstable. Use two sticks |
| A PCIe 5.0 SSD in a PCIe 3.0 or 4.0 slot | Runs at the slot's speed |
| A card wired for 8 lanes in an old PCIe 3.0 board | Loses performance. See [[parts/gpu#Going deeper\|the note on PCIe lanes]] |
| A very fast monitor with an entry-level graphics card | The card cannot fill the refresh rate |
| A high-wattage graphics card on a no-name power supply | Risk to every part |

## Small form factor builds

Everything above applies, with tighter numbers. Check as well:

- [ ] The exact graphics card model's length, height and thickness against the case's figures. Small cases often list specific compatible cards.
- [ ] The cooler's height to the millimeter.
- [ ] Power supply type (usually SFX) and cable lengths.
- [ ] The order of assembly in the case manual. Some parts must go in first.

## Reusing old parts

- **Case:** fine if it fits a modern graphics card and has front intake.
- **Power supply:** fine if it is a quality unit, under about ten years old, with enough wattage and the right connectors. Keep its own cables with it.
- **Storage:** SATA drives work on any board. NVMe drives work in any M.2 NVMe slot.
- **Memory:** only if the type matches the new board.
- **Cooler:** check for a mounting kit for the new socket. Makers often supply them free or cheaply.
- **Windows licence:** a retail licence, or one linked to your Microsoft account, can usually move to new hardware.

## See also

- [[building/assembly|Putting it together]]
- [[buying/budget-tiers|Builds by budget]]
- [[parts|The parts]]
