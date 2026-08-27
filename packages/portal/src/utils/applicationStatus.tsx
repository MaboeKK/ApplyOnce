// packages/portal/src/utils/applicationStatus.tsx
// Application status -> chip color/label/icon, shared by dashboard.tsx and
// applications/[id].tsx (previously duplicated in both, and had drifted
// slightly - the default/unknown-status case only had an icon in one copy).

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import type { ApplicationStatus } from '@/types';

export function getStatusConfig(status: ApplicationStatus) {
  switch (status) {
    case 'draft':
      return {
        color: 'default' as const,
        label: 'Draft',
        icon: <HourglassEmptyIcon fontSize="small" />,
      };
    case 'submitted':
      return {
        color: 'info' as const,
        label: 'Submitted',
        icon: <HourglassEmptyIcon fontSize="small" />,
      };
    case 'accepted':
      return {
        color: 'success' as const,
        label: 'Accepted',
        icon: <CheckCircleIcon fontSize="small" />,
      };
    case 'rejected':
      return { color: 'error' as const, label: 'Rejected', icon: <CancelIcon fontSize="small" /> };
    case 'submission_failed':
      return {
        color: 'error' as const,
        label: 'Submission Failed',
        icon: <ErrorIcon fontSize="small" />,
      };
    default:
      return {
        color: 'default' as const,
        label: status,
        icon: <HourglassEmptyIcon fontSize="small" />,
      };
  }
}
