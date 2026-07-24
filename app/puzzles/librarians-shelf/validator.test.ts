import { describe, expect, it } from "vitest";
import { librariansShelfSolution } from "./puzzleData";
import { validateLibrariansShelf } from "./validator";

describe("The Librarian's Shelf validator", () => {
  it("accepts the four marked books in their instructed order", () => {
    expect(validateLibrariansShelf(librariansShelfSolution)).toBe(true);
  });

  it("rejects the correct books in the wrong order", () => {
    expect(
      validateLibrariansShelf([...librariansShelfSolution].reverse()),
    ).toBe(false);
  });

  it("rejects malformed input", () => {
    expect(validateLibrariansShelf("PULL")).toBe(false);
    expect(validateLibrariansShelf(librariansShelfSolution.slice(0, 3))).toBe(
      false,
    );
  });
});
