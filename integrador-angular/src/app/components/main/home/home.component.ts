import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { AlertService } from '../../../services/utils/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  providersQuantity!: number;
  productsQuantity!: number;
  ordersQuantity!: number;

  constructor(private homeService: HomeService, private alertService: AlertService){ }

  ngOnInit(): void {
    this.homeService.getProvidersCount().subscribe({
      next: (data) => {
        this.providersQuantity = data.length;
      },
      error: (error) => {
        this.providersQuantity = 0;
        this.alertService.getErrorToast(error.message).fire();
      }
    });

    this.homeService.getProductsCount().subscribe({
      next: (data) => {
        this.productsQuantity = data.length;
      },
      error: (error) => {
        this.productsQuantity = 0;
        this.alertService.getErrorToast(error.message).fire();
      }
    });

    this.homeService.getOrdersCount().subscribe({
      next: (data) => {
        this.ordersQuantity = data.length;
      },
      error: (error) => {
        this.ordersQuantity = 0;
        this.alertService.getErrorToast(error.message).fire();
      }
    });
  }
}
