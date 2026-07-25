import { describe, expect, it } from "vitest";
import { validateImpossibleConstellation } from "./validator";

describe("validateImpossibleConstellation", () => {
  it("accepts a southwest dome bearing identified as a quill", () => {
    expect(validateImpossibleConstellation({ rotation: 5, shape: "quill" })).toBe(true);
  });

  it("rejects the right shape at the wrong bearing and false shapes", () => {
    expect(validateImpossibleConstellation({ rotation: 1, shape: "quill" })).toBe(false);
    expect(validateImpossibleConstellation({ rotation: 5, shape: "key" })).toBe(false);
  });
});

