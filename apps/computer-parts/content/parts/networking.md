# Networking

> **In one sentence:** use a cable when you can, and when you cannot, the router usually matters more than the Wi-Fi chip in your computer.

## What it does

Networking hardware connects the computer to your router, and through it to the internet. Three things are involved, and the slowest one sets your speed:

1. **Your internet plan**, bought from your provider.
2. **Your router**, and how far you are from it.
3. **The network hardware in your computer**: an Ethernet port, a Wi-Fi chip, or both.

A new computer will not fix a slow plan or a weak router at the far end of the house.

## What to buy

| Situation | What to do |
| --- | --- |
| Desktop near the router | Use Ethernet. Every motherboard has a port |
| Desktop far from the router | Buy a motherboard with Wi-Fi 6E or Wi-Fi 7 built in, or run a cable if you can |
| Laptop | Any current laptop has Wi-Fi 6E or 7. Nothing to choose |
| Wi-Fi is slow or drops in some rooms | Replace or reposition the router, or add a mesh system. The computer is rarely the cause |
| Online gaming | Ethernet if at all possible |
| Moving large files between your own machines | 2.5Gb Ethernet at both ends and on the switch between them |

## The specs, explained

### Ethernet speed

**Matters: mostly for local transfers.**

Wired ports are rated by speed:

| Port | Speed | Notes |
| --- | --- | --- |
| Gigabit (1GbE) | 1,000Mbps | Enough for nearly all home internet plans |
| 2.5GbE | 2,500Mbps | Standard on current mid-range motherboards |
| 5GbE and 10GbE | 5,000 to 10,000Mbps | High-end boards, home servers, multi-gigabit fiber |

A port only runs as fast as the router or switch on the other end.

### Wi-Fi generation

**Matters: moderately.**

| Name | Technical name | Bands | Notes |
| --- | --- | --- | --- |
| Wi-Fi 5 | 802.11ac | 5GHz | Old but usable |
| Wi-Fi 6 | 802.11ax | 2.4 and 5GHz | Handles many devices better |
| Wi-Fi 6E | 802.11ax | Adds 6GHz | A new, uncrowded band |
| Wi-Fi 7 | 802.11be | 2.4, 5 and 6GHz | Wider channels, can use several bands at once |

To benefit from a generation, both the computer and the router must support it. A Wi-Fi 7 laptop on a Wi-Fi 5 router gets Wi-Fi 5.

### Bands

**Matters: for understanding range.**

- **2.4GHz:** longest range, slowest, crowded.
- **5GHz:** fast, medium range.
- **6GHz:** fastest and least crowded, shortest range. Works best in the same room or the next one.

### Bluetooth

**Matters: slightly.**

Bluetooth comes with the Wi-Fi chip. Any version from 5.0 up is fine for headphones, mice and controllers. A desktop motherboard without Wi-Fi usually has no Bluetooth either. A $10 USB adapter fixes that.

### Megabits and megabytes

**Matters: for reading speed tests.**

Internet speeds are in megabits per second (Mbps). File sizes and download speeds in apps are in megabytes (MB). There are 8 bits in a byte, so a 400Mbps connection downloads at about 50MB per second.

## Specs you can mostly ignore

- **Headline Wi-Fi speeds** ("BE19000", "5.8Gbps"). They add up every band at theoretical maximums. Real speeds are a fraction.
- **"Gaming" network chips and traffic-prioritising software.**
- **Antenna count on a router**, taken alone.
- **Wi-Fi 7 as a reason to choose one laptop over another**, unless you already own a Wi-Fi 7 router.
- **10GbE**, unless you have a specific use for it.

## Going deeper

- **Latency matters more than speed for games and calls.** Ping, and how much it varies (jitter), decide how responsive a game feels. Wi-Fi adds variable delay. Ethernet does not.
- **Wi-Fi 7's main features** are 320MHz channels in the 6GHz band, 4K-QAM encoding, and Multi-Link Operation (MLO), which lets a device use two bands together for speed or reliability. All of them need a Wi-Fi 7 router.
- **Mesh systems** use several units to cover a house. Ones with a wired link between units ("wired backhaul") or a dedicated radio for it perform far better than basic extenders, which halve throughput.
- **Router placement.** Central, high up and in the open beats a faster router in a cupboard. Walls, floors, mirrors and fish tanks absorb signal.
- **Powerline and MoCA adapters** carry network traffic over electrical wiring or TV coax. MoCA is fast and reliable where coax exists. Powerline varies enormously with the wiring.
- **Cable categories.** Cat5e carries gigabit, and 2.5GbE over typical home distances. Cat6 handles 10GbE to 55 meters and Cat6a to 100 meters. Cat7 and Cat8 offer nothing useful at home.
- **Desktop Wi-Fi antennas.** A motherboard with Wi-Fi comes with an external antenna that must be screwed on. Without it the signal is terrible.
- **USB Wi-Fi adapters** work and are the weakest option. A PCIe card or M.2 module with proper antennas is better.
- **Your provider's router** is often the weak link. Most allow you to use your own.

## Common mistakes

- Blaming the computer for a weak router.
- Forgetting to attach the Wi-Fi antennas to a desktop.
- Paying for a gigabit plan and using it over 2.4GHz Wi-Fi from two rooms away.
- Buying a Wi-Fi extender when a better-placed router would do.
- Confusing megabits with megabytes when judging a download.
- Building a desktop with no Wi-Fi and no way to run a cable.

## See also

- [[parts/motherboard|Motherboard]]
- [[specs/ports-and-cables|Ports and cables]]
- [[use-cases/home-server|Home server and NAS]]
