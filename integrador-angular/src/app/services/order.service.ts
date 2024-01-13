import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { LocalStorageClass } from '../utils/localStorage';
import { ProviderService } from './provider.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private providerService: ProviderService, private productService: ProductService) { }

  private localStorage: LocalStorageClass = new LocalStorageClass();

  ordersArray!: Order[];

   //CRUD Orders:
   getOrders(){
    return this.localStorage.getStorage("ordenes");
  }

  getEnabledOrders(){
    return this.localStorage.getStorage("ordenes").filter((order: Order) => order.enabled === true);
  }

  getDisabledOrders(){
    return this.localStorage.getStorage("ordenes").filter((order: Order) => order.enabled === false);
  }

  getOrder(orderNumber: number){
    return this.localStorage.getStorage("ordenes").find((order: Order) => order.orderNumber === orderNumber);
  }

  addOrder(order: Order){
    this.ordersArray = this.localStorage.getStorage("ordenes");
    this.ordersArray.push(order);
    this.localStorage.setStorage("ordenes", this.ordersArray);
  }

  updateOrder(order: Order){
    this.ordersArray = this.localStorage.getStorage("ordenes");

    let index = this.ordersArray.findIndex((originalOrder: Order) => originalOrder.orderNumber === order.orderNumber );
    this.ordersArray[index] = order;
    this.localStorage.setStorage("ordenes", this.ordersArray);
  }

  deleteOrder(orderNumber: number){
    this.ordersArray = this.localStorage.getStorage("ordenes");
    if (this.ordersArray.length > 0){
      let index = this.ordersArray.findIndex((order) => order.orderNumber === orderNumber);
      this.ordersArray[index].enabled = false;
      this.localStorage.setStorage("ordenes", this.ordersArray);
      return true;
    } else{
      return false;
    }
  }

  getProvidersForSelect(){
    return this.providerService.getEnabledProviders();
  }

  getProductsForSelect(code: string){
    return this.productService.getEnabledProducts().filter((product: any) => product.provider.code === code);
  }

  //Methods to generate the purchase order number:
  generateCode(){
    let code!: number;
    this.ordersArray = this.getOrders();
    if (this.ordersArray.length === 0){
      code = 1;
    } else{
      code = this.getLastCode(this.ordersArray);
    }
    return code;
  }

  getLastCode(array: Order[]){
    return this.getLastElement(array).orderNumber + 1;
  }

  getLastElement(array: any){
    return array[array.length - 1];
  }
  
}
