import { Injectable, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { LocalStorageClass } from '../utils/localStorage';
import { ServiceProveedorService } from './service-proveedor.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductoService {

  constructor(private proveedorService: ServiceProveedorService) { }
  
  private localStorage: LocalStorageClass = new LocalStorageClass();

  arrayProductos!: Product[];

  //CRUD Products:
  getProducts(){
    return this.localStorage.getStorage("productos");
  }

  getEnabledProducts(){
    return this.getProducts().filter((producto: Product) => producto.enabled === true);
  }

  getDisabledProducts(){
    return this.getProducts().filter((producto: Product) => producto.enabled === false);
  }

  getProduct(sku: string){
    return this.localStorage.getStorage("productos").find((producto: Product) => producto.sku === sku );
  }

  addProduct(producto: Product){
    this.arrayProductos = this.localStorage.getStorage("productos");
    this.arrayProductos.push(producto);
    this.localStorage.setStorage("productos", this.arrayProductos);
  }

  updateProduct(producto: Product){
    this.arrayProductos = this.localStorage.getStorage("productos");

    let index = this.arrayProductos.findIndex((productoOriginal: Product) => productoOriginal.sku === producto.sku );
    this.arrayProductos[index] = producto;
    this.localStorage.setStorage("productos", this.arrayProductos);
  }

  deleteProduct(sku: string){
    this.arrayProductos = this.localStorage.getStorage("productos");
    if (this.arrayProductos.length > 0){
      let index = this.arrayProductos.findIndex((producto) => producto.sku === sku );
      this.arrayProductos[index].enabled = false;
      this.localStorage.setStorage("productos", this.arrayProductos);
      return true;
    } else{
      return false;
    }
  }

  //Form methods:
  getProvidersForSelect(){
    return this.proveedorService.getEnabledProviders();
  }

  getProvider(codigo: string){
    return this.proveedorService.getProvider(codigo);
  }
}
