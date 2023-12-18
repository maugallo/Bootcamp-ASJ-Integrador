import { Proveedor } from "./proveedores";

export interface Producto{
    nombre: string;
    sku: string;
    precio: number;
    descripcion: string;
    proveedor: Proveedor;
    categoria: string;
}