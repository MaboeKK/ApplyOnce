// packages/portal/src/pages/dashboard.tsx
// Student dashboard (placeholder for now)

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Button } from '@mui/material';
import { useAuthStore } from '@/store/auth';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" gutterBottom>
            Welcome, {user.firstName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your application dashboard
          </Typography>
        </Box>
        <Button variant="outlined" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>

      <Typography variant="body1">
        Dashboard content coming soon (Phase B steps 7-14)
      </Typography>
    </Container>
  );
}
