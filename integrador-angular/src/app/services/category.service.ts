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

  //GET METHODS:
  getEnabledCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.URL_API + "/enabled");
  }

  getDisabledCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.URL_API + "/disabled");
  }

  //CREATE METHOD:
  addCategory(category: Category): Observable<string> {
    return this.http.post(this.URL_API, category, {responseType: 'text'});
  }

  //UPDATE METHOD:
  updateCategory(category: Category): Observable<string> {
    return this.http.put(this.URL_API + "/" + category.id, category, {responseType: 'text'})
  }

  //DELETE & RECOVER METHOD:
  deleteOrRecoverCategory(id: number): Observable<string> {
    return this.http.delete(this.URL_API + "/" + id, {responseType: 'text'});
  }

  //VALIDATION METHOD:
  validateName(name: string): Observable<boolean> {
    return this.http.get<boolean>(this.URL_API + "/validate/" + name);
  }

}
