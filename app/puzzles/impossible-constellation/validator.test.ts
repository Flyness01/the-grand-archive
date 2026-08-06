import { describe, expect, it } from "vitest";
import { validateImpossibleConstellation } from "./validator";

describe("validateImpossibleConstellation", () => {
  it("accepts the conclusion supported by the post-release evidence", () => {
    expect(validateImpossibleConstellation({ window: "after-deploy", service: "job-worker", behavior: "retries" })).toBe(true);
  });

  it("rejects conclusions that conflict with any signal", () => {
    expect(validateImpossibleConstellation({ window: "before-deploy", service: "job-worker", behavior: "retries" })).toBe(false);
    expect(validateImpossibleConstellation({ window: "after-deploy", service: "api", behavior: "auth" })).toBe(false);
  });
});
