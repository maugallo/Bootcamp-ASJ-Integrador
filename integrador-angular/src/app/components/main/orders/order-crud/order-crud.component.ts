import { Component } from '@angular/core';
import { Order } from '../../../../models/orders';
import { ServiceOrdenService } from '../../../../services/service-orden.service';

@Component({
  selector: 'app-order-crud',
  templateUrl: './order-crud.component.html',
  styleUrl: './order-crud.component.css'
})
export class OrderCrudComponent {

  arrayEnabled!: Order[];
  arrayDisabled!: Order[];

  seeDesabled: boolean = false;

  selectedOrderNumber!: number;

  constructor(private orderService: ServiceOrdenService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(orderNumber: number){
    this.selectedOrderNumber = orderNumber;
  }

  deleteOrder(){
    if (this.orderService.deleteOrder(this.selectedOrderNumber)){
      this.renderTables();
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  renderTables(){
    this.arrayEnabled = this.orderService.getEnabledOrders();
    this.arrayDisabled = this.orderService.getDisabledOrders();
  }
}
