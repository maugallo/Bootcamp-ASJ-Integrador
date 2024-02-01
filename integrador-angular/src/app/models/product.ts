import { Category } from "./category";
import { Provider } from "./provider";

export interface Product{
    id?: number;
    category: Category;
    provider: Provider;
    sku: string;
    image: string;
    title: string;
    price: number;
    description: string;
    isEnabled: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}