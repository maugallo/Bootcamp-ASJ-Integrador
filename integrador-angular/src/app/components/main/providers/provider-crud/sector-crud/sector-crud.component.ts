import { Component, OnInit } from '@angular/core';
import { Sector } from '../../../../../models/sector';
import { AlertHandler } from '../../../../../utils/alertHandler';
import { SharedProductCategoryService } from '../../../../../services/shared-product-category.service';
import Swal from 'sweetalert2';
import { SectorService } from '../../../../../services/sector.service';
import { firstValueFrom } from 'rxjs';

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

  private alertHandler = new AlertHandler();

  constructor(private sectorService: SectorService, private sharedProductCategoryService: SharedProductCategoryService) {}

  ngOnInit(): void {
    this.renderSectorsTable();
  }

  renderSectorsTable() {
    this.sectorService.getSectors(true).subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      }
    })

    this.sectorService.getSectors(false).subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      }
    })
  }

  openDeleteOrRecoverSectorModal(id: number) {
    Swal.fire({
      title: this.seeDisabled ? "¿Estás seguro que deseas volver a agregar el rubro?" : "¿Estás seguro que deseas eliminar el rubro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: this.seeDisabled ? "Agregar" : "Eliminar",
      cancelButtonText: "Cerrar"
    }).then((result) => {
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

  openAddSectorModal() {
    Swal.fire({
      title: `Agregar Rubro <i class="bi bi-grid-fill"></i>`,
      input: "text",
      inputPlaceholder: "Ingrese el nombre",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cerrar",
      inputValidator: (value) => { //inputValidator accepts a Promise.resolve(string) if there was an error in the input, or Promise.resolve(null/undefined) if the input was ok.
        if (!value) {
          return Promise.resolve("Este campo no puede estar vacío");
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

  openEditSectorModal(sector: Sector) {
    Swal.fire({
      title: `Editar Sector `,
      input: "text",
      inputPlaceholder: "Ingrese el nombre",
      inputValue: sector.name,
      showCancelButton: true,
      confirmButtonText: "Editar",
      cancelButtonText: "Cerrar",
      inputValidator: (value) => { //inputValidator accepts a Promise.resolve(string) if there was an error in the input, or Promise.resolve(null/undefined) if the input was ok.
        if (!value) {
          return Promise.resolve("Este campo no puede estar vacío");
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

}
