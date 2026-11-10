# Ports and cables

> **In one sentence:** USB-C is only the shape of the plug, and what a given port or cable can actually do has to be read from the fine print.

Ports are the most confusing part of modern hardware, mainly because one oval connector, USB-C, can carry anything from slow data to video, fast storage and laptop charging, or only some of those.

## USB

### The plug shapes

| Shape | Looks like | Notes |
| --- | --- | --- |
| USB-A | The classic flat rectangle | Still the most common. Only fits one way up |
| USB-C | A small oval | Reversible. Used for data, video and charging |
| Micro-USB, Mini-USB, USB-B | Older small and square plugs | Legacy devices and printers |

### The speeds

USB speeds have been renamed several times. The speed in Gbps is the only part worth reading.

| Speed | Names you will see | Typical use |
| --- | --- | --- |
| 480Mbps | USB 2.0 | Keyboards, mice, printers |
| 5Gbps | USB 3.0, USB 3.1 Gen 1, USB 3.2 Gen 1 | Flash drives, hard drives, webcams |
| 10Gbps | USB 3.1 Gen 2, USB 3.2 Gen 2 | Portable SSDs |
| 20Gbps | USB 3.2 Gen 2x2 | Fast portable SSDs. USB-C only |
| 40Gbps | USB4, Thunderbolt 3, Thunderbolt 4 | Docks, fast external drives, external graphics |
| 80Gbps | USB4 version 2, Thunderbolt 5 | The newest high-end laptops and docks |

On USB-A ports, color is a rough hint: black or white is usually USB 2.0, blue is 5Gbps, and red or teal is often 10Gbps. It is a convention, not a rule.

### What a USB-C port might do

A USB-C port has up to three separate abilities. A port can have any combination.

| Ability | What to look for |
| --- | --- |
| Data | A speed from the table above. A USB-C port can be as slow as USB 2.0 |
| Video output | "DisplayPort Alt Mode", a small DP logo, or Thunderbolt |
| Charging | "Power Delivery" or "PD", with a wattage |

A lightning-bolt icon marks Thunderbolt. A laptop's specification page lists what each port supports. The store listing usually does not.

## Thunderbolt

Thunderbolt is a certification on top of USB-C that guarantees a port does everything, at a known speed.

| Version | Speed | Guarantees |
| --- | --- | --- |
| Thunderbolt 3 | 40Gbps | Fast data, video, charging |
| Thunderbolt 4 | 40Gbps | The same, with stricter minimums: two 4K displays, fast storage, charging on at least one port |
| Thunderbolt 5 | 80Gbps, up to 120Gbps for displays | Higher speeds, more display bandwidth, at least 140W charging |

Thunderbolt devices work in USB4 ports and the reverse, at whatever both ends support. If you want one cable to a dock that runs monitors, storage, network and charging, a Thunderbolt or USB4 port is what to look for.

## Charging over USB-C

**USB Power Delivery (PD)** lets a USB-C port charge a laptop.

- Thin laptops need 45W to 100W.
- Larger laptops can use up to 240W over newer "EPR" chargers and cables.
- Gaming laptops usually still need their own large power brick for full performance. USB-C charging on them is a slower backup.

A charger with a lower wattage than the laptop wants will charge slowly, or only when the laptop is asleep. A higher-wattage charger is safe: the laptop takes what it needs.

## Cables

Cables are where most problems come from, because they all look alike.

- **Many USB-C cables are charge cables that carry data at USB 2.0 speed.** The cable in a phone box is usually one of these. It will make a fast SSD crawl.
- **Cables have a power limit:** 60W, 100W or 240W. A 60W cable caps charging at 60W.
- **Cables have a data limit:** fast cables are labelled 10Gbps, 20Gbps, 40Gbps or 80Gbps, or carry a Thunderbolt logo with a number.
- **Not every USB-C cable carries video.**
- **Length matters at high speeds.** Passive 40Gbps cables are short, around 0.8 meters. Longer ones are "active" and cost more.

The dependable choice is a certified cable labelled with both a speed and a wattage. A Thunderbolt 4 cable does everything up to 40Gbps and 100W and is a good one to keep for troubleshooting.

## Video ports

### HDMI

| Version | Maximum | Notes |
| --- | --- | --- |
| HDMI 1.4 | 4K at 30Hz, 1080p at 120Hz | Old |
| HDMI 2.0 | 4K at 60Hz | Common on older monitors and budget laptops |
| HDMI 2.1 | 4K at 120Hz or 144Hz, 8K at 60Hz | Needed for high refresh from consoles. Adds variable refresh rate |
| HDMI 2.2 | Higher still | Announced in 2025 and only beginning to appear |

For HDMI 2.1 features, use a cable labelled **Ultra High Speed**.

### DisplayPort

| Version | Maximum | Notes |
| --- | --- | --- |
| DisplayPort 1.2 | 4K at 60Hz, 1440p at 144Hz | Old |
| DisplayPort 1.4 | 4K at 120Hz, and far higher using DSC compression | The common standard on monitors and graphics cards |
| DisplayPort 2.1 | 4K at 240Hz and beyond without compression | Comes in three speed grades: UHBR10, UHBR13.5 and UHBR20 |

DisplayPort is the default for connecting a desktop PC to a monitor. HDMI is the default for TVs and consoles. Either works for most monitors.

### What to plug in where

- **Desktop with a graphics card:** plug the monitor into the card, never the motherboard.
- **High refresh rate not available?** The usual cause is an old cable or an HDMI 2.0 port. Try DisplayPort.
- **Laptop to monitor:** USB-C with DisplayPort, Thunderbolt, or HDMI. Check which version of HDMI the laptop has.
- **Old VGA or DVI monitor:** adapters exist, and it is usually time for a new monitor.

## Other ports

| Port | Use |
| --- | --- |
| Ethernet (RJ45) | Wired networking. See [[parts/networking\|Networking]] |
| 3.5mm audio jack | Headphones and microphones. A single combined jack is common on laptops |
| SD or microSD card reader | Camera cards. Valuable for photographers |
| Optical audio (S/PDIF) | Older audio equipment |
| Kensington lock slot | A physical security cable |
| Barrel power jack | A laptop's own charger |

## Docks and hubs

- **A USB-C hub** ($20 to $60) adds a few USB-A ports, HDMI and a card reader. It shares one port's bandwidth, so do not expect two high-refresh monitors.
- **A Thunderbolt or USB4 dock** ($150 to $400) runs multiple monitors, fast storage and wired networking over one cable, and charges the laptop.
- **Base-model Macs and some budget laptops limit the number of external monitors.** Check before buying two.

## Going deeper

- **USB4 has optional parts.** A USB4 port may be 20Gbps or 40Gbps, and PCIe tunnelling (needed for external graphics and the fastest drives) was optional in the first version. Thunderbolt 4 certification removes the doubt.
- **USB 3.2 Gen 2x2 is poorly supported.** A 20Gbps drive in a port without Gen 2x2 falls back to 10Gbps, even if that port is USB4.
- **Bandwidth sharing.** DisplayPort Alt Mode can take all four high-speed lanes in a USB-C cable, leaving only USB 2.0 for data, or two lanes each. This is why some hubs drop to slow USB when driving a 4K 60Hz display.
- **Display Stream Compression (DSC)** is visually lossless and is how DisplayPort 1.4 drives 4K at 240Hz.
- **Front-panel USB-C on a desktop case** needs a matching header on the motherboard, and that header's speed sets the port's speed.
- **eGPUs** (external graphics cards) work over Thunderbolt or the faster OCuLink connector, with a performance loss of 10% to 30% compared with a desktop.
- **Cable certification logos** from the USB Implementers Forum show both wattage and speed. Uncertified cables are a lottery.

## Common mistakes

- Assuming every USB-C port charges the laptop or drives a monitor.
- Using a phone charging cable for a fast external SSD.
- Running a 144Hz monitor over an old HDMI cable at 60Hz.
- Buying a 20Gbps SSD for a computer with no 20Gbps port.
- Buying a cheap hub and expecting two 4K monitors.
- Plugging the monitor into the motherboard on a PC with a graphics card.

## See also

- [[parts/monitor|Monitor]]
- [[parts/motherboard|Motherboard]]
- [[buying/laptops|How to choose a laptop]]
