// packages/portal/src/pages/cart.tsx
// Application cart: itemised draft applications, balance nudge, proceed to payment

import { useEffect, useState, useRef } from 'react';
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
import api from '@/config/api';
import PortalNav from '@/components/Layout/PortalNav';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getErrorMessage } from '@/utils/error-message';
import { formatZAR } from '@/utils/formatters';
import type { PortalApplication, ProgrammeMatch } from '@/types';

const strategyColor: Record<string, 'error' | 'success' | 'secondary' | 'warning'> = {
  reach: 'warning',
  match: 'secondary',
  safety: 'success',
};

const strategyLabel: Record<string, string> = {
  reach: 'Aim high',
  match: 'Strong fit',
  safety: 'Secure',
};

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}

function CartContent() {
  const router = useRouter();

  const [applications, setApplications] = useState<PortalApplication[]>([]);
  const [feeByUni, setFeeByUni] = useState<Record<string, number>>({});
  const [strategyByCode, setStrategyByCode] = useState<Record<string, string>>({});
  const [hasMatricCert, setHasMatricCert] = useState(false);
  const [hasIdDoc, setHasIdDoc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      // Fetched independently rather than via Promise.all: a transient failure
      // fetching fees or document status must never hide applications that
      // WERE successfully fetched — that would show "cart is empty" while a
      // draft genuinely exists, and there'd be nothing to remove.
      try {
        const appsRes = await api.get('/applications');
        if (!mountedRef.current) return;
        const drafts = (appsRes.data.applications || []).filter(
          (a: PortalApplication) => a.status === 'draft'
        );
        setApplications(drafts);
      } catch (err) {
        if (mountedRef.current) setError(getErrorMessage(err, 'Failed to load your cart'));
        return;
      }

      try {
        const uniRes = await api.get('/universities');
        if (!mountedRef.current) return;
        const fees: Record<string, number> = {};
        for (const u of uniRes.data.universities || []) {
          fees[u.id] = u.applicationFee;
        }
        setFeeByUni(fees);
      } catch {
        // Fees fall back to '—' in the UI — not worth blocking the cart over.
      }

      try {
        const studentRes = await api.get('/students/me');
        if (!mountedRef.current) return;
        const student = studentRes.data.student;
        setHasMatricCert(
          !!student?.documents?.some((d: { type: string }) => d.type === 'matric_certificate')
        );
        setHasIdDoc(!!student?.documents?.some((d: { type: string }) => d.type === 'id_document'));
      } catch {
        // Document-status check failing shouldn't hide the cart either.
      }

      try {
        const matchesRes = await api.get('/aps/matches');
        if (!mountedRef.current) return;
        const map: Record<string, string> = {};
        for (const m of (matchesRes.data.matches || []) as ProgrammeMatch[]) {
          map[`${m.universityId}:${m.programmeCode}`] = m.choiceStrategy;
        }
        setStrategyByCode(map);
      } catch {
        // Student hasn't uploaded results yet — skip strategy tagging
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      await api.delete(`/applications/${id}`);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to remove application'));
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
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to start payment'));
      setSubmitting(false);
    }
  };

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
          Your application cart
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
                  <Paper
                    key={app.id}
                    sx={{
                      p: 3,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {app.programmeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {app.universityName} · {app.facultyName}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }} alignItems="center">
                        <Typography variant="caption" color="text.secondary">
                          Fee:{' '}
                          {feeByUni[app.universityId] !== undefined
                            ? formatZAR(feeByUni[app.universityId])
                            : '—'}{' '}
                          + {formatZAR(SERVICE_FEE_ZAR)} service
                        </Typography>
                        {tier && strategyLabel[tier] && (
                          <Chip
                            label={strategyLabel[tier]}
                            size="small"
                            color={strategyColor[tier]}
                          />
                        )}
                      </Stack>
                    </Box>
                    <IconButton
                      onClick={() => handleRemove(app.id)}
                      disabled={removingId === app.id}
                      color="error"
                      aria-label={`Remove ${app.programmeName} at ${app.universityName} from cart`}
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
                <Typography variant="body2">{formatZAR(universityFees)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">
                  ApplyOnce service fees ({applications.length} × {formatZAR(SERVICE_FEE_ZAR)})
                </Typography>
                <Typography variant="body2">{formatZAR(serviceFees)}</Typography>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">{formatZAR(total)}</Typography>
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
                {submitting ? 'Starting payment…' : `Pay ${formatZAR(total)} and submit all`}
              </Button>
            </Paper>
          </>
        )}
      </Container>
    </>
  );
}
