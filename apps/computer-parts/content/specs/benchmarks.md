# Reading benchmarks and reviews

> **In one sentence:** a benchmark is the same test run on different parts, and it is the only fair way to compare two of them.

Names, core counts and gigahertz are descriptions. A benchmark is a measurement. When two parts look similar on paper, or one is "newer" and the other "higher tier", a benchmark settles it.

## The quick method

1. Find the **exact model numbers** of the two parts.
2. Search for both names plus "vs" or "benchmark".
3. Open a result from an independent reviewer, not a manufacturer.
4. Find a test that resembles what you do.
5. Compare the percentages, not the bar lengths. Check where the chart's axis starts.

A difference under about 5% is within testing noise and not worth paying for. A difference under about 15% is hard to notice in use.

## Processor benchmarks

| Test | Measures | Read it for |
| --- | --- | --- |
| Cinebench (single core) | One core rendering | Everyday snappiness |
| Cinebench (multi core) | All cores rendering | Video export, rendering, compiling |
| Geekbench | A mix of short everyday tasks | Quick comparison across laptops, phones and Macs |
| PassMark CPU Mark | A broad synthetic mix | A rough single number, with a huge database of old chips |
| Game benchmarks at 1080p with a top graphics card | The processor's ceiling in games | Choosing a gaming processor |
| Application tests (Premiere, Photoshop, Blender, code compile times) | Real work | Buying for that specific work |

Processor game tests are deliberately run at low resolution with the fastest graphics card, to expose differences between processors. With a mid-range card at 1440p those gaps mostly disappear. A chart showing one processor 20% ahead does not mean you will see 20% more frames.

## Graphics card benchmarks

Reviews test a set of games at 1080p, 1440p and 4K and report two numbers:

- **Average fps:** overall smoothness.
- **1% low fps:** the frame rate during the worst moments. This is what stutter feels like. A card with a high average and poor 1% lows feels worse than the reverse.

Look for:

- **Your resolution.** A card's ranking can change between 1080p and 4K.
- **Native results, without frame generation.** Upscaling should be shown separately.
- **A many-game average.** Individual games favor one brand or another by 20% or more.
- **Cost per frame charts**, which divide price by performance. These go out of date quickly when prices move, as they have recently.

## Storage benchmarks

- **Sequential speed** is the headline number and matters for large file copies.
- **Random 4K speed** matters for starting the computer and opening apps, and varies much less between drives.
- **Sustained write tests** show what happens when a drive's fast cache fills. This is where cheap drives separate from good ones.
- **Game load time tests** usually show differences of a second or two between any two NVMe drives.

## Laptop reviews

A laptop is more than its chips, so reviews matter more here than for any desktop part. Look for measurements of:

- **Battery life** in a stated test, such as web browsing at a fixed brightness.
- **Screen brightness in nits and color coverage.**
- **Sustained performance.** A loop test shows whether the laptop slows down after a few minutes of heat.
- **Fan noise and surface temperatures.**
- **Performance on battery**, which drops sharply on some Windows laptops and barely at all on Macs and Snapdragon machines.

## Monitor reviews

Advertised monitor specs are the least trustworthy in computing, so measured reviews are essential. Look for measured response times, measured brightness and contrast, color accuracy before calibration, and motion clarity photographs.

## Sources worth trusting

Independent reviewers who buy or borrow hardware, test it the same way every time, and publish their methods:

| For | Sources |
| --- | --- |
| Processors and graphics cards | Gamers Nexus, Hardware Unboxed, Tom's Hardware, TechPowerUp, PC Gamer |
| Laptops | Notebookcheck, and the laptop reviews at Tom's Hardware and RTINGS |
| Monitors, keyboards, mice, headphones | RTINGS, Monitors Unboxed |
| Creative software performance | Puget Systems |
| Power supplies | Cybenetics test reports, and community PSU tier lists |
| Prices and compatibility | PCPartPicker, which also tracks price history |

Use more than one. Reviewers test different games and settings, and agreement between two of them is worth more than either alone.

## Sources to treat with care

- **Manufacturer slides.** Every launch presentation picks the tests where the new product looks best. Wait for independent reviews.
- **Store "customer rating" stars.** They mostly measure whether the box arrived.
- **UserBenchmark.** Its processor and graphics rankings use a weighting that most reviewers consider misleading, and its written descriptions are strongly opinionated.
- **Lists titled "best X of 2026" from sites you have never heard of.** Many are written without testing, to earn commission on links.
- **"Bottleneck calculators".** They produce a confident percentage from a formula that cannot know what you play or at what settings.
- **Synthetic scores as the only evidence.** 3DMark and Geekbench are useful for rough comparison and do not always track real games and apps.

## Benchmarking your own computer

To find out what is limiting your current machine:

- **Windows:** open Task Manager (Ctrl+Shift+Esc), go to the Performance tab, and watch the processor, memory, disk and graphics graphs while you do the slow thing.
- **Mac:** open Activity Monitor and check the CPU and Memory tabs.
- **In games:** an overlay such as the one in MSI Afterburner, Steam, or the graphics driver shows fps and how busy the processor and graphics card are.

| What you see | What it means |
| --- | --- |
| Graphics card near 100% in a game | Normal. The graphics card is the limit, which is what you want |
| Graphics card well under 100% and one or more processor cores pinned | The processor is the limit |
| Memory at 90% or more | You need more memory, or fewer things open |
| Disk at 100% for long periods | A hard drive, or a nearly full SSD |
| Temperatures at the limit and speed dropping | Cooling. See [[parts/cooling\|Cooling]] |

This is the most useful test before any upgrade. See [[buying/upgrading|Upgrade or replace?]].

## Going deeper

- **Test conditions change results.** Memory speed, power limits, the operating system version and even room temperature shift scores by several percent. Compare numbers within one review, not across reviews.
- **Frame time graphs** show each frame's duration. A flat line is smooth. Spikes are stutter that averages hide.
- **Performance per watt** matters for laptops, small cases and electricity bills, and is where processor families differ most.
- **Launch reviews age.** Drivers and patches change results, sometimes by 10% or more over a year. Recent re-tests are more useful than launch-day charts.
- **Sample variation** exists. Two units of the same processor or monitor can differ by a few percent.

## See also

- [[specs/marketing-terms|Marketing terms to ignore]]
- [[specs/cpu-model-names|Processor model names]] and [[specs/gpu-model-names|Graphics card model names]]
