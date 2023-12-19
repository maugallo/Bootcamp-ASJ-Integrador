import { Producto } from "./productos";
import { Proveedor } from "./proveedores";

export interface Orden{
    codigo: number,
    fechaEmision: Date;
    fechaEntrega: Date;
    direccion: string;
    proveedor: string;
    producto: string;
    cantidad: number;
    total: number;
}