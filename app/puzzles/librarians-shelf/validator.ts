import { librariansShelfSolution } from "./puzzleData";

export function validateLibrariansShelf(input: unknown): boolean {
  return (
    Array.isArray(input) &&
    input.length === librariansShelfSolution.length &&
    librariansShelfSolution.every((bookId, index) => input[index] === bookId)
  );
}
