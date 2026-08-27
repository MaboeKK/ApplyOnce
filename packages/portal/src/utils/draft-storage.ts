// packages/portal/src/utils/draft-storage.ts
// Minimal localStorage-backed draft persistence (UX Improvement Rules §1.5 —
// resume where the user left off after a refresh or interrupted session).

export function saveDraft<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full/unavailable — auto-save is a nicety, not a hard requirement.
  }
}

/**
 * Loads a draft, optionally checked against `isValid` before being trusted
 * as `T` — without it, a stale draft from a previous app version (different
 * shape) or a hand-edited localStorage value would be cast blindly.
 */
export function loadDraft<T>(key: string, isValid?: (value: unknown) => value is T): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (isValid && !isValid(parsed)) return null;
    return parsed as T;
  } catch {
    return null;
  }
}

export function clearDraft(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}
