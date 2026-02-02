import { PinOptions, PinResult, PinRule, PinStrength } from "./types";

import { lengthRule } from "./rules/length.rule";
import { repeatedDigitsRule } from "./rules/repeatedDigits.rule";
import { sequentialRule } from "./rules/sequential.rule";
import { palindromeRule } from "./rules/palindrome.rule";
import { repeatedPatternRule } from "./rules/repeatedPattern.rule";
import { blacklistRule } from "./rules/blacklist.rule";

const RULES: PinRule[] = [
  lengthRule,
  repeatedDigitsRule,
  sequentialRule,
  palindromeRule,
  repeatedPatternRule,
  blacklistRule
];

export function checkPinStrength(
  pin: string,
  options: PinOptions = {}
): PinResult {
  if (!/^\d+$/.test(pin)) {
    throw new Error("PIN must contain digits only");
  }

  let score = 100;
  const reasons: string[] = [];

  for (const rule of RULES) {
    if (rule.check(pin, options)) {
      score -= rule.penalty;
      reasons.push(rule.reason);
    }
  }

  score = Math.max(0, Math.min(100, score));

  const strength: PinStrength =
    score < 40 ? "weak" :
    score < 70 ? "medium" :
    "strong";

  return { score, strength, reasons };
}
