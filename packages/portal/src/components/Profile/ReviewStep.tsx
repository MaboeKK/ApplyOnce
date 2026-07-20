// packages/portal/src/components/Profile/ReviewStep.tsx
// Final review before submission

import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  Alert,
  Chip,
} from '@mui/material';
import { subjectLabel } from '@/utils/subject-labels';

interface Props {
  data: any;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  user: any;
}

export default function ReviewStep({ data, onBack, onSubmit, loading, user }: Props) {
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
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Check everything before submitting. You can edit any section later from your dashboard.
      </Typography>

      {data.results.aps && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Your APS is <strong>{data.results.aps}</strong>. This will be used to check which programmes you qualify for.
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Personal Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1">
              {user?.firstName} {user?.lastName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1">
              {data.personal.phone || '-'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Race
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {data.personal.race?.replace('_', ' ') || '-'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Nationality
            </Typography>
            <Typography variant="body1">
              {data.personal.nationality || '-'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Home Language
            </Typography>
            <Typography variant="body1">
              {data.personal.homeLanguage || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Disability
            </Typography>
            <Typography variant="body1">
              {data.personal.disability || 'None'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Address
        </Typography>
        <Typography variant="body1">
          {data.address.street}
          {data.address.suburb && `, ${data.address.suburb}`}
          <br />
          {data.address.city}, {provinceNames[data.address.province] || data.address.province}
          <br />
          {data.address.postalCode}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Guardian / Parent
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1">
              {data.guardian.firstName} {data.guardian.lastName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Relationship
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {data.guardian.relationship === 'other'
                ? data.guardian.otherRelationship
                : data.guardian.relationship?.replace('_', ' ')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1">
              {data.guardian.phone}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">
              {data.guardian.email || '-'}
            </Typography>
          </Grid>
          {typeof data.guardian.annualIncome === 'number' && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Annual Income
              </Typography>
              <Typography variant="body1">
                R{data.guardian.annualIncome.toLocaleString()}
              </Typography>
            </Grid>
          )}
        </Grid>
        {data.guardian.emergencyContact?.firstName && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Emergency Contact
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">
                  {data.guardian.emergencyContact.firstName} {data.guardian.emergencyContact.lastName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1">
                  {data.guardian.emergencyContact.phone || '-'}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Matric School
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              School
            </Typography>
            <Typography variant="body1">
              {data.school.school}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Year
            </Typography>
            <Typography variant="body1">
              {data.school.matricYear}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {data.results.subjects && data.results.subjects.length > 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Matric Results
          </Typography>
          <Typography variant="h5" color="success.main" sx={{ mb: 2 }}>
            APS: {data.results.aps}
          </Typography>
          <Grid container spacing={1}>
            {data.results.subjects.map((subject: any, index: number) => {
              const isLifeOrientation = subject.subject.toLowerCase().includes('life orientation') ||
                                       subject.subject.toLowerCase().includes('life_orientation');
              return (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">{subjectLabel(subject.subject)}</Typography>
                      {isLifeOrientation && (
                        <Chip label="Not Considered" size="small" color="default" sx={{ fontSize: '0.7rem', height: 20 }} />
                      )}
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {subject.mark}% (Level {subject.level})
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={onBack} size="large" disabled={loading}>
          Back
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          size="large"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Complete Profile'}
        </Button>
      </Box>
    </Box>
  );
}
