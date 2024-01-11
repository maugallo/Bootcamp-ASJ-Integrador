import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../models/orders';
import { ServiceOrdenService } from '../../../../services/service-orden.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-orden',
  templateUrl: './detail-orden.component.html',
  styleUrl: './detail-orden.component.css'
})
export class DetailOrdenComponent implements OnInit {

  orden!: Order;

  nroOrdenParam!: number;

  constructor(private ordenService: ServiceOrdenService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.nroOrdenParam = Number(this.activatedRoute.snapshot.params['id']);
      let ordenByParam = this.ordenService.getOrder(this.nroOrdenParam);
      if (ordenByParam){
        this.orden = ordenByParam;
      } else{
        this.router.navigate(['orders/form-order']);
      }
  }
}
