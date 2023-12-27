import { Component, OnInit } from '@angular/core';
import { ServiceProveedorService } from '../../../../services/service-proveedor.service';
import { Proveedor } from '../../../../models/proveedores';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrl: './form-proveedor.component.css'
})
export class FormProveedorComponent implements OnInit {
  //Objeto Proveedor que se enlazará mediante ngModel en el form:
  proveedor: Proveedor = {
    codigo: "",
    razonSocial: "",
    rubro: "",
    sitioWeb: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    rol: "",
    cuit: "",
    iva: "Responsable Inscripto", //Para inicializar marcado alguno de los radiobutton cuando carga el form.
    calle: "",
    num: undefined,
    codPostal: undefined,
    localidad: "",
    provincia: "",
    pais: "",
    habilitado: true,
  }

  //Select de países, provincias y localidades que se renderizará en el form.
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  //Variables para manejar el tíutlo y nombre del botón:
  title: string = "AGREGAR PROVEEDOR";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará un proveedor:
  codigoParam!: string;

  constructor(public proveedorService: ServiceProveedorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCountries();

    this.codigoParam = this.activatedRoute.snapshot.params['id'];
      if (this.proveedorService.getProvider(this.codigoParam) !== undefined){
        this.proveedor = this.proveedorService.getProvider(this.codigoParam);
        this.getStates();
        this.getCities();
        this.title = "EDITAR PROVEEDOR";
        this.buttonName = "Editar";
      } else{
        this.router.navigate(['providers/form-provider']);
      }

  }

  onSubmit(form: NgForm) {
    if (form.valid){
      this.proveedor.codigo = this.proveedor.codigo.toUpperCase();
      if (this.buttonName === "Agregar"){
        if (this.isCodeRepeated(this.proveedor.codigo)){
          alert("El código del proveedor ya existe");
        } else{
          this.proveedorService.addProvider(this.proveedor);
          alert("Proveedor creado!"); //(Cambiar por otra alerta)
          this.router.navigate(['providers/']);
        }
      } else if (this.buttonName === "Editar"){
        this.proveedorService.updateProvider(this.proveedor);
        alert("Proveedor editado!"); //(Cambiar por otra alerta)
        this.router.navigate(['providers/']);
      }
    }
  }
  
  selectCountry(){
    this.states = []; //Limpio el select de provincias.
    this.cities = []; //Limpio el select de localidades.
    this.proveedor.provincia = "";
    this.proveedor.localidad = "";

    this.getStates();
  }

  selectState(){
    this.cities = []; //Limpio el select de localidades.
    this.proveedor.localidad = "";

    this.getCities();
  }

  //Llamadas a la API:
  getCountries(){
    this.proveedorService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  getStates(){
    this.proveedorService.getStates().subscribe((data) => {
      this.states = data.filter((state: any) => (state.country_name === this.proveedor.pais));
    });
  }

  getCities(){
    this.proveedorService.getCities().subscribe((data) =>{
      this.cities = data.filter((city: any) => (city.state_name === this.proveedor.provincia));
    });
  }

  //Métodos auxiliares:
  isCodeRepeated(codigo: string){
    let index = this.proveedorService.getProviders().findIndex((proveedor: Proveedor) => (proveedor.codigo === codigo));
    if (index != -1){
      return true;
    } else{
      return false;
    }
  }

  //Métodos de validación:
  /* get validateData() {
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
  } */
}
