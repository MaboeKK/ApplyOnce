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
import { saveDraft, loadDraft, clearDraft } from '@/utils/draft-storage';

const steps = ['Personal', 'Address', 'Guardian', 'School', 'Results', 'Review'];
const WIZARD_DRAFT_KEY = 'applyonce_profile_wizard_draft';

interface WizardDraft {
  activeStep: number;
  profileData: any;
}

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
  const [hydrated, setHydrated] = useState(false);
  const [resumedFromDraft, setResumedFromDraft] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // Fetch existing profile data to allow resuming
    const fetchExistingProfile = async () => {
      try {
        const response = await api.get('/students/me');
        const student = response.data.student;

        // Pre-fill profile data if it exists
        if (student) {
          setProfileData({
            personal: {
              idNumber: student.idNumber || '',
              phone: student.phone || '',
              race: student.race || 'prefer_not_to_say',
              homeLanguage: student.homeLanguage || '',
              disability: student.disability || '',
            },
            address: student.address || {},
            guardian: student.guardian || {},
            school: {
              matricYear: student.matricYear || new Date().getFullYear(),
              school: student.school || '',
            },
            results: {
              subjects: student.subjectResults || [],
              aps: student.aps || null,
            },
          });

          // Determine which step to start on based on what's completed
          // If they have results, go to review; if they have school, go to results, etc.
          if (student.subjectResults && student.subjectResults.length > 0) {
            setActiveStep(5); // Review
          } else if (student.school) {
            setActiveStep(4); // Results
          } else if (student.guardian?.firstName) {
            setActiveStep(3); // School
          } else if (student.address?.street) {
            setActiveStep(2); // Guardian
          } else if (student.idNumber) {
            setActiveStep(1); // Address
          }
          // Otherwise start at step 0 (Personal)
        }
      } catch (err) {
        console.error('Failed to fetch existing profile:', err);
      } finally {
        // A local draft always reflects more recent in-browser progress than the server
        // (intermediate wizard steps aren't persisted server-side until final submit),
        // so it takes priority — this is what lets a refresh mid-wizard resume correctly.
        const draft = loadDraft<WizardDraft>(WIZARD_DRAFT_KEY);
        if (draft) {
          setProfileData(draft.profileData);
          setActiveStep(draft.activeStep);
          setResumedFromDraft(true);
        }
        setHydrated(true);
      }
    };

    fetchExistingProfile();
  }, [isAuthenticated, router]);

  // Auto-save wizard progress so a refresh or interrupted session resumes where the user left off.
  useEffect(() => {
    if (!hydrated) return;
    saveDraft<WizardDraft>(WIZARD_DRAFT_KEY, { activeStep, profileData });
  }, [hydrated, activeStep, profileData]);

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
        idNumber: profileData.personal.idNumber,
        dateOfBirth: profileData.personal.dateOfBirth, // Send as YYYY-MM-DD string, not Date object
        gender: profileData.personal.gender,
        firstName: profileData.personal.firstName || user?.firstName,
        lastName: profileData.personal.lastName || user?.lastName,
        phone: profileData.personal.phone,
        race: profileData.personal.race,
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

      clearDraft(WIZARD_DRAFT_KEY);

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
            applicantPhone={profileData.personal.phone}
            applicantEmail={user?.email}
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
            profileData={profileData}
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

        {resumedFromDraft && (
          <Alert severity="info" sx={{ mb: 3 }} onClose={() => setResumedFromDraft(false)}>
            We restored your progress from where you left off.
          </Alert>
        )}

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
