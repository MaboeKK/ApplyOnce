// packages/portal/src/pages/payment/success.tsx
// Payment success confirmation

import { Box, Container, Paper, Typography, Button, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';

export default function PaymentSuccessPage() {
  const router = useRouter();

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
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Payment Successful
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your applications are being submitted to each university now. This usually takes a
            few seconds — check your dashboard for live status.
          </Typography>
          <Stack spacing={1.5}>
            <Button variant="contained" size="large" onClick={() => router.push('/dashboard')}>
              Go to Dashboard
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
