import {
  correctConstellationShape,
  correctDomeRotation,
} from "./puzzleData";

export function validateImpossibleConstellation(input: unknown): boolean {
  if (typeof input !== "object" || input === null) return false;
  const candidate = input as { rotation?: unknown; shape?: unknown };
  return (
    candidate.rotation === correctDomeRotation &&
    candidate.shape === correctConstellationShape
  );
}

