import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, MapPin, User, AlertCircle, X } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { Book, BookCondition } from '../utils/types';

const BookBrowse = () => {
  const { books, requestBook } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    condition: '' as BookCondition | '',
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestingBook, setRequestingBook] = useState<Book | null>(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', isError: false });

  // Get only available books
  const availableBooks = books.filter(book => book.status === 'available');

  // Apply search and filters
  const filteredBooks = availableBooks.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || book.category === filters.category;
    const matchesCondition = !filters.condition || book.condition === filters.condition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(availableBooks.map(book => book.category))].sort();

  // Handle book request
  const handleRequestBook = async () => {
    if (!requestingBook) return;
    
    setIsRequesting(true);
    try {
      const success = await requestBook(requestingBook.id, requestMessage);
      
      if (success) {
        setNotification({
          show: true,
          message: `Successfully requested "${requestingBook.title}"`,
          isError: false,
        });
        setRequestingBook(null);
        setRequestMessage('');
      } else {
        setNotification({
          show: true,
          message: 'Failed to request book. Please try again.',
          isError: true,
        });
      }
    } catch (error) {
      console.error(error);
      setNotification({
        show: true,
        message: 'An error occurred. Please try again.',
        isError: true,
      });
    } finally {
      setIsRequesting(false);
    }
  };

  // Hide notification after 5 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-gray-900">Browse Available Books</h1>
      
      {/* Notification */}
      {notification.show && (
        <div 
          className={`fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg max-w-md transition-all duration-300 ${
            notification.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {notification.isError ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button 
              className="ml-auto flex-shrink-0 text-sm"
              onClick={() => setNotification({ ...notification, show: false })}
            >
              <span className="sr-only">Close</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title, author, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {isFiltersOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                id="condition"
                value={filters.condition}
                onChange={(e) => setFilters({ ...filters, condition: e.target.value as BookCondition | '' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            
            <div className="md:col-span-2 flex justify-end">
              <button 
                onClick={() => setFilters({ category: '', condition: '' })}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Book Grid */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Available Books ({filteredBooks.length})
        </h2>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-gray-700 text-lg font-medium mb-2">No books found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find more books.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => (
              <div key={book.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={book.coverImage || "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="font-bold text-gray-900 text-lg">{book.title}</h3>
                  <p className="text-gray-600 text-sm">by {book.author}</p>
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 text-gray-800 py-1 px-2 rounded-full">
                      {book.category}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                      {book.condition === 'like-new' ? 'Like New' : book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
                    </span>
                  </div>
                  
                  {book.description && (
                    <p className="text-gray-700 text-sm mt-3 line-clamp-2">
                      {book.description}
                    </p>
                  )}
                  
                  <div className="mt-3 flex items-center text-gray-500 text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{book.location}</span>
                  </div>
                  
                  <div className="mt-1 flex items-center text-gray-500 text-xs">
                    <User className="h-3 w-3 mr-1" />
                    <span>Donor: {book.donorName}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => setRequestingBook(book)}
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center justify-center"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Request This Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Book Modal */}
      {requestingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Request Book</h3>
                <button 
                  onClick={() => {
                    setRequestingBook(null);
                    setRequestMessage('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <img 
                    src={requestingBook.coverImage || "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg"}
                    alt={requestingBook.title}
                    className="w-16 h-20 object-cover rounded mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{requestingBook.title}</h4>
                    <p className="text-gray-600 text-sm">by {requestingBook.author}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">
                  You are requesting this book from <span className="font-medium">{requestingBook.donorName}</span>. 
                  Add a message to explain why you'd like this book.
                </p>
                
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Let the donor know why you're interested in this book..."
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setRequestingBook(null);
                    setRequestMessage('');
                  }}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                  disabled={isRequesting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestBook}
                  disabled={isRequesting}
                  className={`bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition ${
                    isRequesting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isRequesting ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookBrowse;