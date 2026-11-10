# Cooling

> **In one sentence:** a $35 tower air cooler and a case with a mesh front handle almost any build, and anything beyond that buys quietness or looks.

## What it does

Every watt a computer uses becomes heat. Cooling moves that heat out of the parts and then out of the case. If a part gets too hot it protects itself by slowing down, which is called **thermal throttling**. Good cooling keeps the computer at full speed and keeps it quiet.

There are two jobs:

- **Processor cooling:** a cooler mounted on the [[parts/cpu|processor]].
- **Case airflow:** fans that bring cool air in and push warm air out.

Graphics cards come with their own coolers.

## What to buy

| Your processor | Cooler |
| --- | --- |
| 65W class (most 6- and 8-core chips) | A single-tower air cooler, $20 to $40 |
| 105W to 125W class, and gaming X3D chips | A dual-tower air cooler, $35 to $60, or a 240mm liquid cooler |
| Top-end 16-core and Intel flagship chips | A large dual-tower air cooler or a 360mm liquid cooler, $70 to $150 |

For the case: one or two intake fans at the front and one exhaust fan at the back is enough for most builds. Many cases include them. See [[parts/case|Case]].

## The specs, explained

### Air cooler or liquid cooler

**Matters: mostly for fit and looks.**

- **Air coolers** are a block of metal fins with heat pipes and one or two fans. They are cheap, reliable and last for a decade. Good ones match mid-sized liquid coolers.
- **AIO liquid coolers** (all-in-one) pump liquid from a block on the processor to a radiator mounted on the case. They move heat directly to the edge of the case, look tidy, and at the largest sizes cool best. They cost more, have a pump that can fail, and typically last five to seven years.

Custom water-cooling loops are a hobby, not a requirement for anything.

### Size

**Matters: essential for fit.**

- **Air cooler height** in millimeters must be less than the case's "maximum CPU cooler height". Large towers are 155mm to 168mm tall.
- **Radiator size** is the fan count times the fan size: 240mm (two 120mm fans), 280mm (two 140mm), 360mm (three 120mm). The case must list support for that size in the position you plan to use.

### Socket compatibility

**Matters: essential.**

The cooler must include a mounting kit for your socket. Nearly all current coolers support AM5 and LGA 1851. AM5 uses the same mounting as the older AM4, and LGA 1851 the same as LGA 1700, so most coolers from the last several years still fit.

### Fan size and speed

**Matters: for noise.**

Larger fans move the same air at lower speed, which is quieter. 120mm and 140mm are the standard sizes. **PWM** fans (4-pin) can be speed-controlled smoothly by the motherboard, so they stay quiet at idle.

### Noise (dBA)

**Matters: but the numbers are unreliable.**

Makers measure noise in their own ways, so dBA figures cannot be compared between brands. Use independent reviews, which measure every cooler the same way.

### Thermal paste

**Matters: a little.**

Paste fills microscopic gaps between the processor and the cooler. Most coolers come with it already applied or include a tube. If you apply it yourself, a pea-sized blob in the center is fine. Differences between decent pastes are a degree or two.

## Specs you can mostly ignore

- **"TDP rating" of a cooler** ("supports 250W"). There is no standard for it.
- **RGB lighting and LCD screens on the pump.**
- **Exotic thermal pastes and liquid metal.**
- **Maximum fan RPM.** Higher is louder, not better.
- **Number of heat pipes**, quoted alone.

## What temperatures are normal

Modern processors are designed to run hot under heavy load. They raise their own speed until they hit a temperature limit, then hold there.

| Situation | Typical processor temperature |
| --- | --- |
| Idle or browsing | 35 to 55°C |
| Gaming | 60 to 80°C |
| Full load (rendering, exporting) | 80 to 95°C |

AMD's current chips target up to 95°C and Intel's up to about 105°C by design. Seeing 90°C during a video export is not a fault. Seeing it while idle is.

## Going deeper

- **Airflow direction.** Fans blow toward the side with the frame struts. Front and bottom fans should pull air in. Rear and top fans should push air out. An air cooler should blow toward the rear exhaust.
- **Positive pressure.** Slightly more intake than exhaust means air leaves through the gaps, and dust enters only through the filtered intakes.
- **Radiator placement.** Mount an AIO so the pump is not the highest point of the loop, otherwise trapped air collects in the pump and makes it noisy. Top-mounted radiators and front-mounted radiators with the tubes at the bottom both satisfy this.
- **Fan curves.** The motherboard's setup screen lets you set how fan speed responds to temperature. A gentle curve with a few seconds of delay stops fans surging up and down.
- **Contact frames and offset mounting.** Some coolers ship offset brackets for AM5 because the hot spot is not in the center of the chip, worth a couple of degrees.
- **Undervolting and power limits** reduce heat at the source. AMD's Curve Optimizer and Eco Mode, and Intel's power limits, can cut temperatures by 10°C or more for a small performance cost.
- **Laptops.** Cooling is the main difference between a thin laptop and a thick one with the same chips. Cleaning dust from the vents and fans every year or two restores lost performance. See [[buying/laptops|How to choose a laptop]].
- **Dust.** Clean filters and fans with compressed air once or twice a year. Hold the fan blades still while you do it.

## Common mistakes

- Leaving the plastic film on the cooler's base. It happens to everyone once.
- Buying a tower cooler taller than the case allows.
- Buying a 360mm liquid cooler for a 65W processor.
- Mounting every fan as exhaust, or every fan as intake.
- Choosing a case with a solid glass or plastic front and wondering why it runs hot.
- Panicking at 85°C under full load.

## See also

- [[parts/case|Case]]
- [[parts/cpu#Power draw and TDP|Processor power draw and TDP]]
