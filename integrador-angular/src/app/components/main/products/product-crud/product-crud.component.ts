import { Component } from '@angular/core';
import { ServiceProductoService } from '../../../../services/service-producto.service';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent {

  arrayEnabled!: Product[];
  arrayDisabled!: Product[];

  selectedSku!: string;

  seeDisabled: boolean = false;

  constructor(private productService: ServiceProductoService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(sku: string){
    this.selectedSku = sku;
  }

  deleteProduct(){
    if (this.productService.deleteProduct(this.selectedSku)){
      this.renderTables();
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  renderTables(){ //Sort the products from A to Z.
    this.arrayEnabled = this.productService.getEnabledProducts().sort((productA:Product, productB:Product) => (productA.title > productB.title ? 1 : -1));
    this.arrayDisabled = this.productService.getDisabledProducts().sort((productA:Product, productB:Product) => (productA.title > productB.title ? 1 : -1));
  }
}
