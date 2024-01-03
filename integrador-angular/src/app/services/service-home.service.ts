import { Injectable } from '@angular/core';
import { ServiceProveedorService } from './service-proveedor.service';
import { ServiceProductoService } from './service-producto.service';
import { ServiceOrdenService } from './service-orden.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceHomeService {

  constructor(private proveedorService: ServiceProveedorService, private productoService: ServiceProductoService, private ordenService: ServiceOrdenService) { }

  getProvidersCount(){
    return this.proveedorService.getEnabledProviders().length;
  }

  getProductsCount(){
    return this.productoService.getEnabledProducts().length;
  }

  getOrdersCount(){
    return this.ordenService.getEnabledOrders().length;
  }
}
