# Linking between pages

Wiki links are resolved by page name, so you rarely need to type a URL.

| You write                       | It links to        | It reads        |
| ------------------------------- | ------------------ | --------------- |
| `[[Getting Started]]`           | `/getting-started` | Getting Started |
| `[[getting-started\|the intro]]` | `/getting-started` | the intro       |
| `[[Guides/Linking]]`            | `/guides/linking`  | Guides/Linking  |
| `[[Getting Started#Add a page]]`| `/getting-started#add-a-page` | Getting Started#Add a page |

A link to a page that does not exist yet is shown in a different color, like [[this one]]. Following it tells you which file to create.

Regular markdown links such as `[the home page](/)` work too: [the home page](/).

Files in the app's `public/` folder are served under `/public/`, which is where images go.
