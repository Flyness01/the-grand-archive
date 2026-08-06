import { productionCheckSolution, sharedTimelinePhrase, type SignalRowId } from "./puzzleData";

export function validateImpossibleConstellation(input: unknown): boolean {
  if (typeof input !== "object" || input === null) return false;
  const candidate = input as Partial<Record<SignalRowId, unknown>>;
  const phrase = "phrase" in candidate && typeof candidate.phrase === "string"
    ? candidate.phrase.trim().replace(/\s+/g, " ").toUpperCase()
    : "";
  return Object.entries(productionCheckSolution).every(([key, value]) => candidate[key as SignalRowId] === value)
    && phrase === sharedTimelinePhrase;
}
