import { productionCheckSolution } from "./puzzleData";

export function validateImpossibleConstellation(input: unknown): boolean {
  if (typeof input !== "object" || input === null) return false;
  const candidate = input as Partial<Record<keyof typeof productionCheckSolution, unknown>>;
  return Object.entries(productionCheckSolution).every(
    ([key, value]) => candidate[key as keyof typeof productionCheckSolution] === value,
  );
}
