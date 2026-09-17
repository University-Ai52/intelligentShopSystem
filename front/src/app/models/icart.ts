import { IUser } from './iuser';
import { CartItem } from './cart-item';

export interface Icart {
  _id: string;
  user?: IUser | string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}
