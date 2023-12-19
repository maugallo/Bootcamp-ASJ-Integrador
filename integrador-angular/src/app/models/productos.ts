import { Proveedor } from "./proveedores";

export interface Producto{
    nombre: string;
    sku: string;
    precio: number;
    descripcion: string;
    proveedor: string;
    categoria: string;
}