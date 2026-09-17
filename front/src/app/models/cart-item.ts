export interface ProductInCart {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  stock?: number;
  isActive?: boolean;
}

export interface CartItem {
  product: ProductInCart;
  quantity: number;
  priceAtAdd: number;
}
