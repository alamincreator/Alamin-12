
export interface Product {
  id: string;
  name: string;
  category: 'Supplements' | 'Beverages' | 'Personal Care' | 'Food';
  price: number;
  description: string;
  image: string;
  benefits: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type View = 'home' | 'shop' | 'cart' | 'product-detail' | 'checkout' | 'about';
