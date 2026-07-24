export interface ShelfBook {
  id: string;
  title: string;
  color: string;
  passage: string;
  highlightedLine?: string;
  goldLetter?: string;
  orderMark?: string;
}

export const shelfBooks: ShelfBook[] = [
  {
    id: "atlas-forgotten",
    title: "Atlas of Forgotten Places",
    color: "emerald",
    passage:
      "A careful mapmaker leaves no road unnamed, even when the road has vanished.",
    highlightedLine: "The third road is the one that lingers.",
    goldLetter: "L",
    orderMark: "III",
  },
  {
    id: "last-cartographer",
    title: "The Last Cartographer",
    color: "umber",
    passage:
      "She drew coastlines from memory and left the inland country untouched.",
  },
  {
    id: "constellations-above",
    title: "Constellations Above",
    color: "midnight",
    passage:
      "Every constellation is an agreement between patient eyes and distant light.",
  },
  {
    id: "history-lanterns",
    title: "A History of Lanterns",
    color: "wine",
    passage:
      "Before electric light, the keeper began each evening at the eastern door.",
    highlightedLine: "First, take hold of what gives light.",
    goldLetter: "P",
    orderMark: "I",
  },
  {
    id: "botanical-sketches",
    title: "Botanical Sketches",
    color: "moss",
    passage:
      "The margins are crowded with sleeping bulbs and notes about spring rain.",
  },
  {
    id: "mechanical-wonders",
    title: "Mechanical Wonders",
    color: "copper",
    passage:
      "A machine is a promise made by many small and reliable movements.",
  },
  {
    id: "silent-valley",
    title: "The Silent Valley",
    color: "slate",
    passage:
      "No bell rang there, though every tower still held its rope.",
  },
  {
    id: "journeys-east",
    title: "Journeys East",
    color: "ochre",
    passage:
      "The traveler refused the shortest road and arrived exactly on time.",
  },
  {
    id: "rivers-roads",
    title: "Rivers and Roads",
    color: "blue",
    passage:
      "Water remembers the routes that stone would rather forget.",
  },
  {
    id: "astronomers-almanac",
    title: "The Astronomer’s Almanac",
    color: "indigo",
    passage:
      "The observer turned the dome until north rested behind her left shoulder.",
    highlightedLine: "Under the second moon, the mechanism yielded.",
    goldLetter: "U",
    orderMark: "II",
  },
  {
    id: "keepers-ledger",
    title: "The Keeper’s Ledger",
    color: "chestnut",
    passage:
      "Four entries remain legible beneath the dust; the last was never signed.",
    highlightedLine: "Last, let the shelf answer the hand.",
    goldLetter: "L",
    orderMark: "IV",
  },
  {
    id: "songs-empty-hall",
    title: "Songs for an Empty Hall",
    color: "plum",
    passage:
      "The final song has no notes, only a long rest where the chorus should be.",
  },
];

export const librariansShelfSolution = [
  "history-lanterns",
  "astronomers-almanac",
  "atlas-forgotten",
  "keepers-ledger",
];

export const librariansShelfHints = [
  "Some books seem different.",
  "Gold often marks importance.",
  "Read the gold marks in their numbered order. They describe what to do.",
];

export const librariansShelfMosaicTiles = [
  35, 36, 37, 38, 39, 60, 61, 62, 63, 64, 85, 86, 87, 88, 89, 110, 111,
  112, 113, 114, 135, 136, 137, 138, 139, 160, 161, 162, 163, 164, 185,
  186, 187, 188, 189, 210, 211, 212, 213, 214,
];
