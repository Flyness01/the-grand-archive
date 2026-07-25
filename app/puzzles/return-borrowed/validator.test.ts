import { describe, expect, it } from "vitest";
import { pedestalSolution } from "./puzzleData";
import { validateOuterPedestals, validateReturnBorrowed } from "./validator";

describe("return what was borrowed", () => {
  it("accepts the eight outer artifacts and Journal on the central stand", () => {
    expect(validateOuterPedestals({ ...pedestalSolution })).toBe(true);
    expect(validateReturnBorrowed({
      placements: { ...pedestalSolution },
      journalOnStand: true,
    })).toBe(true);
  });

  it("rejects a swapped artifact or an empty central stand", () => {
    expect(validateOuterPedestals({
      ...pedestalSolution,
      crescent: "navigators-compass",
      star: "feather-bookmark",
    })).toBe(false);
    expect(validateReturnBorrowed({
      placements: { ...pedestalSolution },
      journalOnStand: false,
    })).toBe(false);
  });
});

