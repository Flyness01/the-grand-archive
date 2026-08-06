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
    name: "User Interface",
    x: 8,
    y: 78,
    kind: "lantern",
    description: "A click becomes a clear request here—the first step in the journey.",
  },
  {
    id: "stone-ford",
    name: "Auth Check",
    x: 64,
    y: 72,
    kind: "lantern",
    description: "Before anything continues, the system confirms that the user has permission.",
  },
  {
    id: "broken-mile",
    name: "Compatibility Endpoint",
    x: 36,
    y: 48,
    kind: "milestone",
    description: "Preserves a familiar request contract for clients that still depend on it.",
  },
  {
    id: "ridge-lantern",
    name: "Fast-path Handler",
    x: 34,
    y: 31,
    kind: "lantern",
    description: "Moves simple requests onward quickly when the full route seems unnecessary.",
  },
  {
    id: "bell-tower",
    name: "Event Queue",
    x: 29,
    y: 58,
    kind: "lantern",
    description: "Buffers incoming work so downstream components can process it reliably under load.",
  },
  {
    id: "market-lamp",
    name: "Shared Service",
    x: 70,
    y: 52,
    kind: "lantern",
    description: "Reusable backend work happens here so several product flows can share it.",
  },
  {
    id: "south-bridge",
    name: "Compatibility Bridge",
    x: 48,
    y: 90,
    kind: "landmark",
    description: "Keeps older and newer parts of the system communicating through one shared crossing.",
  },
  {
    id: "mill-lamp",
    name: "Batch Worker",
    x: 32,
    y: 92,
    kind: "lantern",
    description: "Groups related tasks and processes them efficiently as one coordinated batch.",
  },
  {
    id: "east-gate",
    name: "API Gateway",
    x: 52,
    y: 62,
    kind: "lantern",
    description: "The front door to the backend: the request leaves the app and enters the service layer.",
  },
  {
    id: "north-ferry",
    name: "Data Adapter",
    x: 61,
    y: 36,
    kind: "lantern",
    description: "The result is translated into a shape the rest of the app understands.",
  },
  {
    id: "old-quarry",
    name: "Maintenance Branch",
    x: 79,
    y: 66,
    kind: "milestone",
    description: "Provides a stable alternate implementation while the main system changes around it.",
  },
  {
    id: "chapel-lamp",
    name: "Cache Layer",
    x: 76,
    y: 55,
    kind: "lantern",
    description: "Returns recently prepared data quickly instead of repeating the same work.",
  },
  {
    id: "pine-chapel",
    name: "Feature Flag",
    x: 83,
    y: 39,
    kind: "lantern",
    description: "This path opens only for selected users when a controlled feature is enabled.",
  },
  {
    id: "fallen-mile",
    name: "Established Dependency",
    x: 89,
    y: 47,
    kind: "milestone",
    description: "A long-standing library already connected to several familiar product flows.",
  },
  {
    id: "lake-beacon",
    name: "Analytics Hook",
    x: 88,
    y: 75,
    kind: "lantern",
    description: "Captures request activity so the team can observe behavior and measure outcomes.",
  },
  {
    id: "lantern-cross",
    name: "Integration Point",
    x: 82,
    y: 27,
    kind: "lantern",
    description: "The prepared result crosses its final shared handoff before delivery.",
  },
  {
    id: "archive",
    name: "Live Service",
    x: 94,
    y: 12,
    kind: "lantern",
    description: "The destination: the requested action reaches the live product and completes.",
  },
];

export const mapRoutes: MapRoute[] = [
  { from: "west-gate", to: "east-gate", river: "Lark" },
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
  { from: "west-gate", to: "bell-tower" },
  { from: "west-gate", to: "south-bridge" },
  { from: "west-gate", to: "mill-lamp" },
  { from: "market-lamp", to: "chapel-lamp", river: "Greywater" },
  { from: "east-gate", to: "lake-beacon" },
  { from: "lake-beacon", to: "fallen-mile" },
  { from: "lake-beacon", to: "archive", river: "Greywater" },
  { from: "mill-lamp", to: "old-quarry", river: "Greywater" },
  { from: "south-bridge", to: "old-quarry", river: "Greywater" },
  { from: "chapel-lamp", to: "lantern-cross" },
  { from: "chapel-lamp", to: "pine-chapel" },
  { from: "pine-chapel", to: "archive" },
  { from: "chapel-lamp", to: "fallen-mile" },
  { from: "fallen-mile", to: "archive" },
  { from: "old-quarry", to: "archive" },
];

export const cartographersRouteSolution = [
  "west-gate",
  "east-gate",
  "stone-ford",
  "market-lamp",
  "north-ferry",
  "lantern-cross",
  "archive",
];

export const cartographersRouteHints = [
  "Several request paths reach the target. Only one respects every documented system constraint.",
  "Follow the user’s action from the interface into the backend, then verify permission before work begins.",
  "Start with User Interface → API Gateway → Auth Check. Hover over the remaining components to continue.",
];

export const cartographersRouteMosaicTiles = [
  365, 366, 367, 368, 369, 390, 391, 392, 393, 394, 415, 416, 417, 418,
  419, 440, 441, 442, 443, 444, 465, 466, 467, 468, 469, 490, 491, 492,
  493, 494, 515, 516, 517, 518, 519, 540, 541, 542, 543, 544,
];
