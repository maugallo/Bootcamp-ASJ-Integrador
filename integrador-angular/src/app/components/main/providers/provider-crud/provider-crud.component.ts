import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { Provider } from '../../../../models/provider';
import { AlertService } from '../../../../services/utils/alert.service';

@Component({
  selector: 'app-provider-crud',
  templateUrl: './provider-crud.component.html',
  styleUrl: './provider-crud.component.css'
})
export class ProviderCrudComponent implements OnInit {
  
  arrayEnabled!: Provider[];
  arrayDisabled!: Provider[];

  seeDisabled: boolean = false;

  companyNameOrCode: string = "";

  constructor(private providerService: ProviderService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openDeleteOrRecoverProviderModal(id: number) {
    this.alertService.getConfirmModal()
    .fire({
      title: this.seeDisabled ? "¿Estás seguro que deseas volver a agregar el proveedor?" : "¿Estás seguro que deseas eliminar el proveedor?",
      confirmButtonText: this.seeDisabled ? "Agregar" : "Eliminar",
      text: this.seeDisabled ? "" : "Los productos relacionados podrán seguir usándose"
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.deleteOrRecoverProvider(id);
      }
    });
  }

  deleteOrRecoverProvider(id: number){
    this.providerService.deleteOrRecoverProvider(id).subscribe({
      next: (data) => {
        this.renderTables();
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

  renderTables(){
    this.providerService.getProvidersByIsEnabled(true).subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      },
      error: (error) => {
        this.arrayEnabled = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    });

    this.providerService.getProvidersByIsEnabled(false).subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      },
      error: (error) => {
        this.arrayDisabled = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    });
  }

  clearFilter(){
    this.companyNameOrCode = '';
    this.renderTables();
  }

  orderASC(attribute: string){
    switch (attribute) {
      case "code":
        this.arrayEnabled = this.arrayEnabled.sort((a, b) => (a.code.localeCompare(b.code)));
        this.arrayDisabled = this.arrayDisabled.sort((a, b) => (a.code.localeCompare(b.code)));
      break;

      case "companyName":
        this.arrayEnabled = this.arrayEnabled.sort((a, b) => (a.companyName.localeCompare(b.companyName)));
        this.arrayDisabled = this.arrayDisabled.sort((a, b) => (a.companyName.localeCompare(b.companyName)));
      break;

      case "ubication":
        this.arrayEnabled = this.arrayEnabled.sort((a, b) => (
          a.address.locality.province.country.name === b.address.locality.province.country.name ?
          //Compare between provinces:
          a.address.locality.province.name.localeCompare(b.address.locality.province.name) :
          //Compare between countries:
          a.address.locality.province.country.name.localeCompare(b.address.locality.province.country.name)));
          
        this.arrayDisabled = this.arrayDisabled.sort((a, b) => (
          a.address.locality.province.country.name === b.address.locality.province.country.name ?
          //Compare between provinces:
          a.address.locality.province.name.localeCompare(b.address.locality.province.name) :
          //Compare between countries:
          a.address.locality.province.country.name.localeCompare(b.address.locality.province.country.name)));
      break;
    
      default:
      break;
    }
  }

  orderDESC(attribute: string){
    switch (attribute) {
      case "code":
        this.arrayEnabled = this.arrayEnabled.sort((a, b) => (b.code.localeCompare(a.code)));
        this.arrayDisabled = this.arrayDisabled.sort((a, b) => (b.code.localeCompare(a.code)));
      break;

      case "companyName":
        this.arrayEnabled = this.arrayEnabled.sort((a, b) => (b.companyName.localeCompare(a.companyName)));
        this.arrayDisabled = this.arrayDisabled.sort((a, b) => (b.companyName.localeCompare(a.companyName)));
      break;

      case "ubication":
        this.arrayEnabled = this.arrayEnabled.sort((a, b) => (
          b.address.locality.province.country.name === a.address.locality.province.country.name ?
          //Compare between provinces:
          b.address.locality.province.name.localeCompare(a.address.locality.province.name) :
          //Compare between countries:
          b.address.locality.province.country.name.localeCompare(a.address.locality.province.country.name)));
          
        this.arrayDisabled = this.arrayDisabled.sort((a, b) => (
          b.address.locality.province.country.name === a.address.locality.province.country.name ?
          //Compare between provinces:
          b.address.locality.province.name.localeCompare(a.address.locality.province.name) :
          //Compare between countries:
          b.address.locality.province.country.name.localeCompare(a.address.locality.province.country.name)));
      break;
    
      default:
      break;
    }
  }

  onFilter(){
    if (this.companyNameOrCode === ''){
      this.renderTables();
    } else {
      if (this.seeDisabled){
        this.providerService.getProvidersByFilter(this.companyNameOrCode, false).subscribe({
          next: (data) => {
            this.arrayDisabled = data;
          },
          error: (error) => {
            this.alertService.getErrorToast(error.message).fire();
            this.renderTables();
          }
        })
      } else {
        this.providerService.getProvidersByFilter(this.companyNameOrCode, true).subscribe({
          next: (data) => {
            this.arrayEnabled = data;
          },
          error: (error) => {
            this.alertService.getErrorToast(error.message).fire();
            this.renderTables();
          }
        })
      }
    }
  }
}
