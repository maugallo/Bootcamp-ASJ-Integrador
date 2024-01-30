import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private URL_API = "http://localhost:8080/sectors"

  constructor(private http: HttpClient) { }

  getEnabledSectors():Observable<Sector[]> {
    return this.http.get<Sector[]>(this.URL_API + "/enabled");
  }

}
