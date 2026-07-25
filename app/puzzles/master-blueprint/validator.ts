import {
  blueprintLayerOrder,
  blueprintSolution,
  type BlueprintLayerId,
} from "./puzzleData";

export function normalizeBlueprintRotation(value: number) {
  return ((value % 360) + 360) % 360;
}

export function validateMasterBlueprint(input: unknown) {
  if (!input || typeof input !== "object") return false;
  const rotations = input as Partial<Record<BlueprintLayerId, unknown>>;
  return blueprintLayerOrder.every((layer) =>
    typeof rotations[layer] === "number"
    && normalizeBlueprintRotation(rotations[layer] as number) === blueprintSolution[layer],
  );
}

