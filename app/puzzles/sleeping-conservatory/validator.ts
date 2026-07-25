import { sleepingConservatorySolution } from "./puzzleData";

export function validateSleepingConservatory(input: unknown): boolean {
  return (
    Array.isArray(input) &&
    input.length === sleepingConservatorySolution.length &&
    input.every((plantId, index) => plantId === sleepingConservatorySolution[index])
  );
}

