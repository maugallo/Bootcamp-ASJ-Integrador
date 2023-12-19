import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ServiceProveedorService {
  arrayProveedores!: Proveedor[];

  constructor() { }

  addProvider(proveedor: Proveedor){
    const proveedoresData = localStorage.getItem("proveedores");
    //Si proveedoresData es distinto de null, entonces devuelve el array, de lo contrario crea un array nuevo.
    this.arrayProveedores = proveedoresData != null ? JSON.parse(proveedoresData) : [];
    this.arrayProveedores.push(proveedor);
    localStorage.setItem("proveedores",JSON.stringify(this.arrayProveedores));
  }

  getProviders(){
    const proveedoresData = localStorage.getItem("proveedores");
    if (proveedoresData != null){
      return JSON.parse(proveedoresData)
    } else{
      return [];
    }
  }

  deleteProvider(codigo: number){
    const proveedoresData = localStorage.getItem("proveedores");
    if (proveedoresData){
      this.arrayProveedores = JSON.parse(proveedoresData);
      this.arrayProveedores = this.arrayProveedores.filter(proveedor => proveedor.codigo != codigo);
      localStorage.setItem("proveedores", JSON.stringify(this.arrayProveedores));
      return true;
    } else{
      return false;
    }
  }
}
