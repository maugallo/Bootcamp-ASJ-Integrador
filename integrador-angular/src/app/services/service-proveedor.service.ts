import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ServiceProveedorService {
  arrayProveedores!: Proveedor[];

  constructor() { }

  addProvider(proveedor: Proveedor){
    this.arrayProveedores = this.getStorage("proveedores");
    this.arrayProveedores.push(proveedor);
    this.setStorage("proveedores", this.arrayProveedores);
  }

  getProviders(){
    return this.getStorage("proveedores");
  }

  deleteProvider(codigo: number){
    this.arrayProveedores = this.getStorage("proveedores");
    if (this.arrayProveedores.length > 0){
      this.arrayProveedores = this.arrayProveedores.filter(proveedor => proveedor.codigo != codigo);
      this.setStorage("proveedores", this.arrayProveedores);
      return true;
    } else{
      return false;
    }
  }

  //Métodos auxiliares.
  getStorage(text: string){
    //Si localStorage.getItem(text) es null o undefined, devuelve el resultado de la derecha. De lo contrario, devuelve el de la izquierda.
    const array = JSON.parse(localStorage.getItem(text) ?? "[]");
    return array;
  }

  setStorage(text: string, array: Proveedor[]){
    localStorage.setItem(text, JSON.stringify(array));
  }
}
