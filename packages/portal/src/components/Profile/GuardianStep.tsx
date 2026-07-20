// packages/portal/src/components/Profile/GuardianStep.tsx
// Guardian/parent information step

import { useEffect, useMemo } from 'react';
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
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneField from './PhoneField';
import {
  titleCase,
  isValidName,
  validatePhoneNational,
  toE164,
  formatZAR,
  parseZARInput,
} from '@/utils/formatters';

const RELATIONSHIPS: Record<string, string> = {
  parent: 'Parent',
  legal_guardian: 'Legal Guardian',
  grandparent: 'Grandparent',
  aunt: 'Aunt',
  uncle: 'Uncle',
  sibling: 'Sibling',
  foster_parent: 'Foster Parent',
  other: 'Other',
};

const INCOME_SANITY_LIMIT = 100_000_000;

const nameField = (label: string) =>
  z
    .string()
    .min(1, `${label} is required`)
    .refine(isValidName, `${label} may only contain letters, spaces, apostrophes and hyphens.`);

interface Props {
  data: Partial<any>;
  onNext: (data: any) => void;
  onBack: () => void;
  applicantPhone?: string; // E.164, from PersonalStep
  applicantEmail?: string;
}

export default function GuardianStep({ data, onNext, onBack, applicantPhone, applicantEmail }: Props) {
  const applicantPhoneNational = (applicantPhone || '').replace(/^\+27/, '');

  const guardianSchema = useMemo(
    () =>
      z
        .object({
          firstName: nameField('Guardian first name'),
          lastName: nameField('Guardian last name'),
          relationship: z.string().min(1, 'Relationship is required'),
          otherRelationship: z.string().optional(),
          phone: z.string().superRefine((val, ctx) => {
            const result = validatePhoneNational(val);
            if (!result.valid) {
              ctx.addIssue({ code: z.ZodIssueCode.custom, message: result.message });
              return;
            }
            if (applicantPhoneNational && val === applicantPhoneNational) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Guardian phone number must be different from the applicant's phone number.",
              });
            }
          }),
          email: z
            .string()
            .optional()
            .or(z.literal(''))
            .superRefine((val, ctx) => {
              if (!val) return;
              if (!z.string().email().safeParse(val).success) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid email' });
                return;
              }
              if (applicantEmail && val.toLowerCase() === applicantEmail.toLowerCase()) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "Guardian email must be different from the applicant's email.",
                });
              }
            }),
          annualIncome: z.number().int().min(0, 'Annual income cannot be negative').optional(),
          emergencyContactSameAsGuardian: z.boolean().optional(),
          emergencyContact: z
            .object({
              firstName: z.string().optional(),
              lastName: z.string().optional(),
              phone: z.string().optional(),
              relationship: z.string().optional(),
            })
            .optional()
            .superRefine((val, ctx) => {
              if (val?.phone) {
                const result = validatePhoneNational(val.phone);
                if (!result.valid) {
                  ctx.addIssue({ code: z.ZodIssueCode.custom, message: result.message, path: ['phone'] });
                }
              }
            }),
        })
        .superRefine((val, ctx) => {
          if (val.relationship === 'other' && !val.otherRelationship?.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Please specify the relationship.',
              path: ['otherRelationship'],
            });
          }
        }),
    [applicantPhoneNational, applicantEmail]
  );

  type GuardianData = z.infer<typeof guardianSchema>;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GuardianData>({
    resolver: zodResolver(guardianSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      relationship: data.relationship || 'parent',
      otherRelationship: data.otherRelationship || '',
      phone: data.phone?.replace(/^\+27/, '') || '',
      email: data.email || '',
      annualIncome: data.annualIncome,
      emergencyContactSameAsGuardian: data.emergencyContactSameAsGuardian || false,
      emergencyContact: {
        firstName: data.emergencyContact?.firstName || '',
        lastName: data.emergencyContact?.lastName || '',
        phone: data.emergencyContact?.phone?.replace(/^\+27/, '') || '',
        relationship: data.emergencyContact?.relationship || '',
      },
    },
  });

  const values = watch();
  const canProceed = guardianSchema.safeParse(values).success;
  const relationship = watch('relationship');
  const annualIncome = watch('annualIncome');
  const sameAsGuardian = watch('emergencyContactSameAsGuardian');

  // Keep emergency contact in sync with guardian details while the reuse checkbox is ticked (still editable).
  useEffect(() => {
    if (!sameAsGuardian) return;
    setValue('emergencyContact.firstName', values.firstName);
    setValue('emergencyContact.lastName', values.lastName);
    setValue('emergencyContact.phone', values.phone);
    setValue(
      'emergencyContact.relationship',
      values.relationship === 'other' ? values.otherRelationship || '' : RELATIONSHIPS[values.relationship] || ''
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sameAsGuardian, values.firstName, values.lastName, values.phone, values.relationship, values.otherRelationship]);

  const onSubmit = (formData: GuardianData) => {
    onNext({
      ...formData,
      phone: toE164(formData.phone),
      emergencyContact: formData.emergencyContactSameAsGuardian || formData.emergencyContact?.firstName
        ? {
            ...formData.emergencyContact,
            phone: formData.emergencyContact?.phone ? toE164(formData.emergencyContact.phone) : undefined,
          }
        : undefined,
    });
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
                required
                fullWidth
                onBlur={() => {
                  field.onBlur();
                  setValue('firstName', titleCase(field.value), { shouldValidate: true });
                }}
                error={!!errors.firstName}
                helperText={errors.firstName?.message || ' '}
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
                required
                fullWidth
                onBlur={() => {
                  field.onBlur();
                  setValue('lastName', titleCase(field.value), { shouldValidate: true });
                }}
                error={!!errors.lastName}
                helperText={errors.lastName?.message || ' '}
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
                required
                fullWidth
                error={!!errors.relationship}
                helperText={errors.relationship?.message || ' '}
              >
                {Object.entries(RELATIONSHIPS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {relationship === 'other' && (
          <Grid item xs={12} sm={6}>
            <Controller
              name="otherRelationship"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Specify Relationship"
                  required
                  fullWidth
                  error={!!errors.otherRelationship}
                  helperText={errors.otherRelationship?.message || ' '}
                />
              )}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label="Guardian Phone"
                required
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Guardian Email"
                fullWidth
                type="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message || 'Optional'}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="annualIncome"
            control={control}
            render={({ field }) => (
              <TextField
                value={formatZAR(field.value)}
                onChange={(e) => field.onChange(parseZARInput(e.target.value))}
                onBlur={field.onBlur}
                label="Annual Income"
                fullWidth
                placeholder="R 250,000"
                inputProps={{ inputMode: 'numeric' }}
                error={!!errors.annualIncome}
                helperText={
                  errors.annualIncome?.message ||
                  'Used only to determine bursary eligibility. This information is optional and will be kept confidential.'
                }
              />
            )}
          />
          {typeof annualIncome === 'number' && annualIncome > INCOME_SANITY_LIMIT && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              That annual income looks unusually high — please double-check for a typo.
            </Alert>
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, mb: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!sameAsGuardian}
              onChange={(e) => setValue('emergencyContactSameAsGuardian', e.target.checked)}
            />
          }
          label="Use my parent/guardian as my emergency contact"
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Emergency Contact
        <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          Optional
        </Typography>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="emergencyContact.firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Emergency Contact First Name"
                fullWidth
                onBlur={() => {
                  field.onBlur();
                  if (field.value) setValue('emergencyContact.firstName', titleCase(field.value));
                }}
                helperText="Optional"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="emergencyContact.lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Emergency Contact Last Name"
                fullWidth
                onBlur={() => {
                  field.onBlur();
                  if (field.value) setValue('emergencyContact.lastName', titleCase(field.value));
                }}
                helperText="Optional"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="emergencyContact.phone"
            control={control}
            render={({ field }) => (
              <PhoneField
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label="Emergency Contact Phone"
                error={!!errors.emergencyContact?.phone}
                helperText={errors.emergencyContact?.phone?.message || 'Optional'}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="emergencyContact.relationship"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Emergency Contact Relationship" fullWidth helperText="Optional" />
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
