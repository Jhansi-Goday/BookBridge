import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, Search, BookOpen, Clock, Check, X, Info } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { Book, BookRequest } from '../utils/types';

const ReceiverDashboard = () => {
  const { currentUser } = useAuth();
  const { books, requests } = useBooks();
  const [selectedFilter, setSelectedFilter] = useState<BookRequest['status'] | 'all'>('all');
  
  // Get requests made by the current user
  const userRequests = requests.filter(
    request => currentUser && request.receiverId === currentUser.id
  );

  // Filter requests based on selected status
  const filteredRequests = userRequests.filter(
    request => selectedFilter === 'all' || request.status === selectedFilter
  );

  // Count requests by status
  const pendingCount = userRequests.filter(req => req.status === 'pending').length;
  const acceptedCount = userRequests.filter(req => req.status === 'accepted').length;
  const rejectedCount = userRequests.filter(req => req.status === 'rejected').length;
  const completedCount = userRequests.filter(req => req.status === 'completed').length;

  // Get books that were donated to the current user
  const receivedBooks = books.filter(
    book => currentUser && book.receiverId === currentUser.id && book.status === 'donated'
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Receiver Dashboard</h1>
        <Link 
          to="/receiver/browse" 
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Browse Books
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-blue-700 mr-2" />
            <h3 className="font-bold text-blue-900">Pending</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{pendingCount}</p>
          <p className="text-sm text-blue-600">Book requests</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Check className="h-5 w-5 text-green-700 mr-2" />
            <h3 className="font-bold text-green-900">Accepted</h3>
          </div>
          <p className="text-2xl font-bold text-green-700">{acceptedCount}</p>
          <p className="text-sm text-green-600">Book requests</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <X className="h-5 w-5 text-red-700 mr-2" />
            <h3 className="font-bold text-red-900">Declined</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">{rejectedCount}</p>
          <p className="text-sm text-red-600">Book requests</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <BookOpenCheck className="h-5 w-5 text-purple-700 mr-2" />
            <h3 className="font-bold text-purple-900">Received</h3>
          </div>
          <p className="text-2xl font-bold text-purple-700">{completedCount}</p>
          <p className="text-sm text-purple-600">Books received</p>
        </div>
      </div>

      {/* Book Requests */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Book Requests</h2>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedFilter('all')} 
              className={`px-3 py-1 rounded-md text-sm ${
                selectedFilter === 'all' 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedFilter('pending')} 
              className={`px-3 py-1 rounded-md text-sm ${
                selectedFilter === 'pending' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setSelectedFilter('accepted')} 
              className={`px-3 py-1 rounded-md text-sm ${
                selectedFilter === 'accepted' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Accepted
            </button>
            <button 
              onClick={() => setSelectedFilter('completed')} 
              className={`px-3 py-1 rounded-md text-sm ${
                selectedFilter === 'completed' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Received
            </button>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <Info className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-gray-700 text-lg font-medium mb-2">No requests found</h3>
            <p className="text-gray-500 mb-4">
              {userRequests.length === 0 
                ? "You haven't requested any books yet." 
                : "No requests match your selected filter."}
            </p>
            {userRequests.length === 0 && (
              <Link
                to="/receiver/browse"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <Search className="h-4 w-4 mr-1" />
                Browse available books
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map(request => {
              const book = books.find(b => b.id === request.bookId);
              if (!book) return null;

              return (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row">
                  <div className="md:flex-grow flex items-start">
                    <img 
                      src={book.coverImage || "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"}
                      alt={book.title}
                      className="w-20 h-20 object-cover rounded mr-4 hidden md:block"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{book.title}</h3>
                      <p className="text-gray-600 text-sm">{book.author}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Donor: <span className="font-medium">{book.donorName}</span>
                      </p>
                      <p className="text-gray-500 text-sm">
                        Requested on: {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                      
                      {request.message && (
                        <p className="text-gray-600 text-sm mt-2 italic">
                          Your message: "{request.message}"
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:w-32 mt-4 md:mt-0 flex items-center justify-end">
                    {request.status === 'pending' && (
                      <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-sm flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </span>
                    )}
                    {request.status === 'accepted' && (
                      <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Accepted
                      </span>
                    )}
                    {request.status === 'rejected' && (
                      <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-sm flex items-center">
                        <X className="h-3 w-3 mr-1" />
                        Declined
                      </span>
                    )}
                    {request.status === 'completed' && (
                      <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm flex items-center">
                        <BookOpenCheck className="h-3 w-3 mr-1" />
                        Received
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Books Received */}
      {receivedBooks.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpenCheck className="h-5 w-5 mr-2 text-purple-600" />
            Books Received ({receivedBooks.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {receivedBooks.map(book => (
              <div key={book.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={book.coverImage || "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full">
                      {book.category}
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-800 py-1 px-2 rounded-full flex items-center">
                      <BookOpenCheck className="h-3 w-3 mr-1" />
                      Received
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-xs mt-3">
                    Donated by: {book.donorName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiverDashboard;