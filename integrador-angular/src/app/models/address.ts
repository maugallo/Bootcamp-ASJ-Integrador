import { Locality } from "./locality";

export interface Address{
    id?: number;
    locality: Locality;
    street: string;
    num: string;
    zipCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}