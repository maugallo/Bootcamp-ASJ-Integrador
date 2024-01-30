import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from '../../../../models/provider';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrl: './provider-detail.component.css'
})
export class ProviderDetailComponent implements OnInit {

  provider!: Provider;

  param!: string;

  constructor(private providerService: ProviderService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.param = this.activatedRoute.snapshot.params['id'];

      this.providerService.getProviderByCode(this.param).subscribe((data) => {
        this.provider = data;
        if (this.provider == null){
          this.router.navigate(['providers/form-provider']);
        }
      });
  }
}
