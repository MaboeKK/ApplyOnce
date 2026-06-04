// packages/portal/src/components/Profile/PersonalStep.tsx
// Personal information step

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

const personalSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().regex(/^(\+27|0)[6-8]\d{8}$/, 'Invalid SA phone number'),
  race: z.enum(['african', 'coloured', 'indian', 'white', 'other', 'prefer_not_to_say']),
  nationality: z.string().min(1, 'Nationality is required'),
  homeLanguage: z.string().min(1, 'Home language is required'),
  disability: z.string().optional(),
});

type PersonalData = z.infer<typeof personalSchema>;

interface Props {
  data: Partial<PersonalData>;
  onNext: (data: PersonalData) => void;
  user: any;
}

export default function PersonalStep({ data, onNext, user }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      firstName: user?.firstName || data.firstName || '',
      lastName: user?.lastName || data.lastName || '',
      phone: data.phone || '',
      race: data.race || 'prefer_not_to_say',
      nationality: data.nationality || 'South African',
      homeLanguage: data.homeLanguage || '',
      disability: data.disability || '',
    },
  });

  const onSubmit = (formData: PersonalData) => {
    onNext(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your name is set from registration. Update your contact details below.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                fullWidth
                disabled
                helperText="Set during registration"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                fullWidth
                disabled
                helperText="Set during registration"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                placeholder="0821234567"
                error={!!errors.phone}
                helperText={errors.phone?.message || 'Format: 0821234567 or +27821234567'}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="race"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Race"
                select
                fullWidth
                error={!!errors.race}
                helperText={errors.race?.message || 'For statistical reporting only'}
              >
                <MenuItem value="african">African</MenuItem>
                <MenuItem value="coloured">Coloured</MenuItem>
                <MenuItem value="indian">Indian</MenuItem>
                <MenuItem value="white">White</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nationality"
                fullWidth
                error={!!errors.nationality}
                helperText={errors.nationality?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="homeLanguage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Home Language"
                fullWidth
                error={!!errors.homeLanguage}
                helperText={errors.homeLanguage?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="disability"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Disability (if any)"
                fullWidth
                multiline
                rows={2}
                placeholder="Leave blank if not applicable"
                helperText="Universities provide reasonable accommodation"
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button type="submit" variant="contained" size="large">
          Next
        </Button>
      </Box>
    </Box>
  );
}
