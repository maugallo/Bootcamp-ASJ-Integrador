import { Component } from '@angular/core';
import { PurchaseOrder } from '../../../../models/purchaseOrder';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../utils/alertHandler';
import Swal from 'sweetalert2';
import { OrderStatus } from '../../../../models/orderStatus';

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

  constructor(private orderService: OrderService) { }

  private alertHandler = new AlertHandler();

  ngOnInit(): void {
    this.renderTable();
  }

  openCancelOrderModal(id: number) {
    Swal.fire({
      title: "¿Deseas cancelar esta orden?",
      text: "Esta operación no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateOrderStatus(id, "CANCELADA");
      }
    });
  }

  openCompleteOrderModal(id: number) {
    Swal.fire({
      title: "¿Deseas completar esta orden?",
      text: "Esta operación no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateOrderStatus(id, "COMPLETADA");
      }
    });
  }

  openExpireOrderModal(id: number){
    Swal.fire({
      title: "¿Deseas marcar esta orden como expirada?",
      text: "Esta operación no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateOrderStatus(id, "EXPIRADA");
      }
    });
  }

  updateOrderStatus(id: number, orderStatus: string) {
    this.orderService.updateOrderStatus(id, orderStatus).subscribe({
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
      error: () => {
        this.arrayEnabled = [];
      }
    })
  }
}
