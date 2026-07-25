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
  "Use the actual Archive as the fixed reference: the Library lies east, the clock mechanism west, and the pedestal opening faces south.",
  "Rotate the architectural sheet until the Library notch points east. Turn the mechanical sheet until the clock gear sits west. Face the open pedestal arc south.",
  "Set Architecture to 90°, Mechanical to 270°, and Pedestals to 180°, then inspect the composite.",
];

export const masterBlueprintMosaicTiles = Array.from(
  { length: 562 },
  (_, index) => index,
);
