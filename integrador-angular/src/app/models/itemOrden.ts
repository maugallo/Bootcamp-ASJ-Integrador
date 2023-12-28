import { Producto } from "./productos";

export interface ItemOrden{
    producto: Producto | undefined;
    cantidad: number | undefined;
}