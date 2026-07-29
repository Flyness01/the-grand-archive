export type LanternSetting = {
  angle: number;
  height: number;
};

export const lanternWallSolution: LanternSetting[] = [
  { angle: 2, height: 1 },
  { angle: 0, height: 2 },
  { angle: 3, height: 0 },
  { angle: 1, height: 2 },
];

export const lanternWallHints = [
  "Each team signal has one direction and one priority that supports the shared implementation.",
  "Watch the combined plan, not one team in isolation. A useful adjustment moves its fragment toward the center.",
  "From Design through Product, set directions to reviewed, exploring, committed, proposed; priorities to medium, high, low, high.",
];

export const lanternWallMosaicTiles = [
  186, 187, 188, 189, 190, 191, 192, 193,
  211, 218,
  236, 243,
  261, 268,
  286, 293,
  311, 318,
  336, 343,
  361, 362, 363, 364, 365, 366, 367, 368,
];
