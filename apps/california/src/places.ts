/** A section of the wiki: a folder under `content/` and a color on the map. */
export interface Section {
  slug: string;
  label: string;
}

/** A place with its own reading, pinned on the home page map. */
export interface Place {
  /** Slug of the place's page, which starts with its section. */
  slug: string;
  lat: number;
  lng: number;
}

export const SECTIONS: readonly Section[] = [
  { slug: "bay-area", label: "Around the Bay" },
  { slug: "central-coast", label: "Santa Cruz Mountains and Central Coast" },
  { slug: "north-coast", label: "North Coast" },
  { slug: "gold-country", label: "Gold Country" },
  { slug: "volcano-country", label: "Volcano Country" },
  { slug: "sierra-nevada", label: "Sierra Nevada" },
  { slug: "eastern-sierra", label: "Eastern Sierra" },
  { slug: "desert", label: "The Desert" },
  { slug: "south-coast", label: "South Coast and Islands" },
];

export const PLACES: readonly Place[] = [
  { slug: "bay-area/lands-end", lat: 37.7849, lng: -122.5055 },
  { slug: "bay-area/angel-island", lat: 37.8686, lng: -122.4348 },
  { slug: "bay-area/muir-woods", lat: 37.8919, lng: -122.5708 },
  { slug: "bay-area/mount-tamalpais", lat: 37.9237, lng: -122.6037 },
  { slug: "bay-area/point-reyes", lat: 38.05, lng: -122.9 },
  { slug: "bay-area/oakland-redwoods", lat: 37.8136, lng: -122.1659 },
  { slug: "bay-area/mission-peak", lat: 37.5124, lng: -121.8805 },
  { slug: "bay-area/jack-london", lat: 38.3506, lng: -122.5431 },
  { slug: "bay-area/armstrong-redwoods", lat: 38.5381, lng: -123.01 },

  { slug: "central-coast/santa-cruz-mountains", lat: 37.0398, lng: -122.0636 },
  { slug: "central-coast/big-basin", lat: 37.1725, lng: -122.2225 },
  { slug: "central-coast/ano-nuevo", lat: 37.1331, lng: -122.3331 },
  { slug: "central-coast/point-lobos", lat: 36.5171, lng: -121.9426 },
  { slug: "central-coast/pinnacles", lat: 36.4811, lng: -121.1814 },
  { slug: "central-coast/big-sur", lat: 36.1578, lng: -121.6721 },
  { slug: "central-coast/la-purisima", lat: 34.6705, lng: -120.4206 },

  { slug: "north-coast/fort-ross", lat: 38.5163, lng: -123.2411 },
  { slug: "north-coast/mendocino-coast", lat: 39.333, lng: -123.783 },
  { slug: "north-coast/humboldt-redwoods", lat: 40.3522, lng: -123.9239 },
  { slug: "north-coast/redwood-national-park", lat: 41.3, lng: -124.03 },
  { slug: "north-coast/lost-coast", lat: 40.2, lng: -124.25 },

  { slug: "gold-country/coloma", lat: 38.8, lng: -120.894 },
  { slug: "gold-country/chawse", lat: 38.4242, lng: -120.6433 },
  { slug: "gold-country/malakoff-diggins", lat: 39.3628, lng: -120.9244 },

  { slug: "volcano-country/lassen", lat: 40.4749, lng: -121.5057 },
  { slug: "volcano-country/burney-falls", lat: 41.017, lng: -121.65 },
  { slug: "volcano-country/lava-beds", lat: 41.8217, lng: -121.505 },

  { slug: "sierra-nevada/yosemite-valley", lat: 37.7274, lng: -119.62 },
  { slug: "sierra-nevada/half-dome", lat: 37.746, lng: -119.5329 },
  { slug: "sierra-nevada/mariposa-grove", lat: 37.5139, lng: -119.5983 },
  { slug: "sierra-nevada/giant-forest", lat: 36.5817, lng: -118.7515 },
  { slug: "sierra-nevada/kings-canyon", lat: 36.7948, lng: -118.5829 },
  { slug: "sierra-nevada/lake-tahoe", lat: 38.9519, lng: -120.1119 },
  { slug: "sierra-nevada/donner-pass", lat: 39.32, lng: -120.2417 },

  { slug: "eastern-sierra/bodie", lat: 38.2122, lng: -119.0122 },
  { slug: "eastern-sierra/mono-lake", lat: 37.9388, lng: -119.027 },
  { slug: "eastern-sierra/devils-postpile", lat: 37.6017, lng: -119.0833 },
  { slug: "eastern-sierra/bristlecone-pines", lat: 37.3856, lng: -118.1786 },
  { slug: "eastern-sierra/manzanar", lat: 36.7283, lng: -118.1544 },
  { slug: "eastern-sierra/mount-whitney", lat: 36.5786, lng: -118.292 },

  { slug: "desert/death-valley", lat: 36.4206, lng: -116.846 },
  { slug: "desert/kelso-dunes", lat: 34.9035, lng: -115.7181 },
  { slug: "desert/joshua-tree", lat: 34.0026, lng: -116.136 },
  { slug: "desert/anza-borrego", lat: 33.2702, lng: -116.4182 },
  { slug: "desert/san-jacinto", lat: 33.813, lng: -116.679 },

  { slug: "south-coast/channel-islands", lat: 34.0481, lng: -119.5529 },
  { slug: "south-coast/cabrillo", lat: 32.672, lng: -117.2409 },
  { slug: "south-coast/torrey-pines", lat: 32.921, lng: -117.2532 },
];
