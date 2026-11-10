/** A period of the canon, used to group thinkers on the index and timeline pages. */
export interface Era {
  id: string;
  label: string;
}

/** A thinker with their own page under `content/thinkers/`. */
export interface Thinker {
  /** File name of the page, without `.md`. The page lives at `/thinkers/<id>`. */
  id: string;
  /** Short name used on the timeline and in the links between thinker pages. */
  name: string;
  /** Year of birth. Years BC are negative. */
  born: number;
  /** Year of death. Left out for the living. */
  died?: number;
  /** Whether the year of birth is approximate. */
  circa?: boolean;
  era: Era["id"];
}

export const ERAS: readonly Era[] = [
  { id: "ancient", label: "The ancient world" },
  { id: "medieval", label: "Medieval and Renaissance" },
  { id: "enlightenment", label: "Early modern and Enlightenment" },
  { id: "nineteenth", label: "The nineteenth century" },
  { id: "twentieth", label: "The twentieth century and after" },
];

/** Every thinker, in order of birth. The tests check that this list and the pages agree. */
export const THINKERS: readonly Thinker[] = [
  { id: "plato", name: "Plato", born: -428, died: -348, circa: true, era: "ancient" },
  { id: "aristotle", name: "Aristotle", born: -384, died: -322, era: "ancient" },
  { id: "cicero", name: "Cicero", born: -106, died: -43, era: "ancient" },
  { id: "augustine", name: "Augustine", born: 354, died: 430, era: "ancient" },
  { id: "aquinas", name: "Aquinas", born: 1225, died: 1274, circa: true, era: "medieval" },
  { id: "machiavelli", name: "Machiavelli", born: 1469, died: 1527, era: "medieval" },
  { id: "hobbes", name: "Hobbes", born: 1588, died: 1679, era: "enlightenment" },
  { id: "locke", name: "Locke", born: 1632, died: 1704, era: "enlightenment" },
  { id: "montesquieu", name: "Montesquieu", born: 1689, died: 1755, era: "enlightenment" },
  { id: "hume", name: "Hume", born: 1711, died: 1776, era: "enlightenment" },
  { id: "rousseau", name: "Rousseau", born: 1712, died: 1778, era: "enlightenment" },
  { id: "smith", name: "Adam Smith", born: 1723, died: 1790, era: "enlightenment" },
  { id: "kant", name: "Kant", born: 1724, died: 1804, era: "enlightenment" },
  { id: "burke", name: "Burke", born: 1729, died: 1797, era: "enlightenment" },
  { id: "bentham", name: "Bentham", born: 1748, died: 1832, era: "enlightenment" },
  { id: "madison", name: "Madison", born: 1751, died: 1836, era: "enlightenment" },
  { id: "wollstonecraft", name: "Wollstonecraft", born: 1759, died: 1797, era: "enlightenment" },
  { id: "hegel", name: "Hegel", born: 1770, died: 1831, era: "nineteenth" },
  { id: "tocqueville", name: "Tocqueville", born: 1805, died: 1859, era: "nineteenth" },
  { id: "mill", name: "J. S. Mill", born: 1806, died: 1873, era: "nineteenth" },
  { id: "marx", name: "Marx", born: 1818, died: 1883, era: "nineteenth" },
  { id: "nietzsche", name: "Nietzsche", born: 1844, died: 1900, era: "nineteenth" },
  { id: "weber", name: "Weber", born: 1864, died: 1920, era: "twentieth" },
  { id: "schmitt", name: "Schmitt", born: 1888, died: 1985, era: "twentieth" },
  { id: "hayek", name: "Hayek", born: 1899, died: 1992, era: "twentieth" },
  { id: "arendt", name: "Arendt", born: 1906, died: 1975, era: "twentieth" },
  { id: "beauvoir", name: "Beauvoir", born: 1908, died: 1986, era: "twentieth" },
  { id: "berlin", name: "Berlin", born: 1909, died: 1997, era: "twentieth" },
  { id: "rawls", name: "Rawls", born: 1921, died: 2002, era: "twentieth" },
  { id: "fanon", name: "Fanon", born: 1925, died: 1961, era: "twentieth" },
  { id: "foucault", name: "Foucault", born: 1926, died: 1984, era: "twentieth" },
  { id: "habermas", name: "Habermas", born: 1929, died: 2026, era: "twentieth" },
  { id: "sen", name: "Sen", born: 1933, era: "twentieth" },
  { id: "nozick", name: "Nozick", born: 1938, died: 2002, era: "twentieth" },
  { id: "nussbaum", name: "Nussbaum", born: 1947, era: "twentieth" },
];

/** The slug of a thinker's page. */
export function slugOf(thinker: Thinker): string {
  return `thinkers/${thinker.id}`;
}

/**
 * A thinker's dates as each page states them in its "Lived" row:
 * `c. 428–348 BC`, `1588–1679` or `born 1933`.
 */
export function lifespan(thinker: Thinker): string {
  const { born, died, circa } = thinker;
  if (died === undefined) return `born ${born}`;
  const prefix = circa ? "c. " : "";
  if (born < 0) return `${prefix}${-born}–${-died} BC`;
  return `${prefix}${born}–${died}`;
}
