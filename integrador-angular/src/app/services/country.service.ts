import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private URL_API: string = "http://localhost:8080/countries";

  constructor(private http: HttpClient) { }

  //GET METHOD:
  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.URL_API);
  }

}
