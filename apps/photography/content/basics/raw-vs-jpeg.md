# Raw vs JPEG

A camera can save a finished picture, the unprocessed sensor data, or both.

- A **JPEG** is a finished image. The camera has applied white balance, contrast, colour, sharpening and noise reduction, then thrown away what it did not need.
- A **raw file** is the sensor data with almost nothing decided. You finish it later in software.

## The differences

| | JPEG | HEIF | Raw |
| - | ---- | ---- | --- |
| Tonal precision | 8-bit (256 levels per channel) | 10-bit (1,024 levels) | 12-bit or 14-bit (4,096 or 16,384 levels) |
| White balance | Baked in | Baked in | Changeable afterward |
| Highlight and shadow recovery | Very little | A little more | Several stops |
| File size at 24 megapixels | 8 to 12 MB | 5 to 10 MB | 25 to 50 MB |
| Ready to share | Yes | Yes, where supported | No, needs processing |
| Opens anywhere | Yes | Mostly | Needs a raw editor that supports your camera |

Each manufacturer has its own raw format: `.CR3` (Canon), `.NEF` (Nikon), `.ARW` (Sony), `.RAF` (Fujifilm), `.RW2` (Panasonic), `.ORF` (OM System), `.DNG` (Leica, Sigma, Pentax, Hasselblad and others). Editors need an update to read files from a newly released camera, which can take a few weeks.

## When raw is worth it

- **High-contrast scenes.** Sunsets, backlit subjects, bright skies over dark land. Raw files hold detail in highlights and shadows that a JPEG discards.
- **Difficult or mixed light.** [[basics/white-balance|White balance]] can be corrected perfectly.
- **High ISO.** Modern AI denoising works on raw data and beats in-camera noise reduction by a wide margin.
- **Anything you care about.** You can re-edit a raw file in ten years with better software. A JPEG is fixed.

## When JPEG is the better choice

- You want finished photos straight from the camera and do not want to edit.
- You need to send images immediately, as sports and news photographers do.
- You are shooting very long bursts and want the buffer to last.
- You like the camera's colour. Fujifilm's film simulations and similar picture profiles from other brands are a real reason to shoot JPEG.

## Raw + JPEG

Most cameras can save both at once. It costs storage but removes the decision: use the JPEG when it is good enough and open the raw file when it is not. With two card slots you can send raw files to one card and JPEGs to the other.

## Raw compression

Raw files come in several flavours, and menus label them inconsistently.

| Type | Quality | Size | Notes |
| ---- | ------- | ---- | ----- |
| Uncompressed | Full | Largest | Rarely worth it |
| Lossless compressed | Full | About half | The best default |
| Lossy compressed | Very slightly reduced | Smallest | Fine for most work. Canon C-RAW, Nikon High Efficiency, Sony Compressed |

Some cameras also drop from 14-bit to 12-bit in their fastest burst modes or with the electronic shutter. This costs a little shadow quality at low ISO and is invisible at high ISO.

## Editing software

Raw files need a raw editor. Common choices:

- **Adobe Lightroom** and Camera Raw: the default for most people, subscription only.
- **Capture One**: strong colour tools and tethered shooting.
- **DxO PhotoLab** and **PureRAW**: excellent noise reduction and lens corrections.
- **Darktable** and **RawTherapee**: free and open source.
- The manufacturer's own software (Canon DPP, Nikon NX Studio, Sony Imaging Edge): free and matches the camera's colour exactly, though usually slower to use.

## Related

- [[basics/white-balance|White balance]]
- [[cameras/dynamic-range-and-noise|Dynamic range and noise]]
- [[cameras/memory-cards-and-batteries|Memory cards and batteries]]
