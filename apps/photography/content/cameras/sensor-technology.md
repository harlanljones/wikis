# Sensor technology

Two sensors of the same size and resolution can behave very differently. The differences are in how the sensor is built and, above all, in how fast it can be read.

## Why readout speed matters

A sensor does not capture every pixel at the same instant. It reads its rows one after another, top to bottom. The time that takes is the **readout speed**, and it decides:

- How much [[cameras/shutters|rolling shutter]] distortion the electronic shutter shows
- How fast the camera can shoot silent bursts
- Whether the viewfinder stays live between frames or blacks out
- How often autofocus can update
- How good the video modes are, and whether they need a crop

| Sensor type | Typical full-frame readout | Electronic shutter is... |
| ----------- | -------------------------- | ------------------------ |
| Conventional BSI, high resolution | 60 to 100 ms (about 1/15 s) | For still subjects only |
| Conventional BSI, 24 megapixels | 20 to 50 ms (1/50 to 1/20 s) | Usable with care |
| Partially stacked | 10 to 15 ms (about 1/80 s) | Fine for most action |
| Stacked | 4 to 6 ms (1/250 to 1/160 s) | Fine for nearly everything |
| Global shutter | 0 | Perfect |

Figures vary by camera and by mode. Many cameras read faster in 12-bit mode or in video than in 14-bit stills.

## The designs

### Front-side illuminated (FSI)

The original CMOS layout. The wiring sits on top of the light-sensitive layer and blocks some of the light. It is found in older and budget sensors.

### Backside illuminated (BSI)

The sensor is flipped so the wiring is behind the light-sensitive layer. More light reaches each pixel, which helps most with small pixels and at the corners of the frame. BSI is now the baseline for mid-range and better cameras.

### Stacked

A stacked sensor bonds the pixel layer to a second chip carrying memory and processing circuits. With far more circuitry directly behind the pixels, the sensor can be read many times faster.

Stacked sensors make possible: 20 to 40 fps bursts with full autofocus, a viewfinder with no blackout, electronic shutters fast enough to replace the mechanical one, and high-frame-rate video without a crop. The Nikon Z8 and Z9 have no mechanical shutter at all.

They are expensive to make and have traditionally been reserved for flagships: the Sony a1 II and a9 series, Nikon Z8 and Z9, Canon R1, R3 and R5 Mark II, Fujifilm X-H2S, and OM System OM-1 Mark II and OM-3. In 2026 Sony's a7R VI brought a stacked design to a 66.8-megapixel sensor.

### Partially stacked

A cheaper variation that places the extra circuitry in bands above and below the pixel area instead of behind all of it. Readout is three to four times faster than a conventional sensor, though short of fully stacked.

It first appeared in the Nikon Z6 III in 2024, and the same approach is used in the Panasonic S1 II, Nikon ZR and Sony a7 V. It is the main reason recent $2,000 to $3,000 bodies feel so much faster than their predecessors.

The trade-off reported for some of these sensors is slightly lower dynamic range at base ISO, about half a stop in the deep shadows. It is hard to see outside of heavy shadow lifting.

### Global shutter

A global shutter sensor captures every pixel at the same instant, so there is no rolling shutter at all. The Sony a9 III (2023) was the first full-frame stills camera with one. It shoots 120 fps, syncs flash at any shutter speed up to 1/80,000 s, and never shows banding under flickering lights.

The cost is image quality: its base ISO is 250 and it is roughly a stop noisier than conventional sensors, with less dynamic range. It is a specialist tool for sports and flash work.

## Other terms on the spec sheet

**Dual conversion gain (dual gain, dual native ISO).** Two amplifier circuits per pixel, one tuned for bright light and one for dim. See [[basics/iso|ISO]].

**Dual gain output (DGO).** Reads each pixel through both circuits at once and combines them for extra dynamic range. It is used in the Panasonic GH7 and S1 II and in the Sony a7R VI, among others. It usually works only at lower frame rates.

**Bayer filter.** Each pixel sees only red, green or blue through a tiny colour filter, arranged in a repeating 2 x 2 pattern. Full colour is calculated from neighbouring pixels. Nearly all cameras use this.

**X-Trans.** Fujifilm's alternative 6 x 6 colour filter pattern on most X-series cameras, designed to reduce moiré without a blur filter.

**Optical low-pass filter (OLPF, anti-aliasing filter).** A filter that very slightly blurs the image to prevent moiré, the false colour patterns that appear on fine repeating detail such as fabric. Most high-resolution cameras omit it for sharper results.

**Monochrome sensors.** No colour filter at all, giving sharper black-and-white images with less noise. Sold by Leica and Pentax.

## What to take from this

- For landscapes, portraits and travel, sensor type barely matters. A conventional BSI sensor is excellent.
- For sport, wildlife, events where silence matters, and serious video, a stacked or partially stacked sensor is the upgrade that changes what the camera can do.
- A newer mid-range camera with a partially stacked sensor often outperforms an older flagship for action.

## Related

- [[cameras/shutters|Shutters]]
- [[cameras/dynamic-range-and-noise|Dynamic range and noise]]
- [[cameras/video|Video features]]
