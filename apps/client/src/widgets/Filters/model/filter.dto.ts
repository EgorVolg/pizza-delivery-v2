export interface FilterStateParams {
  type: number[] | [];
  isNew: boolean;
  price: [number, number] | [];
  ingredients: number[];
}

export interface Dough {
  id: number;
  name: string;
}
