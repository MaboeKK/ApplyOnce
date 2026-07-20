// packages/portal/src/utils/formatters.ts
// Shared input formatting/validation helpers (UX Improvement Rules §1, §2, §4)

/** Title Case a free-text field, collapsing duplicate/leading/trailing spaces. */
export function titleCase(input: string): string {
  const trimmed = input.trim().replace(/\s+/g, ' ');
  return trimmed.replace(/\b\p{L}[\p{L}'-]*/gu, (word) => {
    // Keep short connective words lowercase unless they start the string (e.g. "van der Merwe")
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
}

/** Strip everything but digits. */
export function digitsOnly(input: string): string {
  return input.replace(/\D/g, '');
}

/** Format a 13-digit SA ID number as "888888 8888 888" while typing/pasting. */
export function formatIdNumber(input: string): string {
  const digits = digitsOnly(input).slice(0, 13);
  const parts = [digits.slice(0, 6), digits.slice(6, 10), digits.slice(10, 13)].filter(Boolean);
  return parts.join(' ');
}

export interface IdValidationResult {
  valid: boolean;
  message?: string;
}

/** Validate SA ID structure + embedded birth date. Luhn check digit intentionally skipped. */
export function validateIdNumber(rawDigits: string): IdValidationResult {
  if (rawDigits.length !== 13) {
    return { valid: false, message: 'ID number must contain 13 digits.' };
  }
  if (!/^\d{13}$/.test(rawDigits)) {
    return { valid: false, message: 'ID number must contain only digits.' };
  }

  const yy = parseInt(rawDigits.substring(0, 2), 10);
  const mm = parseInt(rawDigits.substring(2, 4), 10);
  const dd = parseInt(rawDigits.substring(4, 6), 10);
  const year = yy < 50 ? 2000 + yy : 1900 + yy;
  const daysInMonth = new Date(year, mm, 0).getDate();

  if (mm < 1 || mm > 12 || dd < 1 || dd > daysInMonth) {
    return { valid: false, message: 'Birth date in the ID number is invalid.' };
  }

  const citizenshipDigit = rawDigits.charAt(10);
  if (citizenshipDigit !== '0' && citizenshipDigit !== '1') {
    return { valid: false, message: 'The ID number entered is not valid.' };
  }

  return { valid: true };
}

/** Normalize a pasted/typed SA phone number to the 9-digit national number (no +27/0 prefix). */
export function normalizePhoneNational(input: string): string {
  let digits = digitsOnly(input);
  if (digits.startsWith('27') && digits.length > 9) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length > 9) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 9);
}

/** Format a 9-digit SA national number for display: "82 123 4567". */
export function formatPhoneNational(nationalDigits: string): string {
  const d = nationalDigits.slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 9)].filter(Boolean);
  return parts.join(' ');
}

/** Store phones in E.164 format. */
export function toE164(nationalDigits: string): string {
  return `+27${nationalDigits}`;
}

export interface PhoneValidationResult {
  valid: boolean;
  message?: string;
}

export function validatePhoneNational(nationalDigits: string): PhoneValidationResult {
  if (nationalDigits.length !== 9) {
    return { valid: false, message: 'Phone number must contain 9 digits after the country code.' };
  }
  if (!/^[6-8]\d{8}$/.test(nationalDigits)) {
    return { valid: false, message: 'Please enter a valid South African phone number.' };
  }
  return { valid: true };
}

/** Format an integer as SA Rand currency for display while typing, e.g. "R 250,000". */
export function formatZAR(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '';
  return `R ${value.toLocaleString('en-ZA')}`;
}

/** Parse a formatted/partial currency string back to a positive integer (or undefined if empty). */
export function parseZARInput(input: string): number | undefined {
  const digits = input.replace(/[^\d]/g, '');
  if (!digits) return undefined;
  return parseInt(digits, 10);
}

/** Names: letters, spaces, apostrophes and hyphens only. */
export const NAME_PATTERN = /^[\p{L}][\p{L}'\- ]*$/u;

export function isValidName(value: string): boolean {
  return NAME_PATTERN.test(value.trim());
}

/** Strip stray punctuation/extra spaces from a pasted address fragment. */
export function normalizeAddressFragment(input: string): string {
  return input.replace(/[,;]+/g, ' ').replace(/\s+/g, ' ').trim();
}
