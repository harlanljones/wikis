# Programming

> **In one sentence:** developers run out of memory long before they run out of processor, so buy memory first, then a fast SSD, then a keyboard and screen you can spend all day with.

## What matters

| Part | How much | Notes |
| --- | --- | --- |
| Memory | The most | Editors, browsers, containers, emulators and language servers all hold memory at once |
| Processor | A lot for compiled languages, less for scripting | Cores speed up builds and test suites |
| Storage | A fast SSD, 512GB to 1TB | Builds and dependency trees touch vast numbers of small files |
| Screen and keyboard | A lot | You will use them eight hours a day |
| Graphics card | None, unless you do machine learning or game development | |

## By kind of work

| Work | Memory | Processor | Notes |
| --- | --- | --- | --- |
| Learning to code, scripting, web front end | 16GB | Any current chip | Nearly any computer works |
| Web back end with containers and databases | 32GB | 8 cores | Docker and local databases are memory-hungry |
| Mobile apps | 32GB | 8 or more cores | Emulators are heavy. iOS development requires a Mac |
| Large compiled codebases (C++, Rust, large Java or .NET) | 32GB to 64GB | 12 to 16 or more cores | Build time scales with cores, and each compile job needs memory |
| Data science | 32GB to 64GB or more | 8 or more cores | The dataset must fit in memory. Possibly a graphics card |
| Machine learning | 32GB or more | 8 cores | An Nvidia graphics card with as much VRAM as possible. See [[use-cases/local-ai\|Running AI models locally]] |
| Game development | 32GB to 64GB | 8 to 16 cores | A mid-range or better graphics card, for the engine's editor |
| Embedded and hardware | 16GB | Any | Plenty of USB ports. Check toolchain support for your operating system |

## Memory

Count what you actually run: an editor with language servers (1GB to 4GB), a browser with documentation tabs (2GB to 6GB), a chat app (1GB), containers (2GB to 8GB), a database, perhaps an emulator or virtual machine (4GB to 8GB each). It adds up quickly.

- **16GB** is enough for learning and for light web and scripting work.
- **32GB** is the comfortable default for professional work.
- **64GB** for virtual machines, large builds and data work.

When memory runs out, everything slows at once, so this is the wrong place to cut. On a laptop with soldered memory, buy for the next five years. See [[parts/memory|Memory]].

Memory is expensive in late 2026, which makes this advice costlier than it used to be. For a desktop, start with what you need and leave slots free. For a laptop, there is no later.

## Processor

- **Compiled languages** use every core during a build. Going from 8 to 16 cores can nearly halve a large build.
- **Interpreted languages** and web work mostly use one or two cores, so single-core speed and memory matter more.
- **Laptops:** sustained performance matters for long builds. Thin laptops slow down once warm. Reviews that run a repeated benchmark show this.

See [[parts/cpu|Processor]].

## Storage

A fast NVMe SSD shortens builds, dependency installs, searches and container starts. 512GB fills quickly with toolchains, container images and dependency caches. 1TB is a comfortable default. See [[parts/storage|Storage]].

## Operating system

| System | Good for | Watch for |
| --- | --- | --- |
| macOS | iOS and macOS development (required), a Unix environment with commercial software available, excellent laptops | Cost of memory and storage, no upgrades |
| Linux | Servers, containers, systems work, full control | Laptop hardware support varies. Check your model |
| Windows | .NET, game development, Windows software. WSL2 provides a real Linux environment alongside | WSL2 and Docker each reserve memory, so allow more |

Many teams standardise on one system. Match your team if you have one.

**On Arm laptops** (Apple silicon, Snapdragon): most development tools run natively. Container images built for Intel and AMD processors run through emulation, more slowly. Check for anything in your stack that lacks an Arm build.

## The parts you touch

- **Screen:** sharp text matters. A 27-inch 4K or 1440p monitor, or two monitors, is a real productivity gain. On a laptop, look for a 16:10 screen with more than 1080p. See [[parts/monitor|Monitor]].
- **Keyboard:** try it. Key travel, layout and the position of keys such as Escape, Control and the arrow cluster matter more to a programmer than to most people. See [[parts/peripherals|Keyboard, mouse and audio]].
- **Battery life and weight**, if you work away from a desk.
- **Ports:** enough to connect a monitor, a keyboard and a wired network without a bag of adapters.

## Laptop or desktop

A laptop is the usual choice, for meetings, travel and working from different places. A desktop gives far more cores and memory for the money and builds much faster. A common arrangement is a modest laptop plus a powerful desktop or a remote build machine reached over the network.

## Typical setups

| Setup | Spec |
| --- | --- |
| Student or learner | Any current laptop with 16GB and a 512GB SSD |
| Professional laptop | 32GB, 1TB, a current 8-core or better chip, a 14- to 16-inch screen above 1080p |
| Desktop for compiled languages | 12 to 16 cores, 64GB, 1TB to 2TB NVMe, integrated or basic graphics |
| Machine learning workstation | 8 or more cores, 64GB, an Nvidia card with 16GB to 32GB of VRAM, 2TB NVMe |

## Where not to spend

- A graphics card, for most development.
- A top gaming processor. X3D chips do not compile faster than their standard siblings.
- A 4K screen on a 14-inch laptop.
- PCIe 5.0 storage.

## See also

- [[use-cases/local-ai|Running AI models locally]]
- [[buying/laptops|How to choose a laptop]]
- [[parts/memory|Memory]]
