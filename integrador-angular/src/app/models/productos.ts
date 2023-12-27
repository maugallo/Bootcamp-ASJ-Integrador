import { Proveedor } from "./proveedores";

export interface Producto{
    imagen: string;
    nombre: string;
    sku: string;
    precio: number | undefined;
    descripcion: string;
    proveedor: Proveedor | undefined;
    categoria: string;
    habilitado: boolean;
}