// packages/portal/src/utils/applicationStatus.tsx
// Application status -> chip color/label/icon, shared by dashboard.tsx and
// applications/[id].tsx (previously duplicated in both, and had drifted
// slightly - the default/unknown-status case only had an icon in one copy).

import { SxProps, Theme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import type { ApplicationStatus } from '@/types';

interface StatusConfig {
  color: 'default' | 'info' | 'success' | 'error';
  label: string;
  icon: React.ReactElement;
  // Only set for statuses that need a look the palette's fixed color keys
  // can't express (submission_failed uses the brand's reserved critical-alert
  // red, distinct from the standard error red used for a routine "rejected").
  sx?: SxProps<Theme>;
}

export function getStatusConfig(status: ApplicationStatus): StatusConfig {
  switch (status) {
    case 'draft':
      return {
        color: 'default',
        label: 'Draft',
        icon: <HourglassEmptyIcon fontSize="small" />,
      };
    case 'submitted':
      return {
        color: 'info',
        label: 'Submitted',
        icon: <HourglassEmptyIcon fontSize="small" />,
      };
    case 'accepted':
      return {
        color: 'success',
        label: 'Accepted',
        icon: <CheckCircleIcon fontSize="small" />,
      };
    case 'rejected':
      return { color: 'error', label: 'Rejected', icon: <CancelIcon fontSize="small" /> };
    case 'submission_failed':
      return {
        color: 'default',
        label: 'Submission Failed',
        icon: <ErrorIcon fontSize="small" sx={{ color: '#FFFFFF !important' }} />,
        sx: { bgcolor: '#DA1A23', color: '#FFFFFF' },
      };
    default:
      return {
        color: 'default',
        label: status,
        icon: <HourglassEmptyIcon fontSize="small" />,
      };
  }
}
