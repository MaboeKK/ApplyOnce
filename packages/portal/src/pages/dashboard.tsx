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
  Chip,
  Alert,
  Divider,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getStatusConfig } from '@/utils/applicationStatus';
import { subjectLabel } from '@/utils/subject-labels';
import type { StudentProfile, PortalApplication } from '@/types';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [applications, setApplications] = useState<PortalApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      try {
        const [profileRes, appsRes] = await Promise.all([
          api.get('/students/me'),
          api.get('/applications'),
        ]);
        if (cancelled) return;
        setProfile(profileRes.data.student);
        setApplications(appsRes.data.applications || []);
      } catch (err) {
        if (!cancelled) console.error('Failed to fetch data', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return null;
  }

  const hasCompletedProfile = profile?.school && profile?.matricYear;
  const hasMatricCert = profile?.documents?.some((d) => d.type === 'matric_certificate');
  const hasIdDoc = profile?.documents?.some((d) => d.type === 'id_document');
  const hasAPS = (profile?.subjectResults?.length ?? 0) > 0;

  return (
    <>
      <PortalNav />
      <Box sx={{ bgcolor: 'secondary.main', color: '#FFFFFF', pt: 4, pb: hasAPS ? 5 : 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ color: '#FFFFFF' }} gutterBottom>
            Welcome, {user?.firstName}!
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            Your ApplyOnce dashboard
          </Typography>

          {hasAPS && profile && (
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{ fontSize: { xs: '1.75rem', sm: '2rem' }, fontWeight: 700, lineHeight: 1.15 }}
              >
                {profile.aps ?? 'Calculating...'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.75)', mt: 0.5 }}>
                Admission Point Score (best 6 subjects)
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {!hasCompletedProfile && (
          <Alert severity="info" sx={{ mb: 4 }}>
            Complete your profile and upload your documents to start applying to universities.
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PersonIcon color="primary" fontSize="large" />
                  <Typography variant="h6">Profile</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {hasCompletedProfile
                    ? 'Your profile is complete'
                    : 'Complete your personal information, address, guardian details, and school'}
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Chip
                    label={hasCompletedProfile ? 'Complete' : 'Incomplete'}
                    color={hasCompletedProfile ? 'success' : 'warning'}
                    size="small"
                  />
                  <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    onClick={() => router.push('/profile/setup')}
                  >
                    {hasCompletedProfile ? 'Edit profile' : 'Complete profile'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <DescriptionIcon color="primary" fontSize="large" />
                  <Typography variant="h6">Documents</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload your matric certificate and ID document (both required to apply)
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={`Matric: ${hasMatricCert ? 'yes' : 'no'}`}
                      color={hasMatricCert ? 'success' : 'default'}
                      size="small"
                    />
                    <Chip
                      label={`ID: ${hasIdDoc ? 'yes' : 'no'}`}
                      color={hasIdDoc ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    onClick={() => router.push('/documents')}
                  >
                    Manage
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SchoolIcon color="primary" fontSize="large" />
                  <Typography variant="h6">Applications</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {applications.length > 0
                    ? `You have ${applications.length} application${applications.length > 1 ? 's' : ''}`
                    : 'Browse universities and programmes to apply'}
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Chip
                    label={applications.length > 0 ? `${applications.length} active` : 'None yet'}
                    color={applications.length > 0 ? 'primary' : 'default'}
                    size="small"
                  />
                  <Box sx={{ display: 'flex' }}>
                    <Button
                      size="small"
                      variant="text"
                      color="secondary"
                      onClick={() => router.push('/universities')}
                    >
                      Browse
                    </Button>
                    {applications.length > 0 && (
                      <Button
                        size="small"
                        variant="text"
                        color="secondary"
                        onClick={() => router.push('/cart')}
                      >
                        View cart
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {hasAPS && profile && profile.subjectResults && (
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Your matric results
            </Typography>
            <Grid container spacing={2}>
              {profile.subjectResults.map((result) => (
                <Grid item xs={12} sm={6} md={4} key={result.id}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2">{subjectLabel(result.subject)}</Typography>
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
              Your applications
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {applications.map((app) => {
                const statusConfig = getStatusConfig(app.status);
                return (
                  <Card
                    key={app.id}
                    variant="outlined"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/applications/${app.id}`)}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
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
                          sx={statusConfig.sx}
                        />
                      </Box>

                      {app.universityReference && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 1 }}
                        >
                          Reference: {app.universityReference}
                        </Typography>
                      )}

                      {app.status === 'submission_failed' && app.notes && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          <Typography variant="body2" fontWeight={600}>
                            Submission error
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
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 1 }}
                        >
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
    </>
  );
}
