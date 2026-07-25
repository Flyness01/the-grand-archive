import { reflectionDifferences } from "./puzzleData";

export function validateHallOfReflections(input: unknown) {
  if (!Array.isArray(input) || input.some((item) => typeof item !== "string")) return false;
  const selected = new Set(input);
  return selected.size === reflectionDifferences.length
    && reflectionDifferences.every((difference) => selected.has(difference));
}

