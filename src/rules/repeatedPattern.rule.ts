import { PinRule } from "../types";

export const repeatedPatternRule: PinRule = {
  name: "repeated-pattern",
  penalty: 25,
  reason: "Repeated digit pattern detected",
  check(pin: string): boolean {
    if (pin.length % 2 !== 0) return false;

    const half = pin.length / 2;
    return pin.slice(0, half) === pin.slice(half);
  }
};
