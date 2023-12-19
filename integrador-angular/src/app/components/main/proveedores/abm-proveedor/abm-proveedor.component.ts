import { Component, OnInit } from '@angular/core';
import { ServiceProveedorService } from '../../../../services/service-proveedor.service';
import { Proveedor } from '../../../../models/proveedores';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-proveedor',
  templateUrl: './abm-proveedor.component.html',
  styleUrl: './abm-proveedor.component.css'
})
export class AbmProveedorComponent implements OnInit {
  
  arrayProveedores!: Proveedor[];

  constructor(private proveedorService: ServiceProveedorService, private router: Router) {}

  ngOnInit(): void {
      this.arrayProveedores = this.proveedorService.getProviders();
  }

  deleteProvider(codigo: number){
    const proveedoresData = localStorage.getItem("proveedores");
    if (this.proveedorService.deleteProvider(codigo)){
      this.arrayProveedores = this.arrayProveedores.filter(proveedor => proveedor.codigo != codigo);
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  editProvider(){
    alert("Próximamente!");
  }
}
