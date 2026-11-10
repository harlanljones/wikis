# How a computer works

> **In one sentence:** a computer is a kitchen, and every part you can buy is either the cook, the counter, the pantry, or the plumbing that connects them.

You do not need to understand electronics to choose a computer well. You need to know what each part is responsible for, so you can tell which one is holding you back.

## The kitchen analogy

| Part | In the kitchen | What it does | Page |
| --- | --- | --- | --- |
| Processor (CPU) | The head chef | Does the general thinking: running apps, loading pages, game logic, calculations | [[parts/cpu\|CPU]] |
| Graphics card (GPU) | A specialist team that plates thousands of identical dishes at once | Draws everything on screen in games and 3D apps, speeds up video work and AI | [[parts/gpu\|Graphics card]] |
| Memory (RAM) | Counter space | Holds whatever you are working on right now. Cleared when the power goes off | [[parts/memory\|Memory]] |
| Storage (SSD or hard drive) | The pantry | Keeps your files, apps and the operating system when the power is off | [[parts/storage\|Storage]] |
| Motherboard | The kitchen floor plan and plumbing | Connects every part and decides what can be plugged in | [[parts/motherboard\|Motherboard]] |
| Power supply (PSU) | The electrical panel | Converts wall power into what the parts need | [[parts/power-supply\|Power supply]] |
| Cooling | The extractor fan | Carries heat away so parts can keep working at full speed | [[parts/cooling\|Cooling]] |
| Case | The room itself | Holds everything and lets air through | [[parts/case\|Case]] |
| Monitor | The serving window | The only part of all this you actually look at | [[parts/monitor\|Monitor]] |

A bigger counter (more memory) does not make the chef cook faster. It lets the chef keep more dishes going at once without walking back to the pantry. A faster chef (a better processor) does not help if the dishes are waiting on the plating team (the graphics card). That is the whole idea behind choosing parts: work out which station is the queue.

## What happens when you click something

1. You double-click a game. The **processor** asks the **storage** drive for the game's files.
2. The files are copied into **memory**, because memory is thousands of times faster to work from than storage.
3. The processor runs the game's logic: where things are, what the enemies do, what you pressed.
4. The processor hands the **graphics card** a description of the scene. The graphics card turns it into a picture, around 60 to 240 times a second.
5. The picture travels down a cable to the **monitor**, which shows it.

Each step has a part responsible for it, and each produces a recognisable symptom when it is too slow:

| Symptom | Usual cause |
| --- | --- |
| The computer takes minutes to start, and apps take a long time to open | A hard drive instead of an SSD |
| Everything slows down when many tabs or apps are open | Not enough memory |
| Games look choppy even at low settings | Graphics card too weak for the resolution |
| Games stutter in busy scenes, or big spreadsheets and exports crawl | Processor too slow |
| It gets slow after ten minutes of heavy use, with loud fans | Overheating, often dust or a weak cooler |
| It is fast, but looks dull or blurry | The monitor |

## Balance and bottlenecks

A **bottleneck** is the part that limits everything else. There is always one. The goal is to make sure it is not a silly one.

- A $900 graphics card paired with a ten-year-old processor will be held back by the processor.
- A $500 processor paired with integrated graphics will not play modern games well, however fast it is.
- A powerful desktop connected to an old 60Hz office monitor cannot show most of the frames it draws.

What counts as balanced depends on the job. Games lean on the graphics card. Spreadsheets and code compiling lean on the processor. Photo editing leans on memory. [[use-cases|What to buy for what you do]] gives the split for each kind of work.

## Laptops, phones and Macs use the same parts

A laptop has all of the parts above. They are smaller, usually soldered to one board, and tuned to use less power. This has three consequences:

- **You mostly cannot upgrade later.** Buy the memory and storage you will need for the life of the machine. See [[buying/laptops|How to choose a laptop]].
- **The same name means less performance.** A laptop "RTX 5070" is a different, slower chip than the desktop card with that name. See [[specs/gpu-model-names|Graphics card model names]].
- **Heat is the limit.** A thin laptop can only get rid of so much heat, so two laptops with the same processor can perform very differently.

Apple's M-series Macs and many newer Windows laptops combine the processor, graphics and memory into one package. Apple calls the shared memory "unified memory". It is the same idea: one pool of counter space shared by the chef and the plating team.

## Integrated and dedicated graphics

Most processors include a small graphics chip, called **integrated graphics**. It is enough for video, office work, photo editing and light games. A **dedicated** (or "discrete") graphics card is a separate, far more powerful part with its own memory. You need one for modern games at good settings, for 3D work, and for running AI models locally. Everyone else can skip it and save a great deal of money.

## What the software needs

The operating system sets a floor. Windows 11 needs a processor from roughly 2018 or later and a security chip called TPM 2.0. Windows 10 stopped receiving free security updates in October 2025, and the paid extension for home users ended in October 2026, so a computer that cannot run Windows 11 is a poor purchase today unless you plan to install Linux. See [[buying/used-and-refurbished|Buying used and refurbished]].

## Where to go next

- [[parts|The parts]], one page each.
- [[use-cases|What to buy for what you do]].
- [[glossary|Glossary]] for any term you do not recognise.
