# Home server and NAS

> **In one sentence:** a home server needs very little processing power, so optimise for low idle electricity use, quiet running, enough drive bays, and above all a backup.

A home server is a computer that stays on to provide something to the household: file storage, backups, a media library, home automation, or self-hosted services. A **NAS** (network-attached storage) is a server whose main job is holding files.

## What do you want it to do?

| Job | Hardware needed |
| --- | --- |
| Shared files and backups for the household | Very little. Two or more drive bays |
| Media library streamed to TVs and phones | A processor with integrated graphics that can convert video (Intel's are the usual choice) |
| Home automation, ad blocking, small services | Almost nothing. A mini PC or even a Raspberry Pi |
| Photo library with automatic sorting | A modest processor and 16GB of memory |
| Security camera recording | Drives rated for continuous writing |
| Many containers or virtual machines | More cores and 32GB or more of memory |
| Game servers | A few fast cores and memory according to the game |

## Three ways to get one

| Route | Cost | For | Against |
| --- | --- | --- | --- |
| Ready-made NAS (Synology, QNAP, Ugreen and others) | $200 to $700 without drives | Simple setup, polished apps, compact, low power | Limited performance for the price, tied to the maker's software |
| Mini PC or an old desktop | $0 to $400 | Cheap, flexible, efficient | Few or no internal drive bays |
| Build your own | $400 and up without drives | The most capability and drive bays for the money, any software | More to learn and maintain |

For a first server, a ready-made two- or four-bay NAS, or a spare computer you already own, is the right start. You can learn what you need before spending much.

## What matters

### Idle power

A server runs 8,760 hours a year, nearly all of them idle. Each watt of idle draw costs roughly $1 to $3 a year, depending on your electricity price.

| Machine | Typical idle draw |
| --- | --- |
| Raspberry Pi or similar | 3W to 6W |
| Low-power mini PC | 6W to 15W |
| Ready-made NAS with two drives | 15W to 30W |
| Efficient self-built server | 20W to 40W |
| Old gaming desktop | 60W to 100W |
| Used enterprise server | 100W to 250W |

An old gaming PC is free to try and can cost more in electricity over a few years than an efficient replacement.

### Drives

Hard drives are still the economical way to store many terabytes.

- **Buy CMR drives, not SMR.** SMR drives become extremely slow during the long rewrites a NAS performs when rebuilding. See [[parts/storage#Hard drive specs|Hard drive specs]].
- **NAS-rated drives** are designed for continuous running and vibration from neighboring drives.
- **Use an SSD for the system and apps**, and hard drives for bulk data.
- **Buy more bays than you need today.** Adding a drive is easy. Replacing the whole box is not.

### Redundancy

Storing data across several drives so that one can fail without loss is called **RAID**.

| Layout | Drives | Survives | Usable space |
| --- | --- | --- | --- |
| Single drive | 1 | Nothing | All of it |
| Mirror (RAID 1) | 2 | One failure | Half |
| RAID 5 or RAIDZ1 | 3 or more | One failure | All but one drive's worth |
| RAID 6 or RAIDZ2 | 4 or more | Two failures | All but two drives' worth |

**RAID is not a backup.** It keeps the server running when a drive dies. It does nothing about accidental deletion, ransomware, a failed power supply taking drives with it, fire or theft.

### Backup

Whatever holds the only copy of your photos needs a second copy somewhere else. The usual pattern is three copies, on two kinds of device, with one off site: the original, the server, and either a cloud backup or a drive kept at another address. See [[parts/storage#Backups|Backups]].

### Memory

8GB runs basic file sharing. 16GB suits a server running a handful of services. 32GB or more for virtual machines or the ZFS file system with large pools.

**ECC memory** detects and corrects memory errors and is worth having for data you care about, where the platform supports it. It is desirable and not essential. Good backups matter more.

### Processor

Almost anything works. Low-power Intel N-series chips handle file serving and several media streams. For converting video on the fly, Intel's integrated graphics (Quick Sync) is efficient and widely supported. More cores only matter for many containers or virtual machines.

### Network

Gigabit Ethernet moves about 110MB per second, which matches a single hard drive. 2.5Gb Ethernet is a cheap, worthwhile step up if your switch and computers support it. Always use a cable for a server. See [[parts/networking|Networking]].

### Noise and placement

Hard drives click and hum, and small fans whine. Put the server somewhere ventilated and out of living spaces if you can, and not in a sealed cupboard.

## Software

| Software | Kind | Notes |
| --- | --- | --- |
| Synology DSM, QNAP QTS | Comes with a ready-made NAS | Easiest. Limited to that maker's hardware |
| TrueNAS | Free NAS system | Built on the ZFS file system, with strong data protection |
| Unraid | Paid NAS system | Mixes drives of different sizes easily |
| OpenMediaVault | Free NAS system | Light, runs on modest hardware |
| Proxmox | Free virtualization platform | For running many virtual machines and containers |
| Plain Linux with Docker | General-purpose | Most flexible, most to learn |

## A power protection note

A sudden power cut during a write can corrupt data. An **uninterruptible power supply (UPS)**, about $70 to $200, keeps the server running through short cuts and shuts it down cleanly in long ones. It is the most worthwhile accessory for a server.

## Security

- Do not expose a NAS directly to the internet. Ready-made NAS boxes have been frequent ransomware targets.
- Reach it from outside through a VPN or a mesh VPN service.
- Keep its software updated.
- Use separate accounts with strong passwords, and turn on two-factor sign-in.

## Used hardware

Home servers suit second-hand parts well:

- **Ex-business mini PCs and small desktops** are cheap, efficient and reliable. Models with an Intel 8th-generation or later chip handle media conversion well.
- **Used enterprise servers** are very cheap for their capability, and loud and power-hungry. Suitable for a garage, not a flat.
- **Used hard drives** are risky. If you use them, use redundancy and test them thoroughly first.

See [[buying/used-and-refurbished|Buying used and refurbished]].

## Late 2026 note

SSD prices have risen sharply with the wider memory shortage, and large hard drives have become dearer too. Check current prices before planning capacity, and reuse drives you already own for backup copies. See [[market|The market right now]].

## See also

- [[parts/storage|Storage]]
- [[parts/networking|Networking]]
- [[parts/power-supply|Power supply]]
