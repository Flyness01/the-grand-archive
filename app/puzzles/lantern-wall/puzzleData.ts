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
  "The scratched brass marks are not damage. Each lantern has one angle and one height whose marks meet cleanly.",
  "Watch the pale shapes on the wall, not the lantern flames. A correct adjustment brings a fragment closer to the center.",
  "From left to right, set the angles to 2, 0, 3, 1 and the heights to middle, high, low, high.",
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

