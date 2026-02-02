import { PinRule, PinOptions } from "../types";

export const sequentialRule: PinRule = {
  name: "sequential",
  penalty: 40,
  reason: "Sequential digits detected",
  check(pin: string, options?: PinOptions): boolean {
    if (options?.allowSequential) return false;

    let asc = true;
    let desc = true;

    for (let i = 1; i < pin.length; i++) {
      const prev = Number(pin[i - 1]);
      const curr = Number(pin[i]);

      if (curr !== prev + 1) asc = false;
      if (curr !== prev - 1) desc = false;
    }

    return asc || desc;
  }
};
