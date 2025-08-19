export interface Pizza {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  ingredients: number[];
  popular: number;
  rating: number;
  size: number[];
  type: number[];
  category_id: number;
  createdAt: Date;
  updatedAt: Date;
}
