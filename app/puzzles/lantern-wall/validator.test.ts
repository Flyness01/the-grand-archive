import { describe, expect, it } from "vitest";
import { lanternWallSolution } from "./puzzleData";
import { validateLanternWall } from "./validator";

describe("validateLanternWall", () => {
  it("accepts the complete keyhole alignment", () => {
    expect(validateLanternWall(lanternWallSolution)).toBe(true);
  });

  it("rejects an incomplete or nearly correct alignment", () => {
    expect(validateLanternWall(lanternWallSolution.slice(0, 3))).toBe(false);
    expect(
      validateLanternWall(
        lanternWallSolution.map((setting, index) =>
          index === 2 ? { ...setting, angle: 2 } : setting,
        ),
      ),
    ).toBe(false);
  });
});

