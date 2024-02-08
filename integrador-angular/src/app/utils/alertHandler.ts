import Swal from "sweetalert2";

export class AlertHandler{

    constructor() {}

    public getToast(){
        return Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    public getErrorAlert(){
        return Swal.mixin({
            icon: "error",
            title: "Error",
        });
    }

}