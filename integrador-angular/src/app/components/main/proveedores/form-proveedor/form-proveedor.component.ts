import { Component, OnInit } from '@angular/core';
import { ServiceProveedorService } from '../../../../services/service-proveedor.service';
import { Proveedor } from '../../../../models/proveedores';
import { Direccion } from '../../../../models/proveedores';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrl: './form-proveedor.component.css'
})
export class FormProveedorComponent implements OnInit {
  proveedor!: Proveedor;
  codigo!: number;
  direccion!: Direccion;

  txtRazonSocial!: string;
  txtRubro!: string;
  txtSitioWeb!: string;
  txtNombre!: string;
  txtApellido!: string;
  txtTelefono!: string;
  txtEmail!: string;
  txtRol!: string;
  txtCuit!: string;
  txtIva: string = "Responsable Inscripto"; //Para preseleccionar alguno de los radiobutton cuando carga el form.

  txtCalle!: string;
  txtNum!: string;
  txtCodPostal!: string;
  txtLocalidad!: string;
  txtProvincia!: string;
  txtPais!: string;

  constructor(private proveedorService: ServiceProveedorService, private router: Router) { }

  ngOnInit(): void {

  }

  addProvider() {
    //Creo el objeto Dirección, genero el código autoincrementable y el objeto Proveedor.
    this.direccion = { calle: this.txtCalle, num: Number(this.txtNum), codPostal: Number(this.txtCodPostal), localidad: this.txtLocalidad, provincia: this.txtProvincia, pais: this.txtPais}
    this.codigo = this.generateCode;
    this.proveedor = { codigo: this.codigo, razonSocial: this.txtRazonSocial, rubro: this.txtRubro, sitioWeb: this.txtSitioWeb, nombre: this.txtNombre, apellido: this.txtApellido, telefono: this.txtTelefono, email: this.txtEmail, rol: this.txtRol, cuit: this.txtCuit, iva: this.txtIva, direccion: this.direccion }
    //Llamar al servicio.
    this.proveedorService.addProvider(this.proveedor);
    alert("Proveedor creado!");
    //Redireccionar hacia la lista.
    this.router.navigate(['providers/']);
  }

  //Métodos para generar el código:
  get generateCode(){
    let codigo!: number;
    const proveedoresData = localStorage.getItem("proveedores");
    if (proveedoresData === null || JSON.parse(proveedoresData).length === 0){
      codigo = 1;
    } else{
      codigo = this.getLastCode(JSON.parse(proveedoresData));
    }
    return codigo;
  }

  getLastCode(array: Proveedor[]){
    return array[array.length - 1].codigo + 1;
  }

  //Métodos de validación:
  get validateData() {
    return null;
  }

  isEmptyOrWhiteSpaces(text: string) {
    if ((text === undefined) || text.match(/^\s*$/) != null) {
      return true;
    } else {
      return false;
    }
  }

  isNumeric(text: string) {
    if (text.match(/^[0-9+()#]*$/) != null) {
      return true;
    } else {
      return false;
    }
  }

  isCuit(text: string) {
    if (text.match(/^\d{2}-\d{8}-\d{1}$/) != null) {
      return true;
    } else {
      return false;
    }
  }
}
