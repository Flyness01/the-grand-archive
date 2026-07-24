import { describe, expect, it } from "vitest";
import { validateLibrariansShelf } from "./validator";

describe("The Librarian's Shelf validator", () => {
  it("accepts the completed instruction", () => {
    expect(validateLibrariansShelf("EXTRACT")).toBe(true);
    expect(validateLibrariansShelf("extract")).toBe(true);
  });

  it("rejects incomplete or incorrect words", () => {
    expect(validateLibrariansShelf("E_____T")).toBe(false);
    expect(validateLibrariansShelf("EJECT")).toBe(false);
  });

  it("rejects malformed input", () => {
    expect(validateLibrariansShelf(["E", "X", "T", "R", "A", "C", "T"])).toBe(false);
  });
});
