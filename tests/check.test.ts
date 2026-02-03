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
  // --- New Tests ---

  it("fails when PIN is too short", () => {
    const result = checkPinStrength("123", { minLength: 4 });
    expect(result.strength).toBe("weak");
    expect(result.reasons).toContain("PIN is shorter than the minimum length");
  });

  it("fails when PIN is shorter than custom minLength", () => {
    const result = checkPinStrength("12345", { minLength: 6 });
    expect(result.reasons).toContain("PIN is shorter than the minimum length");
  });

  it("returns weak for reverse sequential PIN", () => {
    const result = checkPinStrength("4321");
    expect(result.strength).toBe("weak");
    expect(result.reasons).toContain("Sequential digits detected");
  });

  it("allows sequential PINs when allowed by options", () => {
    // Note: If the logic strictly enforces it, this might fail unless logic supports it.
    // Based on reading: sequential.rule.ts likely doesn't check options.allowSequential yet.
    // We will write the test to expect success, and if it fails, we fix the code.
    const result = checkPinStrength("1234", { allowSequential: true });
    // Expecting to NOT see "Sequential digits detected"
    expect(result.reasons).not.toContain("Sequential digits detected");
  });

  it("detects repeated patterns (e.g. 1212)", () => {
    const result = checkPinStrength("1212");
    expect(result.reasons).toContain("Repeated pattern detected");
  });

  it("detects repeated patterns (e.g. 6969)", () => {
    const result = checkPinStrength("6969");
    expect(result.reasons).toContain("Repeated pattern detected");
  });

  it("handles mixed weak patterns (repeated digits + length)", () => {
    const result = checkPinStrength("11", { minLength: 4 });
    expect(result.reasons).toContain("PIN is shorter than the minimum length");
    expect(result.reasons).toContain("All digits are the same");
    expect(result.score).toBeLessThan(40);
  });

  it("calculates score within bounds", () => {
    const result = checkPinStrength("1234");
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
