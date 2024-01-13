import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { Provider } from '../../../../models/provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-crud',
  templateUrl: './provider-crud.component.html',
  styleUrl: './provider-crud.component.css'
})
export class ProviderCrudComponent implements OnInit {
  
  arrayEnabled!: Provider[];
  arrayDisabled!: Provider[];

  selectedCode!: string;

  seeDisabled: boolean = false;

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(code: string){
    this.selectedCode = code;
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
