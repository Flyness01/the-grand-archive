import { describe, expect, it } from "vitest";
import { validateImpossibleConstellation } from "./validator";

describe("validateImpossibleConstellation", () => {
  it("accepts three timelines aligned on the shared incident time", () => {
    expect(validateImpossibleConstellation({ release: 2, queue: 2, worker: 2, phrase: "we built it together" })).toBe(true);
  });

  it("rejects a timeline that is still offset", () => {
    expect(validateImpossibleConstellation({ release: 2, queue: 1, worker: 2, phrase: "WE BUILT IT TOGETHER" })).toBe(false);
    expect(validateImpossibleConstellation({ release: 2, queue: 2, worker: 2, phrase: "WE FIXED IT TOGETHER" })).toBe(false);
  });
});
