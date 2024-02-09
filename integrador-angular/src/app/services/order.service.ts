import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PurchaseOrder } from '../models/purchaseOrder';
import { ProviderService } from './provider.service';
import { ProductService } from './product.service';
import { ErrorService } from './utils/error.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL_API: string = "http://localhost:8080/purchase-orders";

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private providerService: ProviderService,
    private productService: ProductService
  ) {}

  //GET METHODS:
  getOrders(): Observable<PurchaseOrder[]>{
    return this.http.get<PurchaseOrder[]>(this.URL_API).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getOrdersByFilter(orderStatus: string): Observable<PurchaseOrder[]>{
    let params = new HttpParams();

    if (orderStatus !== '' && orderStatus !== undefined) params = params.append('status', orderStatus!);

    return this.http.get<PurchaseOrder[]>(this.URL_API, {params}).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getOrderById(id: number): Observable<PurchaseOrder>{
    return this.http.get<PurchaseOrder>(this.URL_API + "/" + id).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //CREATE METHOD:
  addOrder(order: PurchaseOrder): Observable<string>{
    return this.http.post(this.URL_API, order, {responseType: 'text'}).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //UPDATE METHOD:
  updateOrder(order: PurchaseOrder): Observable<string>{
    return this.http.put(this.URL_API + "/" + order.id, order, {responseType: 'text'}).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //UPDATE ORDER STATUS METHOD:
  updateOrderStatus(id: number, orderStatus: string): Observable<string>{
    return this.http.patch(this.URL_API + "/" + id, orderStatus, { responseType: 'text' }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //CHARGE FORM METHODS:
  getProvidersForSelect(){
    return this.providerService.getProvidersByIsEnabled(true).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getProductsForSelect(id: number){
    return this.productService.getProductsByProviderId(id).pipe(
      catchError(this.errorService.handleError)
    );
  }
  
}
