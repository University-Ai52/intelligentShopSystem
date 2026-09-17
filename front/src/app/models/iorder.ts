
import { AddressItem } from './address-item';
import { IOrderItem } from './iorder-item';
import { IUser } from './iuser';

export enum status {
  pending = 'pending',
  paid = 'paid',
  failed = 'failed',
  shipped = 'shipped',  
  cancelled = 'cancelled',
}
export enum paymentStatus {
  pending = 'pending',
  paid = 'paid',
  failed = 'failed',
}
export interface IOrder {
  orderNumber: string;
  user: IUser;

  items: IOrderItem[];

  shippingAddress:AddressItem;
  billingAddress: AddressItem;

  subtotal: number;
  total: number;

  status:status;

  paymentStatus:paymentStatus;

  paymentIntentId?: string;
  trackingNumber?: string;
  notes?: string;

  createdAt: string;
  updatedAt: string;
}