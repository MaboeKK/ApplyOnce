// packages/portal/src/theme/index.ts
// MUI theme for ApplyOnce student portal
// Design: Capitec "Live Better" style — simple, high-legibility, low visual friction

import { createTheme } from '@mui/material/styles';

// Design tokens: Capitec mobile app design system
const colors = {
  primary: '#00A651', // Capitec Green — CTAs, positive indicators, progress
  secondary: '#002E5B', // Capitec Navy — header bar, branding, high-emphasis headers
  accent: '#00A651',
  success: '#00A651',
  error: '#D32F2F', // Alert / Money Out
  warning: '#FFA000', // Warning / Pending
  neutral: {
    50: '#F8F9FA', // Main background
    100: '#F1F2F4',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280', // Secondary / muted text
    600: '#666666',
    700: '#4B5563',
    800: '#333333',
    900: '#1F2937', // Primary text
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: '#33B96F',
      dark: '#00863F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.secondary,
      light: '#1A4A7A',
      dark: '#001E3D',
      contrastText: '#FFFFFF',
    },
    success: {
      main: colors.success,
      light: '#33B96F',
      dark: '#00863F',
      contrastText: '#FFFFFF',
    },
    error: {
      main: colors.error,
      light: '#E53935',
      dark: '#B71C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: colors.warning,
      light: '#FFB833',
      dark: '#C67100',
      contrastText: '#000000',
    },
    info: {
      main: colors.secondary,
      light: '#1A4A7A',
      dark: '#001E3D',
      contrastText: '#FFFFFF',
    },
    background: {
      default: colors.neutral[50],
      paper: '#FFFFFF',
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[500],
      disabled: colors.neutral[400],
    },
    divider: colors.neutral[200],
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"SF Pro Display"',
      '"SF Pro Text"',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
      fontSize: '2rem', // 32px — big balance/display numbers
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.35,
    },
    h5: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem', // 18px — section headers
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '1rem', // 16px — section headers
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '0.875rem', // 14px — body text
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.6875rem', // 11px — microcopy/captions
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: 'normal',
    },
  },
  shape: {
    borderRadius: 8, // Cards & containers: 8–12px
  },
  // MUI's default spacing(1)=8px already matches the 8px/4px grid
  // (spacing(0.5)=4px xxs, 1=8px xs, 2=16px sm, 3=24px md, 4=32px lg) — no override needed.
  shadows: [
    'none',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 2px 8px rgba(0,0,0,0.06)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100, // pill-shaped action buttons
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontWeight: 500,
        },
      },
    },
  },
});
