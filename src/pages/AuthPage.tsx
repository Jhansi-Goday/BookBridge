import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../utils/types';

interface AuthPageProps {
  userType: UserType;
}

const AuthPage = ({ userType }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success;

      if (isLogin) {
        success = await login(email, password, userType);
      } else {
        if (!name) {
          setError('Name is required');
          setIsLoading(false);
          return;
        }
        success = await signup(name, email, password, userType);
      }

      if (success) {
        // Redirect based on user type
        if (userType === 'donor') {
          navigate('/donor/dashboard');
        } else if (userType === 'receiver') {
          navigate('/receiver/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const userTypeText = userType === 'donor' ? 'Donor' : userType === 'receiver' ? 'Receiver' : 'User';

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-serif font-bold">{isLogin ? 'Welcome Back!' : 'Join BookBridge'}</h2>
        </div>
        <div className="text-sm bg-blue-800 px-3 py-1 rounded-full">
          {userTypeText}
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name\" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;