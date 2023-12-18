import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ServiceProveedorService {
  arrayProveedores!: Proveedor[];

  constructor() { }

  createProvider(proveedor: Proveedor){
    if (localStorage.getItem("proveedores") === null){
      this.arrayProveedores = []
      this.arrayProveedores.push(proveedor);
      localStorage.setItem("proveedores", JSON.stringify(this.arrayProveedores));
    } else{
      const proveedoresData = localStorage.getItem("proveedores");
      if (proveedoresData) this.arrayProveedores = JSON.parse(proveedoresData);
      this.arrayProveedores.push(proveedor);
      localStorage.setItem("proveedores", JSON.stringify(this.arrayProveedores));
    }
  }

  getProviders(){
    const proveedoresData = localStorage.getItem("proveedores");
    if (proveedoresData){
      return JSON.parse(proveedoresData)
    } else{
      return [];
    }
  }
}
