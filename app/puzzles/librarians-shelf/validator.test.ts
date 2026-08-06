import { describe, expect, it } from "vitest";
import { validateLibrariansShelf } from "./validator";

describe("The Librarian's Shelf validator", () => {
  it("accepts the completed instruction", () => {
    expect(validateLibrariansShelf("CONTEXT")).toBe(true);
    expect(validateLibrariansShelf("context")).toBe(true);
  });

  it("rejects incomplete or incorrect words", () => {
    expect(validateLibrariansShelf("C__T__T")).toBe(false);
    expect(validateLibrariansShelf("EJECT")).toBe(false);
  });

  it("rejects malformed input", () => {
    expect(validateLibrariansShelf(["C", "O", "N", "T", "E", "X", "T"])).toBe(false);
  });
});
