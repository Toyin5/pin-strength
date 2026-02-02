import { PinRule } from "../types";

export const repeatedDigitsRule: PinRule = {
  name: "repeated-digits",
  penalty: 50,
  reason: "All digits are the same",
  check(pin: string): boolean {
    return /^(\d)\1+$/.test(pin);
  }
};
