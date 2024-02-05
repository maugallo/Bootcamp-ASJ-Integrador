import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import Swal from 'sweetalert2';
import { AlertHandler } from '../../utils/alertHandler';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

  arrayEnabledCategories!: Category[];
  arrayDisabledCategories!: Category[];

  seeDisabledCategories: boolean = false;

  private alertHandler = new AlertHandler();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.renderCategories();
  }

  renderCategories() {
    this.categoryService.getEnabledCategories().subscribe({
      next: (data) => {
        this.arrayEnabledCategories = data;
      }
    })

    this.categoryService.getDisabledCategories().subscribe({
      next: (data) => {
        this.arrayDisabledCategories = data;
      }
    })
  }

  openDeleteOrRecoverCategoryModal(id: number) {
    Swal.fire({
      title: this.seeDisabledCategories ? "¿Estás seguro que deseas volver a agregar la categoría?" : "¿Estás seguro que deseas eliminar la categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: this.seeDisabledCategories ? "Agregar" : "Eliminar",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOrRecoverCategory(id);
      }
    });
  }

  deleteOrRecoverCategory(id: number) {
    this.categoryService.deleteOrRecoverCategory(id).subscribe({
      next: (data) => {
        this.renderCategories();
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

  openAddCategoryModal() {
    Swal.fire({
      title: `Agregar Categoría <i class="bi bi-tag-fill"></i>`,
      input: "text",
      inputPlaceholder: "Ingrese el nombre",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cerrar",
      inputValidator: (value) => { //inputValidator accepts a Promise.resolve(string) if there was an error in the input, or Promise.resolve(null/undefined) if the input was ok.
        if (!value) {
          return Promise.resolve("Este campo no puede estar vacío");
        } else {
          return firstValueFrom(this.categoryService.validateName(value))
          .then((isRepeated) => {
            if (isRepeated){
              return Promise.resolve("Este nombre ya existe");
            } else {
              return Promise.resolve(null);
            }
          })
        }
      }
    });
  }

  /*
  ALERT VALIDACIÓN DE NOMBRE AL CREARLA:
  Swal.fire({
            title: "Ya existe una categoría con este nombre",
            icon: "info",
            customClass: {
              popup: "custom-swal-popup",
              confirmButton: "custom-swal-close-button",
            }
          });
  */

}
