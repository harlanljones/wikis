# Putting it together

> **In one sentence:** build on the motherboard first, outside the case, then move it in, connect power, and tidy the cables last.

This is the order that causes the least fumbling. Your case and motherboard manuals override anything here where they differ.

## Before you start

- Clear a table. Use the motherboard's box as a work surface.
- Read the motherboard manual's installation pages and find the diagram showing every connector.
- Touch the bare metal of the case or power supply to discharge static before handling parts. Avoid building on carpet.
- Hold circuit boards by their edges.
- Keep screws sorted. The case manual shows which is which.

## Assembly

### 1. Install the processor

1. Lift the socket's retention lever.
2. Match the small triangle on a corner of the processor to the triangle on the socket.
3. Lower the processor straight down. It drops in under its own weight with no force.
4. Close the lever. It needs firm pressure, and that is normal. On Intel sockets, the plastic cover pops off as the bracket closes.

Never touch the gold contacts or the socket pins.

### 2. Install the memory

1. Check the manual for which slots to use with two sticks. It is usually the second and fourth from the processor.
2. Open the latches.
3. Line up the notch in the stick with the ridge in the slot.
4. Press down firmly on both ends until the latches click. It takes more force than you expect.

### 3. Install the M.2 SSD

1. Remove the heatsink covering the slot, if there is one, and peel the film from its thermal pad.
2. Slide the drive into the slot at an angle.
3. Press it flat and secure it with the screw or latch.
4. Refit the heatsink.

Use the slot nearest the processor for your main drive.

### 4. Fit the cooler, or prepare it

- **Air cooler:** install it now if it will not block access to anything. Remove the plastic film from its base. Apply thermal paste if none is pre-applied: a pea-sized blob in the center. Tighten the screws a little at a time in a cross pattern. Plug its fan into the header marked CPU_FAN.
- **Liquid cooler:** fit the mounting bracket to the board now and attach the rest after the board is in the case.

### 5. Prepare the case

1. Remove both side panels.
2. Check the standoffs (the brass posts the board screws onto) match the board's holes. Add or remove any as needed.
3. If the board has a separate rear I/O shield, snap it into the back of the case now.
4. Install any extra case fans. Front and bottom fans blow in, rear and top fans blow out.

### 6. Install the power supply

Slide it into its bay, usually with the fan facing a vent at the bottom, and screw it in from the back. With a modular unit, connect the cables you will need to the power supply first: motherboard, processor, graphics card, and SATA if you have SATA drives.

### 7. Install the motherboard

Lower the board onto the standoffs, line up the ports with the I/O shield, and screw it down. Snug, not tight.

### 8. Connect the cables

| Cable | Goes to |
| --- | --- |
| 24-pin | The long connector on the board's right edge |
| 8-pin processor power (labelled CPU or EPS) | The top left of the board |
| Front panel connectors (power button, reset, LEDs) | A block of small pins at the bottom right. Follow the manual's diagram |
| Front USB and audio | Headers along the bottom edge |
| Case fans | Headers marked SYS_FAN or CHA_FAN |
| SATA data and power | Any SATA drives |

The processor power cable and the graphics card power cable look alike and are keyed differently. The processor one is labelled CPU or EPS. Do not force either.

Route cables behind the motherboard tray as you go.

### 9. Install the graphics card

1. Remove the slot covers at the back of the case that line up with the top long slot.
2. Open the latch at the end of the slot.
3. Press the card in until the latch clicks.
4. Screw its bracket to the case.
5. Connect its power cables. Push a 12V-2x6 connector in until it clicks, with no gap showing.

### 10. Check, then close up

- Every power connector fully seated: 24-pin, processor, graphics card.
- Memory latched at both ends.
- Cooler fan plugged in.
- No loose screws inside the case.
- No cables touching fan blades.

Leave the side panel off for the first start.

## First boot

1. Connect the monitor **to the graphics card**, not the motherboard. Connect keyboard and mouse.
2. Switch on the power supply at the back, then press the case's power button.
3. Fans should spin and, within a minute or so, the motherboard's logo should appear. The first start with new DDR5 memory can show a black screen for a minute or more while the board tests the memory. Wait.
4. Press Delete or F2 to enter the setup screen (the BIOS).

In the BIOS:

1. **Check the parts are detected:** the processor, the full amount of memory, and the SSD.
2. **Enable the memory profile.** It is called XMP on Intel boards and EXPO or DOCP on AMD boards. Without it, memory runs well below its rated speed.
3. **Check the processor temperature.** It should sit around 30°C to 50°C. If it climbs quickly, the cooler is not making contact.
4. Save and exit.

## Installing the operating system

1. On another computer, make an installer USB stick. Microsoft's Media Creation Tool does this for Windows.
2. Plug it into the new PC and start it. If it does not boot from the stick, press the boot menu key (often F11 or F12) and choose it.
3. Follow the installer. Choose the SSD as the destination.
4. Once on the desktop, connect to the internet and run Windows Update until nothing is left.
5. Install the **chipset driver** from AMD's or Intel's site, and the **graphics driver** from Nvidia's, AMD's or Intel's.
6. Set the monitor's **refresh rate** in display settings. It defaults to 60Hz.
7. Consider updating the motherboard BIOS to the latest version, following the maker's instructions.

## Final checks

- Run a demanding game or a stress test for half an hour and watch temperatures. See [[parts/cooling#What temperatures are normal|What temperatures are normal]].
- Confirm the memory speed in Task Manager, under Performance, Memory.
- Tie the cables down and fit the side panels.
- Keep the boxes until the return window has passed.

## If it does not start

Work through these in order. Most first-build problems are in the first four.

| Symptom | Check |
| --- | --- |
| Nothing at all: no fans, no lights | The switch on the back of the power supply. The wall socket. The 24-pin cable. The front-panel power button wires, which are easy to put on the wrong pins |
| Fans spin, no picture | The monitor is plugged into the graphics card. The monitor is on the right input. The memory is fully seated. The processor power cable is connected |
| Fans spin, no picture, and a small LED on the board is lit | Read which LED: CPU, DRAM, VGA or BOOT. It names the part the board is stuck on |
| Starts, then turns off after a few seconds | The cooler is not mounted properly, or the processor power cable is missing |
| Black screen for a minute on first start | Memory training. Wait up to five minutes |
| Picture, then "no boot device" | Normal with no operating system. Boot from the installer USB stick |
| The SSD is not listed | Reseat it. Check it is in a slot that supports its type |
| The board does not recognise a new processor | It needs a BIOS update. Use BIOS Flashback |
| Still nothing | Strip it back: one memory stick, no graphics card if the processor has integrated graphics, nothing else attached. Add parts back one at a time |

When asking for help online, list every part, describe exactly what happens, and say which diagnostic LED is lit.

## Common mistakes

- Monitor cable in the motherboard instead of the graphics card.
- Memory not pushed in until it clicks, or in the wrong pair of slots.
- The film left on the cooler's base.
- The processor power cable forgotten.
- XMP or EXPO never enabled.
- The I/O shield forgotten, which is discovered after everything is screwed in.
- A standoff in the wrong place, touching the back of the board.
- Using modular cables from a different power supply. Never do this.

## See also

- [[building/compatibility|Compatibility checklist]]
- [[building|Building a PC]]
- [[parts/cooling|Cooling]]
