import { Component, OnInit } from '@angular/core';
import { ServiceProveedorService } from '../../../../services/service-proveedor.service';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrl: './form-proveedor.component.css'
})
export class FormProveedorComponent implements OnInit {
  //Objeto Proveedor que se enlazará mediante ngModel en el form:
  proveedor: Provider = {
    code: "",
    companyName: "",
    sector: "",
    logo: "",
    website: "",
    name: "",
    sirname: "",
    telephone: "",
    email: "",
    role: "",
    cuit: "",
    vat: "Responsable Inscripto", //Para inicializar marcado alguno de los radiobutton cuando carga el form.
    street: "",
    num: "",
    zipCode: "",
    locality: "",
    province: "",
    country: "",
    enabled: true,
  }

  //Select de países, provincias y localidades que se renderizarán en el form.
  selectCountries: any[] = [];
  selectStates: any[] = [];
  selectCities: any[] = [];

  //Variables para manejar el título y nombre del botón:
  title: string = "AGREGAR PROVEEDOR";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará un proveedor:
  codigoParam!: string;

  constructor(public proveedorService: ServiceProveedorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.renderCountriesSelect();

    this.codigoParam = this.getParameter();
    let proveedorByParam = this.proveedorService.getProvider(this.codigoParam);
      if (proveedorByParam){
        this.proveedor = proveedorByParam;
        this.renderStatesSelect();
        this.renderCitiesSelect();
        this.title = "EDITAR PROVEEDOR";
        this.buttonName = "Editar";
      } else{
        this.router.navigate(['providers/form-provider']);
    }
  }

  getParameter(){
    return this.activatedRoute.snapshot.params['id'];
  }

  renderCountriesSelect(){
    this.proveedorService.getCountries().subscribe((data) => {
      this.selectCountries = data.filter((pais: any) => pais.subregion === "South America");
    });
  }

  renderStatesSelect(){
    this.proveedorService.getStates().subscribe((data) => {
      this.selectStates = data.filter((state: any) => (state.country_name === this.proveedor.country));
    });
  }

  renderCitiesSelect(){
    this.proveedorService.getCities().subscribe((data) =>{
      this.selectCities = data.filter((city: any) => (city.state_name === this.proveedor.province && city.country_name === this.proveedor.country));
    });
  }

  //Métodos de formulario para agregar proveedores:
  onSubmit(form: NgForm) {
    if (form.valid){
      if (this.buttonName === "Agregar"){
        if (this.isCodeRepeated(this.proveedor.code)){
          alert("El código del proveedor ya existe");
        }

        else{
          this.proveedor.code = this.proveedor.code.toUpperCase();
          this.proveedorService.addProvider(this.proveedor);
          alert("Proveedor creado!");
          this.router.navigate(['providers/']);
        }

      } else if (this.buttonName === "Editar"){
        this.proveedorService.updateProvider(this.proveedor);
        alert("Proveedor editado!");
        this.router.navigate(['providers/']);
      }
    }
  }
  
  isCodeRepeated(codigo: string){
    let index = this.proveedorService.getProviders().findIndex((proveedor: Provider) => (proveedor.code === codigo));
    if (index != -1){
      return true;
    } else{
      return false;
    }
  }

  chooseCountry(){ //Método del evento (change) del select de países.
    this.clearStateSelect();
    this.clearCitySelect();

    this.renderStatesSelect();
  }

  chooseState(){ //Método del evento (change) del select de provincias.
    this.clearCitySelect();

    this.renderCitiesSelect();
  }

  //Métodos auxiliares:
  clearStateSelect(){
    this.selectStates = []; //Limpio el select de provincias.
    this.proveedor.province = "";
  }

  clearCitySelect(){
    this.selectCities = []; //Limpio el select de localidades.
    this.proveedor.locality = "";
  }
}
