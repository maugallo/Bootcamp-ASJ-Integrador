import { Component } from '@angular/core';
import { ServiceProductoService } from '../../../../services/service-producto.service';
import { Router } from '@angular/router';
import { Producto } from '../../../../models/productos';

@Component({
  selector: 'app-abm-producto',
  templateUrl: './abm-producto.component.html',
  styleUrl: './abm-producto.component.css'
})
export class AbmProductoComponent {
  arrayProductos!: Producto[];

  constructor(private productoService: ServiceProductoService) {}

  ngOnInit(): void {
      this.arrayProductos = this.productoService.getProducts();
  }

  deleteProduct(sku: string){
    if (this.productoService.deleteProduct(sku)){
      this.arrayProductos = this.arrayProductos.filter(producto => producto.sku != sku);
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  editProduct(){
    alert("Próximamente!");
  }
}
