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
  
  arrayHabilitados!: Proveedor[];
  arrayDeshabilitados!: Proveedor[];
  selectedCode!: string;
  verDeshabilitados: boolean = false;

  constructor(private proveedorService: ServiceProveedorService, private router: Router) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(codigo: string){
    this.selectedCode = codigo;
  }

  deleteProvider(){
    if (this.proveedorService.deleteProvider(this.selectedCode)){
      this.renderTables();
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  renderTables(){
    this.arrayHabilitados = this.proveedorService.getEnabledProviders();
    this.arrayDeshabilitados = this.proveedorService.getDisabledProviders();
  }
}
