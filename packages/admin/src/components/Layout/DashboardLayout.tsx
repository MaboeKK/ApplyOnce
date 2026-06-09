// packages/admin/src/components/Layout/DashboardLayout.tsx
// Layout for authenticated admin pages

import { Box, AppBar, Toolbar, Typography, Button, Container, Chip } from '@mui/material';
import { ReactNode } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/router';
import { LogoutOutlined, SchoolOutlined } from '@mui/icons-material';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <SchoolOutlined sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4, fontWeight: 600 }}>
            ApplyOnce Admin
          </Typography>

          {user && (
            <Chip
              label={user.universityName}
              color="default"
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 500,
              }}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          {user && (
            <>
              <Typography variant="body2" sx={{ mr: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                {user.name}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutOutlined />}
                sx={{ ml: 1 }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            ApplyOnce University Admin Portal © {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
