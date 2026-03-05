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
      blacklist: ["9999"],
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
        blacklist: ["9999"],
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
      expect(result.reasons).toContain(
        "PIN is shorter than the minimum length",
      );
    });

    it("fails when PIN is shorter than custom minLength", () => {
      const result = checkPinStrength("12345", { minLength: 6 });
      expect(result.reasons).toContain(
        "PIN is shorter than the minimum length",
      );
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
      expect(result.reasons).toContain(
        "PIN is shorter than the minimum length",
      );
      expect(result.reasons).toContain("All digits are the same");
      expect(result.score).toBeLessThan(40);
    });

    it("calculates score within bounds", () => {
      const result = checkPinStrength("1234");
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });

  // Keypad pattern tests
  it("detects vertical keypad pattern (2580) and applies penalty", () => {
    const patternResult = checkPinStrength("2580");
    const randomResult = checkPinStrength("2581"); // Similar but not a pattern

    expect(patternResult.reasons).toContain("Common keypad pattern detected");
    expect(patternResult.score).toBeLessThan(randomResult.score);
    expect(patternResult.score).toBe(65); // 100 - 35 penalty
  });

  it("detects diagonal keypad pattern (1590) and applies penalty", () => {
    const result = checkPinStrength("1590");

    expect(result.reasons).toContain("Common keypad pattern detected");
    expect(result.score).toBe(65); // 100 - 35 penalty
    expect(result.strength).toBe("medium");
  });

  it("detects corner keypad pattern (1379) and applies penalty", () => {
    const result = checkPinStrength("1379");

    expect(result.reasons).toContain("Common keypad pattern detected");
    expect(result.score).toBe(65); // 100 - 35 penalty
    expect(result.strength).toBe("medium");
  });

  it("does not flag random PIN as keypad pattern", () => {
    const result = checkPinStrength("8472");

    expect(result.reasons).not.toContain("Common keypad pattern detected");
    expect(result.score).toBe(100);
    expect(result.strength).toBe("strong");
  });
  // Tests for longer PINs with keypad patterns as substrings
  it("detects keypad pattern embedded in longer PIN", () => {
    const result = checkPinStrength("0125809"); // Contains "2580"
    expect(result.reasons).toContain("Common keypad pattern detected");
  });

  it("detects keypad pattern with prefix and suffix", () => {
    const result = checkPinStrength("x1379x".replace(/x/g, "9")); // "913799" contains "1379"
    expect(result.reasons).toContain("Common keypad pattern detected");
  });

  it("does not over-detect on similar but non-pattern longer PIN", () => {
    // "258109" is similar to "2580" but doesn't contain the full pattern
    const result = checkPinStrength("258109");
    expect(result.reasons).not.toContain("Common keypad pattern detected");
  });

  it("keypad pattern PIN scores lower than similar non-pattern PIN", () => {
    const patternResult = checkPinStrength("2580");
    const randomResult = checkPinStrength("2581"); // Similar but not a pattern

    expect(patternResult.reasons).toContain("Common keypad pattern detected");
    expect(randomResult.reasons).not.toContain(
      "Common keypad pattern detected",
    );
    expect(patternResult.score).toBeLessThan(randomResult.score);
  });

  it("scores stay within valid bounds for keypad patterns", () => {
    const result = checkPinStrength("2580");
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
