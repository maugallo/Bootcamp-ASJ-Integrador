import { Provider } from "./provider";

export interface Contact{
    id?: number;
    telephone: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}