import { PinRule, PinOptions } from "../types";

const DEFAULT_BLACKLIST = [
  "0000",
  "1111",
  "1234",
  "1212",
  "4321",
  "7777",
  "9999"
];

export const blacklistRule: PinRule = {
  name: "blacklist",
  penalty: 60,
  reason: "PIN is commonly used",
  check(pin: string, options?: PinOptions): boolean {
    const blacklist = options?.blacklist ?? DEFAULT_BLACKLIST;
    return blacklist.includes(pin);
  }
};