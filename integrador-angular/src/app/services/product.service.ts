import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProviderService } from './provider.service';
import { CategoryService } from './category.service';
import { ErrorService } from './utils/error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL_API: string = "http://localhost:8080/products";

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private providerService: ProviderService,
    private categoryService: CategoryService,
  ) {}

  //GET METHODS:
  getProductsByIsEnabled(isEnabled: boolean){
    let params = new HttpParams();

    params = params.append('isEnabled', isEnabled);

    return this.http.get<Product[]>(this.URL_API, { params }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getProductsByFilter(titleOrDescription?: string, category?: string, isEnabled?: boolean): Observable<Product[]> {
    let params = new HttpParams();

    if (titleOrDescription !== undefined && titleOrDescription !== '') params = params.append('titleOrDescription', titleOrDescription!);
    if (category !== undefined && category !== '') params = params.append('category', category!);
    if (isEnabled !== undefined) params = params.append("isEnabled", isEnabled!);

    return this.http.get<Product[]>(this.URL_API, { params }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getProductsByProviderId(idProvider: number): Observable<Product[]>{
    let params = new HttpParams();

    params = params.append('idProvider', idProvider);
    params = params.append('isEnabled', true); //Only the products that are enabled will be returned.

    return this.http.get<Product[]>(this.URL_API, { params }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.URL_API + "/" + id).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //CREATE METHOD:
  addProduct(product: Product): Observable<string> {
    return this.http.post(this.URL_API, product, { responseType: 'text' }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //UPDATE METHOD:
  updateProduct(product: Product): Observable<string> {
    return this.http.put(this.URL_API + "/" + product.id, product, { responseType: 'text' }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //DELETE & RECOVER METHOD:
  deleteOrRecoverProduct(id: number): Observable<string> {
    return this.http.delete(this.URL_API + "/" + id, { responseType: 'text' }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //VALIDATION METHOD:
  validateSku(sku: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API + "/validate/" + sku).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //CHARGE FORM METHODS:
  getProvidersForSelect() {
    return this.providerService.getProvidersByIsEnabled(true).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getCategoriesForSelect(){
    return this.categoryService.getCategoriesByIsEnabled(true).pipe(
      catchError(this.errorService.handleError)
    );
  }

}
