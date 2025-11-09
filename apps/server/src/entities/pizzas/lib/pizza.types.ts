export interface PizzaResponse {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category_id: number;
  rating: number;
  size: string[];
  popular: number;
  type: number[];
  ingredients: number[];
  quantity: (number | null)[];
  weight: (number | null)[];
  createdAt: string;
  updatedAt: string;
}
