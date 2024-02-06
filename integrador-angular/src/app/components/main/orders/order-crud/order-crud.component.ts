import { Component } from '@angular/core';
import { PurchaseOrder } from '../../../../models/purchaseOrder';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../utils/alertHandler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-crud',
  templateUrl: './order-crud.component.html',
  styleUrl: './order-crud.component.css'
})
export class OrderCrudComponent {

  arrayEnabled!: PurchaseOrder[];

  constructor(private orderService: OrderService) { }

  private alertHandler = new AlertHandler();

  ngOnInit(): void {
    this.renderTable();
  }

  openCancelOrderModal(id: number) {
    Swal.fire({
      title: "¿Estás seguro que deseas cancelar esta órden?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancelar",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelOrder(id);
      }
    });
  }

  cancelOrder(id: number) {
    this.orderService.updateOrder().subscribe({
      next: (data) => {
        this.renderTable();

        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.error
        });
      }
    })
  }

  clearFilter() {
    
  }

  onFilter() {
    
  }

  renderTable() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.arrayEnabled = data;
      }
    })
  }
}
