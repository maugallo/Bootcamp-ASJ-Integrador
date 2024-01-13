import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrl: './provider-form.component.css'
})
export class ProviderFormComponent implements OnInit {
  //Objeto Proveedor que se enlazará mediante ngModel en el form:
  provider: Provider = {
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
  countrySelect: any[] = [];
  stateSelect: any[] = [];
  localitySelect: any[] = [];

  //Variables para manejar el título y nombre del botón:
  formTitle: string = "AGREGAR PROVEEDOR";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará un proveedor:
  param!: string;

  constructor(public providerService: ProviderService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.renderCountrySelect();

    this.param = this.getParameter();
    let providerByParam = this.providerService.getProvider(this.param);
      if (providerByParam){
        this.provider = providerByParam;
        this.renderStateSelect();
        this.renderLocalitySelect();
        this.formTitle = "EDITAR PROVEEDOR";
        this.buttonName = "Editar";
      } else{
        this.router.navigate(['providers/form-provider']);
    }
  }

  getParameter(){
    return this.activatedRoute.snapshot.params['id'];
  }

  renderCountrySelect(){
    this.providerService.getCountries().subscribe((data) => {
      this.countrySelect = data.filter((country: any) => country.subregion === "South America");
    });
  }

  renderStateSelect(){
    this.providerService.getStates().subscribe((data) => {
      this.stateSelect = data.filter((state: any) => (state.country_name === this.provider.country));
    });
  }

  renderLocalitySelect(){
    this.providerService.getCities().subscribe((data) =>{
      this.localitySelect = data.filter((locality: any) => (locality.state_name === this.provider.province && locality.country_name === this.provider.country));
    });
  }

  //Métodos de formulario para agregar proveedores:
  onSubmit(form: NgForm) {
    if (form.valid){
      if (this.buttonName === "Agregar"){
        if (this.isCodeRepeated(this.provider.code)){
          alert("El código del proveedor ya existe");
        }

        else{
          this.provider.code = this.provider.code.toUpperCase();
          this.providerService.addProvider(this.provider);
          alert("Proveedor creado!");
          this.router.navigate(['providers/']);
        }

      } else if (this.buttonName === "Editar"){
        this.providerService.updateProvider(this.provider);
        alert("Proveedor editado!");
        this.router.navigate(['providers/']);
      }
    }
  }
  
  isCodeRepeated(code: string){
    let index = this.providerService.getProviders().findIndex((provider: Provider) => (provider.code === code));
    if (index != -1){
      return true;
    } else{
      return false;
    }
  }

  chooseCountry(){ //Método del evento (change) del select de países.
    this.clearStateSelect();
    this.clearCitySelect();

    this.renderStateSelect();
  }

  chooseState(){ //Método del evento (change) del select de provincias.
    this.clearCitySelect();

    this.renderLocalitySelect();
  }

  //Métodos auxiliares:
  clearStateSelect(){
    this.stateSelect = []; //Limpio el select de provincias.
    this.provider.province = "";
  }

  clearCitySelect(){
    this.localitySelect = []; //Limpio el select de localidades.
    this.provider.locality = "";
  }
}
