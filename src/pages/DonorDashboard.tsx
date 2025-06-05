import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, BookOpenCheck, Clock, Check, X, Info, Edit, Trash, Search, MessageCircle } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { Book, BookRequest } from '../utils/types';

const DonorDashboard = () => {
  const { currentUser } = useAuth();
  const { books, userBooks, requests, updateRequestStatus } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<Book['status'] | 'all'>('all');
  const [selectedRequest, setSelectedRequest] = useState<BookRequest | null>(null);

  // Filter books based on search term and filter option
  const filteredBooks = userBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || book.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Get relevant requests for the donor's books
  const bookRequests = requests.filter(request => {
    const book = books.find(b => b.id === request.bookId);
    return book && book.donorId === currentUser?.id;
  });

  const pendingRequests = bookRequests.filter(req => req.status === 'pending');
  const acceptedRequests = bookRequests.filter(req => req.status === 'accepted');

  // Handle request status update
  const handleRequestAction = async (requestId: string, status: BookRequest['status']) => {
    await updateRequestStatus(requestId, status);
    setSelectedRequest(null);
  };

  // Mark a donation as completed
  const handleMarkAsCompleted = async (requestId: string) => {
    await updateRequestStatus(requestId, 'completed');
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Donor Dashboard</h1>
        <Link 
          to="/donor/add-book" 
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Book
        </Link>
      </div>

      {/* Search and filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
              onClick={() => setSelectedFilter('available')} 
              className={`px-3 py-1 rounded-md text-sm ${
                selectedFilter === 'available' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Available
            </button>
            <button 
              onClick={() => setSelectedFilter('requested')} 
              className={`px-3 py-1 rounded-md text-sm ${
                selectedFilter === 'requested' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Requested
            </button>
            <button 
              onClick={() => setSelectedFilter('reserved')} 
              className={`px-3 py-1 rounded-md text-sm ${
                selectedFilter === 'reserved' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Reserved
            </button>
            <button 
              onClick={() => setSelectedFilter('donated')} 
              className={`px-3 py-1 rounded-md text-sm ${
                selectedFilter === 'donated' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Donated
            </button>
          </div>
        </div>
      </div>

      {/* Pending requests */}
      {pendingRequests.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-500" />
            Pending Requests ({pendingRequests.length})
          </h2>
          <div className="space-y-4">
            {pendingRequests.map(request => {
              const book = books.find(b => b.id === request.bookId);
              if (!book) return null;

              return (
                <div key={request.id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <img 
                          src={book.coverImage || "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"}
                          alt={book.title}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900">{book.title}</h3>
                          <p className="text-gray-600 text-sm">{book.author}</p>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <User className="h-4 w-4 mr-1" />
                            <span>Requested by: <span className="font-medium">{request.receiverName}</span></span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Requested on: {new Date(request.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end md:self-center">
                      <button 
                        onClick={() => setSelectedRequest(request)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded flex items-center hover:bg-blue-200 transition"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                      <button 
                        onClick={() => handleRequestAction(request.id, 'rejected')}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded flex items-center hover:bg-red-200 transition"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </button>
                      <button 
                        onClick={() => handleRequestAction(request.id, 'accepted')}
                        className="bg-green-100 text-green-600 px-3 py-1 rounded flex items-center hover:bg-green-200 transition"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Accepted requests */}
      {acceptedRequests.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpenCheck className="h-5 w-5 mr-2 text-blue-500" />
            Accepted Requests ({acceptedRequests.length})
          </h2>
          <div className="space-y-4">
            {acceptedRequests.map(request => {
              const book = books.find(b => b.id === request.bookId);
              if (!book) return null;

              return (
                <div key={request.id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <img 
                          src={book.coverImage || "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"}
                          alt={book.title}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900">{book.title}</h3>
                          <p className="text-gray-600 text-sm">{book.author}</p>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <User className="h-4 w-4 mr-1" />
                            <span>Reserved for: <span className="font-medium">{request.receiverName}</span></span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Accepted on: {new Date(request.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end md:self-center">
                      <button 
                        onClick={() => setSelectedRequest(request)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded flex items-center hover:bg-blue-200 transition"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                      <button 
                        onClick={() => handleMarkAsCompleted(request.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700 transition"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Donated
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* My Books */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Books ({filteredBooks.length})</h2>
        
        {filteredBooks.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <Info className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-gray-700 text-lg font-medium mb-2">No books found</h3>
            <p className="text-gray-500 mb-4">
              {userBooks.length === 0 
                ? "You haven't added any books yet." 
                : "No books match your search criteria."}
            </p>
            {userBooks.length === 0 && (
              <Link
                to="/donor/add-book"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add your first book
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map(book => (
              <div key={book.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={book.coverImage || "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{book.title}</h3>
                    <div className="flex space-x-1">
                      <button className="text-gray-500 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full">
                      {book.category}
                    </span>
                    
                    {book.status === 'available' && (
                      <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
                        Available
                      </span>
                    )}
                    {book.status === 'requested' && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">
                        Requested
                      </span>
                    )}
                    {book.status === 'reserved' && (
                      <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                        Reserved
                      </span>
                    )}
                    {book.status === 'donated' && (
                      <span className="text-xs bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
                        Donated
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {(() => {
                const book = books.find(b => b.id === selectedRequest.bookId);
                if (!book) return null;

                return (
                  <div>
                    <div className="flex items-center mb-4">
                      <img 
                        src={book.coverImage || "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{book.title}</h4>
                        <p className="text-gray-600 text-sm">{book.author}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Requester Information</h5>
                        <p className="text-gray-600 text-sm">
                          Name: <span className="font-medium">{selectedRequest.receiverName}</span>
                        </p>
                        <p className="text-gray-600 text-sm">
                          Requested on: {new Date(selectedRequest.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {selectedRequest.message && (
                        <div>
                          <h5 className="font-medium text-gray-700 mb-1">Request Message</h5>
                          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded">
                            {selectedRequest.message}
                          </p>
                        </div>
                      )}

                      {selectedRequest.status === 'pending' && (
                        <div className="flex justify-end space-x-2 pt-4">
                          <button
                            onClick={() => handleRequestAction(selectedRequest.id, 'rejected')}
                            className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition flex items-center"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Decline
                          </button>
                          <button
                            onClick={() => handleRequestAction(selectedRequest.id, 'accepted')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </button>
                        </div>
                      )}

                      {selectedRequest.status === 'accepted' && (
                        <div className="flex justify-end pt-4">
                          <button
                            onClick={() => handleMarkAsCompleted(selectedRequest.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Mark as Donated
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;