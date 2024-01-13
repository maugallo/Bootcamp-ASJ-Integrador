import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../models/order';
import { OrderService } from '../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {

  order!: Order;

  param!: number;

  constructor(private orderService: OrderService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.param = Number(this.activatedRoute.snapshot.params['id']);
      let orderByParam = this.orderService.getOrder(this.param);
      if (orderByParam){
        this.order = orderByParam;
      } else{
        this.router.navigate(['orders/form-order']);
      }
  }
}
