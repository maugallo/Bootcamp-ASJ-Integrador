import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../models/category';
import { CategoryService } from '../../../../../services/category.service';
import { firstValueFrom } from 'rxjs';
import { SharedProductCategoryService } from '../../../../../services/shared-product-category.service';
import { AlertService } from '../../../../../services/utils/alert.service';

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

  constructor(
    private categoryService: CategoryService,
    private alertService: AlertService,
    private sharedProductCategoryService: SharedProductCategoryService
  ) {}

  ngOnInit(): void {
    this.renderCategoriesTable();
  }

  renderCategoriesTable() {
    this.categoryService.getCategoriesByIsEnabled(true).subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      }
    })

    this.categoryService.getCategoriesByIsEnabled(false).subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      }
    })
  }

  openDeleteOrRecoverCategoryModal(id: number) {
    this.alertService.getConfirmModal()
    .fire({
      title: this.seeDisabled ? "¿Estás seguro que deseas volver a agregar la categoría?" : "¿Estás seguro que deseas eliminar la categoría?",
      confirmButtonText: this.seeDisabled ? "Agregar" : "Eliminar",
    })
    .then((result) => {
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
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

  openAddCategoryModal() {
    this.alertService.getInputModal(`Agregar Categoría <i class="bi bi-tag-fill"></i>`, "Ingrese el nombre", "Agregar")
    .fire({
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
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

  openEditCategoryModal(category: Category) {
    this.alertService.getInputModal(`Editar Categoría <i class="bi bi-tag-fill"></i>`, "Ingrese el nombre", "Editar", category.name)
    .fire({
      inputValidator: (value) => { //inputValidator accepts a Promise.resolve(string) if there was an error in the input, or Promise.resolve(null/undefined) if the input was ok.
        if (!value) {
          return Promise.resolve("Este campo no puede estar vacío");
        } else if (!value.match('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$')) {
          return Promise.resolve("Este campo solo acepta letras");
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
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message);
      }
    })
  }

}
