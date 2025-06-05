import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DonorDashboard from './pages/DonorDashboard';
import ReceiverDashboard from './pages/ReceiverDashboard';
import BookForm from './pages/BookForm';
import BookBrowse from './pages/BookBrowse';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { UserType } from './utils/types';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <Layout>
            <Routes>
              <Route 
                path="/" 
                element={<LandingPage onSelectUserType={setSelectedUserType} />} 
              />
              <Route 
                path="/auth" 
                element={<AuthPage userType={selectedUserType} />} 
              />
              <Route 
                path="/donor/dashboard" 
                element={
                  <ProtectedRoute userType="donor">
                    <DonorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/receiver/dashboard" 
                element={
                  <ProtectedRoute userType="receiver">
                    <ReceiverDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/donor/add-book" 
                element={
                  <ProtectedRoute userType="donor">
                    <BookForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/receiver/browse" 
                element={
                  <ProtectedRoute userType="receiver">
                    <BookBrowse />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/\" replace />} />
            </Routes>
          </Layout>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;