export type PinStrength = "weak" | "medium" | "strong";

export interface PinRule {
  name: string;
  penalty: number;
  check(pin: string, options?: PinOptions): boolean;
  reason: string;
}

export interface PinOptions {
  minLength?: number;
  blacklist?: string[];
  allowSequential?: boolean;
}

export interface PinResult {
  score: number;
  strength: PinStrength;
  reasons: string[];
}
