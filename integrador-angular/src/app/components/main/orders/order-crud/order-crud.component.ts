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
    
  }

  renderTables(){
    
  }
}
