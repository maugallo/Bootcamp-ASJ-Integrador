export interface Proveedor{
    codigo: string;
    razonSocial: string;
    rubro: string;
    sitioWeb: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    rol: string;
    cuit: string;
    iva: string;
    calle: string;
    num: number | undefined;
    codPostal: number | undefined;
    localidad: string;
    provincia: string;
    pais: string;
}