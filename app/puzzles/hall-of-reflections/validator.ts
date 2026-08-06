import { qaFailureSolution } from "./puzzleData";

export function validateHallOfReflections(input: unknown) {
  if (!Array.isArray(input) || input.some((cell) => typeof cell !== "string")) return false;
  const selected = new Set(input);
  return input.length === qaFailureSolution.length
    && selected.size === qaFailureSolution.length
    && qaFailureSolution.every((cell) => selected.has(cell));
}
