// packages/portal/src/pages/applications/[id].tsx
// View-only application status timeline

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Paper,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Box,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';

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
      return { color: 'default' as const, label: status, icon: <HourglassEmptyIcon fontSize="small" /> };
  }
}

const eventLabels: Record<string, string> = {
  created: 'Added to cart',
  submitted: 'Submitted to university',
  decision_received: 'Decision received',
  submission_failed: 'Submission failed',
};

export default function ApplicationDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated } = useAuthStore();

  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (!id) return;

    api
      .get(`/applications/${id}`)
      .then((res) => setApplication(res.data.application))
      .catch((err) => setError(err.response?.data?.error?.message || 'Application not found'))
      .finally(() => setLoading(false));
  }, [isAuthenticated, id, router]);

  if (!isAuthenticated || loading) {
    return (
      <>
        <PortalNav />
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (!application) {
    return (
      <>
        <PortalNav />
        <Container sx={{ py: 8 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </>
    );
  }

  const statusConfig = getStatusConfig(application.status);

  return (
    <>
      <PortalNav />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Button onClick={() => router.push('/dashboard')} sx={{ mb: 2 }}>
          ← Back to Dashboard
        </Button>

        <Paper sx={{ p: 4, mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h5">{application.programmeName}</Typography>
              <Typography variant="body1" color="text.secondary">
                {application.universityName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {application.facultyName}
              </Typography>
            </Box>
            <Chip label={statusConfig.label} color={statusConfig.color} icon={statusConfig.icon} />
          </Stack>

          {application.universityReference && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              University reference: {application.universityReference}
            </Typography>
          )}

          {application.decision && (
            <Alert severity={application.decision === 'accepted' ? 'success' : 'error'} sx={{ mt: 3 }}>
              <Typography variant="body2" fontWeight={600}>
                {application.decision === 'accepted' ? 'Accepted' : 'Rejected'}
              </Typography>
              <Typography variant="body2">{application.decisionReason}</Typography>
              {application.decisionAt && (
                <Typography variant="caption" color="text.secondary">
                  Decided {new Date(application.decisionAt).toLocaleDateString()}
                </Typography>
              )}
            </Alert>
          )}

          {application.status === 'submission_failed' && application.notes && (
            <Alert severity="error" sx={{ mt: 3 }}>
              <Typography variant="body2" fontWeight={600}>
                Submission Error
              </Typography>
              <Typography variant="body2">{application.notes}</Typography>
            </Alert>
          )}
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Status Timeline
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {application.events?.length > 0 ? (
              application.events.map((event: any) => (
                <Stack key={event.id} direction="row" spacing={1.5} alignItems="flex-start">
                  <FiberManualRecordIcon sx={{ fontSize: 12, mt: 0.7 }} color="primary" />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {eventLabels[event.eventType] || event.eventType}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(event.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No events yet.
              </Typography>
            )}
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
