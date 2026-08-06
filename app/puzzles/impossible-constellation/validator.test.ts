import { describe, expect, it } from "vitest";
import { validateImpossibleConstellation } from "./validator";

describe("validateImpossibleConstellation", () => {
  it("accepts three timelines aligned on the shared incident time", () => {
    expect(validateImpossibleConstellation({ release: 2, queue: 2, worker: 2, name: "Jordan" })).toBe(true);
  });

  it("rejects a timeline that is still offset", () => {
    expect(validateImpossibleConstellation({ release: 2, queue: 1, worker: 2, name: "Jordan" })).toBe(false);
    expect(validateImpossibleConstellation({ release: 2, queue: 2, worker: 2, name: "   " })).toBe(false);
  });
});
