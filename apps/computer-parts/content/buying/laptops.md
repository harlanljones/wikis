# How to choose a laptop

> **In one sentence:** you cannot change a laptop's screen, keyboard, memory or battery after you buy it, so judge those first and the processor last.

A laptop is a set of compromises between weight, battery life, performance and price. Nearly everything is fixed at purchase, which makes the choice less forgiving than choosing desktop parts.

## The short answer

For most people: a 13- to 15-inch laptop with a current processor, **16GB of memory**, a **512GB SSD**, a screen of **300 nits or brighter** covering close to **100% of sRGB**, and at least one USB-C port that charges it.

| Need | Look for | Typical price |
| --- | --- | --- |
| Basic web and schoolwork | A Chromebook, or a budget laptop with 8GB to 16GB and a real SSD | $300 to $600 |
| General use | 16GB, 512GB, a good IPS or OLED screen | $700 to $1,200 |
| Travel | Under 1.3kg, 12 or more hours of real battery life | $1,000 to $1,600 |
| Gaming | A dedicated graphics chip, a 144Hz or faster screen, 16GB to 32GB | $1,000 to $2,500 |
| Photo and video | 32GB, a color-accurate screen, strong processor and graphics | $1,500 to $3,000 |
| Programming | 32GB, a comfortable keyboard, a sharp screen | $1,200 to $2,200 |

For current chip families and example prices, see [[market#Laptops|The market right now]].

## Decide in this order

### 1. Operating system

| System | Good for | Less good for |
| --- | --- | --- |
| Windows | The widest choice of hardware and software, and gaming | Consistency. Quality varies a great deal between models |
| macOS | Battery life, build quality, creative work, long software support | Games, upgrades, low prices |
| ChromeOS | Simplicity and low cost for web-based use | Anything that needs installed desktop software |
| Linux | Development, privacy, older hardware | Some commercial software and games |

If the people around you, or your school or employer, all use one system, that is a strong reason to match it.

### 2. Size and weight

| Screen | Weight | Suits |
| --- | --- | --- |
| 13 to 14 inches | 1.0 to 1.5kg | Carrying every day |
| 15 to 16 inches | 1.6 to 2.3kg | A bit of both |
| 17 to 18 inches | 2.5kg and up | Staying mostly on a desk |

### 3. Screen

You will look at it for every minute of use. Check:

- **Resolution:** 1920 x 1200 or better. Avoid 1366 x 768.
- **Brightness:** 300 nits is the minimum, 400 or more for bright rooms. 250 nits is dim.
- **Color:** close to 100% sRGB. "45% NTSC" means washed out.
- **Panel:** IPS or OLED. Avoid TN.
- **Aspect ratio:** 16:10 shows more of a page than 16:9.
- **Refresh rate:** 60Hz is fine for work. 120Hz feels smoother. Games want 144Hz or more.

See [[parts/monitor|Monitor]] for what these mean.

### 4. Memory

- **8GB:** only for Chromebooks, very light use, or Apple's budget MacBook.
- **16GB:** the right amount for most people.
- **32GB:** creative work, programming, many apps at once.

Then find out whether it is **soldered**. On most thin laptops it is, and what you buy is what you have for life. See [[parts/memory|Memory]].

### 5. Storage

512GB is a comfortable minimum, 1TB if you keep photos, videos or games. Check that it is an **SSD**, not eMMC, and whether it can be replaced. See [[parts/storage|Storage]].

### 6. Processor

Any current-generation chip in the right family is fast enough for general use. Choose the family for its character, not for a few percent of speed.

| Family | Character |
| --- | --- |
| Intel Core Ultra (latest series) | Good all-rounder, strong battery life |
| AMD Ryzen AI | Good all-rounder, strong integrated graphics, often better value |
| Qualcomm Snapdragon X | Longest battery life on Windows, cool and quiet, some compatibility limits |
| Apple M-series | Fast, cool, very long battery life, no speed loss on battery |

See [[specs/cpu-model-names|Processor model names]] to check that a chip is current.

### 7. Battery

Ignore the advertised hours and find a review with a measured test. As a guide, capacity is given in watt-hours (Wh): 50Wh is small, 70Wh is good, and 99Wh is the practical maximum, because airlines restrict batteries over 100Wh.

### 8. Keyboard, trackpad and ports

Try the keyboard in a shop if you can. Count the ports in the photos and check at least one USB-C port supports charging and video. See [[specs/ports-and-cables|Ports and cables]].

### 9. Graphics, if you need it

For games, 3D or video effects, you need a dedicated graphics chip, or one of the few processors with strong integrated graphics. Check the chip's **wattage (TGP)** and its VRAM. See [[specs/gpu-model-names#Laptop graphics|Laptop graphics]].

## Reading a laptop listing

A full specification, with what each line tells you:

| Line | Reading |
| --- | --- |
| 14" 2880 x 1800 OLED, 120Hz, 400 nits, 100% DCI-P3 | An excellent screen. Every important number is given |
| Intel Core Ultra 7 355 | Series 3, current generation, mid-to-upper tier |
| 16GB LPDDR5X | "LP" means soldered. You cannot add more |
| 512GB M.2 NVMe SSD | A standard replaceable drive |
| Intel Arc Graphics | Integrated. Fine for everything except demanding games |
| 70Wh battery, 65W USB-C charger | A good-sized battery that charges from any decent USB-C charger |
| 2x Thunderbolt 4, 1x USB-A, HDMI 2.1, headphone jack | A full set of ports |
| 1.2kg | Light |

And a listing to be suspicious of:

| Line | Reading |
| --- | --- |
| 15.6" HD display | 1366 x 768. Too few pixels for a screen this size |
| Intel Core i5 processor | No model number. Probably several generations old |
| 8GB RAM | Tight on Windows, and likely one stick |
| 128GB eMMC storage | Slow, tiny and soldered |
| "Up to 10 hours battery" | Unmeasured |

## Red flags

- A processor with no model number.
- 4GB of memory in anything, or 8GB soldered in a Windows laptop above $500.
- eMMC storage, or less than 256GB.
- A 250-nit or "45% NTSC" screen.
- "Dedicated graphics" without naming the chip.
- A barrel charger and no USB-C charging on a thin laptop.
- A model sold by only one retailer with no reviews anywhere.
- Windows 10 preinstalled, or a processor too old for Windows 11.

## Windows on Arm

Laptops with Qualcomm Snapdragon chips, and the new Nvidia-based ones, use the Arm architecture. Apple's Macs do too, with their own software ecosystem. On Windows this matters because most Windows software was written for Intel and AMD chips.

- **Most everyday apps now have native Arm versions** or run well through Windows' built-in translation.
- **Check before buying if you depend on:** specialist or older business software, hardware that needs its own drivers (some printers, audio interfaces, lab equipment), certain VPN clients, or games.
- **Games are the weak point.** Many run, some do not, and several popular online games block Arm because of their anti-cheat software.

The reward is the longest battery life available on Windows and a laptop that stays cool and quiet. For web, office and media use it is an easy recommendation. For gaming or specialist software, stay with Intel or AMD.

## Chromebooks

A Chromebook runs a browser, Android apps and little else. That makes it cheap, simple, secure and quick on modest hardware. It suits school use and anyone whose work lives in a browser. Check the **automatic update expiry date** for the model, because Chromebooks stop receiving updates after a fixed number of years from launch.

## MacBooks

- The **MacBook Air** is the default recommendation for general use: silent, light, and fast.
- The **MacBook Pro** adds a better screen, more ports, longer battery life and the Pro and Max chips for heavy work.
- Apple's cheapest MacBook is a good basic laptop, with 8GB of memory as its main limit.
- Nothing can be upgraded later, and Apple's memory and storage upgrades are expensive. Decide the configuration carefully. Apple's own refurbished store sells machines with the same one-year warranty for about 15% less.

## Gaming laptops

- Check the graphics chip's wattage and the screen's refresh rate and brightness.
- A cooling design with good reviews matters more than a slightly faster chip.
- Expect loud fans under load and short battery life when gaming.
- Thick and heavy usually means cooler, quieter and cheaper for the same performance.
- Prefer models with two memory slots and two SSD slots.

## Getting more for less

- **Last year's model** on clearance is often the best value in any store.
- **Refurbished business laptops** (ThinkPad, Latitude, EliteBook) are sturdy, repairable and cheap. See [[buying/used-and-refurbished|Buying used and refurbished]].
- **Education discounts** from Apple, Dell, Lenovo, HP and Microsoft are worth 5% to 15%.
- **Repairable designs**, such as Framework's, cost more up front and let you replace the battery, ports, screen and mainboard.

## See also

- [[buying/desktop-or-laptop|Desktop or laptop?]]
- [[buying/common-mistakes|Common mistakes]]
- [[use-cases|What to buy for what you do]]
