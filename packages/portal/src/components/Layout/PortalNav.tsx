// packages/portal/src/components/Layout/PortalNav.tsx
// Shared top nav for authenticated student portal pages

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Box, Typography, Button, Badge, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/universities', label: 'Universities' },
  { href: '/documents', label: 'Documents' },
];

export default function PortalNav() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    api
      .get('/applications')
      .then((res) => {
        const drafts = (res.data.applications || []).filter((a: any) => a.status === 'draft');
        setCartCount(drafts.length);
      })
      .catch(() => {});
  }, [router.pathname]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      }}
    >
      <Toolbar sx={{ gap: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, cursor: 'pointer' }}
          onClick={() => router.push('/dashboard')}
        >
          ApplyOnce
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              onClick={() => router.push(link.href)}
              sx={{
                color: 'white',
                opacity: router.pathname === link.href ? 1 : 0.8,
                fontWeight: router.pathname.startsWith(link.href) ? 700 : 500,
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>

        <Button
          onClick={() => router.push('/cart')}
          startIcon={
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          }
          sx={{ color: 'white' }}
        >
          Cart
        </Button>

        <Box>
          <Button variant="outlined" onClick={handleLogout} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
