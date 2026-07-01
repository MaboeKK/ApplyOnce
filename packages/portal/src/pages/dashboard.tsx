// packages/portal/src/pages/dashboard.tsx
// Student dashboard

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Alert,
  Divider,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';

// Helper to render application status with appropriate color and icon
function getStatusConfig(status: string) {
  switch (status) {
    case 'draft':
      return { color: 'default' as const, label: 'Draft', icon: <HourglassEmptyIcon fontSize="small" /> };
    case 'submitted':
      return { color: 'info' as const, label: 'Submitted', icon: <HourglassEmptyIcon fontSize="small" /> };
    case 'accepted':
      return { color: 'success' as const, label: 'Accepted', icon: <CheckCircleIcon fontSize="small" /> };
    case 'rejected':
      return { color: 'error' as const, label: 'Rejected', icon: <CancelIcon fontSize="small" /> };
    case 'submission_failed':
      return { color: 'error' as const, label: 'Submission Failed', icon: <ErrorIcon fontSize="small" /> };
    default:
      return { color: 'default' as const, label: status, icon: null };
  }
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    fetchProfile();
  }, [isAuthenticated, router]);

  const fetchProfile = async () => {
    try {
      const [profileRes, appsRes] = await Promise.all([
        api.get('/students/me'),
        api.get('/applications'),
      ]);
      setProfile(profileRes.data.student);
      setApplications(appsRes.data.applications || []);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!isAuthenticated || loading) {
    return null;
  }

  const hasCompletedProfile = profile?.school && profile?.matricYear;
  const hasMatricCert = profile?.documents?.some((d: any) => d.type === 'matric_certificate');
  const hasIdDoc = profile?.documents?.some((d: any) => d.type === 'id_document');
  const hasAPS = profile?.subjectResults?.length > 0;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.firstName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your ApplyOnce dashboard
          </Typography>
        </Box>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {!hasCompletedProfile && (
        <Alert severity="info" sx={{ mb: 4 }}>
          Complete your profile and upload your documents to start applying to universities.
        </Alert>
      )}

      {hasAPS && (
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.main' }}>
          <Typography variant="h5" color="success.dark">
            Your APS: <strong>{profile.aps || 'Calculating...'}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Admission Point Score (best 6 subjects)
          </Typography>
        </Paper>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PersonIcon color="primary" fontSize="large" />
                <Typography variant="h6">Profile</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {hasCompletedProfile
                  ? 'Your profile is complete'
                  : 'Complete your personal information, address, guardian details, and school'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={hasCompletedProfile ? 'Complete' : 'Incomplete'}
                  color={hasCompletedProfile ? 'success' : 'warning'}
                  size="small"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => router.push('/profile/setup')}
              >
                {hasCompletedProfile ? 'Edit Profile' : 'Complete Profile'}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <DescriptionIcon color="primary" fontSize="large" />
                <Typography variant="h6">Documents</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Upload your matric certificate and ID document (both required to apply)
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  label={`Matric: ${hasMatricCert ? 'Yes' : 'No'}`}
                  color={hasMatricCert ? 'success' : 'default'}
                  size="small"
                />
                <Chip
                  label={`ID: ${hasIdDoc ? 'Yes' : 'No'}`}
                  color={hasIdDoc ? 'success' : 'default'}
                  size="small"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => router.push('/documents')}>
                Manage Documents
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SchoolIcon color="primary" fontSize="large" />
                <Typography variant="h6">Applications</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {applications.length > 0
                  ? `You have ${applications.length} application${applications.length > 1 ? 's' : ''}`
                  : 'Browse universities and programmes to apply'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={applications.length > 0 ? `${applications.length} Active` : 'None yet'}
                  color={applications.length > 0 ? 'primary' : 'default'}
                  size="small"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" disabled>
                Browse Universities (Coming Soon)
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {hasAPS && profile.subjectResults && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Your Matric Results
          </Typography>
          <Grid container spacing={2}>
            {profile.subjectResults.map((result: any) => (
              <Grid item xs={12} sm={6} md={4} key={result.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">{result.subject}</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {result.mark}% (Level {result.level})
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {applications.length > 0 && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Your Applications
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {applications.map((app: any) => {
              const statusConfig = getStatusConfig(app.status);
              return (
                <Card key={app.id} variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {app.programmeName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {app.universityName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {app.facultyName}
                        </Typography>
                      </Box>
                      <Chip
                        label={statusConfig.label}
                        color={statusConfig.color}
                        size="small"
                        icon={statusConfig.icon}
                      />
                    </Box>

                    {app.universityReference && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        Reference: {app.universityReference}
                      </Typography>
                    )}

                    {app.status === 'submission_failed' && app.notes && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        <Typography variant="body2" fontWeight={600}>
                          Submission Error
                        </Typography>
                        <Typography variant="body2">{app.notes}</Typography>
                      </Alert>
                    )}

                    {app.status === 'accepted' && app.decisionReason && (
                      <Alert severity="success" sx={{ mt: 2 }}>
                        <Typography variant="body2">{app.decisionReason}</Typography>
                      </Alert>
                    )}

                    {app.status === 'rejected' && app.decisionReason && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        <Typography variant="body2">{app.decisionReason}</Typography>
                      </Alert>
                    )}

                    {app.submittedAt && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Paper>
      )}
    </Container>
  );
}
