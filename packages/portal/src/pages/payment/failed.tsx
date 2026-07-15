// packages/portal/src/pages/payment/failed.tsx
// Payment cancelled/failed screen

import { Box, Container, Paper, Typography, Button, Stack } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/router';

export default function PaymentFailedPage() {
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
          <CancelIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Payment Not Completed
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your payment was cancelled or did not go through. Your programmes are still saved in
            your cart — you can try again whenever you're ready.
          </Typography>
          <Stack spacing={1.5}>
            <Button variant="contained" size="large" onClick={() => router.push('/cart')}>
              Back to Cart
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
