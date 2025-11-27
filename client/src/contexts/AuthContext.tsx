import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'client' | 'assessor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Nguyen Tuan Ngoc',
    email: 'user@example.com',
    role: 'client' // Change to 'assessor' or 'admin' to test different views
  });

  const login = async (email: string, password: string, role?: UserRole) => {
    // Mock login - in real app, call API
    // Determine role based on email for easy testing
    let userRole: UserRole = 'client';
    if (email.includes('assessor')) {
      userRole = 'assessor';
    } else if (email.includes('admin')) {
      userRole = 'admin';
    } else if (role) {
      userRole = role;
    }

    setUser({
      id: '1',
      name: 'Nguyen Tuan Ngoc',
      email,
      role: userRole
    });
  };

  const logout = () => {
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}