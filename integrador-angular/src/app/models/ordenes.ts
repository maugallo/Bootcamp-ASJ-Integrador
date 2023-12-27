import { ItemOrden } from "./itemOrden";
import { Proveedor } from "./proveedores";

export interface Orden{
    nroOrden: number | undefined;
    fechaEmision: Date | undefined;
    fechaEntrega: Date | undefined;
    infoRecepcion: string;
    direccion: string;
    proveedor: Proveedor | undefined;
    listaItems: ItemOrden[];
    total: number | undefined;
    habilitado: boolean;
}