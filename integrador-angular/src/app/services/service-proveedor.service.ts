import { Injectable } from '@angular/core';
import { Provider } from '../models/provider';
import { LocalStorageClass } from '../utils/localStorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ServiceProveedorService {
  
  constructor(private http: HttpClient){ }

  private URL_API_COUNTRIES: string = "assets/data/countries.json";
  private URL_API_STATES: string = "assets/data/states.json";
  private URL_API_CITIES: string = "assets/data/cities.json";

  private localStorage: LocalStorageClass = new LocalStorageClass();

  arrayProveedores!: Provider[];

  //CRUD Providers:
  getProviders(){
    return this.localStorage.getStorage("proveedores");
  }

  getEnabledProviders(){
    return this.localStorage.getStorage("proveedores").filter((proveedor: Provider) => proveedor.enabled === true);
  }

  getDisabledProviders(){
    return this.localStorage.getStorage("proveedores").filter((proveedor: Provider) => proveedor.enabled === false);
  }

  getProvider(codigo: string){
    return this.localStorage.getStorage("proveedores").find((proveedor: Provider) => proveedor.code === codigo );
  }

  addProvider(proveedor: Provider){
    this.arrayProveedores = this.localStorage.getStorage("proveedores");
    this.arrayProveedores.push(proveedor);
    this.localStorage.setStorage("proveedores", this.arrayProveedores);
  }

  updateProvider(proveedor: Provider){
    this.arrayProveedores = this.localStorage.getStorage("proveedores");
    
    let index = this.arrayProveedores.findIndex((proveedorOriginal) => proveedorOriginal.code === proveedor.code );
    this.arrayProveedores[index] = proveedor;
    this.localStorage.setStorage("proveedores", this.arrayProveedores);
  }

  deleteProvider(codigo: string){
    this.arrayProveedores = this.localStorage.getStorage("proveedores");
    if (this.arrayProveedores.length > 0){
      let index = this.arrayProveedores.findIndex((proveedor) => proveedor.code === codigo );
      //Eliminación lógica del proveedor:
      this.arrayProveedores[index].enabled = false;
      this.localStorage.setStorage("proveedores", this.arrayProveedores);
      //Eliminación lógica de sus productos:
      this.deleteProductsFromProvider(codigo);
      return true;
    } else{
      return false;
    }
  }

  deleteProductsFromProvider(codigo: string){
    let arrayProductos: Product[] = this.localStorage.getStorage("productos");
    arrayProductos = arrayProductos.map((producto: Product) => { 
      if (producto.provider.code === codigo){
        producto.enabled = false;
      }
      return producto;
      });
    
    this.localStorage.setStorage("productos", arrayProductos);
  }

  //Form methods:
  getCountries(): Observable<any>{
    return this.http.get(this.URL_API_COUNTRIES);
  }

  getStates(): Observable<any>{
    return this.http.get(this.URL_API_STATES);
  }

  getCities(): Observable<any>{
    return this.http.get(this.URL_API_CITIES);
  }
}
