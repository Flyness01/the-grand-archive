export type ClockGear = {
  id: string;
  name: string;
  mark: string;
  teeth: number;
  tone: string;
};

export const clockGears: ClockGear[] = [
  { id: "mainspring", name: "Auth Service", mark: "A", teeth: 16, tone: "copper" },
  { id: "minute", name: "API Handler", mark: "H", teeth: 12, tone: "steel" },
  { id: "escapement", name: "Job Queue", mark: "Q", teeth: 20, tone: "brass" },
  { id: "chime", name: "Notifier", mark: "N", teeth: 14, tone: "bronze" },
  { id: "governor", name: "Health Monitor", mark: "✓", teeth: 18, tone: "iron" },
];

export const stoppedClockSolution = [
  "chime",
  "escapement",
  "minute",
  "mainspring",
];

export const stoppedClockHints = [
  "The incident log records the cascading failures. Recovery should unwind that cascade.",
  "One healthy service never failed and should not enter the rollback. Begin with the component that failed last.",
  "Recover Notifier, Job Queue, API Handler, then Auth Service. Leave Health Monitor untouched.",
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
