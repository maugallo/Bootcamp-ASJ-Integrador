import { Province } from "./province";

export interface Locality{
    id: number;
    province: Province;
    name: string;
}