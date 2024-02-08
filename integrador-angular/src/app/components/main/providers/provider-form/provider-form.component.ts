import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Sector } from '../../../../models/sector';
import { SectorService } from '../../../../services/sector.service';
import { VatCondition } from '../../../../models/vatCondition';
import { Country } from '../../../../models/country';
import { Province } from '../../../../models/province';
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
  //Country, province & locality attributes:
  inputCountry!: Country;
  inputProvince!: Province;
  inputLocality: Locality = {
    name: '',
    province: null!,
  }

  //Address object attributes:
  inputStreet!: string;
  inputNum!: string;
  inputZipCode!: string;

  //Contact object attributes:
  inputTelephone!: string;
  inputEmail!: string;

  //Provider object attributes:
  inputSector!: Sector;
  inputVatCondition!: string;
  inputCode!: string;
  inputCompanyName!: string;
  inputLogo: string = ''; //Opcional
  inputWebsite: string = ''; //Opcional
  inputFirstName!: string;
  inputLastName!: string;
  inputRole!: string;
  inputCuit!: string;

  //Provider object that will be send in the request:
  provider: Provider = {
    sector: undefined!,
    vatCondition: '',
    contact: {
      telephone: '',
      email: ''
    },
    address: {
      locality: undefined!,
      street: '',
      num: '',
      zipCode: '' 
    },
    code: '',
    companyName: '',
    logo: '',
    website: '',
    firstName: '',
    lastName: '',
    role: '',
    cuit: '',
    isEnabled: true
  }

  //Selects to render in the form:
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
  sectorSelect: Sector[] = [];
  countrySelect: any[] = [];
  provinceSelect: any[] = [];

  //Variables to handle create or update;:
  param!: number;
  formTitle: string = 'AGREGAR PROVEEDOR';
  buttonName: string = 'Agregar';

  //Back validations:
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
            this.provider = data;
            
            //Precharge all the selects and inputs:
            this.preRenderSector();
            this.preRenderCountryAndProvince();
            
            this.inputLocality = this.provider.address.locality;

            this.inputStreet = this.provider.address.street;
            this.inputNum = this.provider.address.num;
            this.inputZipCode = this.provider.address.zipCode;
            
            this.inputTelephone = this.provider.contact.telephone;
            this.inputEmail = this.provider.contact.email;
            
            this.inputSector = this.provider.sector;
            this.inputVatCondition = this.provider.vatCondition;
            this.inputCode = this.provider.code;
            this.inputCompanyName = this.provider.companyName;
            this.inputLogo = this.provider.logo;
            this.inputWebsite = this.provider.website;
            this.inputFirstName = this.provider.firstName;
            this.inputLastName = this.provider.lastName;
            this.inputRole = this.provider.role;
            this.inputCuit = this.provider.cuit;
  
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
    return Number(this.activatedRoute.snapshot.params['id']);
  }

  renderSectorSelect() {
    this.providerService.getSectorsForSelect().subscribe({
      next: (data) => {
        this.sectorSelect = data;
      },
      error: (error) => {
        this.sectorSelect = [];
        
        this.alertHandler.getToast().fire({
          icon: 'error',
          position: 'top',
          showCloseButton: false,
          title: error.message,
        });
      }
    });
  }

  renderCountrySelect() {
    this.providerService.getCountriesForSelect().subscribe({
      next: (data) => {
        this.countrySelect = data;
      },
      error: (error) => {
        this.countrySelect = [];

        this.alertHandler.getToast().fire({
          icon: 'error',
          position: 'top',
          showCloseButton: false,
          title: error.message,
        });
      }
    });
  }

  renderProvinceSelect() {
    this.providerService.getProvincesForSelect(this.inputCountry.id!).subscribe({
      next: (data) => {
        this.provinceSelect = data;
      },
      error: (error) => {
        this.provinceSelect = [];

        this.alertHandler.getToast().fire({
          icon: 'error',
          position: 'top',
          showCloseButton: false,
          title: error.message,
        });
      }
    });
  }

  preRenderSector() {
    this.provider.sector = this.sectorSelect.find(
      (sector) => sector.id === this.provider.sector.id
    )!;
  }

  preRenderCountryAndProvince() {
    if (this.countrySelect.length > 0){
      this.inputCountry = this.countrySelect.find((country) => country.id === this.provider.address.locality.province.country.id);
      this.preRenderProvince();
    }
  }

  preRenderProvince() {
    this.providerService.getProvincesForSelect(this.inputCountry.id!).subscribe({
      next: (data) => {
        this.provinceSelect = data;

        this.inputProvince = this.provinceSelect.find((province) => province.id === this.provider.address.locality.province.id);
      },
      error: (error) => {
        this.inputProvince = {name: '', country: null!}

        this.alertHandler.getToast().fire({
          icon: 'error',
          position: 'top',
          showCloseButton: false,
          title: error.message,
        });
      }
    });
  }

  validateRepeatedEmail(){
    if (this.provider.contact !== undefined && this.inputEmail !== '' && this.inputEmail !== this.provider.contact.email){
      this.contactService.validateEmail(this.inputEmail).subscribe({
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
    if (this.provider.contact !== undefined && this.inputTelephone !== '' && this.inputTelephone !== this.provider.contact.telephone){
      this.contactService.validateTelephone(this.inputTelephone).subscribe({
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
    if (this.provider.code !== undefined && this.inputCode !== '' && this.inputCode !== this.provider.code){
      this.providerService.validateCode(this.inputCode).subscribe({
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
    if (this.provider.cuit !== undefined && this.inputCuit !== '' && this.inputCuit !== this.provider.cuit){
      this.providerService.validateCuit(this.inputCuit).subscribe({
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
    if (this.provider.companyName !== undefined && this.inputCompanyName !== '' && this.inputCompanyName !== this.provider.companyName){
      this.providerService.validateCompanyName(this.inputCompanyName).subscribe({
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

  //Send data:
  onSubmit(form: NgForm) {
    if (form.valid) {

      this.inputLocality.province = this.inputProvince;

      this.provider.address.locality = this.inputLocality;
      this.provider.address.street = this.inputStreet;
      this.provider.address.num = this.inputNum;
      this.provider.address.zipCode = this.inputZipCode;

      this.provider.contact.email = this.inputEmail;
      this.provider.contact.telephone = this.inputTelephone;

      this.provider.sector = this.inputSector;
      this.provider.vatCondition = this.inputVatCondition;
      this.provider.code = this.inputCode.toUpperCase();
      this.provider.companyName = this.inputCompanyName;
      this.provider.logo = this.inputLogo;
      this.provider.website = this.inputWebsite;
      this.provider.firstName = this.inputFirstName;
      this.provider.lastName = this.inputLastName;
      this.provider.role = this.inputRole;
      this.provider.cuit = this.inputCuit;

      if (this.buttonName === 'Agregar') {
        this.addProvider();
      } else if (this.buttonName === 'Editar') {
        this.updateProvider();
      }
    }
  }

  addProvider() {
    this.providerService.addProvider(this.provider).subscribe({
      //We pass one argument to the subscribe method: An Observer object. Which has the neccesary functions to handle the results that the Observable we are susbcribed to, like new data or an error.
      next: (data) => { //If the observable emmits new data, we use 'next'.
        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });

        this.router.navigate(['providers/']);
      },
      error: (error) => { //If the observable emmits an error, we use 'error'.
        this.alertHandler.getErrorAlert().fire({
          text: error.message
        })
      },
    });
  }

  updateProvider() {
    this.providerService.updateProvider(this.provider).subscribe({
      next: (data) => {
        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });

        this.router.navigate(['providers/']);
      },
      error: (error) => {
        this.alertHandler.getErrorAlert().fire({
          text: error.message
        })
      },
    });
  }

  chooseCountry() { //Method connected with the (change) event in the countrySelect.
    this.clearProvinceSelect(); //If the user changes the country option, we clean the provinces select and render it again according to the selected country.
    this.renderProvinceSelect();
  }

  clearProvinceSelect() {
    this.provinceSelect = [];
    this.inputProvince = null!;
  }
}
