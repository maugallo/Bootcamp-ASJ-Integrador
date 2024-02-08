import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private URL_API = "http://localhost:8080/users";
  private behaviourSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  authenticateUser(user: User): Observable<boolean>{
    return this.http.post<boolean>(this.URL_API + "/login", user);
  }

  isAuthenticated(){
    if (localStorage.getItem('authenticated') !== null && localStorage.getItem('authenticated') === 'true'){
      this.behaviourSubject.next(true);
      return true;
    } else {
      this.behaviourSubject.next(false);
      return false;
    }
  }

  getIsUserAuthenticated(){
    return this.behaviourSubject.asObservable();    
  }

}
