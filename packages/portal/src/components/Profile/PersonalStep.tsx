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
  Autocomplete,
  Alert,
} from '@mui/material';
import { useState, useEffect } from 'react';

// SA official languages
const SA_LANGUAGES = [
  'English',
  'Afrikaans',
  'isiZulu',
  'isiXhosa',
  'Sepedi (Northern Sotho)',
  'Sesotho (Southern Sotho)',
  'Setswana',
  'siSwati',
  'Tshivenda',
  'Xitsonga',
  'isiNdebele',
  'Other',
];

const personalSchema = z.object({
  idNumber: z
    .string()
    .length(13, 'SA ID number must be exactly 13 digits')
    .regex(/^\d{13}$/, 'ID number must contain only digits'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(), // Auto-extracted, display only
  gender: z.string().optional(), // Auto-extracted, display only
  phone: z.string().regex(/^\d{9}$/, 'Phone number must be exactly 9 digits'),
  race: z.enum(['african', 'coloured', 'indian', 'white', 'other', 'prefer_not_to_say']),
  homeLanguage: z.string().min(1, 'Home language is required'),
  disability: z.string().optional(),
});

type PersonalData = z.infer<typeof personalSchema>;

interface Props {
  data: Partial<PersonalData>;
  onNext: (data: PersonalData) => void;
  user: any;
}

// Parse SA ID number to extract DOB and gender
function parseSAIdNumber(idNumber: string): { dateOfBirth: string; gender: string } | null {
  if (idNumber.length !== 13 || !/^\d{13}$/.test(idNumber)) {
    return null;
  }

  const yy = parseInt(idNumber.substring(0, 2));
  const mm = parseInt(idNumber.substring(2, 4));
  const dd = parseInt(idNumber.substring(4, 6));
  const genderCode = parseInt(idNumber.substring(6, 10));

  // Determine century (assume < 50 = 2000s, >= 50 = 1900s)
  const year = yy < 50 ? 2000 + yy : 1900 + yy;

  // Format date
  const dateOfBirth = `${year}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;

  // Gender: 0-4999 = female, 5000-9999 = male
  const gender = genderCode < 5000 ? 'Female' : 'Male';

  return { dateOfBirth, gender };
}

export default function PersonalStep({ data, onNext, user }: Props) {
  const [extractedInfo, setExtractedInfo] = useState<{ dateOfBirth: string; gender: string } | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalData>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      idNumber: data.idNumber || '',
      firstName: user?.firstName || data.firstName || '',
      lastName: user?.lastName || data.lastName || '',
      phone: data.phone?.replace(/^\+27/, '') || '', // Remove +27 prefix if present
      race: data.race || 'prefer_not_to_say',
      homeLanguage: data.homeLanguage || '',
      disability: data.disability || '',
    },
  });

  const idNumber = watch('idNumber');

  // Auto-extract DOB and gender when ID number changes
  useEffect(() => {
    if (idNumber && idNumber.length === 13) {
      const info = parseSAIdNumber(idNumber);
      setExtractedInfo(info);
    } else {
      setExtractedInfo(null);
    }
  }, [idNumber]);

  const onSubmit = (formData: PersonalData) => {
    // Convert phone to +27 format for storage
    const phoneWithPrefix = `+27${formData.phone}`;
    onNext({
      ...formData,
      phone: phoneWithPrefix,
      dateOfBirth: extractedInfo?.dateOfBirth,
      gender: extractedInfo?.gender.toLowerCase(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your name is set from registration. Add your ID number and contact details below.
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
            name="idNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="SA ID Number"
                fullWidth
                placeholder="13-digit ID number"
                error={!!errors.idNumber}
                helperText={errors.idNumber?.message || 'Your date of birth and gender will be extracted automatically'}
              />
            )}
          />
        </Grid>

        {extractedInfo && (
          <Grid item xs={12}>
            <Alert severity="success">
              Date of Birth: <strong>{extractedInfo.dateOfBirth}</strong> • Gender: <strong>{extractedInfo.gender}</strong>
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                placeholder="821234567"
                error={!!errors.phone}
                helperText={errors.phone?.message || 'Enter 9 digits after +27 (e.g., 821234567)'}
                InputProps={{
                  startAdornment: <Box component="span" sx={{ mr: 1, color: 'text.secondary', fontWeight: 600 }}>+27</Box>,
                }}
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
            name="homeLanguage"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={SA_LANGUAGES}
                value={field.value || null}
                onChange={(_, newValue) => field.onChange(newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Home Language"
                    error={!!errors.homeLanguage}
                    helperText={errors.homeLanguage?.message}
                  />
                )}
                freeSolo
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
