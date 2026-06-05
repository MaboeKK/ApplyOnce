// packages/portal/src/store/auth.ts
// Zustand auth store

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/config/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<{ studentId: string; verificationCode?: string }>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          const user = response.data.user;
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          const message = error.response?.data?.error?.message || 'Login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/register', data);
          set({ isLoading: false });

          // Return verification code if in dev mode (shown in response)
          return {
            studentId: response.data.studentId,
            verificationCode: response.data.verificationCode,
          };
        } catch (error: any) {
          const message = error.response?.data?.error?.message || 'Registration failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      verifyEmail: async (email: string, code: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.post('/auth/verify', { email, code });
          set({ isLoading: false });
        } catch (error: any) {
          const message = error.response?.data?.error?.message || 'Verification failed';
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
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
