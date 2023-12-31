import { Component } from '@angular/core';
import { ServiceProductoService } from '../../../../services/service-producto.service';
import { Producto } from '../../../../models/productos';

@Component({
  selector: 'app-abm-producto',
  templateUrl: './abm-producto.component.html',
  styleUrl: './abm-producto.component.css'
})
export class AbmProductoComponent {

  arrayHabilitados!: Producto[];
  arrayDeshabilitados!: Producto[];
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
    this.arrayHabilitados = this.productoService.getEnabledProducts().sort((a:Producto, b:Producto) => (a.nombre > b.nombre ? 1 : -1));
    this.arrayDeshabilitados = this.productoService.getDisabledProducts().sort((a:Producto, b:Producto) => (a.nombre > b.nombre ? 1 : -1));
  }
}
