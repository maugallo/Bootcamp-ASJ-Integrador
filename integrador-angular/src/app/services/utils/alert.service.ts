import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  getSuccessToast(titleMessage: string){
    return Swal.mixin({
        toast: true,
        icon: 'success',
        position: 'top-end',
        title: titleMessage,
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });
  }

  getErrorToast(titleMessage: string){
    return Swal.mixin({
      toast: true,
      icon: 'error',
      position: 'top',
      title: titleMessage,
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  getErrorAlert(textMessage: string){
    return Swal.mixin({
        icon: "error",
        title: "Error",
        text: textMessage,
    });
  }

  getWarningAlert(titleMessage: string){
    return Swal.fire({
      icon: "warning",
      title: titleMessage,
    });
  }

  getConfirmModal(){
    return Swal.mixin({
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cerrar"
    });
  }

  getInputModal(titleMessage: string, placeholderMessage: string, confirmMessage: string, inputValue?: string){
    return Swal.mixin({
      title: titleMessage,
      input: "text",
      inputValue: inputValue ? inputValue : '',
      inputPlaceholder: placeholderMessage,
      showCancelButton: true,
      confirmButtonText: confirmMessage,
      cancelButtonText: "Cerrar",
    })
  }

}
