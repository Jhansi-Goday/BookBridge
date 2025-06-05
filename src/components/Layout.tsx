import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />
      
      <main className={`flex-grow ${!isLandingPage ? 'container mx-auto px-4 py-8' : ''}`}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;