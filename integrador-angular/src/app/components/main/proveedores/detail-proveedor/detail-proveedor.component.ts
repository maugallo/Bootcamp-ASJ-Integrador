import { Component, OnInit } from '@angular/core';
import { ServiceProveedorService } from '../../../../services/service-proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../../../../models/proveedores';

@Component({
  selector: 'app-detail-proveedor',
  templateUrl: './detail-proveedor.component.html',
  styleUrl: './detail-proveedor.component.css'
})
export class DetailProveedorComponent implements OnInit {

  proveedor!: Proveedor;

  codigoParam!: string;

  constructor(private proveedorService: ServiceProveedorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.codigoParam = this.activatedRoute.snapshot.params['id'];
      if (this.proveedorService.getProvider(this.codigoParam) !== undefined){
        this.proveedor = this.proveedorService.getProvider(this.codigoParam);
      } else{
        this.router.navigate(['providers/form-provider']);
      }
  }
}
