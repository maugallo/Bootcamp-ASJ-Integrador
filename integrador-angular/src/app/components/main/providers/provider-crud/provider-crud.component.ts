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

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.renderTables();
  }

  openModal(id: number){
    this.selectedId = id;
  }

  deleteProvider(){
    this.providerService.deleteProvider(this.selectedId).subscribe({
      next: (data) => {
        alert(data);
        this.renderTables();
      },
      error: (error) => {
        alert("Error deleting the provider: " + error);
        console.error("Error ocurred", error);
      }
    })
  }

  renderTables(){
    this.providerService.getEnabledProviders().subscribe((data) => {
      if (data != null){
        this.arrayEnabled = data;
      } else {
        this.arrayEnabled = [];
      }
    });

    this.providerService.getDisabledProviders().subscribe((data) => {
      if (data != null){
        this.arrayDisabled = data;
      } else {
        this.arrayDisabled = [];
      }
    });
  }
}
