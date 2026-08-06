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
    x: 64,
    y: 72,
    kind: "lantern",
    description: "Verifies the request after it reaches the public API boundary.",
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
    x: 29,
    y: 58,
    kind: "lantern",
    description: "An asynchronous branch waiting for a consumer.",
  },
  {
    id: "orchard-lamp",
    name: "UI Layer",
    x: 29,
    y: 70,
    kind: "lantern",
    description: "The interface translates the user’s intent.",
  },
  {
    id: "watch-hill",
    name: "State Manager",
    x: 38,
    y: 78,
    kind: "lantern",
    description: "Application state determines the next transition.",
  },
  {
    id: "market-lamp",
    name: "Shared Service",
    x: 70,
    y: 52,
    kind: "lantern",
    description: "A busy dependency used by several flows.",
  },
  {
    id: "south-bridge",
    name: "Legacy Bridge",
    x: 48,
    y: 90,
    kind: "landmark",
    description: "A broad compatibility path without current monitoring.",
  },
  {
    id: "mill-lamp",
    name: "Batch Worker",
    x: 32,
    y: 92,
    kind: "lantern",
    description: "A background process outside the interactive request.",
  },
  {
    id: "east-gate",
    name: "API Gateway",
    x: 52,
    y: 62,
    kind: "lantern",
    description: "A public interface into several backend paths.",
  },
  {
    id: "north-ferry",
    name: "Data Adapter",
    x: 61,
    y: 36,
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
    name: "Live Service",
    x: 94,
    y: 12,
    kind: "lantern",
    description: "The live destination where the requested action completes.",
  },
];

export const mapRoutes: MapRoute[] = [
  { from: "west-gate", to: "orchard-lamp" },
  { from: "orchard-lamp", to: "watch-hill" },
  { from: "watch-hill", to: "east-gate", river: "Lark" },
  { from: "east-gate", to: "stone-ford" },
  { from: "stone-ford", to: "market-lamp" },
  { from: "market-lamp", to: "north-ferry", river: "Greywater" },
  { from: "north-ferry", to: "lantern-cross" },
  { from: "lantern-cross", to: "archive" },
  { from: "west-gate", to: "broken-mile" },
  { from: "stone-ford", to: "bell-tower" },
  { from: "ridge-lantern", to: "north-ferry" },
  { from: "ridge-lantern", to: "chapel-lamp", river: "Greywater" },
  { from: "bell-tower", to: "mill-lamp" },
  { from: "bell-tower", to: "market-lamp" },
  { from: "broken-mile", to: "east-gate" },
  { from: "orchard-lamp", to: "bell-tower" },
  { from: "orchard-lamp", to: "south-bridge" },
  { from: "orchard-lamp", to: "mill-lamp" },
  { from: "market-lamp", to: "chapel-lamp", river: "Greywater" },
  { from: "east-gate", to: "lake-beacon" },
  { from: "lake-beacon", to: "fallen-mile" },
  { from: "lake-beacon", to: "archive", river: "Greywater" },
  { from: "mill-lamp", to: "old-quarry", river: "Greywater" },
  { from: "south-bridge", to: "old-quarry", river: "Greywater" },
  { from: "watch-hill", to: "old-quarry" },
  { from: "chapel-lamp", to: "lantern-cross" },
  { from: "chapel-lamp", to: "pine-chapel" },
  { from: "pine-chapel", to: "archive" },
  { from: "chapel-lamp", to: "fallen-mile" },
  { from: "fallen-mile", to: "archive" },
  { from: "old-quarry", to: "archive" },
];

export const cartographersRouteSolution = [
  "west-gate",
  "orchard-lamp",
  "watch-hill",
  "east-gate",
  "stone-ford",
  "market-lamp",
  "north-ferry",
  "lantern-cross",
  "archive",
];

export const cartographersRouteHints = [
  "Several request paths reach the target. Only one respects every documented system constraint.",
  "Keep the interactive client flow together before crossing the API boundary. Queues, workers, and analytics belong to other flows.",
  "Follow UI Layer, State Manager, API Gateway, and Auth Check. Then use Shared Service, Data Adapter, and Integration Point before the Live Service.",
];

export const cartographersRouteMosaicTiles = [
  365, 366, 367, 368, 369, 390, 391, 392, 393, 394, 415, 416, 417, 418,
  419, 440, 441, 442, 443, 444, 465, 466, 467, 468, 469, 490, 491, 492,
  493, 494, 515, 516, 517, 518, 519, 540, 541, 542, 543, 544,
];
