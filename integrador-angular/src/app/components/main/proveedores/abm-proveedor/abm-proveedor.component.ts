import { Component } from '@angular/core';

@Component({
  selector: 'app-abm-proveedor',
  templateUrl: './abm-proveedor.component.html',
  styleUrl: './abm-proveedor.component.css'
})
export class AbmProveedorComponent {
  arrayProveedores: Proveedor[] = [
    {codigo: 1, rubro: "a", empresa: "a", email: "a", telefono: "a"},
    {codigo: 2, rubro: "b", empresa: "b", email: "b", telefono: "b"},
    {codigo: 3, rubro: "c", empresa: "c", email: "c", telefono: "c"},
    {codigo: 4, rubro: "d", empresa: "d", email: "d", telefono: "d"},  
    {codigo: 5, rubro: "e", empresa: "e", email: "e", telefono: "e"},
  ] 
}

export interface Proveedor{
  codigo: number;
  rubro: string;
  empresa: string;
  email: string;
  telefono: string;
}
