# Exposure modes and metering

The mode dial decides which of the three exposure settings you choose and which the camera chooses. The meter is how the camera decides what "correct" brightness is.

## The mode dial

| Mode | Dial label | You set | Camera sets | Good for |
| ---- | ---------- | ------- | ----------- | -------- |
| Auto | Green box, `A+`, `AUTO` | Nothing | Everything, including flash and focus area | Handing the camera to someone else |
| Program | `P` | ISO (optional) | Aperture and shutter speed | Snapshots with some control |
| Aperture priority | `A` or `Av` | Aperture | Shutter speed | Most photography |
| Shutter priority | `S` or `Tv` | Shutter speed | Aperture | Action, panning |
| Manual | `M` | Aperture and shutter speed | Nothing, or ISO if Auto ISO is on | Studio, night, consistent light, action with Auto ISO |
| Bulb | `B` | Aperture, exposure length by hand | Nothing | Exposures over 30 seconds |

Canon uses `Av` and `Tv` ("aperture value" and "time value"). Everyone else uses `A` and `S`.

**Aperture priority with Auto ISO** is the setup most enthusiasts settle on. You control [[basics/depth-of-field|depth of field]], and the camera keeps the shutter speed above a minimum you choose.

**Manual with Auto ISO** suits wildlife and sport: both the shutter speed and aperture are fixed where you need them, and [[basics/iso|ISO]] absorbs changes in light.

The `C1`, `C2`, `U1` positions on the dial store complete setups, so you can jump between, say, a landscape configuration and a birds-in-flight configuration.

## How the meter thinks

The camera measures the light coming through the lens and chooses an exposure that makes the scene average out to a middle brightness. That works for average scenes and fails in predictable ways:

- **Snow, sand, fog, white walls** come out grey and underexposed.
- **Dark forest, night scenes, black clothing** come out washed out and overexposed.
- **Backlit subjects** come out as silhouettes, because the bright background dominates.

## Exposure compensation

Exposure compensation tells the camera to make the picture brighter or darker than the meter suggests. It is the dial marked `+/-`, in thirds of a stop.

- Snow scene: **+1 to +1.7**
- Backlit person: **+1 to +2**
- Spotlit performer on a dark stage: **-1 to -2**
- Sunset colour: **-0.3 to -1**

On a mirrorless camera you see the result in the viewfinder before you shoot, which makes this far easier to learn than it was on a DSLR.

## Metering modes

| Mode | What it measures | When to use |
| ---- | ---------------- | ----------- |
| Evaluative, matrix, multi | The whole frame, weighted by the camera's scene analysis | Almost always |
| Centre-weighted | The whole frame, favouring the middle | Predictable behaviour with backlight |
| Spot | A small area, often linked to the focus point | A small subject against a very bright or dark background |
| Highlight-weighted | Protects the brightest areas from clipping | Stage lighting, bright skies when shooting raw |

## The histogram

The histogram is a graph of the brightness values in the image: shadows on the left, highlights on the right. It is more trustworthy than the look of the screen, which changes with ambient light and screen brightness.

- A pile against the **right edge** means clipped highlights: pure white with no detail, and unrecoverable.
- A pile against the **left edge** means crushed shadows. These recover better than highlights but get noisy.
- There is no ideal shape. A night scene should sit to the left and a snow scene to the right.

**Zebras** and **highlight warnings** ("blinkies") mark clipped areas directly on the image.

## Exposing for raw

When you shoot [[basics/raw-vs-jpeg|raw]], blown highlights are lost but shadows can be lifted. The usual approach in high-contrast scenes is to protect the highlights and brighten the shadows afterward. At base ISO on a modern sensor, lifting shadows by two or three stops is clean. See [[cameras/dynamic-range-and-noise|dynamic range and noise]].

When a scene has more contrast than the sensor can hold, **exposure bracketing** takes several frames at different exposures to merge later into one HDR image.

## Related

- [[basics|Exposure basics]]
- [[basics/iso|ISO]]
- [[cameras/dynamic-range-and-noise|Dynamic range and noise]]
