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

  filterValue: string = "";

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
    this.providerService.getEnabledProviders().subscribe((data) => {
      this.arrayEnabled = data;
    });

    this.providerService.getDisabledProviders().subscribe((data) => {
      this.arrayDisabled = data;
    });
  }

  clearFilter(){
    if (this.filterValue != ''){
      this.filterValue = '';
      this.renderTables();
    }
  }

  filterProviders(){
    if (this.filterValue === ''){
      this.renderTables();
    } else {
      if (this.seeDisabled){
        this.providerService.filterDisabledProviders(this.filterValue).subscribe({
          next: (data) => {
            this.arrayDisabled = data;
          }
        })
      } else {
        this.providerService.filterEnabledProviders(this.filterValue).subscribe({
          next: (data) => {
            this.arrayEnabled = data;
          }
        })
      }
    }
  }
}
