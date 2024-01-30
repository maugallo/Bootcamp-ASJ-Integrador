import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Sector } from '../../../../models/sector';
import { SectorService } from '../../../../services/sector.service';
import { Address } from '../../../../models/address';
import { VatCondition } from '../../../../models/vatCondition';
import { Country } from '../../../../models/country';
import { Province } from '../../../../models/province';
import { Contact } from '../../../../models/contact';
import { Observable, map } from 'rxjs';

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
    locality: null!,
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
  localitySelect: any[] = [];

  //Variables para manejar el título y nombre del botón:
  formTitle: string = 'AGREGAR PROVEEDOR';
  buttonName: string = 'Agregar';

  //Variable para determinar si se editará o creará un proveedor:
  param!: string;

  constructor(
    public providerService: ProviderService,
    public sectorService: SectorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.renderSectorSelect();
    this.renderCountrySelect();

    this.param = this.getParameter();
    if (this.param) {
      this.providerService.getProviderByCode(this.param).subscribe((data) => {
        if (data) {
          this.provider = data;

          this.preRenderCountry();
          this.preRenderSector();
          this.contact = this.provider.contact;
          this.address = this.provider.address;

          this.formTitle = 'EDITAR PROVEEDOR';
          this.buttonName = 'Editar';
        } else {
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
    this.sectorService.getEnabledSectors().subscribe((data) => {
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

  renderLocalitySelect() {
    this.providerService.getLocalities(this.province.id).subscribe((data) => {
      this.localitySelect = data;
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
        country.id === this.provider.address.locality.province.country.id
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
            province.id === this.provider.address.locality.province.id
        );
        this.preRenderLocality();
      },
    });
  }

  preRenderLocality() {
    this.providerService.getLocalities(this.province.id).subscribe({
      next: (data) => {
        this.localitySelect = data;
      },
      complete: () => {
        this.address.locality = this.localitySelect.find(
          (locality) => locality.id === this.provider.address.locality.id
        );
      },
    });
  }

  //Métodos de formulario para agregar proveedores:
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.provider.address = this.address;
      this.provider.contact = this.contact;
      if (this.buttonName === 'Agregar') {
        this.isCodeRepeated(this.provider.code).subscribe({ //Validate also CUIT.
          next: (isRepeated) => {
            if (isRepeated) {
              alert('El código del proveedor ya existe'); //Usar SweetAlert2
            } else {
              this.addProvider();
            }
          }
        })
      } else if (this.buttonName === 'Editar') {
        this.updateProvider();
      }
    }
  }

  isCodeRepeated(code: string): Observable<Boolean> {
    return this.providerService.getProviderByCode(code).pipe(
      map(data => {
        if (data) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  addProvider() {
    this.providerService.addProvider(this.provider).subscribe({
      //We pass one argument to subscribe: An Observer object. Which has the neccesary functions to handle the results that the Observable we are susbcribed to, like new data or an error.
      next: (data) => {
        //If the observable emmits new data, we use 'next'.
        alert(data); //Usar SweetAlert2
        this.router.navigate(['providers/']);
      },
      error: (error) => {
        //If the observable emmits an error, we use 'error'.
        alert('Error creating the provider: ' + error);
        console.error('Error ocurred', error);
      },
    });
  }

  updateProvider() {
    this.providerService.updateProvider(this.provider).subscribe({
      next: (data) => {
        alert(data);
        this.router.navigate(['providers/']);
      },
      error: (error) => {
        alert('Error updating the provider: ' + error);
        console.error('Error ocurred', error);
      },
    });
  }

  chooseCountry() {
    //Método del evento (change) del select de países.
    this.clearProvinceSelect();
    this.clearLocalitySelect();

    this.renderProvinceSelect();
  }

  chooseProvince() {
    //Método del evento (change) del select de provincias.
    this.clearLocalitySelect();

    this.renderLocalitySelect();
  }

  //Métodos auxiliares:
  clearProvinceSelect() {
    this.provinceSelect = []; //Limpio el select de provincias.
    this.province = null!;
  }

  clearLocalitySelect() {
    this.localitySelect = []; //Limpio el select de localidades.
    this.address.locality = null!;
  }
}
