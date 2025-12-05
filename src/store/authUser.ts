import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  email: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isCheckingAuth: boolean;
  signup: (credentials: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  authCheck: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: true,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post('/api/v1/auth/signup', credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success('Account created successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed');
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post('/api/v1/auth/login', credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      set({ isLoggingIn: false, user: null });
    }
  },

  logout: async () => {
    try {
      await axios.post('/api/v1/auth/logout');
      set({ user: null });
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get('/api/v1/auth/authCheck');
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
