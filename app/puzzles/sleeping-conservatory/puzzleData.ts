export type LightPhase = "dawn" | "day" | "dusk" | "night";
export type Moisture = "dry" | "wet";

export type ConservatoryPlant = {
  id: string;
  name: string;
  phase: LightPhase;
  moisture: Moisture;
  color: string;
  note: string;
};

export const lightPhases: LightPhase[] = ["dawn", "day", "dusk", "night"];

export const conservatoryPlants: ConservatoryPlant[] = [
  { id: "mooncup", name: "Mooncup", phase: "night", moisture: "wet", color: "blue", note: "Opens beneath stars after rain." },
  { id: "sunlace", name: "Sunlace", phase: "day", moisture: "dry", color: "gold", note: "Seeks the dry warmth of noon." },
  { id: "dawnbell", name: "Dawnbell", phase: "dawn", moisture: "wet", color: "ivory", note: "Greets first light with wet roots." },
  { id: "embervine", name: "Embervine", phase: "dusk", moisture: "dry", color: "copper", note: "Unfurls as the dry day cools." },
  { id: "star-orchid", name: "Star Orchid", phase: "night", moisture: "dry", color: "violet", note: "Needs starlight before the rain." },
  { id: "rainfern", name: "Rainfern", phase: "day", moisture: "wet", color: "green", note: "Rises at noon only after watering." },
];

export const sleepingConservatorySolution = [
  "dawnbell",
  "sunlace",
  "rainfern",
  "embervine",
  "star-orchid",
  "mooncup",
];

export const sleepingConservatoryHints = [
  "Ignore where the pots stand. Read each brass tag for the light and moisture that wakes it.",
  "Follow one day from dawn to night. When two plants share the same light, the dry plant must open before the watered one.",
  "Bloom Dawnbell, Sunlace, Rainfern, Embervine, Star Orchid, then Mooncup.",
];

export const sleepingConservatoryMosaicTiles = [
  401, 402, 403, 404, 405, 406, 407, 408, 409,
  426, 434,
  451, 459,
  476, 484,
  501, 509,
  526, 534,
  551, 559,
  576, 577, 578, 579, 580, 581, 582, 583, 584,
];

