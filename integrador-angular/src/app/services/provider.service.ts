import { Injectable } from '@angular/core';
import { Provider } from '../models/provider';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private URL_API_PROVIDERS: string = "http://localhost:8080/providers";
  
  private URL_API_COUNTRIES: string = "http://localhost:8080/countries";
  private URL_API_PROVINCES: string = "http://localhost:8080/provinces";
  private URL_API_LOCALITIES: string = "http://localhost:8080/localities";

  constructor(private http: HttpClient) { }

  //GET METHODS:
  getProviders(isEnabled: boolean): Observable<Provider[]> {
    let params = new HttpParams();
    params = params.append("isEnabled", isEnabled!);

    return this.http.get<Provider[]>(this.URL_API_PROVIDERS, {params});
  }

  getProvidersByFilter(companyNameOrCode?: string, isEnabled?: boolean){
    let params = new HttpParams();

    if (companyNameOrCode != "" || companyNameOrCode !== undefined) params = params.append("companyNameOrCode", companyNameOrCode!);
    if (isEnabled !== undefined) params = params.append("isEnabled", isEnabled!);

    return this.http.get<Provider[]>(this.URL_API_PROVIDERS, {params});
  }
  
  getProviderById(id: number): Observable<Provider> {
    return this.http.get<Provider>(this.URL_API_PROVIDERS + "/" + id);
  }

  //CREATE METHOD:
  addProvider(provider: Provider): Observable<string> {
    return this.http.post(this.URL_API_PROVIDERS, provider, { responseType: 'text' });
  }

  //UPDATE METHOD:
  updateProvider(provider: Provider): Observable<string> {
    return this.http.put(this.URL_API_PROVIDERS + "/" + provider.id, provider, { responseType: 'text' });
  }

  //DELETE & RECOVER METHOD:
  deleteOrRecoverProvider(id: number): Observable<string> {
    return this.http.delete(this.URL_API_PROVIDERS + "/" + id, { responseType: 'text' });
  }

  //VALIDATION METHODS:
  validateCode(code: string): Observable<Boolean> {

    let params = new HttpParams();

    params = params.append("type", "code");
    params = params.append("value", code);

    return this.http.get<Boolean>(this.URL_API_PROVIDERS + "/validate", {params});
  }

  validateCuit(cuit: string): Observable<Boolean> {
    
    let params = new HttpParams();

    params = params.append("type", "cuit");
    params = params.append("value", cuit);

    return this.http.get<Boolean>(this.URL_API_PROVIDERS + "/validate", {params});
  }

  validateCompanyName(companyName: string): Observable<Boolean> {
        
    let params = new HttpParams();

    params = params.append("type", "companyName");
    params = params.append("value", companyName);

    return this.http.get<Boolean>(this.URL_API_PROVIDERS + "/validate", {params});
  }

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
