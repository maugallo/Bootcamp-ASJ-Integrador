import { Injectable } from '@angular/core';
import { ServiceProveedorService } from './service-proveedor.service';
import { ServiceProductoService } from './service-producto.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceHomeService {

  constructor(private providerService: ServiceProveedorService, private productService: ServiceProductoService, private orderService: OrderService) { }

  getProvidersCount(){
    return this.providerService.getEnabledProviders().length;
  }

  getProductsCount(){
    return this.productService.getEnabledProducts().length;
  }

  getOrdersCount(){
    return this.orderService.getEnabledOrders().length;
  }
}
