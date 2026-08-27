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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getStatusConfig } from '@/utils/applicationStatus';
import type { PortalApplication, ApplicationEvent } from '@/types';

const eventLabels: Record<string, string> = {
  created: 'Added to cart',
  submitted: 'Submitted to university',
  decision_received: 'Decision received',
  submission_failed: 'Submission failed',
};

export default function ApplicationDetailPage() {
  return (
    <ProtectedRoute>
      <ApplicationDetailContent />
    </ProtectedRoute>
  );
}

function ApplicationDetailContent() {
  const router = useRouter();
  const { id } = router.query;

  const [application, setApplication] = useState<PortalApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    api
      .get(`/applications/${id}`)
      .then((res) => {
        if (!cancelled) setApplication(res.data.application);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.error?.message || 'Application not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

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
            <Alert
              severity={application.decision === 'accepted' ? 'success' : 'error'}
              sx={{ mt: 3 }}
            >
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
            {(application.events?.length ?? 0) > 0 ? (
              application.events!.map((event: ApplicationEvent) => (
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
