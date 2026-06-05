// packages/portal/src/pages/profile/setup.tsx
// Profile setup wizard (6 steps)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useAuthStore } from '@/store/auth';
import PersonalStep from '@/components/Profile/PersonalStep';
import AddressStep from '@/components/Profile/AddressStep';
import GuardianStep from '@/components/Profile/GuardianStep';
import SchoolStep from '@/components/Profile/SchoolStep';
import ResultsStep from '@/components/Profile/ResultsStep';
import ReviewStep from '@/components/Profile/ReviewStep';
import api from '@/config/api';

const steps = ['Personal', 'Address', 'Guardian', 'School', 'Results', 'Review'];

export default function ProfileSetup() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState<any>({
    personal: {},
    address: {},
    guardian: {},
    school: {},
    results: { subjects: [], aps: null },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  const handleNext = (stepData: any) => {
    const stepKeys = ['personal', 'address', 'guardian', 'school', 'results', 'review'];
    const currentKey = stepKeys[activeStep];

    setProfileData((prev: any) => ({
      ...prev,
      [currentKey]: stepData,
    }));

    setActiveStep((prev) => prev + 1);
    setError('');
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Clean data: convert empty strings to undefined for optional fields
      const cleanData = (obj: any): any => {
        if (!obj || typeof obj !== 'object') return obj;
        const cleaned: any = {};
        for (const [key, value] of Object.entries(obj)) {
          if (value === '') {
            // Omit empty strings (let optional fields be undefined)
            continue;
          } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            cleaned[key] = cleanData(value);
          } else {
            cleaned[key] = value;
          }
        }
        return cleaned;
      };

      const profilePayload = cleanData({
        firstName: profileData.personal.firstName || user?.firstName,
        lastName: profileData.personal.lastName || user?.lastName,
        phone: profileData.personal.phone,
        race: profileData.personal.race,
        nationality: profileData.personal.nationality,
        homeLanguage: profileData.personal.homeLanguage,
        disability: profileData.personal.disability,
        address: profileData.address,
        guardian: profileData.guardian,
        matricYear: profileData.school.matricYear,
        school: profileData.school.school,
      });

      // Update profile
      await api.put('/students/me', profilePayload);

      // Update subjects if uploaded
      if (profileData.results.subjects && profileData.results.subjects.length > 0) {
        await api.put('/students/me/subjects', {
          results: profileData.results.subjects,
        });
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      // Extract validation details if available
      const errorData = err.response?.data?.error;
      let message = errorData?.message || 'Failed to save profile';

      // Append validation details if present
      if (errorData?.details && Array.isArray(errorData.details)) {
        const fieldErrors = errorData.details
          .map((d: any) => `${d.path}: ${d.message}`)
          .join(', ');
        message = `${message} — ${fieldErrors}`;
      }

      setError(message);
      console.error('Profile save error:', errorData);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalStep
            data={profileData.personal}
            onNext={handleNext}
            user={user}
          />
        );
      case 1:
        return (
          <AddressStep
            data={profileData.address}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <GuardianStep
            data={profileData.guardian}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SchoolStep
            data={profileData.school}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ResultsStep
            data={profileData.results}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <ReviewStep
            data={profileData}
            onBack={handleBack}
            onSubmit={handleSubmit}
            loading={loading}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Complete Your Profile
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {renderStepContent()}
      </Paper>
    </Container>
  );
}
