import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent {

  arrayEnabled!: Product[];
  arrayDisabled!: Product[];

  categorySelect!: Category[];

  selectedId!: number;

  seeDisabled: boolean = false;
  
  filterValue: string = "";
  filterCategoryValue: string = "";

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.renderTables();
    this.renderCategorySelect();
  }

  openModal(id: number){
    this.selectedId = id;
  }

  deleteOrRecoverProduct(){
    this.productService.deleteOrRecoverProduct(this.selectedId).subscribe({
      next: (data) => {
        alert(data);
        this.renderTables();
      },
      error: (error) => {
        alert("Error eliminando o agregando el producto: " + error.error);
      }
    })
  }

  clearFilter(){
    if (this.filterValue != '' || this.filterCategoryValue != ''){
      this.filterValue = '';
      this.filterCategoryValue = '';
      this.renderTables();
    }
  }

  onFilter(){
    if (this.filterValue === '' && this.filterCategoryValue === ''){
      this.renderTables();
    } else {
      if (this.seeDisabled){
        this.productService.getProducts(this.filterValue, this.filterCategoryValue, false).subscribe({
          next: (data) => {
            this.arrayDisabled = data;
          }
        })
      } else {
        this.productService.getProducts(this.filterValue, this.filterCategoryValue, true).subscribe({
          next: (data) => {
            this.arrayEnabled = data;
          }
        })
      }
    }
  }

  renderTables(){
    this.productService.getProducts("", "", true).subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      }
    })

    this.productService.getProducts("", "", false).subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      }
    })
  }

  renderCategorySelect(){
    this.categoryService.getEnabledCategories().subscribe({
      next: (data) => {
        this.categorySelect = data;
      }
    })
  }
}
