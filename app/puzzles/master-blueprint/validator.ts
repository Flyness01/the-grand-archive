import { architectureSolution } from "./puzzleData";

export function validateMasterBlueprint(input: unknown) {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return false;
  const placements = input as Record<string, unknown>;
  return Object.entries(architectureSolution).every(([boundary, safeguard]) => placements[boundary] === safeguard)
    && Object.keys(placements).length === Object.keys(architectureSolution).length;
}
