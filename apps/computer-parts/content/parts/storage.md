# Storage (SSD and hard drive)

> **In one sentence:** get an SSD for the operating system and apps, choose capacity before speed, and keep a backup of anything you cannot replace.

## What it does

Storage keeps your files, apps and operating system when the power is off. In the [[basics|kitchen analogy]] it is the pantry.

There are two technologies:

- **SSD (solid-state drive):** no moving parts, silent, and fast. A computer with an SSD starts in seconds.
- **HDD (hard disk drive):** spinning magnetic platters. Slow, but cheap for very large capacities.

The change from a hard drive to any SSD is the largest speed improvement an old computer can get. The difference between a cheap SSD and an expensive one is hard to notice in daily use.

## What to buy

| You do | Capacity | Kind |
| --- | --- | --- |
| Web, office, streaming | 256GB to 512GB | Any SSD |
| General use with photos and some games | 1TB | NVMe SSD |
| Gaming with a large library | 1TB to 2TB | NVMe SSD |
| Video editing | 2TB or more, ideally a second drive for footage | NVMe SSD |
| Backups, media library, home server | 4TB and up | Hard drives |

Rules that cover most cases:

- **The drive the operating system lives on should be an SSD.** Do not buy a computer that boots from a hard drive or from "eMMC" storage.
- **Any mainstream NVMe drive is fast enough.** A mid-priced PCIe 4.0 drive is the sensible default.
- **Modern games are 50GB to 150GB each.** A 512GB drive holds the operating system and three or four of them.
- **Leave 10% to 20% of an SSD empty.** A full SSD slows down.

SSD prices have risen sharply. See [[market#SSD prices|The market right now]].

## The specs, explained

### Capacity (GB and TB)

**Matters: most of all.**

1TB (terabyte) is about 1,000GB. Your computer will report slightly less than the label says, because drive makers and operating systems count differently. A "1TB" drive shows about 931GB.

### Interface: NVMe, SATA

**Matters: a lot.**

This is how the drive talks to the computer.

- **NVMe** drives plug into an **M.2** slot on the motherboard and are 5 to 25 times faster than SATA. This is what to buy.
- **SATA** drives are older and top out at about 550MB/s. They come as 2.5-inch boxes with cables, or as M.2 sticks. Still fine for a second drive or an old laptop.

M.2 is the shape of the slot, and both NVMe and SATA drives can use it. A listing that says "M.2 SSD" without "NVMe" may be the slow kind.

### PCIe generation (Gen 3, Gen 4, Gen 5)

**Matters: a little.**

NVMe drives are rated by the PCIe generation they use:

| Generation | Top speed | Notes |
| --- | --- | --- |
| PCIe 3.0 | about 3,500MB/s | Older, still fine |
| PCIe 4.0 | about 7,400MB/s | The sweet spot |
| PCIe 5.0 | 10,000 to 14,900MB/s | Costs more, runs hot, rarely noticeable |

A newer drive works in an older slot at the slot's speed. In everyday use, including game loading, the difference between Gen 3 and Gen 5 is a second or two. Gen 5 pays off only when copying very large files between two equally fast drives.

### Sequential read and write speed

**Matters: less than the number suggests.**

The big number on the box ("7,000MB/s") is **sequential** speed: reading one large file from start to end. Starting the computer and opening apps is mostly **random** access to thousands of small files, which is far slower on every drive and differs much less between them.

### Form factor (2280, 2230)

**Matters: for fit.**

M.2 drives are named by size in millimeters. **2280** (22mm wide, 80mm long) is standard for desktops and most laptops. **2230** is the short kind used in handheld gaming PCs and some small laptops.

### Endurance (TBW) and warranty

**Matters: rarely.**

SSD cells wear out with writing. **TBW** (terabytes written) is how much the maker guarantees, typically 600TBW for a 1TB drive. A typical home user writes 10TB to 20TB a year, so the drive will be obsolete long before it wears out. A five-year warranty is a reasonable sign of a decent drive.

### Hard drive specs

**Matters: if you are buying one.**

- **RPM:** 7,200rpm is faster and louder than 5,400rpm.
- **CMR or SMR:** two recording methods. **CMR** is the one you want for a NAS or anything written to often. **SMR** drives are cheaper and become very slow during long writes.
- **NAS-rated drives** are built to run all day in multi-drive boxes.

## Specs you can mostly ignore

- **PCIe 5.0**, unless you move huge files daily.
- **Peak sequential speeds** between two drives of the same generation.
- **Heatsinks** on Gen 3 and Gen 4 drives. Most motherboards include one. Gen 5 drives do need one.
- **"Gaming" SSDs.**
- **MTBF hours.** The figure is a statistical abstraction.

## Backups

Every drive fails eventually, SSDs often without warning. Storage advice is incomplete without this:

- **Keep three copies of anything irreplaceable**, on two kinds of device, with one copy somewhere else. A common setup is the computer, an external drive, and a cloud backup service.
- **A sync service is not a backup.** If you delete a file, the deletion syncs.
- **RAID is not a backup.** It protects against a drive failing, not against deletion, theft, fire or ransomware.

## Going deeper

- **TLC and QLC.** These describe how many bits each flash cell stores. **TLC** (3 bits) is the mainstream. **QLC** (4 bits) is cheaper, has lower endurance, and slows dramatically once its fast cache fills during a long write. QLC is fine for a game library and poor for a work drive that sees heavy writes.
- **DRAM and DRAM-less drives.** Better drives carry their own small memory chip to track where data is. Cheaper **DRAM-less** drives borrow a little system memory instead (called HMB). Modern DRAM-less drives are good enough for most people.
- **The SLC cache.** Nearly every consumer SSD writes quickly to a fast buffer first, then slows when the buffer fills. Reviews that show a "sustained write" graph reveal the drive's real speed.
- **Check lane sharing.** On many motherboards, using a particular M.2 slot disables some SATA ports or takes lanes from the graphics slot. The manual has a table.
- **Health monitoring.** Drives report wear and errors through SMART. Free tools such as CrystalDiskInfo read it. Check this on any used drive.
- **External drives.** A portable SSD on a 10Gbps USB port manages about 1,000MB/s. The port and cable matter as much as the drive. See [[specs/ports-and-cables|Ports and cables]].
- **Crucial is leaving the consumer market.** Micron has announced it is winding down its Crucial consumer brand, so warranty support for those drives is worth checking before buying.

## Common mistakes

- Buying a faster drive instead of a larger one.
- Buying a laptop with 256GB and discovering the storage is soldered.
- Buying an M.2 SATA drive by accident.
- Using a single drive for everything, with no backup.
- Using SMR hard drives in a NAS.
- Filling an SSD to 99%.

## See also

- [[parts/memory|Memory]], which storage is often confused with
- [[use-cases/home-server|Home server and NAS]]
- [[buying/upgrading|Upgrade or replace?]]
