export interface Appetizers {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  categoryId: number;
  rating: number;
  popular: number;
  quantity: (number | string)[];
  weight: number[];
  createdAt: Date;
  updatedAt: Date;
}
