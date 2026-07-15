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
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';

export default function PaymentCheckoutPage() {
  const router = useRouter();
  const { paymentId } = router.query;
  const { isAuthenticated } = useAuthStore();

  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (!paymentId) return;

    api
      .get(`/payments/${paymentId}`)
      .then((res) => setPayment(res.data.payment))
      .catch((err) => setError(err.response?.data?.error?.message || 'Payment not found'))
      .finally(() => setLoading(false));
  }, [isAuthenticated, paymentId, router]);

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
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Payment failed');
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    setProcessing(true);
    try {
      await api.post('/payments/notify', { paymentId, status: 'CANCELLED' });
    } finally {
      router.push('/payment/failed');
    }
  };

  if (!isAuthenticated || loading) {
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
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
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
            {payment.breakdown?.map((item: any) => (
              <Stack key={item.applicationId} direction="row" justifyContent="space-between">
                <Typography variant="body2">
                  {item.programmeName} ({item.universityName})
                </Typography>
                <Typography variant="body2">R{item.totalZAR}</Typography>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">R{payment.totalAmountZAR}</Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={1.5}>
            <Button variant="contained" size="large" onClick={handlePay} disabled={processing}>
              {processing ? 'Processing…' : `Pay R${payment.totalAmountZAR} Now`}
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
