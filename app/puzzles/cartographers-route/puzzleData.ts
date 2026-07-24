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
    name: "West Gate",
    x: 8,
    y: 78,
    kind: "lantern",
    description: "The route begins beside a hooded lantern.",
  },
  {
    id: "stone-ford",
    name: "Stone Ford",
    x: 25,
    y: 72,
    kind: "lantern",
    description: "A low crossing over the River Lark.",
  },
  {
    id: "broken-mile",
    name: "Abandoned Milestone",
    x: 36,
    y: 48,
    kind: "milestone",
    description: "Its number has been deliberately scratched away.",
  },
  {
    id: "ridge-lantern",
    name: "Ridge Lantern",
    x: 34,
    y: 31,
    kind: "lantern",
    description: "A tempting northern road climbs directly toward the ridge.",
  },
  {
    id: "orchard-lamp",
    name: "Orchard Lamp",
    x: 45,
    y: 76,
    kind: "lantern",
    description: "A brass lamp hangs beneath the orchard wall.",
  },
  {
    id: "watch-hill",
    name: "Watch Hill",
    x: 58,
    y: 60,
    kind: "lantern",
    description: "From here, the road finally turns north.",
  },
  {
    id: "south-bridge",
    name: "South Bridge",
    x: 61,
    y: 86,
    kind: "landmark",
    description: "A broad bridge, but no lantern marks the far bank.",
  },
  {
    id: "mill-lamp",
    name: "Mill Lamp",
    x: 51,
    y: 92,
    kind: "lantern",
    description: "A low lamp shines beside the abandoned mill race.",
  },
  {
    id: "north-ferry",
    name: "North Ferry",
    x: 70,
    y: 41,
    kind: "lantern",
    description: "A lantern burns above the Greywater ferry.",
  },
  {
    id: "old-quarry",
    name: "Old Quarry",
    x: 79,
    y: 66,
    kind: "milestone",
    description: "An abandoned marker leans toward the quarry.",
  },
  {
    id: "chapel-lamp",
    name: "Chapel Lamp",
    x: 76,
    y: 55,
    kind: "lantern",
    description: "A polished lamp makes this shortcut look carefully maintained.",
  },
  {
    id: "fallen-mile",
    name: "Fallen Milestone",
    x: 89,
    y: 47,
    kind: "milestone",
    description: "Moss covers an abandoned stone at the roadside.",
  },
  {
    id: "lantern-cross",
    name: "Lantern Cross",
    x: 82,
    y: 27,
    kind: "lantern",
    description: "Three roads meet beneath a green-glass lantern.",
  },
  {
    id: "archive",
    name: "Grand Archive",
    x: 94,
    y: 12,
    kind: "lantern",
    description: "The destination, marked with a final flame.",
  },
];

export const mapRoutes: MapRoute[] = [
  { from: "west-gate", to: "stone-ford", river: "Lark" },
  { from: "west-gate", to: "broken-mile" },
  { from: "stone-ford", to: "broken-mile" },
  { from: "stone-ford", to: "ridge-lantern" },
  { from: "stone-ford", to: "orchard-lamp" },
  { from: "ridge-lantern", to: "north-ferry" },
  { from: "broken-mile", to: "watch-hill" },
  { from: "orchard-lamp", to: "watch-hill" },
  { from: "orchard-lamp", to: "south-bridge" },
  { from: "orchard-lamp", to: "mill-lamp" },
  { from: "mill-lamp", to: "old-quarry", river: "Greywater" },
  { from: "south-bridge", to: "old-quarry", river: "Greywater" },
  { from: "watch-hill", to: "north-ferry", river: "Greywater" },
  { from: "watch-hill", to: "old-quarry" },
  { from: "watch-hill", to: "chapel-lamp", river: "Lark" },
  { from: "north-ferry", to: "lantern-cross" },
  { from: "chapel-lamp", to: "lantern-cross" },
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
  "The shortest road was not the Archivist’s road.",
  "Treat every note in the margin as a rule, including where you may stop.",
  "Begin east through Stone Ford and the Orchard Lamp. Turn north only after reaching Watch Hill.",
];

export const cartographersRouteMosaicTiles = [
  365, 366, 367, 368, 369, 390, 391, 392, 393, 394, 415, 416, 417, 418,
  419, 440, 441, 442, 443, 444, 465, 466, 467, 468, 469, 490, 491, 492,
  493, 494, 515, 516, 517, 518, 519, 540, 541, 542, 543, 544,
];
