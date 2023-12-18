import { Producto } from "./productos";
import { Proveedor } from "./proveedores";

export interface Orden{
    fechaEmision: Date;
    fechaEntrega: Date;
    direccion: string;
    proveedor: Proveedor;
    producto: Producto;
    cantidad: number;
    total: number;
}