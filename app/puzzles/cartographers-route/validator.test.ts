import { describe, expect, it } from "vitest";
import { cartographersRouteSolution } from "./puzzleData";
import { validateCartographersRoute } from "./validator";

describe("The Cartographer's Missing Route validator", () => {
  it("accepts the route that follows every margin rule", () => {
    expect(validateCartographersRoute(cartographersRouteSolution)).toBe(true);
  });

  it("rejects a shorter route through an abandoned milestone", () => {
    expect(
      validateCartographersRoute([
        "west-gate",
        "broken-mile",
        "east-gate",
        "stone-ford",
        "market-lamp",
        "north-ferry",
        "lantern-cross",
        "archive",
      ]),
    ).toBe(false);
  });

  it("rejects the tempting route that turns north too early", () => {
    expect(
      validateCartographersRoute([
        "west-gate",
        "stone-ford",
        "ridge-lantern",
        "north-ferry",
        "lantern-cross",
        "archive",
      ]),
    ).toBe(false);
  });

  it("rejects malformed input", () => {
    expect(validateCartographersRoute(null)).toBe(false);
  });
});
