// packages/portal/src/pages/register.tsx
// Student registration with email verification

import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  Link as MuiLink,
  Alert,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthLayout from '@/components/Layout/AuthLayout';
import { useAuthStore } from '@/store/auth';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

const verifySchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

type VerifyForm = z.infer<typeof verifySchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, verifyEmail, error, clearError } = useAuthStore();

  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [devVerificationCode, setDevVerificationCode] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register: registerVerify,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors, isSubmitting: isVerifying },
  } = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
  });

  const onRegisterSubmit = async (data: RegisterForm) => {
    clearError();
    try {
      const result = await registerUser(data);
      setRegisteredEmail(data.email);

      // In dev mode, show the verification code on screen
      if (result.verificationCode) {
        setDevVerificationCode(result.verificationCode);
      }

      setStep('verify');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const onVerifySubmit = async (data: VerifyForm) => {
    clearError();
    try {
      await verifyEmail(registeredEmail, data.code);
      router.push('/login?verified=true');
    } catch (err) {
      console.error('Verification error:', err);
    }
  };

  if (step === 'verify') {
    return (
      <AuthLayout
        title="Verify Your Email"
        subtitle={`We sent a verification code to ${registeredEmail}`}
      >
        {devVerificationCode && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight={600}>
              DEV MODE: Your verification code is: {devVerificationCode}
            </Typography>
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleVerifySubmit(onVerifySubmit)}>
          <TextField
            fullWidth
            label="Verification Code"
            {...registerVerify('code')}
            error={!!verifyErrors.code}
            helperText={verifyErrors.code?.message}
            autoFocus
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Didn&apos;t receive the code?{' '}
              <MuiLink href="#" underline="hover">
                Resend
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Create Your Account" subtitle="Start applying to universities today">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onRegisterSubmit)}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            autoFocus
          />
          <TextField
            fullWidth
            label="Last Name"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Box>

        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth variant="contained" size="large" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link href="/login" passHref legacyBehavior>
              <MuiLink underline="hover" sx={{ fontWeight: 600 }}>
                Log In
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
}
