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

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('bookbridge_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserType(user.userType);
    }
  }, []);

  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    try {
      // Get registered users
      const users = JSON.parse(localStorage.getItem('bookbridge_users') || '[]');
      
      // Find user with matching email and password
      const user = users.find((u: User & { password: string }) => 
        u.email === email && u.password === password && u.userType === userType
      );

      if (!user) {
        throw new Error('Invalid credentials or user not found');
      }

      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = user;
      
      localStorage.setItem('bookbridge_user', JSON.stringify(userWithoutPassword));
      setCurrentUser(userWithoutPassword);
      setIsAuthenticated(true);
      setUserType(userType);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, userType: UserType): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('bookbridge_users') || '[]');
      
      // Check if user already exists
      if (users.some((u: User) => u.email === email)) {
        throw new Error('User already exists');
      }

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        password, // In a real app, this would be hashed
        userType,
        phone: '',
        location: '',
      };

      // Add to users list
      users.push(newUser);
      localStorage.setItem('bookbridge_users', JSON.stringify(users));

      // Log user in
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('bookbridge_user', JSON.stringify(userWithoutPassword));
      setCurrentUser(userWithoutPassword);
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
      
      // Update in users list
      const users = JSON.parse(localStorage.getItem('bookbridge_users') || '[]');
      const updatedUsers = users.map((u: User) => 
        u.id === currentUser.id ? { ...u, ...userData } : u
      );
      localStorage.setItem('bookbridge_users', JSON.stringify(updatedUsers));
      
      // Update current user
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