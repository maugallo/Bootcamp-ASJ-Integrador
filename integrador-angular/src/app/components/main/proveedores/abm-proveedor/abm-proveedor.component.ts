import { Component, OnInit } from '@angular/core';
import { ServiceProveedorService } from '../../../../services/service-proveedor.service';
import { Proveedor } from '../../../../models/proveedores';

@Component({
  selector: 'app-abm-proveedor',
  templateUrl: './abm-proveedor.component.html',
  styleUrl: './abm-proveedor.component.css'
})
export class AbmProveedorComponent implements OnInit {
  
  arrayProveedores!: Proveedor[];

  constructor(private proveedorService: ServiceProveedorService) {}

  ngOnInit(): void {
      this.arrayProveedores = this.proveedorService.getProviders();
  }
}
