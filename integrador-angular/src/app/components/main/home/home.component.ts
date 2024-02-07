import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  providersQuantity!: number;
  productsQuantity!: number;
  ordersQuantity!: number;

  constructor(private homeService: HomeService){ }

  ngOnInit(): void {
    this.homeService.getProvidersCount().subscribe({
      next: (data) => {
        this.providersQuantity = data.length;
      }
    });

    this.homeService.getProductsCount().subscribe({
      next: (data) => {
        this.productsQuantity = data.length;
      }
    });

    this.homeService.getOrdersCount().subscribe({
      next: (data) => {
        this.ordersQuantity = data.length;
      }
    });
  }
}
