import { Injectable } from '@angular/core';
import { ProviderService } from './provider.service';
import { ProductService } from './product.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private providerService: ProviderService, private productService: ProductService, private orderService: OrderService) { }

  getProvidersCount(){
    
  }

  getProductsCount(){
    return this.productService.getEnabledProducts().length;
  }

  getOrdersCount(){
    return this.orderService.getEnabledOrders().length;
  }
}
