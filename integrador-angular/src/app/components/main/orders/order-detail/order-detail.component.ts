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
    this.param = this.activatedRoute.snapshot.params['id'];
    
    this.orderService.getOrderById(this.param).subscribe({
      next: (data) => {
        this.order = data;
      },
      error: (error) => {
        alert(error.error)
        this.router.navigate(['products/form-provider']);
      }
    });
  }
}
