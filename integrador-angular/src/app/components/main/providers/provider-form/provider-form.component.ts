import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Sector } from '../../../../models/sector';
import { SectorService } from '../../../../services/sector.service';
import { Address } from '../../../../models/address';
import { VatCondition } from '../../../../models/vatCondition';
import { Country } from '../../../../models/country';
import { Province } from '../../../../models/province';
import { Contact } from '../../../../models/contact';
import { ContactService } from '../../../../services/contact.service';
import { AlertHandler } from '../../../../utils/alertHandler';
import Swal from 'sweetalert2';
import { Locality } from '../../../../models/locality';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrl: './provider-form.component.css',
})
export class ProviderFormComponent implements OnInit {
  //Objetos que se enlazarán mediante ngModel en el form:
  country!: Country;
  province!: Province;

  address: Address = {
    locality: {
      name: '',
      province: null!,
    },
    street: '',
    num: '',
    zipCode: '',
  };

  contact: Contact = {
    telephone: '',
    email: '',
  };

  provider: Provider = {
    sector: null!,
    vatCondition: null!,
    contact: null!,
    address: null!,
    code: '',
    companyName: '',
    logo: '',
    website: '',
    firstName: '',
    lastName: '',
    role: '',
    cuit: '',
    isEnabled: true,
  };

  realProvider: Provider = {
    sector: null!,
    vatCondition: null!,
    contact: {
      telephone: '',
      email: '',
    },
    address: null!,
    code: '',
    companyName: '',
    logo: '',
    website: '',
    firstName: '',
    lastName: '',
    role: '',
    cuit: '',
    isEnabled: true,
  };

  //Select de condiciones de IVA que se renderizarán en el form.
  vatConditionSelect: VatCondition[] = [
    'IVA_RESPONSABLE_INSCRIPTO',
    'IVA_RESPONSABLE_NO_INSCRIPTO',
    'IVA_NO_RESPONSABLE',
    'IVA_SUJETO_EXENTO',
    'CONSUMIDOR_FINAL',
    'RESPONSABLE_MONOTRIBUTO',
    'SUJETO_NO_CATEGORIZADO',
    'PROVEEDOR_DEL_EXTERIOR',
    'CLIENTE_DEL_EXTERIOR',
    'IVA_LIBERADO',
    'AGENTE_DE_PERCEPCIÓN',
    'PEQUEÑO_CONTRIBUYENTE_EVENTUAL',
    'MONOTRIBUTISTA_SOCIAL',
    'PEQUEÑO_CONTRIBUYENTE_EVENTUAL_SOCIAL',
  ];

  //Select de rubros que se renderizarán en el form.
  sectorSelect: Sector[] = [];

  //Select de países, provincias y localidades que se renderizarán en el form.
  countrySelect: any[] = [];
  provinceSelect: any[] = [];

  //Variables para manejar el título y nombre del botón:
  formTitle: string = 'AGREGAR PROVEEDOR';
  buttonName: string = 'Agregar';

  //Variable para determinar si se editará o creará un proveedor:
  param!: number;

  //Validaciones del back:
  @ViewChild('email') emailNgModel!: NgModel;
  @ViewChild('telephone') telephoneNgModel!: NgModel;
  @ViewChild('code') codeNgModel!: NgModel;
  @ViewChild('cuit') cuitNgModel!: NgModel;
  @ViewChild('companyName') companyNameNgModel!: NgModel;

  private alertHandler = new AlertHandler();

  constructor(
    public providerService: ProviderService,
    public contactService: ContactService,
    public sectorService: SectorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.renderSectorSelect();
    this.renderCountrySelect();

    this.param = this.getParameter();
    if (this.param) {
      this.providerService.getProviderById(this.param).subscribe({
        next: (data) => {
          if (data) {
            this.realProvider = data;
  
            this.provider = JSON.parse(JSON.stringify(this.realProvider)); //Deep copy of the object.
  
            this.preRenderCountry();
            this.preRenderSector();
            this.contact = this.provider.contact;
            this.address = this.provider.address;
  
            this.formTitle = 'EDITAR PROVEEDOR';
            this.buttonName = 'Editar';
          } else {
            this.router.navigate(['providers/form-provider']);
          }
        },
        error: () => {
          this.router.navigate(['providers/form-provider']);
        }
      });
    } else {
      this.router.navigate(['providers/form-provider']);
    }
  }

  getParameter() {
    return this.activatedRoute.snapshot.params['id'];
  }

  renderSectorSelect() {
    this.sectorService.getSectors(true).subscribe((data) => {
      this.sectorSelect = data;
    });
  }

  renderCountrySelect() {
    this.providerService.getCountries().subscribe((data) => {
      this.countrySelect = data;
    });
  }

  renderProvinceSelect() {
    this.providerService.getProvinces(this.country.id).subscribe((data) => {
      this.provinceSelect = data;
    });
  }

  preRenderSector() {
    this.provider.sector = this.sectorSelect.find(
      (sector) => sector.id === this.provider.sector.id
    )!;
  }

  preRenderCountry() {
    this.country = this.countrySelect.find(
      (country) =>
        country.id === this.provider.address.locality.province!.country.id
    );
    this.preRenderProvince();
  }

  preRenderProvince() {
    this.providerService.getProvinces(this.country.id).subscribe({
      next: (data) => {
        this.provinceSelect = data;
      },
      complete: () => {
        this.province = this.provinceSelect.find(
          (province) =>
            province.id === this.provider.address.locality.province!.id
        );
        this.preRenderLocality();
      },
    });
  }

  preRenderLocality() {
    this.providerService.getLocalities(this.province.id).subscribe({
      next: (data) => {
        this.address.locality = data.find(
          (locality: Locality) => locality.id === this.provider.address.locality.id
        );
      }
    });
  }

  validateRepeatedEmail(){
    if (this.contact.email !== '' && this.contact.email !== this.realProvider.contact.email){
      this.contactService.validateEmail(this.contact.email).subscribe({
        next: (isRepeated) => {
          if (isRepeated){ //If the email is repeated in the database, we set the new custom validation.
            this.emailNgModel.control.setErrors({ ...this.emailNgModel.errors, emailRepeated: true}); //with { ...this.emailNgModel.errors, customValidation: true }, we are creating a new object that contains all existing validation errors from this.emailNgModel.errors and we are adding our new custom validation error to that object.
          } else { //If the email is not repeated in the database, we delete the custom validation.
            if (this.emailNgModel.errors?.['emailRepeated']) {
              delete this.emailNgModel.errors['emailRepeated']; //Deleting the validation using the operator 'delete' (deletes the property of an object)
              this.emailNgModel.control.setErrors(this.emailNgModel.errors);
            }
          }
        },
        error: () => {
          this.emailNgModel.control.setErrors({ ...this.emailNgModel.errors, httpError: true});
        }
      })
    }
  }

  validateRepeatedTelephone(){
    if (this.contact.telephone !== '' && this.contact.telephone !== this.realProvider.contact.telephone){
      this.contactService.validateTelephone(this.contact.telephone).subscribe({
        next: (isRepeated) => {
          if (isRepeated){
            this.telephoneNgModel.control.setErrors({ ...this.telephoneNgModel.errors, telephoneRepeated: true});
          } else {
            if (this.telephoneNgModel.errors?.['telephoneRepeated']) {
              delete this.telephoneNgModel.errors['telephoneRepeated'];
              this.telephoneNgModel.control.setErrors(this.telephoneNgModel.errors);
            }
          }
        },
        error: () => {
          this.telephoneNgModel.control.setErrors({ ...this.telephoneNgModel.errors, httpError: true});
        }
      })
    }
  }

  validateRepeatedCode(){
    if (this.provider.code !== '' && this.provider.code !== this.realProvider.code){
      this.providerService.validateCode(this.provider.code).subscribe({
        next: (isRepeated) => {
          if (isRepeated){
            this.codeNgModel.control.setErrors({ ...this.codeNgModel.errors, codeRepeated: true});
          } else {
            if (this.codeNgModel.errors?.['codeRepeated']) {
              delete this.codeNgModel.errors['codeRepeated'];
              this.codeNgModel.control.setErrors(this.codeNgModel.errors);
            }
          }
        },
        error: () => {
          this.codeNgModel.control.setErrors({ ...this.codeNgModel.errors, httpError: true});
        }
      })
    }
  }

  validateRepeatedCuit(){
    if (this.provider.cuit !== '' && this.provider.cuit !== this.realProvider.cuit){
      this.providerService.validateCuit(this.provider.cuit).subscribe({
        next: (isRepeated) => {
          if (isRepeated){
            this.cuitNgModel.control.setErrors({ ...this.cuitNgModel.errors, cuitRepeated: true});
          } else {
            if (this.cuitNgModel.errors?.['cuitRepeated']) {
              delete this.cuitNgModel.errors['cuitRepeated'];
              this.cuitNgModel.control.setErrors(this.cuitNgModel.errors);
            }
          }
        },
        error: () => {
          this.cuitNgModel.control.setErrors({ ...this.cuitNgModel.errors, httpError: true});
        }
      })
    }
  }

  validateRepeatedCompanyName(){
    if (this.provider.companyName !== '' && this.provider.companyName !== this.realProvider.companyName){
      this.providerService.validateCompanyName(this.provider.companyName).subscribe({
        next: (isRepeated) => {
          if (isRepeated) {
            this.companyNameNgModel.control.setErrors({ ...this.companyNameNgModel.errors, companyNameRepeated: true});
          } else {
            if (this.companyNameNgModel.errors?.['companyNameRepeated']) {
              delete this.companyNameNgModel.errors['companyNameRepeated'];
              this.companyNameNgModel.control.setErrors(this.companyNameNgModel.errors);
            }
          }
        },
        error: () => {
          this.companyNameNgModel.control.setErrors({ ...this.companyNameNgModel.errors, httpError: true});
        }
      })
    }
  }

  //Métodos de formulario para agregar proveedores:
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.address.locality.province = this.province;
      this.provider.address = this.address;
      this.provider.contact = this.contact;
      this.provider.code = this.provider.code.toUpperCase();
      this.realProvider = this.provider;
      if (this.buttonName === 'Agregar') {
        this.addProvider();
      } else if (this.buttonName === 'Editar') {
        this.updateProvider();
      }
    }
  }

  addProvider() {
    this.providerService.addProvider(this.realProvider).subscribe({
      //We pass one argument to subscribe: An Observer object. Which has the neccesary functions to handle the results that the Observable we are susbcribed to, like new data or an error.
      next: (data) => {
        //If the observable emmits new data, we use 'next'.
        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });

        this.router.navigate(['providers/']);
      },
      error: (error) => {
        //If the observable emmits an error, we use 'error'.
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.error
        });
      },
    });
  }

  updateProvider() {
    this.providerService.updateProvider(this.realProvider).subscribe({
      next: (data) => {
        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });

        this.router.navigate(['providers/']);
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.error
        });
      },
    });
  }

  chooseCountry() {
    //Método del evento (change) del select de países.
    this.clearProvinceSelect();

    this.renderProvinceSelect();
  }

  //Métodos auxiliares:
  clearProvinceSelect() {
    this.provinceSelect = []; //Limpio el select de provincias.
    this.province = null!;
  }
}
