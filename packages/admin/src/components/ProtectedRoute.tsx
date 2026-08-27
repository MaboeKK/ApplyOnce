// packages/admin/src/components/ProtectedRoute.tsx
// Centralizes the "redirect to /login if not authenticated" guard that was
// previously duplicated inline across 3 pages. Wrap a page's content in
// this; the page itself only mounts once isAuthenticated is true, so its
// own effects no longer need to check isAuthenticated themselves.

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/auth';

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
