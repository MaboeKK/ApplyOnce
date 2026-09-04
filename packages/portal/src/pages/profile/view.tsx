// packages/portal/src/pages/profile/view.tsx
// Read-only summary of the student's profile - linked from the dashboard's
// Profile card so a student can check their details without entering the
// edit wizard.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import PortalNav from '@/components/Layout/PortalNav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import api from '@/config/api';
import { formatIdNumber, formatPhoneNational, formatZAR } from '@/utils/formatters';
import { subjectLabel } from '@/utils/subject-labels';
import { getErrorMessage } from '@/utils/error-message';
import type { StudentProfile } from '@/types';

const PROVINCE_NAMES: Record<string, string> = {
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

// The shared Guardian type is missing fields the API actually stores
// (otherRelationship, emergencyContact) - this reflects the real shape
// validated by packages/api/src/schemas/student.ts.
interface GuardianData {
  firstName: string;
  lastName: string;
  relationship: string;
  otherRelationship?: string;
  phone: string;
  email?: string;
  annualIncome?: number;
  emergencyContact?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

function readablePhone(phone?: string | null): string {
  if (!phone) return '-';
  return phone.startsWith('+27') ? formatPhoneNational(phone.slice(3)) : phone;
}

function capitalizeWords(value?: string | null): string {
  if (!value) return '-';
  return value
    .replace(/_/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value ?? '-'}</Typography>
  </Grid>
);

function AddressSection({ address }: { address: StudentProfile['address'] }) {
  if (!address) {
    return (
      <Typography variant="body2" color="text.secondary">
        No address on file.
      </Typography>
    );
  }
  return (
    <Typography variant="body1">
      {address.street}
      {address.suburb && `, ${address.suburb}`}
      <br />
      {address.city}, {PROVINCE_NAMES[address.province] || address.province}
      <br />
      {address.postalCode}
    </Typography>
  );
}

function GuardianSection({ guardian }: { guardian: GuardianData | null }) {
  if (!guardian) {
    return (
      <Typography variant="body2" color="text.secondary">
        No guardian details on file.
      </Typography>
    );
  }
  return (
    <>
      <Grid container spacing={2}>
        <Field label="Name" value={`${guardian.firstName} ${guardian.lastName}`} />
        <Field
          label="Relationship"
          value={capitalizeWords(
            guardian.relationship === 'other' ? guardian.otherRelationship : guardian.relationship
          )}
        />
        <Field label="Phone" value={readablePhone(guardian.phone)} />
        <Field label="Email" value={guardian.email || '-'} />
        {typeof guardian.annualIncome === 'number' && (
          <Field label="Annual income" value={formatZAR(guardian.annualIncome)} />
        )}
      </Grid>
      {guardian.emergencyContact?.firstName && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Emergency contact
          </Typography>
          <Grid container spacing={2}>
            <Field
              label="Name"
              value={`${guardian.emergencyContact.firstName} ${guardian.emergencyContact.lastName || ''}`}
            />
            <Field label="Phone" value={readablePhone(guardian.emergencyContact.phone)} />
          </Grid>
        </>
      )}
    </>
  );
}

function ResultsSection({ profile }: { profile: StudentProfile }) {
  if (!profile.subjectResults || profile.subjectResults.length === 0) return null;
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Matric results
      </Typography>
      {profile.aps && (
        <Typography variant="h5" color="success.main" sx={{ mb: 2 }}>
          APS: {profile.aps}
        </Typography>
      )}
      <Grid container spacing={1}>
        {profile.subjectResults.map((result) => (
          <Grid item xs={12} sm={6} key={result.id}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">{subjectLabel(result.subject)}</Typography>
              <Typography variant="body2" fontWeight={600}>
                {result.mark}% (Level {result.level})
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default function ViewProfilePage() {
  return (
    <ProtectedRoute>
      <ViewProfileContent />
    </ProtectedRoute>
  );
}

function ViewProfileContent() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    api
      .get('/students/me')
      .then((res) => {
        if (!cancelled) setProfile(res.data.student);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, 'Failed to load your profile'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <>
        <PortalNav />
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (error || !profile) {
    return (
      <>
        <PortalNav />
        <Container sx={{ py: 8 }}>
          <Alert severity="error">{error || 'Profile not found.'}</Alert>
        </Container>
      </>
    );
  }

  const guardian = profile.guardian as GuardianData | null;

  return (
    <>
      <PortalNav />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Your profile</Typography>
          <Button variant="contained" onClick={() => router.push('/profile/setup')}>
            Edit profile
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Personal information
          </Typography>
          <Grid container spacing={2}>
            <Field label="Name" value={`${profile.firstName} ${profile.lastName}`} />
            <Field label="Email" value={profile.email} />
            <Field label="Phone" value={readablePhone(profile.phone)} />
            <Field
              label="ID number"
              value={profile.idNumber ? formatIdNumber(profile.idNumber) : '-'}
            />
            <Field
              label="Date of birth"
              value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : '-'}
            />
            <Field label="Gender" value={capitalizeWords(profile.gender)} />
            <Field label="Race" value={capitalizeWords(profile.race)} />
            <Field label="Nationality" value={profile.nationality || '-'} />
            <Field label="Home language" value={profile.homeLanguage || '-'} />
            <Field label="Disability" value={profile.disability || 'None'} />
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Address
          </Typography>
          <AddressSection address={profile.address} />
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Guardian / parent
          </Typography>
          <GuardianSection guardian={guardian} />
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Matric school
          </Typography>
          <Grid container spacing={2}>
            <Field label="School" value={profile.school || '-'} />
            <Field label="Year" value={profile.matricYear || '-'} />
          </Grid>
        </Paper>

        <ResultsSection profile={profile} />

        <Button variant="outlined" onClick={() => router.push('/dashboard')}>
          Back to dashboard
        </Button>
      </Container>
    </>
  );
}
