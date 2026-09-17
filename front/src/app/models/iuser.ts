export interface IUser {
  _id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role?: 'customer' | 'admin';
  isActive?: boolean;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}
