import { PinRule, PinOptions } from "../types";

export const lengthRule: PinRule = {
  name: "length",
  penalty: 30,
  reason: "PIN is shorter than the minimum length",
  check(pin: string, options?: PinOptions): boolean {
    const minLength = options?.minLength ?? 4;
    return pin.length < minLength;
  }
};
