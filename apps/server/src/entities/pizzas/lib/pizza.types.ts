export interface Pizza {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    ingredients: string[];
    size: number[];
    type: number[];
    category_id: number;
}