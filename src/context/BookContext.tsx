import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Book, BookRequest, Notification } from '../utils/types';
import { useAuth } from './AuthContext';

interface BookContextType {
  books: Book[];
  userBooks: Book[];
  requests: BookRequest[];
  notifications: Notification[];
  addBook: (book: Omit<Book, 'id' | 'status' | 'createdAt' | 'donorId' | 'donorName'>) => Promise<boolean>;
  updateBookStatus: (bookId: string, status: Book['status'], receiverId?: string) => Promise<boolean>;
  requestBook: (bookId: string, message?: string) => Promise<boolean>;
  updateRequestStatus: (requestId: string, status: BookRequest['status']) => Promise<boolean>;
  markNotificationAsRead: (notificationId: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const storedBooks = localStorage.getItem('bookbridge_books');
    const storedRequests = localStorage.getItem('bookbridge_requests');
    const storedNotifications = localStorage.getItem('bookbridge_notifications');

    if (storedBooks) {
      const existingBooks = JSON.parse(storedBooks);
      if (!existingBooks.some((book: Book) => book.isFree)) {
        const freeBooks: Book[] = [
          {
            id: 'free-1',
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            description: 'A classic novel of manners, marriage, and social status in early 19th-century England.',
            coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
            category: 'Fiction',
            condition: 'good',
            donorId: 'system',
            donorName: 'BookBridge Library',
            status: 'available',
            location: 'Digital',
            createdAt: new Date().toISOString(),
            pdfUrl: 'https://www.gutenberg.org/files/1342/1342-pdf.pdf',
            isFree: true
          },
          {
            id: 'free-2',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            description: 'A story of decadence and excess, exploring the American Dream in the Jazz Age.',
            coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
            category: 'Fiction',
            condition: 'good',
            donorId: 'system',
            donorName: 'BookBridge Library',
            status: 'available',
            location: 'Digital',
            createdAt: new Date().toISOString(),
            pdfUrl: 'https://www.gutenberg.org/files/64317/64317-pdf.pdf',
            isFree: true
          },
          {
            id: 'free-3',
            title: 'Frankenstein',
            author: 'Mary Shelley',
            description: 'A Gothic masterpiece about the perils of unchecked scientific ambition.',
            coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
            category: 'Fiction',
            condition: 'good',
            donorId: 'system',
            donorName: 'BookBridge Library',
            status: 'available',
            location: 'Digital',
            createdAt: new Date().toISOString(),
            pdfUrl: 'https://www.gutenberg.org/files/84/84-pdf.pdf',
            isFree: true
          },
          {
            id: 'free-4',
            title: 'The Art of War',
            author: 'Sun Tzu',
            description: 'An ancient Chinese military treatise with enduring wisdom for strategy and leadership.',
            coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
            category: 'Non-Fiction',
            condition: 'good',
            donorId: 'system',
            donorName: 'BookBridge Library',
            status: 'available',
            location: 'Digital',
            createdAt: new Date().toISOString(),
            pdfUrl: 'https://www.gutenberg.org/files/132/132-pdf.pdf',
            isFree: true
          }
        ];
        setBooks([...existingBooks, ...freeBooks]);
        localStorage.setItem('bookbridge_books', JSON.stringify([...existingBooks, ...freeBooks]));
      } else {
        setBooks(existingBooks);
      }
    } else {
      const freeBooks = [
        {
          id: 'free-1',
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          description: 'A classic novel of manners, marriage, and social status in early 19th-century England.',
          coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
          category: 'Fiction',
          condition: 'good',
          donorId: 'system',
          donorName: 'BookBridge Library',
          status: 'available',
          location: 'Digital',
          createdAt: new Date().toISOString(),
          pdfUrl: 'https://www.gutenberg.org/files/1342/1342-pdf.pdf',
          isFree: true
        },
        {
          id: 'free-2',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          description: 'A story of decadence and excess, exploring the American Dream in the Jazz Age.',
          coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
          category: 'Fiction',
          condition: 'good',
          donorId: 'system',
          donorName: 'BookBridge Library',
          status: 'available',
          location: 'Digital',
          createdAt: new Date().toISOString(),
          pdfUrl: 'https://www.gutenberg.org/files/64317/64317-pdf.pdf',
          isFree: true
        },
        {
          id: 'free-3',
          title: 'Frankenstein',
          author: 'Mary Shelley',
          description: 'A Gothic masterpiece about the perils of unchecked scientific ambition.',
          coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
          category: 'Fiction',
          condition: 'good',
          donorId: 'system',
          donorName: 'BookBridge Library',
          status: 'available',
          location: 'Digital',
          createdAt: new Date().toISOString(),
          pdfUrl: 'https://www.gutenberg.org/files/84/84-pdf.pdf',
          isFree: true
        },
        {
          id: 'free-4',
          title: 'The Art of War',
          author: 'Sun Tzu',
          description: 'An ancient Chinese military treatise with enduring wisdom for strategy and leadership.',
          coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
          category: 'Non-Fiction',
          condition: 'good',
          donorId: 'system',
          donorName: 'BookBridge Library',
          status: 'available',
          location: 'Digital',
          createdAt: new Date().toISOString(),
          pdfUrl: 'https://www.gutenberg.org/files/132/132-pdf.pdf',
          isFree: true
        }
      ];
      setBooks(freeBooks);
      localStorage.setItem('bookbridge_books', JSON.stringify(freeBooks));
    }

    if (storedRequests) setRequests(JSON.parse(storedRequests));
    if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookbridge_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('bookbridge_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('bookbridge_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const userBooks = currentUser 
    ? books.filter(book => 
        currentUser.userType === 'donor' 
          ? book.donorId === currentUser.id 
          : book.receiverId === currentUser.id
      ) 
    : [];

  const addBook = async (bookData: Omit<Book, 'id' | 'status' | 'createdAt' | 'donorId' | 'donorName'>): Promise<boolean> => {
    try {
      if (!currentUser) return false;

      const newBook: Book = {
        ...bookData,
        id: Math.random().toString(36).substr(2, 9),
        donorId: currentUser.id,
        donorName: currentUser.name,
        status: 'available',
        createdAt: new Date().toISOString(),
      };

      setBooks(prevBooks => [...prevBooks, newBook]);
      
      addNotification(
        currentUser.id,
        `You've successfully added "${bookData.title}" to your donations.`,
        `/donor/dashboard`
      );

      return true;
    } catch (error) {
      console.error('Add book error:', error);
      return false;
    }
  };

  const updateBookStatus = async (bookId: string, status: Book['status'], receiverId?: string): Promise<boolean> => {
    try {
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book.id === bookId 
            ? { ...book, status, receiverId: receiverId || book.receiverId } 
            : book
        )
      );
      return true;
    } catch (error) {
      console.error('Update book status error:', error);
      return false;
    }
  };

  const requestBook = async (bookId: string, message?: string): Promise<boolean> => {
    try {
      if (!currentUser) return false;

      const book = books.find(b => b.id === bookId);
      if (!book) return false;

      const newRequest: BookRequest = {
        id: Math.random().toString(36).substr(2, 9),
        bookId,
        receiverId: currentUser.id,
        receiverName: currentUser.name,
        receiverPhone: currentUser.phone,
        receiverLocation: currentUser.location,
        status: 'pending',
        message,
        createdAt: new Date().toISOString(),
      };

      setRequests(prevRequests => [...prevRequests, newRequest]);
      localStorage.setItem('bookbridge_requests', JSON.stringify([...requests, newRequest]));

      await updateBookStatus(bookId, 'requested');

      addNotification(
        book.donorId,
        `${currentUser.name} has requested your book "${book.title}". Click to review the request.`,
        `/donor/dashboard`
      );

      addNotification(
        currentUser.id,
        `You've requested "${book.title}". The donor will review your request.`,
        `/receiver/dashboard`
      );

      return true;
    } catch (error) {
      console.error('Request book error:', error);
      return false;
    }
  };

  const updateRequestStatus = async (requestId: string, status: BookRequest['status']): Promise<boolean> => {
    try {
      const request = requests.find(r => r.id === requestId);
      if (!request) return false;

      const book = books.find(b => b.id === request.bookId);
      if (!book) return false;

      setRequests(prevRequests => 
        prevRequests.map(req => 
          req.id === requestId ? { ...req, status } : req
        )
      );

      if (status === 'accepted') {
        await updateBookStatus(request.bookId, 'reserved', request.receiverId);
        
        addNotification(
          request.receiverId,
          `Good news! Your request for "${book.title}" has been accepted. Contact the donor to arrange pickup.`,
          `/receiver/dashboard`
        );

        addNotification(
          book.donorId,
          `You've accepted the request for "${book.title}". Please arrange the handover with the receiver.`,
          `/donor/dashboard`
        );
      } else if (status === 'rejected') {
        await updateBookStatus(request.bookId, 'available');
        
        addNotification(
          request.receiverId,
          `Your request for "${book.title}" was not accepted at this time.`,
          `/receiver/dashboard`
        );

        addNotification(
          book.donorId,
          `You've declined the request for "${book.title}". The book is now available for others.`,
          `/donor/dashboard`
        );
      } else if (status === 'completed') {
        await updateBookStatus(request.bookId, 'donated', request.receiverId);
        
        addNotification(
          request.receiverId,
          `The book "${book.title}" has been marked as received. Happy reading!`,
          `/receiver/dashboard`
        );
        
        addNotification(
          book.donorId,
          `You've successfully donated "${book.title}". Thank you for sharing knowledge!`,
          `/donor/dashboard`
        );
      }

      return true;
    } catch (error) {
      console.error('Update request status error:', error);
      return false;
    }
  };

  const addNotification = (userId: string, message: string, linkTo?: string) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      message,
      read: false,
      createdAt: new Date().toISOString(),
      linkTo,
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const value = {
    books,
    userBooks,
    requests,
    notifications,
    addBook,
    updateBookStatus,
    requestBook,
    updateRequestStatus,
    markNotificationAsRead,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};