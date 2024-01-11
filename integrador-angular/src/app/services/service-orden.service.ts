import { Injectable } from '@angular/core';
import { Order } from '../models/orders';
import { LocalStorageClass } from '../utils/localStorage';
import { ServiceProveedorService } from './service-proveedor.service';
import { ServiceProductoService } from './service-producto.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrdenService {

  constructor(private proveedorService: ServiceProveedorService, private productoService: ServiceProductoService) { }

  private localStorage: LocalStorageClass = new LocalStorageClass();

  arrayOrdenes!: Order[];

   //CRUD Orders:
   getOrders(){
    return this.localStorage.getStorage("ordenes");
  }

  getEnabledOrders(){
    return this.localStorage.getStorage("ordenes").filter((orden: Order) => orden.enabled === true);
  }

  getDisabledOrders(){
    return this.localStorage.getStorage("ordenes").filter((orden: Order) => orden.enabled === false);
  }

  getOrder(nroOrden: number){
    return this.localStorage.getStorage("ordenes").find((orden: Order) => orden.orderNumber === nroOrden);
  }

  addOrder(orden: Order){
    this.arrayOrdenes = this.localStorage.getStorage("ordenes");
    this.arrayOrdenes.push(orden);
    this.localStorage.setStorage("ordenes", this.arrayOrdenes);
  }

  updateOrder(orden: Order){
    this.arrayOrdenes = this.localStorage.getStorage("ordenes");

    let index = this.arrayOrdenes.findIndex((ordenOriginal: Order) => ordenOriginal.orderNumber === orden.orderNumber );
    this.arrayOrdenes[index] = orden;
    this.localStorage.setStorage("ordenes", this.arrayOrdenes);
  }

  deleteOrder(nroOrden: number){
    this.arrayOrdenes = this.localStorage.getStorage("ordenes");
    if (this.arrayOrdenes.length > 0){
      let index = this.arrayOrdenes.findIndex((orden) => orden.orderNumber === nroOrden);
      this.arrayOrdenes[index].enabled = false;
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
    return this.productoService.getEnabledProducts().filter((producto: any) => producto.provider.code === codigo);
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

  getLastCode(array: Order[]){
    return this.getLastElement(array).orderNumber + 1;
  }

  getLastElement(array: any){
    return array[array.length - 1];
  }
}
