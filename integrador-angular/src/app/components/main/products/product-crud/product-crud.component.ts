import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { SharedProductCategoryService } from '../../../../services/shared-product-category.service';
import Swal from 'sweetalert2';
import { AlertHandler } from '../../../../utils/alertHandler';

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
  filterCategoryValue: string = "";

  constructor(private productService: ProductService, private categoryService: CategoryService, private sharedProductCategoryService: SharedProductCategoryService) { }

  private alertHandler = new AlertHandler();

  ngOnInit(): void {
    this.subscribeToSharedObservable(); //This method will subscribe to a shared Observable and let the component render the products table and categories select whenever it detects a change in the Observable. The Observable will emmit a change due to the category component.

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
    Swal.fire({
      title: this.seeDisabled ? "¿Estás seguro que deseas volver a agregar el producto?" : "¿Estás seguro que deseas eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: this.seeDisabled ? "Agregar" : "Eliminar",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteOrRecoverProduct(id);
      }
    });
  }

  deleteOrRecoverProduct(id: number) {
    this.productService.deleteOrRecoverProduct(id).subscribe({
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

  clearFilter() {
    this.filterValue = '';
    this.filterCategoryValue = '';
    this.renderTables();
  }

  orderASC(){
    this.arrayEnabled = this.arrayEnabled.sort((a, b) => (a.price - b.price));
    this.arrayDisabled = this.arrayDisabled.sort((a, b) => (a.price - b.price));
  }

  orderDESC(){
    this.arrayEnabled = this.arrayEnabled.sort((a, b) => (b.price - a.price));
    this.arrayDisabled = this.arrayDisabled.sort((a, b) => (b.price - a.price));
  }

  onFilter() {
    if (this.filterValue === '' && this.filterCategoryValue === '') {
      this.renderTables();
    } else {
      if (this.seeDisabled) {
        this.productService.getProductsByFilter(this.filterValue, this.filterCategoryValue, false).subscribe({
          next: (data) => {
            this.arrayDisabled = data;
          },
          error: () => {
            this.renderTables();
          }
        })
      } else {
        this.productService.getProductsByFilter(this.filterValue, this.filterCategoryValue, true).subscribe({
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
    this.productService.getProducts(true).subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      },
      error: () => {
        this.arrayEnabled = [];
      }
    })

    this.productService.getProducts(false).subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      },
      error: () => {
        this.arrayDisabled = [];
      }
    })
  }

  renderCategorySelect() {
    this.categoryService.getCategories(true).subscribe({
      next: (data) => {
        this.categorySelect = data;
      },
      error: () => {
        this.categorySelect = [];
      }
    })
  }

}
