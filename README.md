# Pin Strength

A lightweight, flexible TypeScript library for validating the strength of numeric PINs. It checks for common weaknesses like repeated digits, sequential patterns, palindromes, and blacklisted sequences.

## Features

- **Length Validation**: Enforce a minimum length (default: 4).
- **Repeated Digits**: Detects PINs like `1111`.
- **Sequential Patterns**: Detects sequences like `1234` or `4321`.
- **Palindromes**: Detects PINs like `1221`.
- **Repeated Patterns**: Detects repeating patterns like `1212`.
- **Blacklist**: Rejects commonly used PINs (e.g., `1234`, `0000`).
- **Scoring System**: Returns a score (0-100) and strength rating ("weak", "medium", "strong").

## Installation

```bash
npm install pin-strength
# or
yarn add pin-strength
```

## Usage

### Basic Usage

```typescript
import { checkPinStrength } from 'pin-strength';

const result = checkPinStrength('1234');

console.log(result);
/*
{
  score: 0,
  strength: 'weak',
  reasons: [
    'PIN should not contain sequential digits (e.g. 1234 or 4321)',
    'PIN is in the common blacklist'
  ]
}
*/
```

### With Options

You can customize the validation rules using options:

```typescript
import { checkPinStrength } from 'pin-strength';

const result = checkPinStrength('9812', {
  minLength: 6,
  blacklist: ['9812'],
  allowSequential: false
});

console.log(result);
```

## API Reference

### `checkPinStrength(pin: string, options?: PinOptions): PinResult`

Calculates the strength of a given PIN.

- **pin**: `string` - The numeric string to validate.
- **options**: `PinOptions` (optional) - Configuration object.

### `PinOptions`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `minLength` | `number` | `4` | Minimum required length of the PIN/ |
| `blacklist` | `string[]` | `[]` | Array of forbidden PINs. |
| `allowSequential` | `boolean` | `false` | (Not strictly enforced by interface, but used in logic if applicable) |

*(Note: The `allowSequential` option is defined in the types but currently strictly enforced by the `sequential.rule`. Logic updates may be needed to fully respect this flag if intended to bypass the rule.)*

### `PinResult`

| Property | Type | Description |
|----------|------|-------------|
| `score` | `number` | A value between 0 and 100 representing the strength. |
| `strength` | `'weak' \| 'medium' \| 'strong'` | Textual representation of the score. <br> < 40: weak <br> 40-69: medium <br> >= 70: strong |
| `reasons` | `string[]` | List of reasons why the score was penalized. |

## Rules

The library applies the following rules, each deducting points from the initial score of 100:

1.  **Length**: Checks if the PIN meets the minimum length.
2.  **Repeated Digits**: Checks if all digits are the same (e.g., "1111").
3.  **Sequential**: Checks for forward or backward sequences (e.g., "1234", "4321").
4.  **Palindrome**: Checks if the PIN reads the same forwards and backwards.
5.  **Repeated Pattern**: Checks for repeating sub-patterns (e.g., "1212").
6.  **Blacklist**: Checks if the PIN is in a list of common weak PINs.

## License

MIT
