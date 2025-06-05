import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserType } from '../utils/types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userType: UserType;
  login: (email: string, password: string, userType: UserType) => Promise<boolean>;
  signup: (name: string, email: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);

  // Check if user is already logged in (from local storage)
  useEffect(() => {
    const storedUser = localStorage.getItem('bookbridge_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserType(user.userType);
    }
  }, []);

  // Mock login function (in a real app, this would call an API)
  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, automatically create a mock user
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        userType: userType,
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('bookbridge_user', JSON.stringify(user));
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserType(userType);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Mock signup function (in a real app, this would call an API)
  const signup = async (name: string, email: string, password: string, userType: UserType): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        userType: userType,
      };
      
      localStorage.setItem('bookbridge_user', JSON.stringify(user));
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserType(userType);
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('bookbridge_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserType(null);
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!currentUser) return false;
      
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('bookbridge_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    userType,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};