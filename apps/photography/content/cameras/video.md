# Video features

Every current mirrorless camera shoots good 4K video. The specifications that separate them are mostly about how much room the footage gives you in editing, how long the camera can record, and how well it handles motion.

## Resolution and frame rate

| Name | Pixels | Notes |
| ---- | ------ | ----- |
| Full HD (1080p) | 1920 x 1080 | Still fine for most online video. Used for very high frame rates |
| 4K UHD | 3840 x 2160 | The standard delivery format |
| DCI 4K (C4K) | 4096 x 2160 | Slightly wider cinema standard |
| 6K, 7K | Around 6000 to 7000 wide | Room to crop, reframe and stabilize for a 4K result |
| 8K | 7680 x 4320 | Needs about 33 megapixels across a 16:9 frame, so 45 megapixels or more on a 3:2 sensor |

| Frame rate | Use |
| ---------- | --- |
| 24 fps (23.98) | Cinema look |
| 25 fps | Standard in 50 Hz regions (Europe, Australia) |
| 30 fps (29.97) | Standard in 60 Hz regions, online video |
| 50 and 60 fps | Smooth motion, or 2x slow motion |
| 100 and 120 fps | 4x to 5x slow motion |
| 180 and 240 fps | Extreme slow motion, usually 1080p only |

## How the sensor is sampled

A 4K frame is about 8 megapixels. A sensor has many more, and how the camera gets from one to the other matters more than the headline resolution.

- **Oversampled.** The camera reads a larger area, such as 6K or 7K, and scales it down to 4K. This is the sharpest and cleanest result.
- **Pixel binned or line skipped.** Pixels are combined or skipped to reach 4K. Softer, with more moiré and noise.
- **Cropped.** Only the central part of the sensor is used. The view becomes narrower, and low-light quality drops in line with the smaller area. Spec sheets say, for example, "4K 120p with 1.5x crop".

Typical pattern: 4K up to 30p is oversampled from the full width, and 4K 60p or 120p involves a crop or binning. Cameras with faster [[cameras/sensor-technology|stacked or partially stacked sensors]] avoid the compromise.

**Open gate** records the sensor's entire 3:2 or 4:3 area instead of a 16:9 slice. It lets you cut horizontal and vertical versions from the same clip, which is useful for social media.

## Bit depth and colour sampling

| Spec | Meaning | Why it matters |
| ---- | ------- | -------------- |
| 8-bit | 256 levels per colour channel | Fine if you do not edit the colour. Bands and breaks up when graded |
| 10-bit | 1,024 levels per channel | The baseline for any serious colour work. Required for log |
| 4:2:0 | Colour stored at a quarter of the resolution | Normal for delivery |
| 4:2:2 | Colour stored at half the resolution | Better for grading and green screen |

**10-bit 4:2:2 internal** is the phrase to look for. Most bodies over about $1,000 now have it.

## Codecs

| Codec | Character |
| ----- | --------- |
| H.264 (AVC) | Universal, easy to play, larger files for the same quality |
| H.265 (HEVC) | Half the size of H.264, harder for older computers to edit |
| All-Intra | Every frame stored whole. Large files that edit smoothly |
| Long GOP | Stores changes between frames. Small files that are harder to edit |
| ProRes | Apple's editing codec. Very large, very easy to edit |
| Raw video | Unprocessed sensor data: Canon Cinema RAW Light, Nikon N-RAW, ProRes RAW, Blackmagic RAW, and RED's R3D on the Nikon ZR |

Higher bitrates need faster cards. See [[cameras/memory-cards-and-batteries|memory cards and batteries]].

## Log and picture profiles

A **log profile** records a flat, low-contrast image that preserves the sensor's full dynamic range for grading later. Each brand has its own: S-Log3 (Sony), C-Log 2 and 3 (Canon), N-Log (Nikon), F-Log2 (Fujifilm), V-Log (Panasonic), OM-Log (OM System).

Log footage looks grey until you apply a **LUT** (lookup table) or grade it. Many cameras can show a corrected preview while recording log, and some can bake a LUT into the footage.

If you do not want to grade, use a standard profile or a ready-made look such as Sony's S-Cinetone, Fujifilm's film simulations or Panasonic's Real Time LUT.

## Heat and recording limits

High-resolution video generates heat, and small sealed bodies can overheat and stop. Manufacturers deal with this in three ways:

- **Built-in fans** on video-first bodies such as the Panasonic S5 II, S1 II and GH7, the Sony FX3 and FX30, and the Canon EOS R6 V.
- **Passive heat sinks** and looser temperature limits you can select in the menu.
- **Accepting limits.** Some compact bodies cap clip length in their most demanding modes.

The old 30-minute recording limit, which came from a European import tax, is gone from nearly all current cameras.

## Rolling shutter in video

Because video always uses the electronic shutter, [[cameras/shutters|rolling shutter]] affects every clip. Fast pans lean, and handheld footage can wobble. Readout speed in video modes is usually faster than in stills, since fewer rows are read. Stacked and partially stacked sensors are clearly better here.

## Audio

- A **3.5 mm microphone input** is essential. A **headphone output** lets you monitor.
- Digital hot shoes on Sony, Canon, Nikon, Fujifilm and Panasonic bodies accept microphones and XLR adapters with no cable.
- **32-bit float** recording captures such a wide range that audio cannot clip, so you do not need to set levels. It is available internally on a few bodies such as the Nikon ZR, and through XLR adapters on Panasonic and Sony.

## Video-first bodies

Several cameras are designed around video and trade away stills features such as a viewfinder or mechanical shutter:

| Camera | Sensor | Notes |
| ------ | ------ | ----- |
| Sony ZV-E10 II | APS-C | Vlogging, no viewfinder |
| Sony FX30 | APS-C | Cinema-line body with fan |
| Sony FX3, FX2 | Full frame | Compact cinema bodies |
| Canon EOS R50 V | APS-C | Entry-level video body |
| Canon EOS R6 V | Full frame | 7K raw, fan, no viewfinder. Released 2026 |
| Nikon ZR | Full frame | RED colour science and R3D raw, 32-bit float audio |
| Panasonic GH7 | Micro Four Thirds | ProRes RAW internal, fan |
| Panasonic S5 IIX, S1 II | Full frame | Hybrid bodies with a strong video feature set |
| Fujifilm X-M5 | APS-C | Compact, open gate 6.2K |

## What to prioritise

| If you shoot | Look for |
| ------------ | -------- |
| Family and travel clips | 4K 30p, good autofocus, stabilization. Every current camera qualifies |
| YouTube and talking head | Articulating screen, mic input, reliable face tracking, no overheating |
| Short films and graded work | 10-bit 4:2:2, log, oversampled 4K, headphone jack |
| Slow motion | 4K 120p without a heavy crop |
| Social media in both orientations | Open gate |
| Paid work | Dual card slots, timecode, unlimited recording, raw or ProRes |

## Related

- [[basics/shutter-speed#Shutter speed in video|Shutter speed in video]]
- [[cameras/image-stabilization|Image stabilization]]
- [[lenses/filters|Filters]]
