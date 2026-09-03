// packages/portal/src/components/ProtectedRoute.tsx
// Centralizes the "redirect to /login if not authenticated" guard that was
// previously duplicated inline across 9 pages. Wrap a page's content in
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
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    // Wait for the persisted store to rehydrate before deciding to redirect —
    // isAuthenticated starts false on every hard page load/reload/direct
    // navigation, before localStorage is read, so redirecting on that initial
    // value would kick out an actually-logged-in user.
    if (hasHydrated && !isAuthenticated) {
      router.replace('/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
