// packages/portal/src/components/Layout/PortalNav.tsx
// Shared top nav for authenticated student portal pages

import { useEffect, useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Badge,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';
import type { PortalApplication } from '@/types';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/universities', label: 'Universities' },
  { href: '/documents', label: 'Documents' },
];

export default function PortalNav() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [cartCount, setCartCount] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [navMenuAnchor, setNavMenuAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    api
      .get('/applications')
      .then((res) => {
        const drafts = (res.data.applications || []).filter((a: PortalApplication) => a.status === 'draft');
        setCartCount(drafts.length);
      })
      .catch(() => {});
  }, [router.pathname]);

  const handleLogout = async () => {
    setMenuAnchor(null);
    await logout();
    router.push('/login');
  };

  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #4930D8 0%, #6638E8 55%, #7838EB 100%)',
      }}
    >
      <Toolbar sx={{ gap: { xs: 1, sm: 3 }, minHeight: '72px !important' }}>
        <IconButton
          onClick={(e: MouseEvent<HTMLElement>) => setNavMenuAnchor(e.currentTarget)}
          sx={{ color: 'white', display: { xs: 'inline-flex', sm: 'none' } }}
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={navMenuAnchor} open={!!navMenuAnchor} onClose={() => setNavMenuAnchor(null)}>
          {navLinks.map((link) => (
            <MenuItem
              key={link.href}
              selected={router.pathname.startsWith(link.href)}
              onClick={() => {
                setNavMenuAnchor(null);
                router.push(link.href);
              }}
            >
              {link.label}
            </MenuItem>
          ))}
        </Menu>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push('/dashboard')}
        >
          <SchoolIcon />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            ApplyOnce
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
          {navLinks.map((link) => {
            const active = router.pathname.startsWith(link.href);
            return (
              <Button
                key={link.href}
                onClick={() => router.push(link.href)}
                sx={{
                  color: 'white',
                  opacity: active ? 1 : 0.82,
                  fontWeight: active ? 700 : 500,
                  bgcolor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  borderRadius: '10px',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Stack>

        <Box sx={{ flexGrow: { xs: 1, sm: 0 } }} />

        <Button
          onClick={() => router.push('/cart')}
          startIcon={
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          }
          sx={{ color: 'white', minWidth: 0, px: { xs: 1, sm: 2 } }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Cart
          </Box>
        </Button>

        <Box sx={{ width: '1px', height: 28, bgcolor: 'rgba(255,255,255,0.25)', display: { xs: 'none', sm: 'block' } }} />

        <Box>
          <Button
            onClick={(e: MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget)}
            endIcon={<ExpandMoreIcon />}
            sx={{ color: 'white', textTransform: 'none', minWidth: 0, px: { xs: 1, sm: 2 } }}
          >
            <Avatar sx={{ width: 30, height: 30, fontSize: '0.8rem', bgcolor: 'rgba(255,255,255,0.2)', mr: { xs: 0, sm: 1 } }}>
              {initials || <PersonOutlineIcon fontSize="small" />}
            </Avatar>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {user?.firstName}
            </Box>
          </Button>
          <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
            <MenuItem
              onClick={() => {
                setMenuAnchor(null);
                router.push('/profile/setup');
              }}
            >
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
