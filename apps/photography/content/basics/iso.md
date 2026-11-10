# ISO

ISO sets how bright the camera makes the image from the light it collected. Doubling the ISO doubles the brightness, which is one stop.

ISO is often described as "sensitivity". That is a useful shorthand but not literally true. The sensor's sensitivity is fixed. Raising ISO amplifies the signal after the light has been captured.

## Why high ISO looks noisy

Noise comes mostly from a shortage of light, not from the ISO setting itself. Light arrives as individual photons, and their arrival is slightly random. With lots of light the randomness averages out. With little light it shows as grain.

When you raise ISO it is because you are using a faster shutter speed or a narrower aperture, so less light reaches the sensor. The image is noisier because it was built from less light. The amplification makes that visible.

This is also why sensor size matters: at the same exposure, a larger sensor collects more total light. See [[cameras/dynamic-range-and-noise|dynamic range and noise]].

## Base ISO

Every camera has a **base ISO**, usually 100 (sometimes 64, 125, 160, 200 or 250). At base ISO the sensor can hold the most light before clipping, so it gives the cleanest image and the widest dynamic range. Use it whenever there is enough light.

Settings marked **Lo** or **extended** below base do not improve quality. They overexpose and darken, which loses highlight room.

## Dual gain

Most modern sensors have two amplification circuits per pixel, a design called **dual conversion gain**. The camera switches to the second, lower-noise circuit at a particular ISO, commonly somewhere between ISO 320 and 800 for stills.

The practical result is that the ISO just above the switch point can be cleaner in the shadows than the ISO just below it. It is one reason not to worry about moving off base ISO.

## How high can you go?

It depends on sensor size, how large you view or print, and your tolerance. As a rough guide for a recent camera viewed full screen:

| Sensor | Clean | Usable with noise reduction | Emergency |
| ------ | ----- | --------------------------- | --------- |
| Micro Four Thirds | up to 1600 | 3200 to 6400 | 12800 |
| APS-C | up to 3200 | 6400 to 12800 | 25600 |
| Full frame | up to 6400 | 12800 to 25600 | 51200 |

AI denoising in raw editors such as Lightroom, DxO PureRAW and Capture One has shifted these numbers by about two stops compared with ten years ago. Files that were unusable are now fine.

## Auto ISO

Auto ISO is the most useful automation on a modern camera. Set the aperture and shutter speed you need, and the camera picks the lowest ISO that gives a correct exposure.

Two settings make it work well:

- **Maximum ISO.** The highest value you will accept, for example 12800.
- **Minimum shutter speed.** In aperture priority, the slowest shutter the camera may use before it raises ISO. Many cameras offer an "auto" option that follows the focal length.

Manual mode with Auto ISO is a popular setup for action and wildlife: you fix the shutter speed and aperture, and exposure still adjusts as the light changes.

## ISO in video

Log video profiles have a higher base ISO, often 640 to 800, and many video-oriented cameras advertise two base ISOs (for example 800 and 4000). The second base is the dual gain switch point. See [[cameras/video|video features]].

## Related

- [[basics|Exposure basics]]
- [[cameras/dynamic-range-and-noise|Dynamic range and noise]]
- [[cameras/sensor-technology|Sensor technology]]
