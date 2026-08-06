import { qaReviewSolution } from "./puzzleData";

export function validateHallOfReflections(input: unknown) {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return false;
  const candidate = input as Record<string, unknown>;
  return Object.entries(qaReviewSolution).every(([id, disposition]) => candidate[id] === disposition)
    && Object.keys(candidate).length === Object.keys(qaReviewSolution).length;
}
