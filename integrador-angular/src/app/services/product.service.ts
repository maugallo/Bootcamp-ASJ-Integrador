import { Injectable, Provider } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private providerService: ProviderService) { }

  private URL_API_PRODUCTS: string = "http://localhost:8080/products";

  //GET METHODS:
  getEnabledProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL_API_PRODUCTS + "/enabled");
  }

  getDisabledProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL_API_PRODUCTS + "/disabled");
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL_API_PRODUCTS + "/get/" + id);
  }

  getProvidersForSelect() {
    return this.providerService.getEnabledProviders();
  }

  //CREATE METHOD:
  addProduct(product: Product): Observable<string> {
    return this.http.post(this.URL_API_PRODUCTS, product, { responseType: 'text' });
  }

  //UPDATE METHOD:
  updateProduct(product: Product): Observable<string> {
    return this.http.put(this.URL_API_PRODUCTS + "/" + product.id, product, { responseType: 'text' })
  }

  //DELETE & RECOVER METHOD:
  deleteOrRecoverProduct(id: number): Observable<string> {
    return this.http.delete(this.URL_API_PRODUCTS + "/toggle-isEnabled/" + id, { responseType: 'text' });
  }

  //VALIDATION METHOD:
  validateSku(sku: string): Observable<Boolean>{
    return this.http.get<Boolean>(this.URL_API_PRODUCTS + "/validate-sku/" + sku);
  }

}
