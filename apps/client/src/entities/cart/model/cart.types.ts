export interface CartItem {
  name: string;
  id: number;
  imageUrl: string;
  price: number;
  ingredients: string[];
  toppings: string[];
  type: string;
  size: number;
}
