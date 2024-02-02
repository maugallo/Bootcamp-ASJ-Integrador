import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { Provider } from '../../../../models/provider';

@Component({
  selector: 'app-provider-crud',
  templateUrl: './provider-crud.component.html',
  styleUrl: './provider-crud.component.css'
})
export class ProviderCrudComponent implements OnInit {
  
  arrayEnabled!: Provider[];
  arrayDisabled!: Provider[];

  selectedId!: number;

  seeDisabled: boolean = false;

  companyNameOrCode: string = "";

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(id: number){
    this.selectedId = id;
  }

  deleteOrRecoverProvider(){
    this.providerService.deleteOrRecoverProvider(this.selectedId).subscribe({
      next: (data) => {
        alert(data);
        this.renderTables();
      },
      error: (error) => {
        alert("Error eliminando o agregando el provider: " + error.error);
      }
    })
  }

  renderTables(){
    this.providerService.getProviders("", true).subscribe((data) => {
      this.arrayEnabled = data;
    });

    this.providerService.getProviders("", false).subscribe((data) => {
      this.arrayDisabled = data;
    });
  }

  clearFilter(){
    if (this.companyNameOrCode != ''){
      this.companyNameOrCode = '';
      this.renderTables();
    }
  }

  OnFilter(){
    if (this.companyNameOrCode === ''){
      this.renderTables();
    } else {
      if (this.seeDisabled){
        this.providerService.getProviders(this.companyNameOrCode, false).subscribe({
          next: (data) => {
            this.arrayDisabled = data;
          }
        })
      } else {
        this.providerService.getProviders(this.companyNameOrCode, true).subscribe({
          next: (data) => {
            this.arrayEnabled = data;
          }
        })
      }
    }
  }
}
