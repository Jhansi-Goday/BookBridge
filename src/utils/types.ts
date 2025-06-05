export type UserType = 'donor' | 'receiver' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  location?: string;
  phone?: string;
  profileImage?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  category: string;
  condition: BookCondition;
  donorId: string;
  donorName: string;
  status: BookStatus;
  location: string;
  createdAt: string;
  receiverId?: string;
}

export type BookCondition = 'new' | 'like-new' | 'good' | 'fair' | 'poor';

export type BookStatus = 'available' | 'requested' | 'reserved' | 'donated';

export interface BookRequest {
  id: string;
  bookId: string;
  receiverId: string;
  receiverName: string;
  status: RequestStatus;
  message?: string;
  createdAt: string;
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
  linkTo?: string;
}