import { Proveedor } from "./proveedores";

export interface Producto{
    imagen: string;
    nombre: string;
    sku: string;
    precio: number;
    descripcion: string;
    proveedor: Proveedor;
    categoria: string;
}