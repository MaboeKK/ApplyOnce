// packages/portal/src/components/Profile/SchoolStep.tsx
// School and matric year information

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from '@mui/material';

const currentYear = new Date().getFullYear();

const schoolSchema = z.object({
  matricYear: z.number().int().min(2000).max(currentYear, `Cannot be later than ${currentYear}`),
  school: z.string().min(1, 'School name is required'),
});

type SchoolData = z.infer<typeof schoolSchema>;

interface Props {
  data: Partial<SchoolData>;
  onNext: (data: SchoolData) => void;
  onBack: () => void;
}

export default function SchoolStep({ data, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      matricYear: data.matricYear || currentYear,
      school: data.school || '',
    },
  });

  const onSubmit = (formData: SchoolData) => {
    onNext(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Matric School
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Where did you complete your matric (NSC)?
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="matricYear"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Matric Year"
                fullWidth
                type="number"
                error={!!errors.matricYear}
                helperText={errors.matricYear?.message}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="school"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="School Name"
                fullWidth
                placeholder="e.g. Pretoria High School for Girls"
                error={!!errors.school}
                helperText={errors.school?.message}
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
          Next: Upload Results
        </Button>
      </Box>
    </Box>
  );
}
