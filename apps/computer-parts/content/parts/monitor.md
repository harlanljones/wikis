# Monitor

> **In one sentence:** the monitor is the part you actually look at, it outlasts two or three computers, and a 27-inch 1440p screen is the right choice for most desks.

## What it does

The monitor shows the picture. It is the most neglected part of most setups: people pair a powerful computer with an old office screen and never see what they paid for.

A monitor should be chosen together with the [[parts/gpu|graphics card]]. The card must be able to draw enough frames at the monitor's resolution, and the monitor must be able to show the frames the card draws.

## What to buy

| You do | Size and resolution | Refresh rate | Panel |
| --- | --- | --- | --- |
| Office work, web, schoolwork | 24-inch 1080p or 27-inch 1440p | 60Hz to 100Hz | IPS |
| Lots of text, spreadsheets, coding | 27-inch 1440p or 4K | 60Hz to 120Hz | IPS |
| Gaming on a budget | 24- or 27-inch 1080p | 144Hz or more | IPS or VA |
| Gaming, the sweet spot | 27-inch 1440p | 144Hz to 240Hz | IPS or OLED |
| Competitive shooters | 24- or 27-inch | 240Hz and up | Fast IPS or OLED |
| Photo and video editing | 27-inch 1440p or 4K | 60Hz is fine | IPS or OLED with good color coverage |
| Films and immersive games | 32-inch 4K or 34-inch ultrawide | 120Hz or more | OLED or Mini-LED |

Monitor prices are low at the moment. See [[market#Monitors|The market right now]].

## The specs, explained

### Size and resolution

**Matters: most of all.**

**Resolution** is the number of pixels. More pixels at the same size means sharper text and images.

| Name | Pixels | Best at |
| --- | --- | --- |
| 1080p (Full HD) | 1920 x 1080 | 24 inches. Looks soft at 27 |
| 1440p (QHD, "2K") | 2560 x 1440 | 27 inches |
| 4K (UHD) | 3840 x 2160 | 27 to 32 inches |
| Ultrawide 1440p | 3440 x 1440 | 34 inches |

Higher resolution makes games much harder to run. 4K has four times the pixels of 1080p.

### Refresh rate (Hz)

**Matters: a lot for games, a little for everything else.**

This is how many times per second the screen updates. 60Hz is the baseline. At 120Hz and above, motion is smoother and the mouse feels more direct, even on the desktop. The step from 60Hz to 144Hz is obvious to nearly everyone. The step from 144Hz to 240Hz is subtle. Beyond that only competitive players benefit.

A high refresh rate only helps if the computer produces that many frames, and if you set it. Windows often defaults to 60Hz until you change it in display settings.

### Panel type

**Matters: a lot.**

| Type | Good at | Weak at |
| --- | --- | --- |
| IPS | Color accuracy, viewing angles, all-round use | Blacks look grey in a dark room |
| VA | Deep blacks and contrast, low price | Smearing in dark fast scenes, narrower viewing angles |
| TN | Speed, low price | Color and viewing angles. Largely obsolete |
| OLED | Perfect blacks, instant response, superb HDR | Price, modest peak brightness, burn-in risk with static content |
| Mini-LED | Very high brightness, strong HDR, no burn-in | Halos around bright objects on dark backgrounds |

**OLED** comes in two varieties, **QD-OLED** and **WOLED**, with small differences in color brightness and how they handle reflections. **Mini-LED** is an IPS or VA panel with a backlight divided into many dimmable zones.

### Response time

**Matters: but the advertised number does not.**

Response time is how quickly a pixel changes color. Slow panels smear moving objects. Nearly every monitor claims "1ms", measured in a way that does not reflect real use. Reviews measure it properly. OLED is in a class of its own here at about 0.03ms.

### Adaptive sync (G-Sync, FreeSync, VRR)

**Matters: for gaming. Now standard.**

Variable refresh rate matches the screen's updates to the frames the graphics card produces, which removes tearing and stutter. **FreeSync** (AMD) and **G-Sync Compatible** (Nvidia) are names for the same underlying feature, and nearly every gaming monitor works with both brands of card.

### HDR

**Matters: only when done properly.**

High dynamic range shows brighter highlights and deeper shadows at once. Most monitors that list HDR cannot do it meaningfully.

- **HDR10 or DisplayHDR 400:** the monitor accepts an HDR signal. It will not look better, and often looks worse.
- **DisplayHDR 600 to 1000 with local dimming (Mini-LED):** real HDR.
- **DisplayHDR True Black 400 or 500 (OLED):** real HDR.

### Brightness (nits)

**Matters: in bright rooms.**

250 nits is dim, 300 to 400 is normal, and more helps near a window. HDR needs 600 nits or more to be convincing on an LCD.

### Color gamut and accuracy

**Matters: for creative work.**

- **sRGB coverage** near 100% is the baseline for accurate web and photo color.
- **DCI-P3** and **Adobe RGB** coverage matter for video and print work.
- **Delta E (ΔE)** under 2 means errors are invisible to the eye.
- Laptop listings sometimes quote "45% NTSC", which is about 60% of sRGB and means a visibly washed-out screen.

### Ports

**Matters: check they match your computer.**

- **DisplayPort 1.4** handles most monitors up to 4K 144Hz, using light compression (DSC).
- **HDMI 2.1** is needed for 4K at 120Hz from a console or TV-style source.
- **DisplayPort 2.1** carries the highest resolutions and refresh rates without compression.
- **USB-C with DisplayPort and power delivery** lets one cable carry video and charge a laptop. Check the wattage.

See [[specs/ports-and-cables|Ports and cables]].

### Stand and mounting

**Matters: for comfort.**

Height adjustment is worth having. Cheap monitors often only tilt. A **VESA mount** (the four screw holes on the back) lets you fit a monitor arm instead.

## Specs you can mostly ignore

- **"1ms" response time claims.**
- **Dynamic contrast ratio** ("100,000,000:1").
- **HDR10 or HDR400 labels.**
- **Built-in speakers.** They are nearly always poor.
- **Curvature on a 24- or 27-inch screen.** It helps on ultrawides.
- **"8K ready".**

## Going deeper

- **Pixel density.** 24-inch 1080p is 92 pixels per inch, 27-inch 1440p is 109, 27-inch 4K is 163. Around 110ppi works at 100% scaling on Windows. 4K at 27 inches is used at 150% scaling, giving the workspace of 1440p with much sharper text. macOS looks best at about 110ppi or about 220ppi and handles in-between densities less gracefully.
- **OLED burn-in.** Static elements (taskbars, toolbars, a spreadsheet grid) displayed for thousands of hours can leave a faint permanent ghost. Current panels run automatic compensation and many carry three-year burn-in warranties. For mixed use it is manageable. For eight hours a day of static office work, IPS is the safer choice.
- **OLED text fringing.** OLED subpixels are arranged differently from the stripe layout operating systems expect, which puts faint colored fringes on text. Newer panels and higher pixel densities have reduced it considerably.
- **Motion clarity** depends on both response time and refresh rate. A 240Hz OLED looks clearer in motion than a 360Hz LCD. Backlight strobing (sold as ELMB, DyAc, ULMB) improves LCD clarity at the cost of brightness.
- **Bandwidth and DSC.** 4K at 240Hz needs either DisplayPort 2.1 at its top speed (UHBR20) or Display Stream Compression, which is visually lossless in practice. A few features such as some multi-monitor and capture setups behave differently with DSC active.
- **Glossy versus matte.** Glossy coatings give richer contrast and show reflections. Matte coatings diffuse reflections and add slight grain. Choose by how bright your room is.
- **Dual-mode monitors** can switch between, for example, 4K at 160Hz and 1080p at 320Hz. Useful if you play both scenic and competitive games.
- **TVs as monitors.** A 42- to 48-inch OLED TV makes a good gaming display with HDMI 2.1. Check for 4:4:4 chroma support so text is sharp.
- **Calibration.** For color-critical work, a hardware calibrator matters more than the monitor's factory report.

## Common mistakes

- Spending $1,500 on a PC and $90 on the monitor.
- Leaving a 144Hz monitor set to 60Hz in the display settings.
- Plugging the monitor into the motherboard instead of the graphics card.
- Using an old HDMI cable that limits the refresh rate.
- Buying 4K for gaming with a graphics card that cannot drive it.
- Buying 27-inch 1080p for text work.
- Paying extra for an "HDR" badge that means HDR400.

## See also

- [[parts/gpu|Graphics card]]
- [[specs/ports-and-cables|Ports and cables]]
- [[use-cases/gaming|Gaming]] and [[use-cases/creative|Photo, video and 3D work]]
