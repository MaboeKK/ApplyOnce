// packages/admin/src/utils/applicationStatus.ts
// Application status -> Chip color, shared by applications.tsx and
// applications/[id].tsx (previously identical inline copies in both).

export function getStatusColor(status: string): 'info' | 'success' | 'error' | 'default' {
  switch (status) {
    case 'submitted':
      return 'info';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'default';
  }
}
