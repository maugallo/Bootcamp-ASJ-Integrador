import { Component } from '@angular/core';
import { ServiceOrdenService } from '../../../../services/service-orden.service';
import { Router } from '@angular/router';
import { Orden } from '../../../../models/ordenes';
import { NgForm } from '@angular/forms';
import { Proveedor } from '../../../../models/proveedores';
import { Producto } from '../../../../models/productos';

@Component({
  selector: 'app-form-orden',
  templateUrl: './form-orden.component.html',
  styleUrl: './form-orden.component.css'
})
export class FormOrdenComponent {
  //Objeto Orden que se enlazará mediante ngModel en el form:
  orden: Orden = {
    nroOrden: undefined,
    fechaEmision: undefined,
    fechaEntrega: undefined,
    infoRecepcion: "",
    direccion: "",
    proveedor: undefined,
    listaItems: [],
    total: undefined,
    habilitado: true,
  }

  //Select de proveedores que se renderizará en el form.
  proveedores!: Proveedor[];
  codigoProveedor!: string;

  //Select de productos que se rendizará en el form.
  productos!: Producto[];
  skuProducto!: string | undefined;

  //Variables para manejar el título y nombre del botón:
  title: string = "AGREGAR ÓRDEN DE COMPRA";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará una órden de compra:
  nroOrdenParam!: string;

  constructor(private ordenService: ServiceOrdenService, private router: Router) { }

  ngOnInit(): void {
    this.proveedores = this.ordenService.getProvidersForSelect();
  }

  onSubmit(form: NgForm){

  }

  selectProvider(){
    this.productos = this.ordenService.getProductsForSelect(this.codigoProveedor);
  }

}
