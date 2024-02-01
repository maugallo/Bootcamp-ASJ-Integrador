import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent {

  arrayEnabled!: Product[];
  arrayDisabled!: Product[];

  selectedId!: number;

  seeDisabled: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.renderTables();
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

  renderTables(){
    this.productService.getEnabledProducts().subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      }
    })

    this.productService.getDisabledProducts().subscribe({
      next: (data) => {
        this.arrayDisabled = data;
      }
    })
  }
}
