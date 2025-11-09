export interface RomanPizzas {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  categoryId: number;
  rating: number;
  ingredients: number[];
  type: number[];
  size: number;
  popular: number;
  createdAt: Date;
  updatedAt: Date;
}
