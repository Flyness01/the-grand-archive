import { describe, expect, it } from "vitest";
import { sleepingConservatorySolution } from "./puzzleData";
import { validateSleepingConservatory } from "./validator";

describe("validateSleepingConservatory", () => {
  it("accepts a complete natural light cycle", () => {
    expect(validateSleepingConservatory(sleepingConservatorySolution)).toBe(true);
  });

  it("rejects physical pot order and wet-before-dry pairs", () => {
    expect(
      validateSleepingConservatory([
        "mooncup",
        "sunlace",
        "dawnbell",
        "embervine",
        "star-orchid",
        "rainfern",
      ]),
    ).toBe(false);
    expect(
      validateSleepingConservatory([
        "dawnbell",
        "rainfern",
        "sunlace",
        "embervine",
        "star-orchid",
        "mooncup",
      ]),
    ).toBe(false);
  });
});

