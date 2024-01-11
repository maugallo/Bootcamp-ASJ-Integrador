import { Component } from '@angular/core';
import { ServiceProductoService } from '../../../../services/service-producto.service';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-abm-producto',
  templateUrl: './abm-producto.component.html',
  styleUrl: './abm-producto.component.css'
})
export class AbmProductoComponent {

  arrayHabilitados!: Product[];
  arrayDeshabilitados!: Product[];
  selectedSku!: string;
  verDeshabilitados: boolean = false;

  constructor(private productoService: ServiceProductoService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(sku: string){
    this.selectedSku = sku;
  }

  deleteProduct(){
    if (this.productoService.deleteProduct(this.selectedSku)){
      this.renderTables();
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  renderTables(){
    this.arrayHabilitados = this.productoService.getEnabledProducts().sort((a:Product, b:Product) => (a.title > b.title ? 1 : -1));
    this.arrayDeshabilitados = this.productoService.getDisabledProducts().sort((a:Product, b:Product) => (a.title > b.title ? 1 : -1));
  }
}
