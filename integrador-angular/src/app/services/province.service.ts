import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../models/province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  private URL_API: string = "http://localhost:8080/provinces";

  constructor(private http: HttpClient) { }

  //GET METHOD:
  getProvincesByCountry(countryId: number): Observable<Province[]>{
    return this.http.get<Province[]>(this.URL_API + "/country/" + countryId);
  }

}
