import { Injectable, OnInit } from '@angular/core';
import { Producto } from '../models/productos';
import { ServiceProveedorService } from './service-proveedor.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductoService implements OnInit {
  arrayProductos!: Producto[];

  constructor(private providerService: ServiceProveedorService) { }

  ngOnInit(): void {
      
  }

  getProvidersSelect(){
    return this.providerService.getProviders();
  }

  addProduct(producto: Producto){
    this.arrayProductos = this.getStorage("productos");
    this.arrayProductos.push(producto);
    this.setStorage("productos", this.arrayProductos);
  }

  getProducts(){
    return this.getStorage("productos");
  }

  deleteProduct(sku: string){
    this.arrayProductos = this.getStorage("productos");
    if (this.arrayProductos.length > 0){
      this.arrayProductos = this.arrayProductos.filter(producto => producto.sku != sku);
      this.setStorage("productos", this.arrayProductos);
      return true;
    } else{
      return false;
    }
  }

  editProduct(){
    alert("Próximamente!");
  }

  //Métodos auxiliares.
  getStorage(text: string){
    //Si localStorage.getItem(text) es null o undefined, devuelve el resultado de la derecha. De lo contrario, devuelve el de la izquierda.
    const array = JSON.parse(localStorage.getItem(text) ?? "[]");
    return array;
  }

  setStorage(text: string, array: Producto[]){
    localStorage.setItem(text, JSON.stringify(array));
  }
}
