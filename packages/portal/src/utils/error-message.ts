// packages/portal/src/utils/error-message.ts
// Extracts a user-facing message from an API error response, handling both
// the { error: { message } } and { message } response shapes used across
// the API's error responses.

import { isAxiosError } from 'axios';

export function getErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const data = err.response?.data as { error?: { message?: string }; message?: string } | undefined;
    return data?.error?.message || data?.message || err.message || fallback;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}
