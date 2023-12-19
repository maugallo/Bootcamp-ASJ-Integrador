import { Injectable } from '@angular/core';
import { Orden } from '../models/ordenes';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrdenService {
  arrayOrdenes!: Orden[];

  constructor() { }

  addOrder(orden: Orden){
    this.arrayOrdenes = this.getStorage("ordenes");
    this.arrayOrdenes.push(orden);
    this.setStorage("ordenes", this.arrayOrdenes);
  }

  getOrders(){
    return this.getStorage("ordenes");
  }

  deleteOrder(codigo: number){
    this.arrayOrdenes = this.getStorage("ordenes");
    if (this.arrayOrdenes.length > 0){
      this.arrayOrdenes = this.arrayOrdenes.filter(orden => orden.codigo != codigo);
      this.setStorage("ordenes", this.arrayOrdenes);
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

  setStorage(text: string, array: Orden[]){
    localStorage.setItem(text, JSON.stringify(array));
  }
}
