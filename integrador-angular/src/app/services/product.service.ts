import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { LocalStorageClass } from '../utils/localStorage';
import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private providerService: ProviderService) { }
  
  private localStorage: LocalStorageClass = new LocalStorageClass();

  productArray!: Product[];

  //CRUD Products:
  getProducts(){
    return this.localStorage.getStorage("productos");
  }

  getEnabledProducts(){
    return this.getProducts().filter((product: Product) => product.enabled === true);
  }

  getDisabledProducts(){
    return this.getProducts().filter((product: Product) => product.enabled === false);
  }

  getProduct(sku: string){
    return this.localStorage.getStorage("productos").find((product: Product) => product.sku === sku );
  }

  addProduct(product: Product){
    this.productArray = this.localStorage.getStorage("productos");
    this.productArray.push(product);
    this.localStorage.setStorage("productos", this.productArray);
  }

  updateProduct(product: Product){
    this.productArray = this.localStorage.getStorage("productos");

    let index = this.productArray.findIndex((originalProduct: Product) => originalProduct.sku === product.sku );
    this.productArray[index] = product;
    this.localStorage.setStorage("productos", this.productArray);
  }

  deleteProduct(sku: string){
    this.productArray = this.localStorage.getStorage("productos");
    if (this.productArray.length > 0){
      let index = this.productArray.findIndex((product) => product.sku === sku );
      this.productArray[index].enabled = false;
      this.localStorage.setStorage("productos", this.productArray);
      return true;
    } else{
      return false;
    }
  }

  //Form methods:
  getProvidersForSelect(){
    return this.providerService.getEnabledProviders();
  }

  getProvider(code: string){
    return this.providerService.getProviderByCode(code);
  }
}
