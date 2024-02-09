import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { SharedProductCategoryService } from '../../../../services/shared-product-category.service';
import { AlertService } from '../../../../services/utils/alert.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent {

  arrayEnabled!: Product[];
  arrayDisabled!: Product[];

  categorySelect!: Category[];

  seeDisabled: boolean = false;

  filterValue: string = "";
  filterCategory: string = "";

  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private sharedProductCategoryService: SharedProductCategoryService
  ) {}

  ngOnInit(): void {
    this.subscribeToSharedObservable(); //This method will subscribe to a shared Observable and let the component render the products table and categories select whenever it detects a change in the Observable. The Observable will emmit a change when the category component tells it to do it.

    this.renderTables();
    this.renderCategorySelect();
  }

  subscribeToSharedObservable(){
    this.sharedProductCategoryService.renderTriggerObservable.subscribe({
      next: () => {
        this.renderTables();
        this.renderCategorySelect();
      }
    });
  }

  openDeleteOrRecoverCategoryModal(id: number) {
    let titleMessage = this.seeDisabled ? "¿Estás seguro que deseas volver a agregar el producto?" : "¿Estás seguro que deseas eliminar el producto?";
    this.alertService.getConfirmModal()
    .fire({
      title: this.seeDisabled ? "¿Estás seguro que deseas volver a agregar el producto?" : "¿Estás seguro que deseas eliminar el producto?",
      confirmButtonText: this.seeDisabled ? "Agregar" : "Eliminar",
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.deleteOrRecoverProduct(id);
      }
    });
  }

  deleteOrRecoverProduct(id: number) {
    this.productService.deleteOrRecoverProduct(id).subscribe({
      next: (data) => {
        this.renderTables();
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

  orderASC(){
    this.arrayEnabled = this.arrayEnabled.sort((a, b) => (a.price - b.price));
    this.arrayDisabled = this.arrayDisabled.sort((a, b) => (a.price - b.price));
  }

  orderDESC(){
    this.arrayEnabled = this.arrayEnabled.sort((a, b) => (b.price - a.price));
    this.arrayDisabled = this.arrayDisabled.sort((a, b) => (b.price - a.price));
  }

  clearFilter() {
    this.filterValue = '';
    this.filterCategory = '';
    this.renderTables();
  }

  onFilter() {
    if (this.filterValue === '' && this.filterCategory === '') {
      this.renderTables();
    } else {
      if (this.seeDisabled) {
        this.productService.getProductsByFilter(this.filterValue, this.filterCategory, false).subscribe({
          next: (data) => {
            this.arrayDisabled = data;
          },
          error: () => {
            this.renderTables();
          }
        })
      } else {
        this.productService.getProductsByFilter(this.filterValue, this.filterCategory, true).subscribe({
          next: (data) => {
            this.arrayEnabled = data;
          },
          error: () => {
            this.renderTables();
          }
        })
      }
    }
  }

  renderTables() {
    this.productService.getProductsByIsEnabled(true).subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      },
      error: (error) => {
        this.arrayEnabled = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    })

    this.productService.getProductsByIsEnabled(false).subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      },
      error: (error) => {
        this.arrayDisabled = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    })
  }

  renderCategorySelect() {
    this.productService.getCategoriesForSelect().subscribe({
      next: (data) => {
        this.categorySelect = data;
      },
      error: (error) => {
        this.categorySelect = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    })
  }

}
