import { stoppedClockSolution } from "./puzzleData";

export function validateStoppedClock(input: unknown): boolean {
  return (
    Array.isArray(input) &&
    input.length === stoppedClockSolution.length &&
    input.every((gearId, index) => gearId === stoppedClockSolution[index])
  );
}

