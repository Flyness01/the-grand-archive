import { describe, expect, it } from "vitest";
import { validateImpossibleConstellation } from "./validator";

describe("validateImpossibleConstellation", () => {
  it("accepts three timelines aligned on the shared incident time", () => {
    expect(validateImpossibleConstellation({ release: 6, queue: 6, worker: 6 })).toBe(true);
  });

  it("rejects a timeline that is still offset", () => {
    expect(validateImpossibleConstellation({ release: 6, queue: 5, worker: 6 })).toBe(false);
  });
});
