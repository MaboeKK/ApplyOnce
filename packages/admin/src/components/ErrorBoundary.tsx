// packages/admin/src/components/ErrorBoundary.tsx
// Top-level React error boundary. Without this, a render-time throw in any
// page white-screens with no recovery UI and nothing logged client-side.

import { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Paper, Typography, Button, Alert, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled render error:', error, errorInfo.componentStack);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }} elevation={1}>
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="h5" fontWeight={600}>
              Something went wrong
            </Typography>
            <Alert severity="error" sx={{ width: '100%' }}>
              This page ran into an unexpected error. Reloading usually fixes this.
            </Alert>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
            >
              Reload page
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }
}
