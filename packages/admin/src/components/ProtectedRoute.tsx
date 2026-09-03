// packages/admin/src/components/ProtectedRoute.tsx
// Centralizes the "redirect to /login if not authenticated" guard that was
// previously duplicated inline across 3 pages. Wrap a page's content in
// this; the page itself only mounts once the session is confirmed live, so
// its own effects don't need to check auth themselves.
//
// isAuthenticated alone isn't enough - it's just a persisted flag, true
// even after the access token has expired server-side. Without a live
// check, an expired session would briefly render full admin chrome (with
// another university's-worth of nothing loaded yet) before api.ts's 401
// interceptor kicks in and redirects. GET /v1/auth/me is a cheap
// JWT-only check (no DB lookup) that closes that gap.

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/auth';
import api from '@/config/api';

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [sessionValid, setSessionValid] = useState(false);

  useEffect(() => {
    // Wait for the persisted store to rehydrate before deciding to redirect —
    // isAuthenticated starts false on every hard page load/reload/direct
    // navigation, before localStorage is read, so redirecting on that initial
    // value would kick out an actually-logged-in admin.
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    let cancelled = false;
    api
      .get('/auth/me')
      .then(() => {
        if (!cancelled) setSessionValid(true);
      })
      .catch(() => {
        // api.ts's response interceptor already redirects to /login on 401.
      });

    return () => {
      cancelled = true;
    };
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated || !sessionValid) {
    return null;
  }

  return <>{children}</>;
}
