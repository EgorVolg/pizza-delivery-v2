export interface PizzaAPI {
  id: number;
  category_id: number;
  description: string;
  size: number[];
  name: string;
  imageUrl: string;
  ingredients: number[];
  rating: number;
  popular: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  type: number[];
}

export interface PizzaCard {
  id: number;
  imageUrl: string;
  createdAt: string;
  category_id: number;
  ingredients: string;
  name: string;
  popular: number;
  price: number;
  rating: number;
}
