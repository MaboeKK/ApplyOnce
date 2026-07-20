// packages/portal/src/components/Profile/AddressStep.tsx
// Address information step

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { titleCase, normalizeAddressFragment, digitsOnly } from '@/utils/formatters';

const provinceNames: Record<string, string> = {
  gauteng: 'Gauteng',
  western_cape: 'Western Cape',
  kwazulu_natal: 'KwaZulu-Natal',
  eastern_cape: 'Eastern Cape',
  limpopo: 'Limpopo',
  mpumalanga: 'Mpumalanga',
  north_west: 'North West',
  free_state: 'Free State',
  northern_cape: 'Northern Cape',
};

const provinceLookup: Record<string, string> = Object.fromEntries(
  Object.entries(provinceNames).map(([value, label]) => [label.toLowerCase(), value])
);

const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  suburb: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  province: z.enum([
    'gauteng',
    'western_cape',
    'kwazulu_natal',
    'eastern_cape',
    'limpopo',
    'mpumalanga',
    'north_west',
    'free_state',
    'northern_cape',
  ]),
  postalCode: z.string().regex(/^\d{4}$/, 'Postal code must contain exactly 4 digits.'),
});

type AddressData = z.infer<typeof addressSchema>;

interface Props {
  data: Partial<AddressData>;
  onNext: (data: AddressData) => void;
  onBack: () => void;
}

export default function AddressStep({ data, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      street: data.street || '',
      suburb: data.suburb || '',
      city: data.city || '',
      province: data.province || 'gauteng',
      postalCode: data.postalCode || '',
    },
  });

  const values = watch();
  const canProceed = addressSchema.safeParse(values).success;

  const onSubmit = (formData: AddressData) => {
    onNext(formData);
  };

  // Best-effort parse of a full pasted address ("22 Voortrekker Rd, Alberton, Johannesburg, Gauteng, 1449")
  // into the individual fields. No geocoding — purely splits on commas / detects a postal code and province name.
  const handleStreetPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text');
    if (!pasted || !pasted.includes(',')) return; // Plain street line — let default paste behaviour handle it

    e.preventDefault();
    const parts = pasted.split(',').map((p) => normalizeAddressFragment(p)).filter(Boolean);

    const postalMatch = pasted.match(/\b\d{4}\b/);
    if (postalMatch) {
      setValue('postalCode', postalMatch[0], { shouldValidate: true });
    }

    const provinceKey = parts
      .map((p) => provinceLookup[p.toLowerCase()])
      .find((match) => !!match);
    if (provinceKey) {
      setValue('province', provinceKey as AddressData['province'], { shouldValidate: true });
    }

    // Remaining non-postal, non-province fragments map to street / suburb / city in order
    const remaining = parts.filter(
      (p) => p !== postalMatch?.[0] && !provinceLookup[p.toLowerCase()]
    );
    if (remaining[0]) setValue('street', titleCase(remaining[0]), { shouldValidate: true });
    if (remaining[1]) setValue('suburb', titleCase(remaining[1]));
    if (remaining[2]) setValue('city', titleCase(remaining[2]), { shouldValidate: true });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Residential Address
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your current residential address.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street Address"
                required
                fullWidth
                placeholder="e.g. 22 Voortrekker Road"
                autoComplete="address-line1"
                onPaste={handleStreetPaste}
                onBlur={() => {
                  field.onBlur();
                  setValue('street', titleCase(field.value), { shouldValidate: true });
                }}
                error={!!errors.street}
                helperText={errors.street?.message || ' '}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="suburb"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Suburb / Township"
                fullWidth
                placeholder="e.g. Alberton"
                autoComplete="address-line2"
                onBlur={() => {
                  field.onBlur();
                  if (field.value) setValue('suburb', titleCase(field.value));
                }}
                helperText="Optional"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City / Town"
                required
                fullWidth
                placeholder="e.g. Johannesburg"
                autoComplete="address-level2"
                onBlur={() => {
                  field.onBlur();
                  setValue('city', titleCase(field.value), { shouldValidate: true });
                }}
                error={!!errors.city}
                helperText={errors.city?.message || ' '}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Province"
                select
                required
                fullWidth
                autoComplete="address-level1"
                error={!!errors.province}
                helperText={errors.province?.message || ' '}
              >
                {Object.entries(provinceNames).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="postalCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => field.onChange(digitsOnly(e.target.value).slice(0, 4))}
                label="Postal Code"
                required
                fullWidth
                placeholder="0001"
                autoComplete="postal-code"
                inputProps={{ inputMode: 'numeric' }}
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message || ' '}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={onBack} size="large" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
        <Button type="submit" variant="contained" size="large" endIcon={<ArrowForwardIcon />} disabled={!canProceed}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
