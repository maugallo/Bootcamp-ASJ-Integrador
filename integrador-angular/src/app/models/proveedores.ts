export interface Proveedor{
    codigo: number;
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
    direccion: Direccion;
}

export interface Direccion{
    calle: string;
    num: number;
    codPostal: number;
    localidad: string;
    provincia: string;
    pais: string;
}