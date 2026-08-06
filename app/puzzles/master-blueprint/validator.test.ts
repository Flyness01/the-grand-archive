import { describe, expect, it } from "vitest";
import { architectureSolution } from "./puzzleData";
import { validateMasterBlueprint } from "./validator";

describe("architecture resilience lab", () => {
  it("accepts safeguards at the boundaries whose guarantees they protect", () => {
    expect(validateMasterBlueprint({ ...architectureSolution })).toBe(true);
  });

  it("rejects incomplete or misplaced safeguards", () => {
    expect(validateMasterBlueprint({ "api-write": "idempotency" })).toBe(false);
    expect(validateMasterBlueprint({
      "api-write": "timeout-fallback",
      "data-call": "idempotency",
      "worker-recovery": "durable-retry",
    })).toBe(false);
  });
});
