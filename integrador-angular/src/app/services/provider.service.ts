import { Injectable } from '@angular/core';
import { Provider } from '../models/provider';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { SectorService } from './sector.service';
import { CountryService } from './country.service';
import { ProvinceService } from './province.service';
import { ErrorService } from './utils/error.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private URL_API: string = "http://localhost:8080/providers";

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private sectorService: SectorService,
    private countryService: CountryService,
    private provinceService: ProvinceService
  ) {}

  //GET METHODS:
  getProvidersByIsEnabled(isEnabled: boolean): Observable<Provider[]> {
    let params = new HttpParams();
    params = params.append("isEnabled", isEnabled!);

    return this.http.get<Provider[]>(this.URL_API, {params}).pipe(
      catchError(this.errorService.handleError) //telling catchError that if the Observable throws an error, to call the handleError() method. It automatically passes the error as a parameter to the method.
    );
  }

  getProvidersByFilter(companyNameOrCode?: string, isEnabled?: boolean){
    let params = new HttpParams();

    if (companyNameOrCode != "" || companyNameOrCode !== undefined) params = params.append("companyNameOrCode", companyNameOrCode!);
    if (isEnabled !== undefined) params = params.append("isEnabled", isEnabled!);

    return this.http.get<Provider[]>(this.URL_API, {params}).pipe(
      catchError(this.errorService.handleError)
    );
  }
  
  getProviderById(id: number): Observable<Provider> {
    return this.http.get<Provider>(this.URL_API + "/" + id).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //CREATE METHOD:
  addProvider(provider: Provider): Observable<string> {
    return this.http.post(this.URL_API, provider, { responseType: 'text' }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //UPDATE METHOD:
  updateProvider(provider: Provider): Observable<string> {
    return this.http.put(this.URL_API + "/" + provider.id, provider, { responseType: 'text' }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //DELETE & RECOVER METHOD:
  deleteOrRecoverProvider(id: number): Observable<string> {
    return this.http.delete(this.URL_API + "/" + id, { responseType: 'text' }).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //VALIDATION METHODS:
  validateCode(code: string): Observable<Boolean> {

    let params = new HttpParams();

    params = params.append("type", "code");
    params = params.append("value", code);

    return this.http.get<Boolean>(this.URL_API + "/validate", {params}).pipe(
      catchError(this.errorService.handleError)
    );
  }

  validateCuit(cuit: string): Observable<Boolean> {
    
    let params = new HttpParams();

    params = params.append("type", "cuit");
    params = params.append("value", cuit);

    return this.http.get<Boolean>(this.URL_API + "/validate", {params}).pipe(
      catchError(this.errorService.handleError)
    );
  }

  validateCompanyName(companyName: string): Observable<Boolean> {
        
    let params = new HttpParams();

    params = params.append("type", "companyName");
    params = params.append("value", companyName);

    return this.http.get<Boolean>(this.URL_API + "/validate", {params}).pipe(
      catchError(this.errorService.handleError)
    );
  }

  //CHARGE FORM METHODS:
  getSectorsForSelect(){
    return this.sectorService.getSectorsByIsEnabled(true).pipe(
      catchError(this.errorService.handleError)
    );
  }

  getCountriesForSelect(){
    return this.countryService.getCountries().pipe(
      catchError(this.errorService.handleError)
    );
  }

  getProvincesForSelect(countryId: number){
    return this.provinceService.getProvincesByCountry(countryId).pipe(
      catchError(this.errorService.handleError)
    );
  }

}
