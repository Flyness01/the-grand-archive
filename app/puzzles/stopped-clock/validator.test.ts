import { describe, expect, it } from "vitest";
import { stoppedClockSolution } from "./puzzleData";
import { validateStoppedClock } from "./validator";

describe("validateStoppedClock", () => {
  it("accepts the reverse-failure restoration sequence", () => {
    expect(validateStoppedClock(stoppedClockSolution)).toBe(true);
  });

  it("rejects the failure order and the untouched governor", () => {
    expect(validateStoppedClock([...stoppedClockSolution].reverse())).toBe(false);
    expect(validateStoppedClock(["governor", ...stoppedClockSolution.slice(0, 3)])).toBe(false);
  });
});

