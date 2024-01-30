import { Address } from "./address";
import { Contact } from "./contact";
import { Product } from "./product";
import { Sector } from "./sector";
import { VatCondition } from "./vatCondition";

export interface Provider{
    id?: number; //Optional attribute
    products?: Product[];
    sector: Sector;
    vatCondition: string;
    contact: Contact;
    address: Address;
    code: string;
    companyName: string;
    logo: string;
    website: string;
    firstName: string;
    lastName: string;
    role: string;
    cuit: string;
    isEnabled: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}