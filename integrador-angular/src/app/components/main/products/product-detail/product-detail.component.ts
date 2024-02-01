import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product!: Product;

  param!: number;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.param = this.activatedRoute.snapshot.params['id'];
    
    this.productService.getProductById(this.param).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        alert(error.error)
        this.router.navigate(['products/form-provider']);
      }
    });
  }
}
