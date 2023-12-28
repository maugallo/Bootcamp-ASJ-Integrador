import { Injectable } from '@angular/core';
import { Orden } from '../models/ordenes';
import { LocalStorageClass } from '../utils/localStorage';
import { ServiceProveedorService } from './service-proveedor.service';
import { ServiceProductoService } from './service-producto.service';
import { Producto } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrdenService {

  constructor(private proveedorService: ServiceProveedorService, private productoService: ServiceProductoService) { }

  private localStorage: LocalStorageClass = new LocalStorageClass();

  arrayOrdenes!: Orden[];

   //CRUD Orders:
   getOrders(){
    return this.localStorage.getStorage("ordenes");
  }

  getEnabledOrders(){
    return this.localStorage.getStorage("ordenes").filter((orden: Orden) => orden.habilitado === true);
  }

  getDisabledOrders(){
    return this.localStorage.getStorage("ordenes").filter((orden: Orden) => orden.habilitado === false);
  }

  getOrder(nroOrden: number){
    return this.localStorage.getStorage("ordenes").find((orden: Orden) => orden.nroOrden === nroOrden);
  }

  addOrder(orden: Orden){
    this.arrayOrdenes = this.localStorage.getStorage("ordenes");
    this.arrayOrdenes.push(orden);
    this.localStorage.setStorage("ordenes", this.arrayOrdenes);
  }

  updateOrder(orden: Orden){
    this.arrayOrdenes = this.localStorage.getStorage("ordenes");

    let index = this.arrayOrdenes.findIndex((ordenOriginal: Orden) => ordenOriginal.nroOrden === orden.nroOrden );
    this.arrayOrdenes[index] = orden;
    this.localStorage.setStorage("ordenes", this.arrayOrdenes);
  }

  deleteOrder(nroOrden: number){
    this.arrayOrdenes = this.localStorage.getStorage("ordenes");
    if (this.arrayOrdenes.length > 0){
      let index = this.arrayOrdenes.findIndex((orden) => orden.nroOrden === nroOrden);
      this.arrayOrdenes[index].habilitado = false;
      this.localStorage.setStorage("ordenes", this.arrayOrdenes);
      return true;
    } else{
      return false;
    }
  }

  getProvidersForSelect(){
    return this.proveedorService.getEnabledProviders();
  }

  getProductsForSelect(codigo: string){
    return this.productoService.getEnabledProducts().filter((producto: any) => producto.proveedor.codigo === codigo);
  }

  //Métodos para generar el número de órden:
  generateCode(){
    let codigo!: number;
    const arrayOrdenes = this.getOrders();
    if (arrayOrdenes.length === 0){
      codigo = 1;
    } else{
      codigo = this.getLastCode(arrayOrdenes);
    }
    return codigo;
  }

  getLastCode(array: Orden[]){
    return this.getLastElement(array).nroOrden + 1;
  }

  getLastElement(array: any){
    return array[array.length - 1];
  }
}
