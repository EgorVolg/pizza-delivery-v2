export interface PizzaCard {
  name: string;
  imageUrl: string;
  ingredients: number[] | string[];
  rating: number;
  popular: number;
  price: number;
}

export interface Pizza extends PizzaCard {
  id: number;
  description: string; 
  size: number[];
  type: number[];
  category_id: number;
}
