export type BlueprintLayerId = "architecture" | "mechanical" | "pedestals";

export const blueprintLayerOrder: BlueprintLayerId[] = [
  "architecture",
  "mechanical",
  "pedestals",
];

export const blueprintSolution: Record<BlueprintLayerId, number> = {
  architecture: 90,
  mechanical: 270,
  pedestals: 180,
};

export const masterBlueprintHints = [
  "Use the fixed system constraints as anchors: the client boundary is east, the data service west, and the recovery path south.",
  "Rotate User Experience toward the client boundary, Service Architecture toward the data service, and Reliability toward the recovery path.",
  "Set User Experience to 90°, Service Architecture to 270°, and Reliability Plan to 180°, then review the design.",
];

export const masterBlueprintMosaicTiles = Array.from(
  { length: 562 },
  (_, index) => index,
);
