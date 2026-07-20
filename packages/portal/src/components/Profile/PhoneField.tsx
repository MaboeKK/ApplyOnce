// packages/portal/src/components/Profile/PhoneField.tsx
// Standard SA phone number input, reused wherever a phone number is captured
// (UX Improvement Rules §2.2). Fixed "+27" prefix, auto-spaced national number,
// numeric-only input, paste normalization (strips leading 0 / +27).

import { TextField, Box } from '@mui/material';
import { normalizePhoneNational, formatPhoneNational } from '@/utils/formatters';

interface PhoneFieldProps {
  /** 9-digit national number, no +27/0 prefix. */
  value: string;
  onChange: (nationalDigits: string) => void;
  onBlur?: () => void;
  label: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  autoComplete?: string;
}

export default function PhoneField({
  value,
  onChange,
  onBlur,
  label,
  required,
  error,
  helperText,
  autoComplete = 'tel-national',
}: PhoneFieldProps) {
  return (
    <TextField
      label={label}
      required={required}
      fullWidth
      value={formatPhoneNational(value)}
      onChange={(e) => onChange(normalizePhoneNational(e.target.value))}
      onPaste={(e) => {
        const pasted = e.clipboardData.getData('text');
        if (pasted) {
          e.preventDefault();
          onChange(normalizePhoneNational(pasted));
        }
      }}
      onBlur={onBlur}
      placeholder="82 123 4567"
      error={error}
      helperText={helperText || ' '}
      autoComplete={autoComplete}
      inputProps={{ inputMode: 'numeric' }}
      InputProps={{
        startAdornment: (
          <Box component="span" sx={{ mr: 1, color: 'text.secondary', fontWeight: 600 }}>
            +27
          </Box>
        ),
      }}
    />
  );
}
