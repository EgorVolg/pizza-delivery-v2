export interface CartResponse {
  quantity: number;
  totalPrice: number;
  data: TCartItem[];
}

export interface TCartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  imageUrl: string;
  category_id: number;
  size: string;
  type: string;
  toppings: string;
  weight: string; 
  productQuantity: number;
  ingredients: string;
  quantity: number;
  cartQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddCartItemRequest {
  id: number;
  cart_id: string;
  name: string;
  imageUrl: string;
  price: number;
  type: string | undefined;
  size: string | number | null;
  ingredients: string;
  toppings: string;
  productQuantity: number | number[];
  quantity: number;
}
