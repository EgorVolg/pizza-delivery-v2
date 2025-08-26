export interface FilterStateParams {
  type: number[];
  isNew: boolean;
  price: number[];
  ingredients: number[];
}

export interface Dough {
  id: number;
  name: string;
}

export const MAX_PRICE = 5000;
export const MIN_PRICE = 0;
