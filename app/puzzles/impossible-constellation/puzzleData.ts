export const productionCheckSolution = {
  window: "after-deploy",
  service: "job-worker",
  behavior: "retries",
} as const;

export const quillStars = [
  { id: "s1", x: 31, y: 20, size: 1.8 },
  { id: "s2", x: 42, y: 26, size: 1.2 },
  { id: "s3", x: 53, y: 33, size: 1.6 },
  { id: "s4", x: 61, y: 43, size: 1.1 },
  { id: "s5", x: 65, y: 55, size: 1.7 },
  { id: "s6", x: 61, y: 66, size: 1.2 },
  { id: "s7", x: 53, y: 74, size: 1.5 },
  { id: "s8", x: 43, y: 78, size: 1.1 },
  { id: "s9", x: 47, y: 61, size: 1.4 },
  { id: "s10", x: 40, y: 52, size: 1.1 },
  { id: "s11", x: 37, y: 42, size: 1.5 },
  { id: "s12", x: 34, y: 31, size: 1.1 },
  { id: "s13", x: 31, y: 84, size: 1.7 },
];

export const quillConnections = [
  ["s1", "s2"], ["s2", "s3"], ["s3", "s4"], ["s4", "s5"],
  ["s5", "s6"], ["s6", "s7"], ["s7", "s8"], ["s8", "s9"],
  ["s9", "s10"], ["s10", "s11"], ["s11", "s12"], ["s12", "s1"],
  ["s2", "s11"], ["s3", "s10"], ["s4", "s9"], ["s5", "s13"],
];

export const impossibleConstellationHints = [
  "Start with time: the healthy baseline ends at the deployment marker, and the first warning appears afterward.",
  "The web client and API success rates stay steady. Find the service whose workload rises while completed work falls.",
  "The same request ID appears three times with increasing attempt numbers and the same failure response.",
];

export const impossibleConstellationMosaicTiles = [
  15, 16, 17, 18, 19, 20, 21,
  40, 46,
  65, 71,
  90, 96,
  115, 121,
  140, 146,
  165, 171,
  190, 196,
  215, 221,
  240, 246,
  265, 266, 267, 268, 269, 270, 271,
];
