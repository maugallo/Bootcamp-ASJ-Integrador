import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { Provider } from '../../../../models/provider';
import { AlertHandler } from '../../../../utils/alertHandler';
import Swal from 'sweetalert2';

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

  private alertHandler = new AlertHandler();

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openDeleteOrRecoverProviderModal(id: number) {
    Swal.fire({
      title: this.seeDisabled ? "¿Estás seguro que deseas volver a agregar el proveedor?" : "¿Estás seguro que deseas eliminar el proveedor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: this.seeDisabled ? "Agregar" : "Eliminar",
      cancelButtonText: "Cerrar",
      text: this.seeDisabled ? "" : "Los productos relacionados podrán seguir usándose"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOrRecoverProvider(id);
      }
    });
  }

  deleteOrRecoverProvider(id: number){
    this.providerService.deleteOrRecoverProvider(id).subscribe({
      next: (data) => {
        this.renderTables();

        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.error
        });
      }
    })
  }

  renderTables(){
    this.providerService.getProviders(true).subscribe((data) => {
      this.arrayEnabled = data;
    });

    this.providerService.getProviders(false).subscribe((data) => {
      this.arrayDisabled = data;
    });
  }

  clearFilter(){
    if (this.companyNameOrCode != ''){
      this.companyNameOrCode = '';
      this.renderTables();
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
          }
        })
      } else {
        this.providerService.getProvidersByFilter(this.companyNameOrCode, true).subscribe({
          next: (data) => {
            this.arrayEnabled = data;
          }
        })
      }
    }
  }
}
