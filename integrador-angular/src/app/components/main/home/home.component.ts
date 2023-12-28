import { Component, OnInit } from '@angular/core';
import { ServiceHomeService } from '../../../services/service-home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  cantProveedores!: number;
  cantProductos!: number;
  cantOrdenes!: number;

  constructor(private homeService: ServiceHomeService){ }

  ngOnInit(): void {
      this.cantProveedores = this.homeService.getProvidersCount();
      this.cantProductos = this.homeService.getProductsCount();
      this.cantOrdenes = this.homeService.getOrdersCount();
  }
}
