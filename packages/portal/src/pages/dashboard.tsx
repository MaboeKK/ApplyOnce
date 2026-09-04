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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getStatusConfig } from '@/utils/applicationStatus';
import { subjectLabel } from '@/utils/subject-labels';
import type { StudentProfile, PortalApplication } from '@/types';

// Purely decorative campus line-art for the welcome header - not interactive,
// so it's a plain SVG rather than an icon component. Anchored top-right and
// capped at roughly 80% of the header's own rendered height (measured at
// ~119px across breakpoints, since the greeting text never wraps), so it
// sits behind/beside the greeting without ever clipping past the header.
function CampusIllustration() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: { xs: 70, sm: 90, md: 95 },
        width: 'auto',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 300 200"
        height="100%"
        width="auto"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* distant skyline */}
        <g stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="2">
          <rect x="10" y="110" width="20" height="48" />
          <rect x="34" y="90" width="16" height="68" />
          <rect x="255" y="100" width="18" height="58" />
          <rect x="277" y="120" width="16" height="38" />
        </g>
        {/* campus building: pediment, entablature, columns, base */}
        <g stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M60 62 L150 22 L240 62" />
          <line x1="55" y1="62" x2="245" y2="62" />
          <line x1="70" y1="70" x2="70" y2="150" />
          <line x1="110" y1="70" x2="110" y2="150" />
          <line x1="190" y1="70" x2="190" y2="150" />
          <line x1="230" y1="70" x2="230" y2="150" />
          <line x1="50" y1="150" x2="250" y2="150" />
          <line x1="42" y1="158" x2="258" y2="158" />
        </g>
        {/* accent column, brand green */}
        <line
          x1="150"
          y1="70"
          x2="150"
          y2="150"
          stroke="#00A651"
          strokeOpacity="0.2"
          strokeWidth="2.5"
        />
      </svg>
    </Box>
  );
}

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
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: '#FFFFFF',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CampusIllustration />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ color: '#FFFFFF' }} gutterBottom>
            Welcome, {user?.firstName}!
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            Your ApplyOnce dashboard
          </Typography>
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
                  {hasCompletedProfile ? (
                    <Chip
                      label="Completed"
                      color="success"
                      size="small"
                      icon={<CheckCircleIcon />}
                    />
                  ) : (
                    <Chip label="Incomplete" color="warning" size="small" />
                  )}
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
