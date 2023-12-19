import { Component } from '@angular/core';
import { ServiceOrdenService } from '../../../../services/service-orden.service';
import { Router } from '@angular/router';
import { Orden } from '../../../../models/ordenes';

@Component({
  selector: 'app-form-orden',
  templateUrl: './form-orden.component.html',
  styleUrl: './form-orden.component.css'
})
export class FormOrdenComponent {

  orden!: Orden;

  txtCodigo!: number;
  txtFechaEmision!: Date;
  txtFechaEntrega!: Date;
  txtDireccion!: string;
  txtProveedor!: string;
  txtProducto!: string;
  txtCantidad!: number;
  txtTotal!: number;

  constructor(private ordenService: ServiceOrdenService, private router: Router) { }

  ngOnInit(): void {

  }

  addOrder() {
    this.txtCodigo = this.generateCode;
    this.orden = { codigo: this.txtCodigo, fechaEmision: this.txtFechaEmision, fechaEntrega: this.txtFechaEntrega, direccion: this.txtDireccion, proveedor: this.txtProveedor, producto: this.txtProducto, cantidad: this.txtCantidad, total: this.txtTotal }
    //Llamar al servicio.
    this.ordenService.addOrder(this.orden);
    alert("Orden creada!");
    //Redireccionar hacia la lista.
    this.router.navigate(['orders/']);
  }

  //Métodos para generar el código:
  get generateCode(){
    let codigo!: number;
    const ordenesData = this.ordenService.getStorage("ordenes");
    if (ordenesData === null || ordenesData.length === 0){
      codigo = 1;
    } else{
      codigo = this.getLastCode(ordenesData);
    }
    return codigo;
  }

  getLastCode(array: Orden[]){
    return array[array.length - 1].codigo + 1;
  }

}
