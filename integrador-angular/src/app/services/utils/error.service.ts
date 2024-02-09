import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse){
    if (error.status === 0){
      return throwError(() => new Error("Error al conectar con el servidor"));
    } else {
      console.error(`El servidor devolvió un código ${error.status}, el error fue: `, error.error);
      return throwError(() => new Error("Ocurrió un error en el servidor, porfavor intentalo de nuevo más tarde"));
    }
  }

}
