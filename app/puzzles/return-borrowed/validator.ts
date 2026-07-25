import { outerArtifactIds, pedestalSolution } from "./puzzleData";

export function validateOuterPedestals(input: unknown) {
  if (!input || typeof input !== "object") return false;
  const placements = input as Record<string, unknown>;
  const values = Object.values(placements);
  return Object.entries(pedestalSolution).every(
    ([shape, artifactId]) => placements[shape] === artifactId,
  ) && values.length === outerArtifactIds.length
    && new Set(values).size === outerArtifactIds.length;
}

export function validateReturnBorrowed(input: unknown) {
  if (!input || typeof input !== "object") return false;
  const value = input as { placements?: unknown; journalOnStand?: unknown };
  return validateOuterPedestals(value.placements) && value.journalOnStand === true;
}

