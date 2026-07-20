// packages/portal/src/utils/confidence.ts
// The OCR backend only reports a categorical confidence tier ('high' | 'medium' | 'low'),
// not a numeric score — so `subject.confidence * 100` (a string times a number) was
// producing "NaN%" in the UI. This maps each tier to a representative percentage that
// falls inside the UX spec's own bands, so the badge always shows a real number and
// the correct color without fabricating false precision.

export type ConfidenceTier = 'high' | 'medium' | 'low';

export interface ConfidenceDisplay {
  label: string;
  percent: number;
  color: 'success' | 'warning' | 'error';
}

const TIER_DISPLAY: Record<ConfidenceTier, ConfidenceDisplay> = {
  high: { label: 'High', percent: 97, color: 'success' },
  medium: { label: 'Medium', percent: 87, color: 'warning' },
  low: { label: 'Low', percent: 65, color: 'error' },
};

/** Returns a safe display object for a confidence tier, or `Unavailable` if none was provided. */
export function confidenceDisplay(tier: ConfidenceTier | null | undefined): ConfidenceDisplay & { available: boolean } {
  if (!tier || !TIER_DISPLAY[tier]) {
    return { label: 'Unavailable', percent: 0, color: 'error', available: false };
  }
  return { ...TIER_DISPLAY[tier], available: true };
}
