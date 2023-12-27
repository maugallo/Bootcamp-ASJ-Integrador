import { Producto } from "./productos";

export interface ItemOrden{
    producto: Producto;
    cantidad: number;
}