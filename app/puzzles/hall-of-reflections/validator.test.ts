import { describe, expect, it } from "vitest";
import { qaReviewSolution } from "./puzzleData";
import { validateHallOfReflections } from "./validator";

describe("release readiness review", () => {
  it("accepts a complete evidence-based disposition", () => {
    expect(validateHallOfReflections({ ...qaReviewSolution })).toBe(true);
  });

  it("rejects missing findings and incorrect severity", () => {
    const { "analytics-contract": omitted, ...incomplete } = qaReviewSolution;
    expect(omitted).toBe("blocker");
    expect(validateHallOfReflections(incomplete)).toBe(false);
    expect(validateHallOfReflections({ ...qaReviewSolution, "card-spacing": "blocker" })).toBe(false);
  });
});
