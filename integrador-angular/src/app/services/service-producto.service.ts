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
    const productosData = localStorage.getItem("productos");
    //Si productosData es distinto de null, entonces devuelve el array, de lo contrario crea un array nuevo.
    this.arrayProductos = productosData != null ? JSON.parse(productosData) : [];
    this.arrayProductos.push(producto);
    localStorage.setItem("productos",JSON.stringify(this.arrayProductos));
  }

  getProducts(){
    const productosData = localStorage.getItem("productos");
    if (productosData != null){
      return JSON.parse(productosData)
    } else{
      return [];
    }
  }

  deleteProduct(sku: string){
    const productosData = localStorage.getItem("productos");
    if (productosData){
      this.arrayProductos = JSON.parse(productosData);
      this.arrayProductos = this.arrayProductos.filter(producto => producto.sku != sku);
      localStorage.setItem("productos", JSON.stringify(this.arrayProductos));
      return true;
    } else{
      return false;
    }
  }

  editProduct(){
    alert("Próximamente!");
  }
}
