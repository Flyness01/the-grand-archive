import { describe, expect, it } from "vitest";
import { normalizeBlueprintRotation, validateMasterBlueprint } from "./validator";

describe("master blueprint", () => {
  it("accepts the three correctly oriented transparent plans", () => {
    expect(validateMasterBlueprint({
      architecture: 90,
      mechanical: 270,
      pedestals: 180,
    })).toBe(true);
  });

  it("normalizes equivalent rotations and rejects a misaligned sheet", () => {
    expect(normalizeBlueprintRotation(-90)).toBe(270);
    expect(validateMasterBlueprint({
      architecture: 450,
      mechanical: -90,
      pedestals: 540,
    })).toBe(true);
    expect(validateMasterBlueprint({
      architecture: 90,
      mechanical: 180,
      pedestals: 180,
    })).toBe(false);
  });
});

