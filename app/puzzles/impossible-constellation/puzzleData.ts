export type SignalRowId = "release" | "queue" | "worker";

export const signalRows: { id: SignalRowId; label: string; startOffset: number; entries: { time: string; value: string; incident?: boolean }[] }[] = [
  {
    id: "release", label: "Release activity", startOffset: 2,
    entries: [
      { time: "13:55", value: "Ready" }, { time: "14:00", value: "Deploy" }, { time: "14:05", value: "v2.7 live", incident: true },
      { time: "14:10", value: "Steady" }, { time: "14:15", value: "Steady" }, { time: "14:20", value: "Steady" }, { time: "14:25", value: "Steady" },
    ],
  },
  {
    id: "queue", label: "Waiting jobs", startOffset: 5,
    entries: [
      { time: "13:55", value: "18" }, { time: "14:00", value: "21" }, { time: "14:05", value: "96 ↑", incident: true },
      { time: "14:10", value: "164 ↑" }, { time: "14:15", value: "246 ↑" }, { time: "14:20", value: "301 ↑" }, { time: "14:25", value: "338 ↑" },
    ],
  },
  {
    id: "worker", label: "Worker activity", startOffset: 0,
    entries: [
      { time: "13:55", value: "Complete" }, { time: "14:00", value: "Complete" }, { time: "14:05", value: "Retry #1", incident: true },
      { time: "14:10", value: "Retry #2" }, { time: "14:15", value: "Retry #3" }, { time: "14:20", value: "Retry #4" }, { time: "14:25", value: "Retry #5" },
    ],
  },
];

// All three 14:05 signals must land in the center inspection column.
export const productionCheckSolution: Record<SignalRowId, number> = { release: 6, queue: 6, worker: 6 };

export const impossibleConstellationHints = [
  "Each strip contains the same times in a different starting position. Use the arrows to put matching times in vertical columns.",
  "Find 14:05 on every strip. Move all three 14:05 cells into the softly highlighted center column.",
  "The aligned center should read: v2.7 live, 96 waiting jobs, and Retry #1.",
];

export const impossibleConstellationMosaicTiles = [
  15, 16, 17, 18, 19, 20, 21, 40, 46, 65, 71, 90, 96, 115, 121, 140, 146,
  165, 171, 190, 196, 215, 221, 240, 246, 265, 266, 267, 268, 269, 270, 271,
];
