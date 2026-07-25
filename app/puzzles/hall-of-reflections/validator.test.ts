import { describe, expect, it } from "vitest";
import { reflectionDifferences } from "./puzzleData";
import { validateHallOfReflections } from "./validator";

describe("hall of reflections", () => {
  it("accepts all five deliberate inconsistencies", () => {
    expect(validateHallOfReflections([...reflectionDifferences])).toBe(true);
  });

  it("rejects missing, duplicate, or ordinary mirrored details", () => {
    expect(validateHallOfReflections(reflectionDifferences.slice(0, 4))).toBe(false);
    expect(validateHallOfReflections(["backward-clock", "backward-clock"])).toBe(false);
    expect(validateHallOfReflections([...reflectionDifferences, "reversed-book"])).toBe(false);
  });
});

