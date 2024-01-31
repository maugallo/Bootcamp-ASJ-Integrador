import { Injectable } from '@angular/core';
import { Provider } from '../models/provider';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map, filter } from 'rxjs';
import { Address } from '../models/address';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  private URL_API_PROVIDERS: string = "http://localhost:8080/providers";
  private URL_API_ADDRESS: string = "http://localhost:8080/addresses";
  private URL_API_CONTACT: string = "http://localhost:8080/contacts"
  
  private URL_API_COUNTRIES: string = "http://localhost:8080/countries";
  private URL_API_PROVINCES: string = "http://localhost:8080/provinces";
  private URL_API_LOCALITIES: string = "http://localhost:8080/localities";

  //CRUD Providers:
  getEnabledProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.URL_API_PROVIDERS + "/enabled");
  }

  getDisabledProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.URL_API_PROVIDERS + "/disabled");
  }
  
  getProviderByCode(code: string): Observable<Provider> {
    return this.http.get<Provider>(this.URL_API_PROVIDERS + "/get/" + code);
  }

  addProvider(provider: Provider): Observable<String> {
    return this.http.post(this.URL_API_PROVIDERS, provider, {responseType: 'text'});
  }

  updateProvider(provider: Provider): Observable<String> {
    return this.http.put(this.URL_API_PROVIDERS + "/" + provider.id, provider, { responseType: 'text'});
  }

  deleteProvider(id: number): Observable<String> {
    return this.http.delete(this.URL_API_PROVIDERS + "/" + id, {responseType: 'text'});
  }

  validateCode(code: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API_PROVIDERS + "/validate-code/" + code);
  }

  validateCuit(cuit: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API_PROVIDERS + "/validate-cuit/" + cuit);
  }

  validateCompanyName(companyName: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API_PROVIDERS + "/validate-companyName/" + companyName);
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.URL_API_ADDRESS, address).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Ocurrió un error al crear la dirección.", error);
        return throwError(() => error);
      })
    );
  }

  addContact(contact: Contact): Observable<String> {
    return this.http.post(this.URL_API_CONTACT, contact, {responseType: 'text'}); //Telling that the response will not be JSON, but string.
  }

  validateEmail(email: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API_CONTACT + "/validate-email/" + email);
  }

  validateTelephone(telephone: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API_CONTACT + "/validate-telephone/" + telephone);
  }

  //FALTA MÉTODO PARA BORRAR LOS PRODUCTOS RELACIONADOS CON EL PROVEEDOR QUE SE ELIMINA.

  //Form methods:
  getCountries(): Observable<any> {
    return this.http.get(this.URL_API_COUNTRIES);
  }

  getProvinces(countryId: number): Observable<any> {
    return this.http.get(this.URL_API_PROVINCES + "/country/" + countryId);
  }

  getLocalities(provinceId: number): Observable<any> {
    return this.http.get(this.URL_API_LOCALITIES + "/province/" + provinceId);
  }
  
}
