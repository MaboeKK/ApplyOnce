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

export function loadDraft<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
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
