import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private URL_API = "http://localhost:8080/sectors"

  constructor(private http: HttpClient) { }

  //GET METHODS:
  getSectors(isEnabled: boolean): Observable<Sector[]>{

    let params = new HttpParams();

    params = params.append('isEnabled', isEnabled);

    return this.http.get<Sector[]>(this.URL_API, { params });
  }

  //CREATE METHOD:
  addSector(sector: Sector): Observable<string> {
    return this.http.post(this.URL_API, sector, {responseType: 'text'});
  }

  //UPDATE METHOD:
  updateSector(sector: Sector): Observable<string> {
    return this.http.put(this.URL_API + "/" + sector.id, sector, {responseType: 'text'})
  }

  //DELETE & RECOVER METHOD:
  deleteOrRecoverSector(id: number): Observable<string> {
    return this.http.delete(this.URL_API + "/" + id, {responseType: 'text'});
  }

  //VALIDATION METHOD:
  validateName(name: string): Observable<boolean> {
    return this.http.get<boolean>(this.URL_API + "/validate/" + name);
  }

}
