import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Save, X } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { BookCondition } from '../utils/types';

const BookForm = () => {
  const { addBook } = useBooks();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    category: '',
    condition: 'good' as BookCondition,
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.title || !formData.author || !formData.category || !formData.condition) {
        setError('Please fill out all required fields');
        setIsSubmitting(false);
        return;
      }

      // Use a default image if none provided
      const bookData = {
        ...formData,
        coverImage: formData.coverImage || 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
      };

      const success = await addBook(bookData);
      
      if (success) {
        navigate('/donor/dashboard');
      } else {
        setError('Failed to add book. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const bookCategories = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 
    'Thriller', 'Romance', 'Historical', 'Biography', 'Self-Help',
    'Business', 'Technology', 'Science', 'Art', 'Cooking', 
    'Travel', 'Children', 'Young Adult', 'Academic', 'Other'
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Add a Book</h1>
        <button 
          onClick={() => navigate('/donor/dashboard')}
          className="text-gray-600 hover:text-gray-900"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Book title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the book title"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the author's name"
                required
              />
            </div>

            {/* Category and Condition - side by side on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {bookCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide a brief description of the book"
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter URL for the book cover image (optional)"
              />
              <p className="text-xs text-gray-500 mt-1">
                If left empty, a default cover will be used
              </p>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="City, State or General Area"
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => navigate('/donor/dashboard')}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition flex items-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <Save className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Book'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;