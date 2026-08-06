export interface MapNode {
  id: string;
  name: string;
  x: number;
  y: number;
  kind: "lantern" | "milestone" | "landmark";
  description: string;
}

export interface MapRoute {
  from: string;
  to: string;
  river?: "Lark" | "Greywater";
}

export const mapNodes: MapNode[] = [
  {
    id: "west-gate",
    name: "Entry Point",
    x: 8,
    y: 78,
    kind: "lantern",
    description: "The user action that begins the request.",
  },
  {
    id: "stone-ford",
    name: "Auth Check",
    x: 25,
    y: 72,
    kind: "lantern",
    description: "The first required boundary in the request flow.",
  },
  {
    id: "broken-mile",
    name: "Deprecated Endpoint",
    x: 36,
    y: 48,
    kind: "milestone",
    description: "An old path still exists, but the team no longer supports it.",
  },
  {
    id: "ridge-lantern",
    name: "Shortcut Handler",
    x: 34,
    y: 31,
    kind: "lantern",
    description: "A tempting shortcut that skips required context.",
  },
  {
    id: "bell-tower",
    name: "Event Queue",
    x: 31,
    y: 54,
    kind: "lantern",
    description: "An asynchronous branch waiting for a consumer.",
  },
  {
    id: "orchard-lamp",
    name: "UI Layer",
    x: 45,
    y: 76,
    kind: "lantern",
    description: "The interface translates the user’s intent.",
  },
  {
    id: "watch-hill",
    name: "State Manager",
    x: 58,
    y: 60,
    kind: "lantern",
    description: "Application state determines the next transition.",
  },
  {
    id: "market-lamp",
    name: "Shared Service",
    x: 53,
    y: 69,
    kind: "lantern",
    description: "A busy dependency used by several flows.",
  },
  {
    id: "south-bridge",
    name: "Legacy Bridge",
    x: 61,
    y: 86,
    kind: "landmark",
    description: "A broad compatibility path without current monitoring.",
  },
  {
    id: "mill-lamp",
    name: "Batch Worker",
    x: 51,
    y: 92,
    kind: "lantern",
    description: "A background process outside the interactive request.",
  },
  {
    id: "east-gate",
    name: "API Gateway",
    x: 68,
    y: 82,
    kind: "lantern",
    description: "A public interface into several backend paths.",
  },
  {
    id: "north-ferry",
    name: "Data Adapter",
    x: 70,
    y: 41,
    kind: "lantern",
    description: "Transforms application state into the required data shape.",
  },
  {
    id: "old-quarry",
    name: "Dead Code",
    x: 79,
    y: 66,
    kind: "milestone",
    description: "A branch left behind by an earlier implementation.",
  },
  {
    id: "chapel-lamp",
    name: "Cache Layer",
    x: 76,
    y: 55,
    kind: "lantern",
    description: "Fast and attractive, but not correct for every request.",
  },
  {
    id: "pine-chapel",
    name: "Feature Flag",
    x: 83,
    y: 39,
    kind: "lantern",
    description: "A conditional path enabled for only some users.",
  },
  {
    id: "fallen-mile",
    name: "Stale Dependency",
    x: 89,
    y: 47,
    kind: "milestone",
    description: "A dependency the current flow should avoid.",
  },
  {
    id: "lake-beacon",
    name: "Analytics Hook",
    x: 88,
    y: 75,
    kind: "lantern",
    description: "Records the event without completing the request.",
  },
  {
    id: "lantern-cross",
    name: "Integration Point",
    x: 82,
    y: 27,
    kind: "lantern",
    description: "The final shared boundary before delivery.",
  },
  {
    id: "archive",
    name: "Production Target",
    x: 94,
    y: 12,
    kind: "lantern",
    description: "The intended result reaches the user.",
  },
];

export const mapRoutes: MapRoute[] = [
  { from: "west-gate", to: "stone-ford", river: "Lark" },
  { from: "west-gate", to: "broken-mile" },
  { from: "stone-ford", to: "broken-mile" },
  { from: "stone-ford", to: "ridge-lantern" },
  { from: "stone-ford", to: "bell-tower" },
  { from: "stone-ford", to: "orchard-lamp" },
  { from: "ridge-lantern", to: "north-ferry" },
  { from: "ridge-lantern", to: "chapel-lamp", river: "Greywater" },
  { from: "bell-tower", to: "watch-hill" },
  { from: "bell-tower", to: "market-lamp" },
  { from: "broken-mile", to: "watch-hill" },
  { from: "orchard-lamp", to: "watch-hill" },
  { from: "orchard-lamp", to: "market-lamp" },
  { from: "orchard-lamp", to: "south-bridge" },
  { from: "orchard-lamp", to: "mill-lamp" },
  { from: "market-lamp", to: "chapel-lamp", river: "Greywater" },
  { from: "market-lamp", to: "east-gate" },
  { from: "east-gate", to: "lake-beacon" },
  { from: "lake-beacon", to: "fallen-mile" },
  { from: "lake-beacon", to: "archive", river: "Greywater" },
  { from: "mill-lamp", to: "old-quarry", river: "Greywater" },
  { from: "south-bridge", to: "old-quarry", river: "Greywater" },
  { from: "watch-hill", to: "north-ferry", river: "Greywater" },
  { from: "watch-hill", to: "old-quarry" },
  { from: "north-ferry", to: "lantern-cross" },
  { from: "chapel-lamp", to: "lantern-cross" },
  { from: "chapel-lamp", to: "pine-chapel" },
  { from: "pine-chapel", to: "archive" },
  { from: "chapel-lamp", to: "fallen-mile" },
  { from: "fallen-mile", to: "archive" },
  { from: "old-quarry", to: "archive" },
  { from: "lantern-cross", to: "archive" },
];

export const cartographersRouteSolution = [
  "west-gate",
  "stone-ford",
  "orchard-lamp",
  "watch-hill",
  "north-ferry",
  "lantern-cross",
  "archive",
];

export const cartographersRouteHints = [
  "Several request paths reach the target. Only one respects every documented system constraint.",
  "The UI Layer and State Manager must be consecutive. The final shared boundary is the Integration Point.",
  "Begin through Auth Check, then continue to the UI Layer. State Manager follows immediately; Integration Point is the final stop.",
];

export const cartographersRouteMosaicTiles = [
  365, 366, 367, 368, 369, 390, 391, 392, 393, 394, 415, 416, 417, 418,
  419, 440, 441, 442, 443, 444, 465, 466, 467, 468, 469, 490, 491, 492,
  493, 494, 515, 516, 517, 518, 519, 540, 541, 542, 543, 544,
];
