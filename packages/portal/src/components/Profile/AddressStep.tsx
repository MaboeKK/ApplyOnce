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
  postalCode: z.string().regex(/^\d{4}$/, 'Postal code must be 4 digits'),
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
    formState: { errors },
  } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: data.street || '',
      suburb: data.suburb || '',
      city: data.city || '',
      province: data.province || 'gauteng',
      postalCode: data.postalCode || '',
    },
  });

  const onSubmit = (formData: AddressData) => {
    onNext(formData);
  };

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
                fullWidth
                error={!!errors.street}
                helperText={errors.street?.message}
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
                label="Suburb / Township (optional)"
                fullWidth
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
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
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
                fullWidth
                error={!!errors.province}
                helperText={errors.province?.message}
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
                label="Postal Code"
                fullWidth
                placeholder="0001"
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={onBack} size="large">
          Back
        </Button>
        <Button type="submit" variant="contained" size="large">
          Next
        </Button>
      </Box>
    </Box>
  );
}
