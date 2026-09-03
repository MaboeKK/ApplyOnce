// packages/portal/src/pages/payment/checkout.tsx
// Mock PayGate checkout screen

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Box,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import api from '@/config/api';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { getErrorMessage } from '@/utils/error-message';
import { formatZAR } from '@/utils/formatters';
import type { PortalPayment } from '@/types';

export default function PaymentCheckoutPage() {
  return (
    <ProtectedRoute>
      <PaymentCheckoutContent />
    </ProtectedRoute>
  );
}

function PaymentCheckoutContent() {
  const router = useRouter();
  const { paymentId } = router.query;

  const [payment, setPayment] = useState<PortalPayment | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!paymentId) return;
    let cancelled = false;

    api
      .get(`/payments/${paymentId}`)
      .then((res) => {
        if (!cancelled) setPayment(res.data.payment);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.error?.message || 'Payment not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [paymentId]);

  const handlePay = async () => {
    setProcessing(true);
    setError('');
    try {
      await api.post('/payments/notify', {
        paymentId,
        status: 'COMPLETE',
        gatewayReference: `MOCK-${Date.now()}`,
      });
      router.push(`/payment/success?paymentId=${paymentId}`);
    } catch (err) {
      setError(getErrorMessage(err, 'Payment failed'));
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    setProcessing(true);
    try {
      await api.post('/payments/notify', { paymentId, status: 'CANCELLED' });
    } catch (err) {
      // Not surfaced to the user — they're being redirected to the failed
      // page regardless, but this must not become an unhandled rejection.
      console.error(
        'Failed to notify payment cancellation:',
        getErrorMessage(err, 'Unknown error')
      );
    } finally {
      router.push('/payment/failed');
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!payment) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error || 'Payment not found'}</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #002E5B 0%, #004080 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <LockIcon color="action" fontSize="small" />
            <Typography variant="caption" color="text.secondary">
              Mock PayGate Sandbox — no real payment will be made
            </Typography>
          </Stack>
          <Typography variant="h5" gutterBottom>
            Confirm Your Payment
          </Typography>

          <Stack spacing={1} sx={{ my: 3 }}>
            {payment.breakdown?.map((item) => (
              <Stack key={item.applicationId} direction="row" justifyContent="space-between">
                <Typography variant="body2">
                  {item.programmeName} ({item.universityName})
                </Typography>
                <Typography variant="body2">{formatZAR(item.totalZAR)}</Typography>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{formatZAR(payment.totalAmountZAR)}</Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={1.5}>
            <Button variant="contained" size="large" onClick={handlePay} disabled={processing}>
              {processing ? 'Processing…' : `Pay ${formatZAR(payment.totalAmountZAR)} Now`}
            </Button>
            <Button variant="text" onClick={handleCancel} disabled={processing}>
              Cancel
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
