import { Component, OnInit } from '@angular/core';
import { ServiceProveedorService } from '../../../../services/service-proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from '../../../../models/provider';

@Component({
  selector: 'app-detail-proveedor',
  templateUrl: './detail-proveedor.component.html',
  styleUrl: './detail-proveedor.component.css'
})
export class DetailProveedorComponent implements OnInit {

  proveedor!: Provider;

  codigoParam!: string;

  constructor(private proveedorService: ServiceProveedorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

      this.codigoParam = this.activatedRoute.snapshot.params['id'];
      let proveedorByParam = this.proveedorService.getProvider(this.codigoParam);

      if (proveedorByParam){
        this.proveedor = proveedorByParam;
      } else{
        this.router.navigate(['providers/form-provider']);
      }
  }
}
