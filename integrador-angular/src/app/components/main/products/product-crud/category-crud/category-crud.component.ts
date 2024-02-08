import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../models/category';
import { AlertHandler } from '../../../../../utils/alertHandler';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../../../services/category.service';
import { firstValueFrom } from 'rxjs';
import { SharedProductCategoryService } from '../../../../../services/shared-product-category.service';

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrl: './category-crud.component.css'
})
export class CategoryCrudComponent implements OnInit {

  arrayEnabled!: Category[];
  arrayDisabled!: Category[];

  category: Category = {
    name: '',
    isEnabled: false,
  }

  seeDisabled: boolean = false;

  private alertHandler = new AlertHandler();

  constructor(private categoryService: CategoryService, private sharedProductCategoryService: SharedProductCategoryService) {}

  ngOnInit(): void {
    this.renderCategoriesTable();
  }

  renderCategoriesTable() {
    this.categoryService.getCategories(true).subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      }
    })

    this.categoryService.getCategories(false).subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      }
    })
  }

  openDeleteOrRecoverCategoryModal(id: number) {
    Swal.fire({
      title: this.seeDisabled ? "¿Estás seguro que deseas volver a agregar la categoría?" : "¿Estás seguro que deseas eliminar la categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: this.seeDisabled ? "Agregar" : "Eliminar",
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
        this.renderCategoriesTable();

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
        } else if (!value.match('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$')) {
          return Promise.resolve("Este campo solo acepta letras");
        } else {
          return firstValueFrom(this.categoryService.validateName(value))
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
          this.category.name = result.value;
          this.category.isEnabled = true;

          this.addCategory(this.category);
        }
      });
  }

  addCategory(category: Category) {
    this.categoryService.addCategory(category).subscribe({
      next: (data) => {
        this.renderCategoriesTable();

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

  openEditCategoryModal(category: Category) {
    Swal.fire({
      title: `Editar Categoría <i class="bi bi-tag-fill"></i>`,
      input: "text",
      inputPlaceholder: "Ingrese el nombre",
      inputValue: category.name,
      showCancelButton: true,
      confirmButtonText: "Editar",
      cancelButtonText: "Cerrar",
      inputValidator: (value) => { //inputValidator accepts a Promise.resolve(string) if there was an error in the input, or Promise.resolve(null/undefined) if the input was ok.
        if (!value) {
          return Promise.resolve("Este campo no puede estar vacío");
        } else {
          if (value !== category.name){
            return firstValueFrom(this.categoryService.validateName(value))
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
          category.name = result.value;

          this.updateCategory(category);
        }
      });
  }

  updateCategory(category: Category) {
    this.categoryService.updateCategory(category).subscribe({
      next: (data) => {
        this.renderCategoriesTable();

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
