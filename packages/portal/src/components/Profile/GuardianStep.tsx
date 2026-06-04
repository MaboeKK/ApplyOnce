// packages/portal/src/components/Profile/GuardianStep.tsx
// Guardian/parent information step

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
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useState } from 'react';

const guardianSchema = z.object({
  firstName: z.string().min(1, 'Guardian first name is required'),
  lastName: z.string().min(1, 'Guardian last name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().regex(/^(\+27|0)[6-8]\d{8}$/, 'Invalid SA phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  employed: z.boolean(),
  annualIncome: z.number().int().positive().optional(),
});

type GuardianData = z.infer<typeof guardianSchema>;

interface Props {
  data: Partial<GuardianData>;
  onNext: (data: GuardianData) => void;
  onBack: () => void;
}

export default function GuardianStep({ data, onNext, onBack }: Props) {
  const [employed, setEmployed] = useState(data.employed ?? false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GuardianData>({
    resolver: zodResolver(guardianSchema),
    defaultValues: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      relationship: data.relationship || 'parent',
      phone: data.phone || '',
      email: data.email || '',
      employed: data.employed ?? false,
      annualIncome: data.annualIncome,
    },
  });

  const onSubmit = (formData: GuardianData) => {
    onNext(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Guardian / Parent Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Details for your parent or legal guardian.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Guardian First Name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
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
                label="Guardian Last Name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="relationship"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Relationship"
                select
                fullWidth
                error={!!errors.relationship}
                helperText={errors.relationship?.message}
              >
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="grandparent">Grandparent</MenuItem>
                <MenuItem value="sibling">Sibling</MenuItem>
                <MenuItem value="aunt_uncle">Aunt / Uncle</MenuItem>
                <MenuItem value="legal_guardian">Legal Guardian</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Guardian Phone"
                fullWidth
                placeholder="0821234567"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Guardian Email (optional)"
                fullWidth
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="employed"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      setEmployed(e.target.checked);
                    }}
                  />
                }
                label="Guardian is employed"
              />
            )}
          />
        </Grid>

        {employed && (
          <Grid item xs={12} sm={6}>
            <Controller
              name="annualIncome"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Annual Income (ZAR, optional)"
                  fullWidth
                  type="number"
                  placeholder="350000"
                  helperText="Used for bursary eligibility"
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                />
              )}
            />
          </Grid>
        )}
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
