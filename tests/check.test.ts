import { describe, it, expect } from "vitest";
import { checkPinStrength } from "../src";

describe("checkPinStrength", () => {
  it("returns weak for sequential PIN", () => {
    const result = checkPinStrength("1234");

    expect(result.strength).toBe("weak");
    expect(result.reasons).toContain("Sequential digits detected");
  });

  it("returns weak for repeated digits", () => {
    const result = checkPinStrength("1111");

    expect(result.strength).toBe("weak");
    expect(result.reasons).toContain("All digits are the same");
  });

  it("returns strong for random PIN", () => {
    const result = checkPinStrength("4829");

    expect(result.strength).toBe("strong");
    expect(result.reasons.length).toBe(0);
  });

  it("detects palindrome PIN", () => {
    const result = checkPinStrength("1221");

    expect(result.reasons).toContain("PIN is a palindrome");
  });

  it("uses custom blacklist", () => {
    const result = checkPinStrength("9999", {
      blacklist: ["9999"]
    });

    expect(result.reasons).toContain("PIN is commonly used");
  });

  it("throws error for non-numeric PIN", () => {
    expect(() => checkPinStrength("12a4")).toThrow();
  });
});
