import { Component, OnInit } from '@angular/core';
import { Sector } from '../../../../../models/sector';
import { SharedProductCategoryService } from '../../../../../services/shared-product-category.service';
import { SectorService } from '../../../../../services/sector.service';
import { firstValueFrom } from 'rxjs';
import { AlertService } from '../../../../../services/utils/alert.service';

@Component({
  selector: 'app-sector-crud',
  templateUrl: './sector-crud.component.html',
  styleUrl: './sector-crud.component.css'
})
export class SectorCrudComponent implements OnInit {

  arrayEnabled!: Sector[];
  arrayDisabled!: Sector[];

  sector: Sector = {
    name: '',
    isEnabled: false,
  }

  seeDisabled: boolean = false;

  constructor(
    private sectorService: SectorService,
    private alertService: AlertService,
    private sharedProductCategoryService: SharedProductCategoryService
  ) {}


  ngOnInit(): void {
    this.renderSectorsTable();
  }

  renderSectorsTable() {
    this.sectorService.getSectorsByIsEnabled(true).subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      }
    })

    this.sectorService.getSectorsByIsEnabled(false).subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      }
    })
  }

  openDeleteOrRecoverSectorModal(id: number) {
    this.alertService.getConfirmModal()
    .fire({
      title: this.seeDisabled ? "¿Estás seguro que deseas volver a agregar el rubro?" : "¿Estás seguro que deseas eliminar el rubro?",
      confirmButtonText: this.seeDisabled ? "Agregar" : "Eliminar",
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.deleteOrRecoverSector(id);
      }
    });
  }

  deleteOrRecoverSector(id: number) {
    this.sectorService.deleteOrRecoverSector(id).subscribe({
      next: (data) => {
        this.renderSectorsTable();
        this.sharedProductCategoryService.triggerProductCrud();
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

  openAddSectorModal() {
    this.alertService.getInputModal(`Agregar Rubro <i class="bi bi-grid-fill"></i>`, "Ingrese el nombre", "Agregar")
    .fire({
      inputValidator: (value) => { //inputValidator accepts a Promise.resolve(string) if there was an error in the input, or Promise.resolve(null/undefined) if the input was ok.
        if (!value) {
          return Promise.resolve("Este campo no puede estar vacío");
        } else if (!value.match('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$')) {
          return Promise.resolve("Este campo solo acepta letras");
        } else {
          return firstValueFrom(this.sectorService.validateName(value))
            .then((isRepeated) => {
              if (isRepeated) {
                return Promise.resolve("Este nombre ya existe");
              } else {
                return Promise.resolve(null);
              }
            })
        }
      }
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.sector.name = result.value;
        this.sector.isEnabled = true;

        this.addSector(this.sector);
      }
    });
  }

  addSector(sector: Sector) {
    this.sectorService.addSector(sector).subscribe({
      next: (data) => {
        this.renderSectorsTable();
        this.sharedProductCategoryService.triggerProductCrud();
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

  openEditSectorModal(sector: Sector) {
    this.alertService.getInputModal(`Editar Rubro <i class="bi bi-grid-fill"></i>`, "Ingrese el nombre", "Editar", sector.name)
    .fire({
      inputValidator: (value) => { //inputValidator accepts a Promise.resolve(string) if there was an error in the input, or Promise.resolve(null/undefined) if the input was ok.
        if (!value) {
          return Promise.resolve("Este campo no puede estar vacío");
        } else if (!value.match('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$')) {
          return Promise.resolve("Este campo solo acepta letras");
        } else {
          if (value !== sector.name){
            return firstValueFrom(this.sectorService.validateName(value))
            .then((isRepeated) => {
              if (isRepeated) {
                return Promise.resolve("Este nombre ya existe");
              } else {
                return Promise.resolve(null);
              }
            })
          } else {
            return Promise.resolve(null);
          }
        }
      }
    })
    .then((result) => {
      if (result.isConfirmed) {
        sector.name = result.value;

        this.updateSector(sector);
      }
    });
  }

  updateSector(sector: Sector) {
    this.sectorService.updateSector(sector).subscribe({
      next: (data) => {
        this.renderSectorsTable();
        this.sharedProductCategoryService.triggerProductCrud();
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

}
