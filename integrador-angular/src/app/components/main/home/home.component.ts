import { Component, OnInit } from '@angular/core';
import { ServiceHomeService } from '../../../services/service-home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  providersQuantity!: number;
  productsQuantity!: number;
  ordersQuantity!: number;

  constructor(private homeService: ServiceHomeService){ }

  ngOnInit(): void {
      this.providersQuantity = this.homeService.getProvidersCount();
      this.productsQuantity = this.homeService.getProductsCount();
      this.ordersQuantity = this.homeService.getOrdersCount();
  }
}
