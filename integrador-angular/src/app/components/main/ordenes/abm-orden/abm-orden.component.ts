import { Component } from '@angular/core';
import { Orden } from '../../../../models/ordenes';
import { ServiceOrdenService } from '../../../../services/service-orden.service';

@Component({
  selector: 'app-abm-orden',
  templateUrl: './abm-orden.component.html',
  styleUrl: './abm-orden.component.css'
})
export class AbmOrdenComponent {
  arrayOrdenes!: Orden[];

  constructor(private ordenService: ServiceOrdenService) {}

  ngOnInit(): void {
      this.arrayOrdenes = this.ordenService.getOrders();
  }

  deleteOrder(codigo: number){
    if (this.ordenService.deleteOrder(codigo)){
      this.arrayOrdenes = this.arrayOrdenes.filter(orden => orden.codigo != codigo);
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  editOrder(){
    alert("Próximamente!");
  }
}
