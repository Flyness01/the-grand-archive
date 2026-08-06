import { describe, expect, it } from "vitest";
import { qaFailureSolution } from "./puzzleData";
import { validateHallOfReflections } from "./validator";

describe("CI failure matrix", () => {
  it("accepts the failure pattern encoded by all row and column runs", () => {
    expect(validateHallOfReflections([...qaFailureSolution])).toBe(true);
  });

  it("rejects incomplete, duplicate, or extra failure cells", () => {
    expect(validateHallOfReflections(qaFailureSolution.slice(0, -1))).toBe(false);
    expect(validateHallOfReflections([...qaFailureSolution, qaFailureSolution[0]])).toBe(false);
    expect(validateHallOfReflections([...qaFailureSolution, "0:0"])).toBe(false);
  });
});
