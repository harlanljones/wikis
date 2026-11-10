# Power supply (PSU)

> **In one sentence:** buy a well-reviewed unit with enough watts from a known brand, because a bad power supply is the one part that can damage the others.

## What it does

The power supply unit converts mains electricity from the wall into the low voltages the parts use. It does not make a computer faster. A poor one causes crashes under load, and a truly bad one can fail in a way that takes other parts with it. This is the part where the cheapest option is a false economy.

Laptops and most mini PCs use an external power brick instead, and you do not choose it.

## What to buy

Match the wattage to your [[parts/gpu|graphics card]], which is the biggest consumer by far.

| Your graphics card | Sensible PSU size |
| --- | --- |
| None (integrated graphics) | 400W to 500W |
| Entry and mainstream (60 class) | 550W to 650W |
| Upper mid-range (70 class) | 650W to 750W |
| High end (80 class) | 850W |
| Flagship (90 class) | 1000W or more |

Then:

- **Choose 80 Plus Gold efficiency** as a default. Bronze is acceptable on a tight budget.
- **Check a review or a community tier list** for the exact model. Brand alone is not enough, because every brand sells both good and poor units.
- **Look for a warranty of 7 to 10 years.** Makers only offer that on units they trust.
- **Choose an ATX 3.0 or ATX 3.1 unit** if you are buying a current Nvidia card, so it has the right connector built in.

A good 750W Gold unit costs about $90 to $120 and will outlast two or three builds.

## The specs, explained

### Wattage

**Matters: get enough, with headroom.**

This is the maximum power the unit can deliver. Add the processor's and graphics card's power draw, add about 100W for everything else, then add 30% headroom. A higher-rated supply does not use more electricity. It only supplies what the parts ask for.

Graphics card makers publish a recommended PSU wattage for each card. It is conservative and safe to follow.

### Efficiency rating (80 Plus)

**Matters: moderately.**

Some power is lost as heat in conversion. The 80 Plus rating says how little.

| Rating | Efficiency at half load | Notes |
| --- | --- | --- |
| 80 Plus (White) | about 80% | Avoid |
| Bronze | about 85% | Budget builds |
| Gold | about 90% | The sweet spot |
| Platinum | about 92% | Small gain for more money |
| Titanium | about 94% | For machines that run all day |

Efficiency is not a quality rating. It correlates with quality, because makers rarely put good efficiency into a badly built unit, but a review tells you more. **Cybenetics** is a newer rating scheme that also grades noise.

### Modularity

**Matters: for tidiness.**

- **Non-modular:** all cables permanently attached. Unused ones must be tucked away.
- **Semi-modular:** the essential cables are attached and the rest plug in.
- **Fully modular:** every cable plugs in. Easiest to build with.

**Never mix modular cables between power supplies**, even from the same brand. The plugs on the PSU end are not standardised, and a cable from a different model can send the wrong voltage and destroy drives.

### Connectors

**Matters: check you have the ones you need.**

| Connector | Powers |
| --- | --- |
| 24-pin | The motherboard |
| 8-pin EPS (4+4) | The processor. High-end boards want two |
| 8-pin PCIe (6+2) | Graphics cards, up to 150W each |
| 12V-2x6 (also called 12VHPWR) | Most current Nvidia cards, up to 600W through one cable |
| SATA power | Drives, fans hubs, lighting controllers |

### ATX 3.0 and 3.1

**Matters: with current graphics cards.**

These are the current versions of the PSU standard. They require the supply to cope with the brief power spikes modern graphics cards produce, and they include the 12V-2x6 connector natively. ATX 3.1 uses the revised connector, which is the one to prefer.

### Size

**Matters: for small cases.**

**ATX** is the standard size. **SFX** and **SFX-L** are smaller units for compact cases. Check the case's specification. Some small cases limit PSU length even for ATX units.

## Specs you can mostly ignore

- **Single rail versus multi rail.**
- **"Gaming" branding and RGB fans.**
- **Peak wattage.** Only the continuous rating counts. A unit sold on a "peak" figure is one to avoid.
- **Platinum and Titanium ratings** for an ordinary home PC. The electricity saved takes many years to repay the extra cost.

## Going deeper

- **The efficiency curve** peaks around 40% to 60% load, which is one reason for headroom. A second reason is noise: a lightly loaded PSU's fan barely spins, and many units stop the fan entirely at low load.
- **Transient spikes.** High-end graphics cards can briefly draw twice their rated power for milliseconds. ATX 3.x units are required to tolerate excursions up to 200% for 100 microseconds. Older units could trip their protection and shut the PC down.
- **The 12V-2x6 connector** shortened the sense pins of the earlier 12VHPWR design so the card will not draw full power from a plug that is not fully seated. Push it in until it clicks, with no gap, and leave about 35mm of straight cable before any bend.
- **Protections.** Good units list OCP, OVP, UVP, OPP, SCP and OTP (over-current, over-voltage, under-voltage, over-power, short-circuit, over-temperature). Units missing several of these are how PSU horror stories happen.
- **Who actually made it.** Most brands buy from manufacturers such as Seasonic, CWT, FSP, HEC and Great Wall. The same brand can sell an excellent unit and a poor one in adjacent product lines. This is why model-specific reviews and tier lists exist.
- **Ageing.** Capacitors degrade over a decade or so. A ten-year-old unit from a good line is generally fine to reuse for a modest build. A ten-year-old budget unit is not worth the risk.
- **Used power supplies** are one of the few parts not worth buying second-hand. See [[buying/used-and-refurbished|Buying used and refurbished]].
- **Surge protection.** A surge protector is cheap insurance. A UPS (battery backup) is worth having for a home server or anywhere with unreliable power.

## Common mistakes

- Buying the cheapest unit with a large number on the box.
- Reusing modular cables from a different power supply.
- Using one cable with two plugs on it to feed a high-power graphics card that has two sockets. Use two separate cables.
- Not pushing the 12V-2x6 or 24-pin connector fully home.
- Forgetting the switch on the back of the unit when the new build will not turn on.
- Buying 1200W for a mid-range build.

## See also

- [[parts/gpu|Graphics card]]
- [[building/compatibility|Compatibility checklist]]
