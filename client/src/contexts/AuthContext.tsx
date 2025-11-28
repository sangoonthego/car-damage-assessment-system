import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { fetchProfile, UserProfile } from '../api/profile';

export type UserRole = 'Client' | 'Assessor' | 'Admin';

interface User extends UserProfile {
  id: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BASE_URL) || 'http://localhost:3636';

// Axios instance for login
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load profile on page refresh if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetchProfile()
      .then(profile => {
        setUser({
          id: profile.email, // hoặc profile._id nếu API trả về
          ...profile,
          role: 'Client', // chỉnh theo API nếu server trả về role
        });
      })
      .catch(err => {
        console.error('Fetch profile failed:', err);
        setUser(null);
      });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      const profile = await fetchProfile();
      setUser({
        id: profile.email, 
        ...profile,
        role: 'Client', 
      });
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
