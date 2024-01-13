import { Component } from '@angular/core';
import { Order } from '../../../../models/order';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-order-crud',
  templateUrl: './order-crud.component.html',
  styleUrl: './order-crud.component.css'
})
export class OrderCrudComponent {

  arrayEnabled!: Order[];
  arrayDisabled!: Order[];

  seeDisabled: boolean = false;

  selectedOrderNumber!: number;

  constructor(private orderService: OrderService) {}

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
