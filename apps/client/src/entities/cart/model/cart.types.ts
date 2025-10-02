export interface CartResponse {
  quantity: number;
  totalPrice: number;
  data: TCartItem[];
}

export interface TCartItem {
  name: string;
  id: number;
  quantity: number;
  imageUrl: string;
  price: number;
  ingredients: string;
  toppings: string;
  type: string;
  size: number;
}
 
