import { describe, expect, it } from "vitest";
import { mirrorKey, validateMirroredTypewriter } from "./validator";

describe("mirrored typewriter", () => {
  it("mirrors keys within each keyboard row", () => {
    expect(mirrorKey("i")).toBe("E");
    expect(mirrorKey("x")).toBe("N");
    expect(mirrorKey("j")).toBe("D");
    expect(mirrorKey("k")).toBe("S");
  });

  it("accepts only the mirrored keystrokes that print ENDS", () => {
    expect(validateMirroredTypewriter({ keys: "IXJK", printed: "ENDS" })).toBe(true);
    expect(validateMirroredTypewriter({ keys: "ENDS", printed: "I?R?" })).toBe(false);
  });
});

