import { describe, expect, it } from "vitest";
import { validateLibrariansShelf } from "./validator";

describe("The Librarian's Shelf validator", () => {
  it("accepts the completed instruction", () => {
    expect(validateLibrariansShelf("PULL")).toBe(true);
    expect(validateLibrariansShelf("pull")).toBe(true);
  });

  it("rejects incomplete or incorrect words", () => {
    expect(validateLibrariansShelf("P__L")).toBe(false);
    expect(validateLibrariansShelf("PUSH")).toBe(false);
  });

  it("rejects malformed input", () => {
    expect(validateLibrariansShelf(["P", "U", "L", "L"])).toBe(false);
  });
});
