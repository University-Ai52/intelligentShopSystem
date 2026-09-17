import { ApiResponse } from "./api-response";

export interface Iproduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  images: string[];
  category: string;
  tags: string[];
  isActive: boolean;
  isDeleted: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductDetailsResponse extends ApiResponse<Iproduct> {}