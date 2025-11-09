// Данные, получаемые с API
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
  quantity: number[] | null;
  weight: number[] | null;
  createdAt: string;
  updatedAt: string;
}

// Данные, используемые в карточке товара
export interface PizzaCard {
  id: number;
  category_id: number;
  description: string;
  size: number[];
  name: string;
  imageUrl: string;
  ingredients: string[];
  rating: number;
  popular: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  type: number[];
}

// Данные, используемые в корзине и заказе
export interface Pizza {
  id: number;
  imageUrl: string;
  createdAt: string;
  category_id: number;
  ingredients: string;
  name: string;
  popular: number;
  price: number;
  rating: number;
  type: string[];
}

export interface PizzaTopping {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface ProductFilters {
  category?: string;
  priceFrom?: number;
  priceTo?: number;
  isNew?: boolean;
  type?: number[];
  ingredients?: number[];
}
