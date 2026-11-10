# Decoding spec sheets

Product listings are written to sell. They mix the numbers that matter with numbers chosen because they are large. These pages show how to read them.

## The pages

- [[specs/cpu-model-names|Processor model names]] explains what "Core Ultra 7 265K" and "Ryzen 7 9800X3D" are telling you, and how old chips hide behind new names.
- [[specs/gpu-model-names|Graphics card model names]] covers Nvidia, AMD and Intel naming, and why a laptop card is not the desktop card of the same name.
- [[specs/ports-and-cables|Ports and cables]] untangles USB, USB-C, Thunderbolt, HDMI and DisplayPort.
- [[specs/benchmarks|Reading benchmarks and reviews]] explains how to compare two parts using real measurements, and which sources to trust.
- [[specs/marketing-terms|Marketing terms to ignore]] is a list of phrases that sound impressive and mean little.

The [[glossary|Glossary]] has a short definition of every term.

## How to read any listing

Take a typical store listing:

> **15.6" FHD IPS 144Hz Gaming Laptop, Intel Core i7, 16GB RAM, 1TB SSD, RTX 4060, Wi-Fi 6, Backlit Keyboard, Windows 11**

Go through it item by item and ask what is missing.

| The listing says | What to check |
| --- | --- |
| 15.6" FHD IPS 144Hz | Brightness in nits and color coverage are not given. Budget gaming laptops often use dim 250-nit panels with poor color |
| Intel Core i7 | Which one? Without the full model number it could be four years old. See [[specs/cpu-model-names\|Processor model names]] |
| 16GB RAM | One stick or two? DDR4 or DDR5? Soldered or upgradable? |
| 1TB SSD | Almost certainly fine. Check there is a second slot if you want to add storage |
| RTX 4060 | A previous-generation laptop chip. Check its wattage (TGP) |
| Wi-Fi 6 | Fine |
| Backlit Keyboard, Windows 11 | Filler |

The pattern is general: **a listing leads with the specs that sound good and omits the ones that do not.** When an important number is missing, assume it is bad, then look for the manufacturer's own specification page or a review to find out.

## Five habits that cover most cases

1. **Find the full model number** of the processor and graphics card, and search for it.
2. **Compare with benchmarks, not with names or core counts.** See [[specs/benchmarks|Reading benchmarks and reviews]].
3. **Check what is soldered** on any laptop or mini PC.
4. **Look at the back and sides** in the photos, and count the ports.
5. **Read one independent review** of the exact model before buying anything over a few hundred dollars.

## Units you will meet

| Unit | Measures | Example |
| --- | --- | --- |
| GB, TB | Capacity of memory and storage | 16GB memory, 1TB SSD |
| GHz | Processor clock speed | 5.2GHz |
| MHz | Memory speed | DDR5-6000 |
| MB/s | Storage transfer speed | 7,000MB/s |
| Mbps, Gbps | Network and cable speed | 2.5Gbps Ethernet |
| Hz | Screen refresh rate | 144Hz |
| ms | Response time or delay | 1ms |
| nits | Screen brightness | 400 nits |
| W | Power drawn or supplied | 750W power supply |
| Wh | Battery capacity | 70Wh battery |
| fps | Frames per second in games | 90fps |
| dBA | Noise level | 35dBA |

Bits and bytes are a common trap: a byte is 8 bits. Network speeds use bits (Mbps), and file sizes use bytes (MB). See [[parts/networking#Megabits and megabytes|Megabits and megabytes]].
