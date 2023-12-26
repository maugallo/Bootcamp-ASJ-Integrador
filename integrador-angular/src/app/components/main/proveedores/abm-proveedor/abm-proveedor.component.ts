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
  selectedCode!: string;

  constructor(private proveedorService: ServiceProveedorService, private router: Router) {}

  ngOnInit(): void {
    this.arrayProveedores = this.proveedorService.getProviders();
  }

  openModal(codigo: string){
    this.selectedCode = codigo;
  }

  deleteProvider(){
    if (this.proveedorService.deleteProvider(this.selectedCode)){
      this.arrayProveedores = this.arrayProveedores.filter(proveedor => proveedor.codigo != this.selectedCode); //Filtramos la variable nuevamente para que se renderice la tabla en el momento.
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }
}
