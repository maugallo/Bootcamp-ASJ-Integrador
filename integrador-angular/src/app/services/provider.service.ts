import { Injectable } from '@angular/core';
import { Provider } from '../models/provider';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SectorService } from './sector.service';
import { CountryService } from './country.service';
import { ProvinceService } from './province.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private URL_API: string = "http://localhost:8080/providers";

  constructor(
    private http: HttpClient,
    private sectorService: SectorService,
    private countryService: CountryService,
    private provinceService: ProvinceService
  ) {}

  //GET METHODS:
  getProvidersByIsEnabled(isEnabled: boolean): Observable<Provider[]> {
    let params = new HttpParams();
    params = params.append("isEnabled", isEnabled!);

    return this.http.get<Provider[]>(this.URL_API, {params}).pipe(
      catchError(this.handleError) //telling catchError that if the Observable throws an error, to call the handleError() method. It automatically passes the error as a parameter to the method.
    );
  }

  getProvidersByFilter(companyNameOrCode?: string, isEnabled?: boolean){
    let params = new HttpParams();

    if (companyNameOrCode != "" || companyNameOrCode !== undefined) params = params.append("companyNameOrCode", companyNameOrCode!);
    if (isEnabled !== undefined) params = params.append("isEnabled", isEnabled!);

    return this.http.get<Provider[]>(this.URL_API, {params}).pipe(
      catchError(this.handleError)
    );
  }
  
  getProviderById(id: number): Observable<Provider> {
    return this.http.get<Provider>(this.URL_API + "/" + id).pipe(
      catchError(this.handleError)
    );
  }

  //CREATE METHOD:
  addProvider(provider: Provider): Observable<string> {
    return this.http.post(this.URL_API, provider, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  //UPDATE METHOD:
  updateProvider(provider: Provider): Observable<string> {
    return this.http.put(this.URL_API + "/" + provider.id, provider, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  //DELETE & RECOVER METHOD:
  deleteOrRecoverProvider(id: number): Observable<string> {
    return this.http.delete(this.URL_API + "/" + id, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  //VALIDATION METHODS:
  validateCode(code: string): Observable<Boolean> {

    let params = new HttpParams();

    params = params.append("type", "code");
    params = params.append("value", code);

    return this.http.get<Boolean>(this.URL_API + "/validate", {params}).pipe(
      catchError(this.handleError)
    );
  }

  validateCuit(cuit: string): Observable<Boolean> {
    
    let params = new HttpParams();

    params = params.append("type", "cuit");
    params = params.append("value", cuit);

    return this.http.get<Boolean>(this.URL_API + "/validate", {params}).pipe(
      catchError(this.handleError)
    );
  }

  validateCompanyName(companyName: string): Observable<Boolean> {
        
    let params = new HttpParams();

    params = params.append("type", "companyName");
    params = params.append("value", companyName);

    return this.http.get<Boolean>(this.URL_API + "/validate", {params}).pipe(
      catchError(this.handleError)
    );
  }

  //CHARGE FORM METHODS:
  getSectorsForSelect(){
    return this.sectorService.getSectors(true).pipe(
      catchError(this.handleError)
    );
  }

  getCountriesForSelect(){
    return this.countryService.getCountries().pipe(
      catchError(this.handleError)
    );
  }

  getProvincesForSelect(countryId: number){
    return this.provinceService.getProvincesByCountry(countryId).pipe(
      catchError(this.handleError)
    );
  }

  //HANDLE ERRORS METHOD:
  handleError(error: HttpErrorResponse){
    if (error.status === 0){
      return throwError(() => new Error("Error al conectar con el servidor"));
    } else {
      console.error(`El servidor devolvió un código ${error.status}, el error fue: `, error.error);
      return throwError(() => new Error("Ocurrió un error en el servidor, porfavor intentalo de nuevo más tarde"));
    }
  }
}
