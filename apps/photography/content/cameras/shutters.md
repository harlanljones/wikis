# Shutters

The shutter controls when an exposure starts and stops. Mirrorless cameras usually offer two or three ways of doing it, and choosing the wrong one for the situation causes some distinctive problems.

## The three types

### Mechanical shutter

Two curtains travel across the sensor. The first uncovers it to start the exposure, and the second follows to end it. At fast shutter speeds the second curtain starts before the first has finished, so a narrow slit of light sweeps across the sensor.

- Top speed is usually 1/4000 s or 1/8000 s.
- Flash sync speed is typically 1/200 s to 1/250 s.
- It makes a sound, causes a slight vibration, and wears out. Shutters are rated for 200,000 to 500,000 actuations.

### Electronic first curtain (EFCS)

The exposure starts electronically and ends with the mechanical second curtain. This removes the vibration of the first curtain, called **shutter shock**, which can blur photos at around 1/60 s to 1/250 s. It is the default on many cameras.

One drawback: at very fast shutter speeds with wide apertures, EFCS can make out-of-focus highlights look clipped. Switch to full mechanical or electronic above about 1/2000 s if background blur matters.

### Electronic shutter

No moving parts. The sensor simply reads itself out, row by row.

- Completely silent.
- No vibration and no wear.
- Faster top speeds (1/16,000 s to 1/180,000 s) and faster bursts.
- Subject to rolling shutter and banding, described below.

## Rolling shutter

Because the sensor reads its rows in sequence, the top of the image is captured slightly before the bottom. If something moves during that time, it is distorted:

- Vertical lines lean when you pan.
- Propellers and golf clubs bend.
- Fast side-to-side subjects skew.
- Handheld video wobbles like jelly.

How bad it is depends entirely on the sensor's **readout speed**. See [[cameras/sensor-technology|sensor technology]].

| Sensor | Electronic shutter for moving subjects? |
| ------ | --------------------------------------- |
| Conventional, especially high resolution | No. Use for static subjects and silence only |
| Partially stacked | Yes for most things. Very fast motion can still skew |
| Stacked | Yes |
| Global shutter | Yes, with no distortion at all |

## Banding under artificial light

LED and fluorescent lights flicker faster than you can see. With an electronic shutter, the rows of the sensor catch different moments of the flicker and the photo shows dark horizontal bands.

Fixes:

- Use the mechanical shutter under artificial light.
- Turn on **anti-flicker** shooting, which times each frame to the peak of the light's cycle.
- Use **high-frequency flicker** or **variable shutter** settings to tune the shutter speed to an LED display or stage light.
- Slow the shutter speed to a multiple of the mains frequency: 1/50 s or 1/100 s in 50 Hz countries, 1/60 s or 1/125 s in 60 Hz countries.

Stacked sensors band much less. Global shutter sensors do not band at all.

## Flash

With a mechanical shutter, flash works up to the sync speed. Above it, use the flash's high-speed sync mode, which pulses the light at reduced power.

With an electronic shutter, flash sync is slow or unavailable on most cameras, because the readout takes too long. Stacked-sensor cameras allow it at lower speeds, around 1/60 s to 1/200 s. A global shutter syncs at any speed.

## Cameras with no mechanical shutter

A growing number of cameras have dropped the mechanical shutter completely, either because their stacked sensor no longer needs it (Nikon Z8 and Z9) or to save cost and space in small and video-first bodies (Sigma fp and BF, Sony ZV-E10 II and ZV-E1, Nikon ZR, Canon EOS R6 V).

In the first group this is no drawback. In the second, check the readout speed before relying on the camera for action or flash.

## Which to use

| Situation | Shutter |
| --------- | ------- |
| General use | Electronic first curtain, or whatever the camera defaults to |
| Weddings, concerts, wildlife, anywhere silence matters | Electronic, if the sensor reads fast enough |
| Artificial light | Mechanical, or electronic with anti-flicker |
| Flash | Mechanical |
| Very fast lenses in bright sun | Electronic, for its higher top speed |
| Tripod landscapes | Electronic or EFCS, to avoid vibration |

## Related

- [[cameras/sensor-technology|Sensor technology]]
- [[basics/shutter-speed|Shutter speed]]
