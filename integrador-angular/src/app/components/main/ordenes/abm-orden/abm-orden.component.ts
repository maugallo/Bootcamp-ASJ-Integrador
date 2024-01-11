import { Component } from '@angular/core';
import { Order } from '../../../../models/orders';
import { ServiceOrdenService } from '../../../../services/service-orden.service';

@Component({
  selector: 'app-abm-orden',
  templateUrl: './abm-orden.component.html',
  styleUrl: './abm-orden.component.css'
})
export class AbmOrdenComponent {

  arrayHabilitados!: Order[];
  arrayDeshabilitados!: Order[];

  verDeshabilitados: boolean = false;

  selectedOrderNumber!: number;

  constructor(private ordenService: ServiceOrdenService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(nroOrden: number){
    this.selectedOrderNumber = nroOrden;
  }

  deleteOrder(){
    if (this.ordenService.deleteOrder(this.selectedOrderNumber)){
      this.renderTables();
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  renderTables(){
    this.arrayHabilitados = this.ordenService.getEnabledOrders();
    this.arrayDeshabilitados = this.ordenService.getDisabledOrders();
  }
}
