import { librariansShelfSolution } from "./puzzleData";

export function validateLibrariansShelf(input: unknown): boolean {
  return (
    typeof input === "string" &&
    input.trim().toUpperCase() === librariansShelfSolution
  );
}
