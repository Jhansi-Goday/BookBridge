import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooks } from '../context/BookContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { isAuthenticated, currentUser, userType, logout } = useAuth();
  const { notifications } = useBooks();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Filter notifications for the current user
  const userNotifications = notifications.filter(
    notification => currentUser && notification.userId === currentUser.id
  );
  
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getDashboardLink = () => {
    if (userType === 'donor') return '/donor/dashboard';
    if (userType === 'receiver') return '/receiver/dashboard';
    return '/';
  };

  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-900" />
            <span className="text-xl font-serif font-bold text-blue-900">BookBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="text-gray-700 hover:text-blue-900 transition"
                >
                  Dashboard
                </Link>
                
                {userType === 'donor' && (
                  <Link 
                    to="/donor/add-book" 
                    className="text-gray-700 hover:text-blue-900 transition"
                  >
                    Add Book
                  </Link>
                )}
                
                {userType === 'receiver' && (
                  <Link 
                    to="/receiver/browse" 
                    className="text-gray-700 hover:text-blue-900 transition"
                  >
                    Browse Books
                  </Link>
                )}
                
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={toggleNotifications}
                    className="text-gray-700 hover:text-blue-900 transition p-1 rounded-full relative"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Notification Dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {userNotifications.length > 0 ? (
                          userNotifications.map(notification => (
                            <Link
                              key={notification.id}
                              to={notification.linkTo || '#'}
                              className={`block px-4 py-3 hover:bg-gray-50 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                            >
                              <p className="text-sm text-gray-700">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.createdAt).toLocaleDateString()}
                              </p>
                            </Link>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 p-4">No notifications yet</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User menu */}
                <div className="relative ml-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700">{currentUser?.name}</span>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-600 transition flex items-center"
                    >
                      <LogOut size={18} className="mr-1" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center"
              >
                <User size={18} className="mr-1" />
                <span>Login / Sign up</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <button 
                onClick={toggleNotifications}
                className="text-gray-700 hover:text-blue-900 transition p-1 rounded-full relative mr-4"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg">
          {isAuthenticated ? (
            <div className="space-y-3">
              <Link 
                to={getDashboardLink()} 
                className="block text-gray-700 hover:text-blue-900 transition py-2"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              
              {userType === 'donor' && (
                <Link 
                  to="/donor/add-book" 
                  className="block text-gray-700 hover:text-blue-900 transition py-2"
                  onClick={toggleMenu}
                >
                  Add Book
                </Link>
              )}
              
              {userType === 'receiver' && (
                <Link 
                  to="/receiver/browse" 
                  className="block text-gray-700 hover:text-blue-900 transition py-2"
                  onClick={toggleMenu}
                >
                  Browse Books
                </Link>
              )}
              
              <div className="border-t border-gray-200 pt-2">
                <div className="py-2 text-gray-700">
                  Signed in as <span className="font-medium">{currentUser?.name}</span>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-red-600 hover:text-red-800 transition flex items-center py-2"
                >
                  <LogOut size={18} className="mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="block bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition text-center my-2"
              onClick={toggleMenu}
            >
              <User size={18} className="inline-block mr-1" />
              <span>Login / Sign up</span>
            </Link>
          )}
        </div>
      )}

      {/* Mobile notifications */}
      {isNotificationsOpen && isAuthenticated && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg">
          <div className="py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {userNotifications.length > 0 ? (
              userNotifications.map(notification => (
                <Link
                  key={notification.id}
                  to={notification.linkTo || '#'}
                  className={`block px-2 py-3 hover:bg-gray-50 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500 p-4">No notifications yet</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;