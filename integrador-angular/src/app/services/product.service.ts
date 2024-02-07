import { Injectable, Provider } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private providerService: ProviderService) { }

  private URL_API_PRODUCTS: string = "http://localhost:8080/products";

  //GET METHODS:
  getProducts(isEnabled: boolean){
    let params = new HttpParams();

    params = params.append('isEnabled', isEnabled);

    return this.http.get<Product[]>(this.URL_API_PRODUCTS, { params });
  }

  getProductsByFilter(titleOrDescription?: string, category?: string, isEnabled?: boolean): Observable<Product[]> {
    let params = new HttpParams();

    if (titleOrDescription !== undefined && titleOrDescription !== '') params = params.append('titleOrDescription', titleOrDescription!);
    if (category !== undefined && category !== '') params = params.append('category', category!);
    if (isEnabled !== undefined) params = params.append("isEnabled", isEnabled!);

    return this.http.get<Product[]>(this.URL_API_PRODUCTS, { params }); //Optional query parameters.
  }

  getProductsByProviderId(idProvider: number): Observable<Product[]>{

    let params = new HttpParams();

    params = params.append('idProvider', idProvider);
    params = params.append('isEnabled', true); //Only the products that are enabled will be returned.

    return this.http.get<Product[]>(this.URL_API_PRODUCTS, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL_API_PRODUCTS + "/" + id);
  }

  getProvidersForSelect() {
    return this.providerService.getProviders(true);
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
    return this.http.delete(this.URL_API_PRODUCTS + "/" + id, { responseType: 'text' });
  }

  //VALIDATION METHOD:
  validateSku(sku: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API_PRODUCTS + "/validate/" + sku);
  }

}
