export type SignalRowId = "release" | "queue" | "worker";

export const signalRows: { id: SignalRowId; label: string; startOffset: number; entries: { time: string; value: string; incident?: boolean }[] }[] = [
  {
    id: "release", label: "The work", startOffset: 0,
    entries: [
      { time: "Week 1", value: "Read docs" }, { time: "Week 3", value: "Trace request" }, { time: "Sprint", value: "Align signals" },
      { time: "Handoff", value: "Decode note" }, { time: "Last day", value: "Reflect", incident: true },
    ],
  },
  {
    id: "queue", label: "The team", startOffset: 3,
    entries: [
      { time: "Week 1", value: "Welcome" }, { time: "Week 3", value: "Pairing" }, { time: "Sprint", value: "Shared decision" },
      { time: "Handoff", value: "Clear context" }, { time: "Last day", value: "Thank you", incident: true },
    ],
  },
  {
    id: "worker", label: "What stayed", startOffset: 4,
    entries: [
      { time: "Week 1", value: "Context" }, { time: "Week 3", value: "Understanding" }, { time: "Sprint", value: "Collaboration" },
      { time: "Handoff", value: "Clarity" }, { time: "Last day", value: "Together", incident: true },
    ],
  },
];

// Every viewpoint must read chronologically from Week 1 through Last day.
export const productionCheckSolution: Record<SignalRowId, number> = { release: 0, queue: 0, worker: 0 };
export const impossibleConstellationHints = [
  "Each column should tell one small story: what happened, how the team supported it, and what lesson remained.",
  "The first column connects reading the docs with a welcome and the context it created. The final column connects reflection with gratitude and togetherness.",
  "Pair Read docs / Welcome / Context; Trace request / Pairing / Understanding; Align signals / Shared decision / Collaboration; Decode note / Clear context / Clarity; Reflect / Thank you / Together.",
];

export const impossibleConstellationMosaicTiles = [
  15, 16, 17, 18, 19, 20, 21, 40, 46, 65, 71, 90, 96, 115, 121, 140, 146,
  165, 171, 190, 196, 215, 221, 240, 246, 265, 266, 267, 268, 269, 270, 271,
];
