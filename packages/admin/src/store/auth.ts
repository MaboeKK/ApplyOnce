// packages/admin/src/store/auth.ts
// Zustand auth store for university admin

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AxiosError } from 'axios';
import api from '@/config/api';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  universityId: string;
  universityName: string;
  role: 'university_admin';
}

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  // True once the persisted store has finished rehydrating from localStorage
  // on this page load. A hard navigation/reload resets isAuthenticated to its
  // initial `false` before rehydration runs, so guards must wait for this
  // before treating `false` as "actually logged out" (see ProtectedRoute).
  hasHydrated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasHydrated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          const user = response.data.user;

          // Ensure this is an admin user
          if (user.role !== 'university_admin') {
            throw new Error('Invalid credentials');
          }

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          const axiosErr = error as AxiosError<{ message?: string }>;
          const message = axiosErr.response?.data?.message || axiosErr.message || 'Login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },

      clearError: () => set({ error: null }),
      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
