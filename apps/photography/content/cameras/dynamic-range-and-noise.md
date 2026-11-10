# Dynamic range and noise

Dynamic range is the span between the brightest and darkest tones a camera can record in one exposure while keeping detail in both. Noise is the grain that limits how far you can go into the dark end.

They are two views of the same thing: how much light the sensor can hold, and how cleanly it reads what little it gets in the shadows.

## Dynamic range

Dynamic range is measured in stops. Each stop is a doubling of brightness.

| | Approximate range |
| - | ----------------- |
| A sunlit scene with deep shade | 14 stops or more |
| Human vision, adapting as you look around | 20+ stops |
| Modern full-frame sensor at base ISO | 13 to 15 stops measured, about 11 to 12 usable |
| Modern APS-C sensor at base ISO | About 1 stop less |
| Micro Four Thirds at base ISO | About 1.5 to 2 stops less |
| A JPEG or a standard screen | 8 to 10 stops |

Manufacturers quote the larger "measured" figure, which counts shadows too noisy to use. Independent tests such as Photons to Photos report a stricter figure, which is why you will see both 15 and 11.5 quoted for the same camera.

Two things to know:

- **Dynamic range is highest at base ISO** and drops by about a stop for every stop of ISO you add. At ISO 6400 any camera has far less room than at ISO 100.
- **Highlights clip abruptly.** Once a pixel is full, the detail is gone. Shadows fade into noise gradually. This is why the advice for [[basics/raw-vs-jpeg|raw]] shooters is to protect the highlights.

## Where noise comes from

**Shot noise** is the randomness of light itself. Photons arrive unevenly, and the unevenness is proportionally larger when there are few of them. It is the dominant source of noise in almost every photo, and the only cure is more light: a wider aperture, a longer exposure, or a larger sensor.

**Read noise** is added by the sensor's electronics when the pixels are read out. It matters in deep shadows. Modern sensors have very little.

**Thermal noise and hot pixels** build up over long exposures as the sensor warms. Long exposure noise reduction takes a second, dark frame and subtracts it.

Because shot noise depends on total light, a bigger sensor at the same exposure is cleaner. See [[cameras/sensor-sizes|sensor sizes]].

## ISO invariance

On many modern sensors, shooting at a low ISO and brightening the raw file afterward gives almost the same noise as shooting at a higher ISO in the camera. Such sensors are called **ISO invariant**.

The practical use: in a high-contrast scene, you can deliberately underexpose to keep the highlights and then lift the shadows, without the noise penalty you would have paid a decade ago. Most sensors are invariant only above their dual gain switch point, so the technique works best from that ISO upward. See [[basics/iso|ISO]].

## Getting cleaner images

In rough order of effect:

1. **Give the sensor more light.** Wider aperture, slower shutter with stabilization or a tripod, or add light.
2. **Expose correctly.** An underexposed photo brightened later is noisier than one exposed properly.
3. **Shoot raw and use modern denoising.** AI noise reduction is worth one to two stops.
4. **View at a sensible size.** Noise that looks alarming at 100 percent on screen disappears in a print or a phone-sized image.
5. **Use a larger sensor,** if the above is not enough.

## Handling scenes with too much contrast

When the scene exceeds the sensor's range:

- **Expose for the highlights** and lift the shadows in a raw editor.
- **Bracket** three to five exposures and merge to HDR. Needs a still scene, and a tripod helps.
- **Use a graduated ND filter** to darken the sky. See [[lenses/filters|filters]].
- **Wait.** The light at the edges of the day is softer, which is half the reason landscape photographers get up early.
- **Add light** to the shadows with flash or a reflector.

## Related

- [[basics/iso|ISO]]
- [[basics/exposure-modes-and-metering|Exposure modes and metering]]
- [[cameras/sensor-technology|Sensor technology]]
