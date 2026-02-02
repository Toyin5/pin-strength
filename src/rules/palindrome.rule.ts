import { PinRule } from "../types";

export const palindromeRule: PinRule = {
  name: "palindrome",
  penalty: 20,
  reason: "PIN is a palindrome",
  check(pin: string): boolean {
    return pin === pin.split("").reverse().join("");
  }
};
