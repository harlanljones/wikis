# Buying used and refurbished

> **In one sentence:** used processors, memory, monitors and business computers are safe bargains, while used power supplies and hard drives are not worth the risk.

Computer hardware has few moving parts and mostly either works or does not. Bought carefully, second-hand parts give the best value in computing, and with new memory and graphics cards priced as they are in late 2026, the used market matters more than usual.

## What is safe to buy used

| Part | Risk | Notes |
| --- | --- | --- |
| Processor | Very low | Almost never fails. Check for bent pins on the chip (older AMD) or in the motherboard socket |
| Memory | Very low | Works or does not. Run a memory test on arrival. Currently holds its value well |
| Case | Very low | Check for missing panels, screws and front-panel cables |
| Monitor | Low | Check for dead pixels, scratches and backlight bleed. Check hours of use on an OLED |
| Keyboard and mouse | Low | Clean them |
| Motherboard | Moderate | Hard to test without other parts. Check socket pins and that all slots work |
| Graphics card | Moderate | See below |
| SSD | Moderate | Check its health report. Avoid very cheap high-capacity drives from unknown brands |
| Air cooler | Low | Make sure the mounting kit for your socket is included |

## What to avoid used

| Part | Why |
| --- | --- |
| Power supply | It ages internally, you cannot see its condition, and a failure can damage everything else |
| Hard drive | A wear item with a limited life. Never trust one with your only copy of anything |
| Liquid cooler | Pumps wear out and the liquid slowly permeates away |
| Laptop battery | Assume a used laptop's battery is worn, and price in a replacement |
| Anything with a "no returns" condition and a price too good to be true | It is |

## Refurbished computers

"Refurbished" covers a wide range. In order of trust:

1. **Manufacturer refurbished** (Apple Certified Refurbished, Dell Outlet, Lenovo Outlet, HP Renew). Inspected and repaired by the maker, with a full or near-full warranty. Usually 10% to 25% off.
2. **Large certified refurbishers** selling ex-corporate machines, graded by cosmetic condition, with a warranty of 90 days to a year.
3. **Marketplace "renewed" listings** from small sellers. Quality varies. Read the seller's ratings and the warranty terms.

### Ex-business desktops and laptops

Companies replace computers on a three- to five-year cycle, and the old ones are sold in bulk. These are business-grade machines: Lenovo ThinkPad and ThinkCentre, Dell Latitude and OptiPlex, HP EliteBook and EliteDesk. They are sturdy, easy to repair, and cheap.

A good choice looks like this:

- A processor new enough for **Windows 11**: Intel 8th generation or later, or AMD Ryzen 2000 series or later. This is the most important check.
- **16GB of memory**, or 8GB with a free slot.
- **An SSD**, not a hard drive.
- A **1080p IPS screen** on a laptop. Many older business laptops shipped with poor 1366 x 768 panels.
- A stated battery condition, or a low enough price to cover a $40 to $80 replacement.

Expect to pay $150 to $400 for a machine that handles web, office and schoolwork well for several more years.

## Buying a used graphics card

Used graphics cards carry the most risk and offer the largest savings.

**Check before buying:**

- Photos of the actual card, including the serial number sticker and the connectors.
- The seller's history and return terms.
- Signs of heavy use: thick dust, yellowed plastic, oil staining around the thermal pads.
- That the listing names the exact model and memory size.

**Check on arrival, inside the return window:**

1. Inspect the fans, the connector pins and the circuit board for damage.
2. Install it and run a demanding game or a stress test for an hour.
3. Watch for visual glitches, crashes, and temperatures above about 85°C.
4. Confirm the model and memory size in the driver software match the listing.

**Cards that were used for cryptocurrency mining** are not necessarily bad. They ran at steady temperatures, which is gentler than repeated heating and cooling. Their fans may be worn and are cheap to replace.

**Scams to recognise:** a listing for the box only, written to look like the card. A photo that does not match the description. A card with a modified firmware reporting a better model than it is, which a quick benchmark exposes. A price far below every other listing.

## Buying a used laptop

- **Battery:** ask for the cycle count or the reported health. On Windows, the command `powercfg /batteryreport` produces a report. On a Mac it is under System Settings, Battery.
- **Screen:** check for dead pixels, bright spots and pressure marks.
- **Keyboard and trackpad:** test every key.
- **Ports and hinges:** check each port works and the hinges are firm.
- **Locks:** make sure the previous owner has removed any firmware password, and on a Mac that Activation Lock is off. A locked machine is a brick.
- **Company ownership:** ex-corporate laptops can be enrolled in remote management that reinstalls itself after a reset. Buy from a refurbisher who clears it.

## Where to buy

| Place | Protection | Notes |
| --- | --- | --- |
| Manufacturer outlets | Full warranty | The safest route |
| Large retailers' open-box sections | Store return policy | Often like new at 10% to 20% off |
| eBay | Buyer protection covers items not as described | Check the seller's rating. Pay through the site |
| Specialist used-hardware forums | Reputation systems | Good prices. Some knowledge needed |
| Local marketplaces | None | Test before paying. Meet somewhere public with power available |

Always pay through a method with buyer protection. Never pay by bank transfer, gift card or a "friends and family" payment to someone you do not know.

## Testing what you buy

| Part | Test |
| --- | --- |
| Memory | Run MemTest86 from a USB stick for one full pass |
| SSD and hard drive | Read the health data with CrystalDiskInfo. Look at "health", "power-on hours" and "reallocated sectors" |
| Processor | Run a stress test such as Cinebench for ten minutes and watch for crashes |
| Graphics card | An hour of a demanding game or 3DMark |
| Monitor | Full-screen solid colors to find dead pixels. A black screen in a dark room for backlight bleed |
| Whole computer | Install every update, then use it hard for a week inside the return window |

## Selling your old parts

Hardware holds value better than people expect, and better still in the current market. Memory, graphics cards and processors sell quickly. Wipe drives properly before selling: use the operating system's reset option with the "clean the drive" setting, or the SSD maker's secure erase tool.

## Going deeper

- **Windows 10 has reached end of support.** A machine that cannot run Windows 11 will not receive security updates. It can still serve well with Linux or ChromeOS Flex.
- **Warranty transfer.** Some makers honor warranties for any owner based on the serial number. Others require the original receipt. Check before paying a premium for "still under warranty".
- **Previous-generation parts sold new** are often a better deal than used current ones, with a full warranty.
- **Server and workstation pulls** (used Xeon and EPYC systems, ECC memory) are very cheap and suit a [[use-cases/home-server|home server]]. They are loud and use a lot of power.
- **Thermal paste and pads** on any card or laptop more than four years old may have dried out. Replacing them often restores lost performance.

## See also

- [[buying/upgrading|Upgrade or replace?]]
- [[buying/when-to-buy|When to buy]]
- [[market|The market right now]]
