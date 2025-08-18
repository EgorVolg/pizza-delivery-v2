export interface Pizza {
  id: number;
  name: string;
  categoryId: number;
  imageUrl: string;
  ingredients: string;
  sizes: number[];
  types: number[];
  description: string;
  price: number;
}
