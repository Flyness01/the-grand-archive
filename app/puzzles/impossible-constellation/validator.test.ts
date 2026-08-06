import { describe, expect, it } from "vitest";
import { validateImpossibleConstellation } from "./validator";

describe("validateImpossibleConstellation", () => {
  it("accepts three timelines aligned chronologically", () => {
    expect(validateImpossibleConstellation({ release: 0, queue: 0, worker: 0, name: "Jordan" })).toBe(true);
  });

  it("rejects a timeline that is still offset", () => {
    expect(validateImpossibleConstellation({ release: 0, queue: 1, worker: 0, name: "Jordan" })).toBe(false);
    expect(validateImpossibleConstellation({ release: 0, queue: 0, worker: 0, name: "   " })).toBe(false);
  });
});
