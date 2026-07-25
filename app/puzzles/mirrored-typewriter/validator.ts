import { mirroredTypewriterKeys, mirroredTypewriterTarget } from "./puzzleData";

export function mirrorKey(key: string) {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const upper = key.toUpperCase();
  for (const row of rows) {
    const index = row.indexOf(upper);
    if (index >= 0) return row[row.length - 1 - index];
  }
  return "";
}

export function validateMirroredTypewriter(input: unknown) {
  if (!input || typeof input !== "object") return false;
  const value = input as { keys?: unknown; printed?: unknown };
  return value.keys === mirroredTypewriterKeys && value.printed === mirroredTypewriterTarget;
}

