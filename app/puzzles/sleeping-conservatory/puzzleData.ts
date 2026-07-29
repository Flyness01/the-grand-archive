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
  { id: "mooncup", name: "Live Metrics", phase: "night", moisture: "wet", color: "blue", note: "Verify after launch with traffic enabled." },
  { id: "sunlace", name: "Unit Tests", phase: "day", moisture: "dry", color: "gold", note: "Run early against an isolated build." },
  { id: "dawnbell", name: "Scope Check", phase: "dawn", moisture: "wet", color: "ivory", note: "Confirm the candidate and enable release context first." },
  { id: "embervine", name: "Approval", phase: "dusk", moisture: "dry", color: "copper", note: "Request approval after validation, before traffic." },
  { id: "star-orchid", name: "Deploy", phase: "night", moisture: "dry", color: "violet", note: "Deploy the approved candidate before enabling traffic." },
  { id: "rainfern", name: "Integration Tests", phase: "day", moisture: "wet", color: "green", note: "Run after unit tests with dependencies enabled." },
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
  "Ignore where the checks appear. Read each card for its release stage and dependency mode.",
  "Move from Scope through Observe. When two checks share a stage, isolated must run before connected.",
  "Run Scope Check, Unit Tests, Integration Tests, Approval, Deploy, then Live Metrics.",
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
