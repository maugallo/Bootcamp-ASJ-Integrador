import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../../models/purchaseOrder';
import { OrderService } from '../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {

  order!: PurchaseOrder;

  param!: number;

  constructor(private orderService: OrderService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.param = this.getParameter();
    if(this.param){
      this.orderService.getOrderById(this.param).subscribe({
        next: (data) => {
          this.order = data;
        },
        error: () => {
          this.router.navigate(['orders/form-order']);
        }
      });
    } else {
      this.router.navigate(['orders/form-order']);
    }
  }

  getParameter(){
    return Number(this.activatedRoute.snapshot.params['id']);
  }
}
