// packages/portal/src/pages/cart.tsx
// Application cart: itemised draft applications, balance nudge, proceed to payment

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SERVICE_FEE_ZAR } from '@applyonce/shared';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';

const strategyColor: Record<string, 'error' | 'success' | 'primary' | 'warning'> = {
  reach: 'warning',
  match: 'primary',
  safety: 'success',
};

const strategyLabel: Record<string, string> = {
  reach: 'Aim high',
  match: 'Strong fit',
  safety: 'Secure',
};

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [applications, setApplications] = useState<any[]>([]);
  const [feeByUni, setFeeByUni] = useState<Record<string, number>>({});
  const [strategyByCode, setStrategyByCode] = useState<Record<string, string>>({});
  const [hasMatricCert, setHasMatricCert] = useState(false);
  const [hasIdDoc, setHasIdDoc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const load = async () => {
    setLoading(true);
    try {
      const [appsRes, uniRes, studentRes] = await Promise.all([
        api.get('/applications'),
        api.get('/universities'),
        api.get('/students/me'),
      ]);

      const drafts = (appsRes.data.applications || []).filter((a: any) => a.status === 'draft');
      setApplications(drafts);

      const fees: Record<string, number> = {};
      for (const u of uniRes.data.universities || []) {
        fees[u.id] = u.applicationFee;
      }
      setFeeByUni(fees);

      const student = studentRes.data.student;
      setHasMatricCert(!!student?.documents?.some((d: any) => d.type === 'matric_certificate'));
      setHasIdDoc(!!student?.documents?.some((d: any) => d.type === 'id_document'));

      try {
        const matchesRes = await api.get('/aps/matches');
        const map: Record<string, string> = {};
        for (const m of matchesRes.data.matches || []) {
          map[`${m.universityId}:${m.programmeCode}`] = m.choiceStrategy;
        }
        setStrategyByCode(map);
      } catch {
        // Student hasn't uploaded results yet — skip strategy tagging
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load your cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to remove application');
    } finally {
      setRemovingId(null);
    }
  };

  const handleCheckout = async () => {
    setSubmitting(true);
    setError('');
    try {
      const origin = window.location.origin;
      const res = await api.post('/payments/initiate', {
        applicationIds: applications.map((a) => a.id),
        returnUrl: `${origin}/payment/success`,
        cancelUrl: `${origin}/payment/failed`,
      });
      router.push(`/payment/checkout?paymentId=${res.data.payment.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to start payment');
      setSubmitting(false);
    }
  };

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

  const universityFees = applications.reduce((sum, a) => sum + (feeByUni[a.universityId] || 0), 0);
  const serviceFees = applications.length * SERVICE_FEE_ZAR;
  const total = universityFees + serviceFees;

  const tierCounts = applications.reduce(
    (acc, a) => {
      const tier = strategyByCode[`${a.universityId}:${a.programmeId}`];
      if (tier && acc[tier as 'reach' | 'match' | 'safety'] !== undefined) {
        acc[tier as 'reach' | 'match' | 'safety'] += 1;
      }
      return acc;
    },
    { reach: 0, match: 0, safety: 0 }
  );

  const missingDocs = !hasMatricCert || !hasIdDoc;
  const showSafetyNudge = tierCounts.reach > 0 && tierCounts.safety === 0;

  return (
    <>
      <PortalNav />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Your Application Cart
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Review your programmes, then pay once to submit them all.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {applications.length === 0 ? (
          <Alert severity="info">
            Your cart is empty.{' '}
            <Button size="small" onClick={() => router.push('/universities')}>
              Browse universities
            </Button>
          </Alert>
        ) : (
          <>
            {(tierCounts.reach > 0 || tierCounts.match > 0 || tierCounts.safety > 0) && (
              <Alert severity={showSafetyNudge ? 'warning' : 'info'} sx={{ mb: 3 }}>
                You have {tierCounts.reach} reach, {tierCounts.match} match, and {tierCounts.safety}{' '}
                safety choice{tierCounts.safety === 1 ? '' : 's'}.
                {showSafetyNudge && ' Consider adding a safety choice to protect yourself.'}
              </Alert>
            )}

            <Stack spacing={2} sx={{ mb: 4 }}>
              {applications.map((app) => {
                const tier = strategyByCode[`${app.universityId}:${app.programmeId}`];
                return (
                  <Paper key={app.id} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {app.programmeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {app.universityName} · {app.facultyName}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }} alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          Fee: R{feeByUni[app.universityId] ?? '—'} + R{SERVICE_FEE_ZAR} service
                        </Typography>
                        {tier && strategyLabel[tier] && (
                          <Chip label={strategyLabel[tier]} size="small" color={strategyColor[tier]} />
                        )}
                      </Stack>
                    </Box>
                    <IconButton
                      onClick={() => handleRemove(app.id)}
                      disabled={removingId === app.id}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                );
              })}
            </Stack>

            <Paper sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">University fees</Typography>
                <Typography variant="body2">R{universityFees}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">ApplyOnce service fees ({applications.length} × R{SERVICE_FEE_ZAR})</Typography>
                <Typography variant="body2">R{serviceFees}</Typography>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">R{total}</Typography>
              </Stack>

              {missingDocs && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  You must upload your {!hasMatricCert && 'matric certificate'}
                  {!hasMatricCert && !hasIdDoc && ' and '}
                  {!hasIdDoc && 'ID document'} before you can pay.{' '}
                  <Button size="small" onClick={() => router.push('/documents')}>
                    Upload now
                  </Button>
                </Alert>
              )}

              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={missingDocs || submitting}
                onClick={handleCheckout}
              >
                {submitting ? 'Starting payment…' : `Pay R${total} and Submit All`}
              </Button>
            </Paper>
          </>
        )}
      </Container>
    </>
  );
}
