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
    id: "bell-tower",
    name: "Bell Tower",
    x: 31,
    y: 54,
    kind: "lantern",
    description: "A lantern hangs below a silent bell.",
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
    id: "market-lamp",
    name: "Market Lamp",
    x: 53,
    y: 69,
    kind: "lantern",
    description: "A crowded junction marked by an iron lamp.",
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
    id: "east-gate",
    name: "East Gate",
    x: 68,
    y: 82,
    kind: "lantern",
    description: "A bright eastern gate offers a long road north.",
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
    id: "pine-chapel",
    name: "Pine Chapel",
    x: 83,
    y: 39,
    kind: "lantern",
    description: "A blue lamp glows between the pines.",
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
    id: "lake-beacon",
    name: "Lake Beacon",
    x: 88,
    y: 75,
    kind: "lantern",
    description: "A tall beacon overlooks the lake road.",
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
  { from: "market-lamp", to: "north-ferry", river: "Lark" },
  { from: "market-lamp", to: "chapel-lamp", river: "Greywater" },
  { from: "market-lamp", to: "east-gate" },
  { from: "east-gate", to: "lake-beacon" },
  { from: "lake-beacon", to: "fallen-mile" },
  { from: "lake-beacon", to: "archive", river: "Greywater" },
  { from: "mill-lamp", to: "old-quarry", river: "Greywater" },
  { from: "south-bridge", to: "old-quarry", river: "Greywater" },
  { from: "watch-hill", to: "north-ferry", river: "Greywater" },
  { from: "watch-hill", to: "old-quarry" },
  { from: "watch-hill", to: "chapel-lamp", river: "Lark" },
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
  "Several routes reach the Archive. The shape of the line is less important than the travel diary.",
  "The fruit and bell note names two consecutive kinds of place. The final-light note identifies the last stop before the Archive.",
  "Begin through Stone Ford, then continue east to the Orchard Lamp. Watch Hill follows immediately; Lantern Cross is the final stop.",
];

export const cartographersRouteMosaicTiles = [
  365, 366, 367, 368, 369, 390, 391, 392, 393, 394, 415, 416, 417, 418,
  419, 440, 441, 442, 443, 444, 465, 466, 467, 468, 469, 490, 491, 492,
  493, 494, 515, 516, 517, 518, 519, 540, 541, 542, 543, 544,
];
