import { BookOpen, ArrowRight, BookCopy, Gift, Users, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserType } from '../utils/types';

interface LandingPageProps {
  onSelectUserType: (type: UserType) => void;
}

const LandingPage = ({ onSelectUserType }: LandingPageProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Share the joy of reading with BookBridge
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
                Connect book donors with readers who need them. Join our community and help spread knowledge through the power of books.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <Link 
                  to="/auth" 
                  onClick={() => onSelectUserType('donor')}
                  className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-50 transition shadow-md"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  I want to donate
                </Link>
                <Link 
                  to="/auth" 
                  onClick={() => onSelectUserType('receiver')}
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-amber-600 transition shadow-md"
                >
                  <BookCopy className="mr-2 h-5 w-5" />
                  I need books
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-700 rounded-lg transform rotate-6 opacity-30"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-amber-500 rounded-lg transform -rotate-6 opacity-20"></div>
                <img 
                  src="https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Books on a shelf" 
                  className="rounded-lg shadow-2xl relative z-10 max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">How BookBridge Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to donate or receive books in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-blue-50 p-8 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sign up & Choose your role</h3>
              <p className="text-gray-600 mb-4">
                Create an account and select whether you want to donate books or receive them.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-amber-50 p-8 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Add books or browse listings</h3>
              <p className="text-gray-600 mb-4">
                Donors can list their available books while receivers can browse and request books they need.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-green-50 p-8 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect and share</h3>
              <p className="text-gray-600 mb-4">
                Once matched, donors and receivers can arrange the handover of books through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <BookOpen className="h-12 w-12 text-blue-900 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">5,000+</div>
              <p className="text-gray-600">Books Shared</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Users className="h-12 w-12 text-blue-900 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">3,200+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Gift className="h-12 w-12 text-blue-900 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">1,800+</div>
              <p className="text-gray-600">Successful Donations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Featured Books</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out some of the books currently available on our platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Book 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <img 
                src="https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Book cover" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">The Great Adventure</h3>
                <p className="text-gray-600 text-sm mb-2">by John Author</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Fiction</span>
                  <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Like New</span>
                </div>
              </div>
            </div>

            {/* Book 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <img 
                src="https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Book cover" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Science Explained</h3>
                <p className="text-gray-600 text-sm mb-2">by Sarah Scientist</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-purple-100 text-purple-800 py-1 px-2 rounded-full">Science</span>
                  <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Good</span>
                </div>
              </div>
            </div>

            {/* Book 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <img 
                src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Book cover" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Cooking Masterclass</h3>
                <p className="text-gray-600 text-sm mb-2">by Chef Michael</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full">Cooking</span>
                  <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">New</span>
                </div>
              </div>
            </div>

            {/* Book 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
              <img 
                src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Book cover" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">History of Art</h3>
                <p className="text-gray-600 text-sm mb-2">by Elena Artistic</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">Art</span>
                  <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Good</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              to="/auth" 
              onClick={() => onSelectUserType('receiver')}
              className="inline-flex items-center text-blue-900 font-medium hover:text-blue-700 transition"
            >
              View all available books <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from people who have experienced BookBridge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-900 font-bold mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">Book Donor</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I had so many books collecting dust. BookBridge helped me find them new homes and make a difference. The process was smooth and rewarding!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center text-amber-900 font-bold mr-4">
                  AS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Alice Smith</h4>
                  <p className="text-sm text-gray-600">Book Receiver</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a student, buying books was getting expensive. BookBridge connected me with generous donors who shared the exact textbooks I needed. Incredible service!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-900 font-bold mr-4">
                  RJ
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Robert Johnson</h4>
                  <p className="text-sm text-gray-600">Book Donor & Receiver</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I both donate and receive books through BookBridge. It's created a wonderful cycle of giving in my life and introduced me to titles I'd never have found otherwise."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Join BookBridge?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you have books to share or are looking for your next read, BookBridge connects you with a community of book lovers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/auth" 
              onClick={() => onSelectUserType('donor')}
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-50 transition shadow-md w-full sm:w-auto"
            >
              <Gift className="mr-2 h-5 w-5" />
              Become a Donor
            </Link>
            <Link 
              to="/auth" 
              onClick={() => onSelectUserType('receiver')}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-amber-600 transition shadow-md w-full sm:w-auto"
            >
              <BookCopy className="mr-2 h-5 w-5" />
              Find Books
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">About BookBridge</h2>
              <p className="text-gray-700 mb-4">
                BookBridge was founded with a simple mission: to connect book donors with people who need books, promoting literacy, education, and sustainability.
              </p>
              <p className="text-gray-700 mb-4">
                We believe books should never sit idle on shelves when they could be enriching someone's life. Our platform creates a bridge between those who have books to share and those eager to read them.
              </p>
              <p className="text-gray-700">
                Since our inception, we've facilitated thousands of book donations across the country, creating a community of readers and donors united by their love for books.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="People sharing books" 
                  className="rounded-lg shadow-md h-48 object-cover"
                />
                <img 
                  src="https://images.pexels.com/photos/3059750/pexels-photo-3059750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Library" 
                  className="rounded-lg shadow-md h-48 object-cover"
                />
                <img 
                  src="https://images.pexels.com/photos/6373307/pexels-photo-6373307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Reading" 
                  className="rounded-lg shadow-md h-48 object-cover"
                />
                <img 
                  src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Stack of books" 
                  className="rounded-lg shadow-md h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;