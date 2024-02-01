import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  private URL_API_CONTACT: string = "http://localhost:8080/contacts"

  validateEmail(email: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API_CONTACT + "/validate-email/" + email);
  }

  validateTelephone(telephone: string): Observable<Boolean> {
    return this.http.get<Boolean>(this.URL_API_CONTACT + "/validate-telephone/" + telephone);
  }
  
}
