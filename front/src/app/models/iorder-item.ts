import { product } from "../core/layout/page/products/product";

export interface IOrderItem {
  product: product;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

