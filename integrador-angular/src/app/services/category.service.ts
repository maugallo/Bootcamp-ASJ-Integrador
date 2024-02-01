import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL_API = "http://localhost:8080/categories"

  constructor(private http: HttpClient) { }

  getEnabledCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.URL_API + "/enabled");
  }

}
