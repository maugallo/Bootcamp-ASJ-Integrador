import { Provider } from "./provider";

export interface Product{
    sku: string;
    image: string;
    title: string;
    price: number;
    description: string;
    category: string;
    provider: Provider;
    enabled: boolean;
}