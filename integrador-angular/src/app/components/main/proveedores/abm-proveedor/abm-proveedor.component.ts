import { Component, OnInit } from '@angular/core';
import { ServiceProveedorService } from '../../../../services/service-proveedor.service';
import { Provider } from '../../../../models/provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-proveedor',
  templateUrl: './abm-proveedor.component.html',
  styleUrl: './abm-proveedor.component.css'
})
export class AbmProveedorComponent implements OnInit {
  
  arrayEnabled!: Provider[];
  arrayDisabled!: Provider[];
  selectedCode!: string;
  seeDisabled: boolean = false;

  constructor(private providerService: ServiceProveedorService, private router: Router) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(codigo: string){
    this.selectedCode = codigo;
  }

  deleteProvider(){
    if (this.providerService.deleteProvider(this.selectedCode)){
      this.renderTables();
      alert("Elemento eliminado con éxito!");
    } else{
      alert("Ocurrió un error al eliminar el elemento");
    }
  }

  renderTables(){
    this.arrayEnabled = this.providerService.getEnabledProviders();
    this.arrayDisabled = this.providerService.getDisabledProviders();
  }
}
