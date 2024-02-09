import { Component } from '@angular/core';
import { PurchaseOrder } from '../../../../models/purchaseOrder';
import { OrderService } from '../../../../services/order.service';
import { OrderStatus } from '../../../../models/orderStatus';
import { AlertService } from '../../../../services/utils/alert.service';

@Component({
  selector: 'app-order-crud',
  templateUrl: './order-crud.component.html',
  styleUrl: './order-crud.component.css'
})
export class OrderCrudComponent {

  arrayEnabled!: PurchaseOrder[];

  orderStatusSelect: OrderStatus[] = [
    'PENDIENTE',
    'COMPLETADA',
    'CANCELADA',
    'EXPIRADA',
  ];

  filterSelectedStatus: string = '';

  constructor(private orderService: OrderService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.renderTable();
  }

  openUpdateOrderModal(id: number, status: string){
    let titleMessage: string;
    switch (status) {
      case "CANCELADA":
        titleMessage = "¿Deseas cancelar esta orden?";
        break;

      case "COMPLETADA":
        titleMessage = "¿Deseas completar esta orden?";
        break;

      case "EXPIRADA":
        titleMessage = "¿Deseas marcar esta orden como expirada?";
        break;
    
      default:
        titleMessage = "";
        break;
    }
    this.alertService.getConfirmModal()
    .fire({ title: titleMessage, text: "Esta operación no se puede deshacer" })
    .then((result) => {
      if (result.isConfirmed) {
        this.updateOrderStatus(id, status);
      }
    });
  }

  updateOrderStatus(id: number, orderStatus: string) {
    this.orderService.updateOrderStatus(id, orderStatus).subscribe({
      next: (data) => {
        this.renderTable();
        this.alertService.getSuccessToast(data).fire();
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

  onFilter() {
    if (this.filterSelectedStatus !== ''){
      this.orderService.getOrdersByFilter(this.filterSelectedStatus).subscribe({
        next: (data) => {
          this.arrayEnabled = data;
        },
        error: () => {
          this.renderTable();
        }
      })
    } else {
      this.renderTable();
    }
  }

  renderTable() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      },
      error: (error) => {
        this.arrayEnabled = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    })
  }
}
