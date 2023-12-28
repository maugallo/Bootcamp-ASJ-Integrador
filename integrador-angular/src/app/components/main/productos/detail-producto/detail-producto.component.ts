import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../models/productos';
import { ServiceProductoService } from '../../../../services/service-producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-producto',
  templateUrl: './detail-producto.component.html',
  styleUrl: './detail-producto.component.css'
})
export class DetailProductoComponent implements OnInit {

  producto!: Producto;

  skuParam!: string;

  constructor(private productoService: ServiceProductoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.skuParam = this.activatedRoute.snapshot.params['id'];
    let productoByparam = this.productoService.getProduct(this.skuParam);

      if (productoByparam){
        this.producto = productoByparam;
      } else{
        this.router.navigate(['products/form-provider']);
      }
  }
}
