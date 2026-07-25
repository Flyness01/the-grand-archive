export type ClockGear = {
  id: string;
  name: string;
  mark: string;
  teeth: number;
  tone: string;
};

export const clockGears: ClockGear[] = [
  { id: "mainspring", name: "Mainspring Wheel", mark: "M", teeth: 16, tone: "copper" },
  { id: "minute", name: "Minute Train", mark: "II", teeth: 12, tone: "steel" },
  { id: "escapement", name: "Escapement", mark: "E", teeth: 20, tone: "brass" },
  { id: "chime", name: "Chime Wheel", mark: "C", teeth: 14, tone: "bronze" },
  { id: "governor", name: "Governor", mark: "G", teeth: 18, tone: "iron" },
];

export const stoppedClockSolution = [
  "chime",
  "escapement",
  "minute",
  "mainspring",
];

export const stoppedClockHints = [
  "The log tells you how the clock fell silent. The brass service plate tells you how to wake it.",
  "One inspected part never failed and should not enter the repair sequence. Begin with the component that stopped last.",
  "Place the Chime Wheel, Escapement, Minute Train, then Mainspring Wheel. Leave the Governor in the tray.",
];

export const stoppedClockMosaicTiles = [
  32, 33, 34, 35, 36, 37, 38,
  57, 63,
  82, 88,
  107, 113,
  132, 138,
  157, 163,
  182, 188,
  207, 213,
  232, 238,
  257, 263,
  282, 288,
  307, 313,
  332, 333, 334, 335, 336, 337, 338,
];

