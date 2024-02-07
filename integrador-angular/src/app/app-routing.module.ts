import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { ProviderCrudComponent } from './components/main/providers/provider-crud/provider-crud.component';
import { ProviderFormComponent } from './components/main/providers/provider-form/provider-form.component';
import { ProductCrudComponent } from './components/main/products/product-crud/product-crud.component';
import { ProductFormComponent } from './components/main/products/product-form/product-form.component';
import { OrderCrudComponent } from './components/main/orders/order-crud/order-crud.component';
import { OrderFormComponent } from './components/main/orders/order-form/order-form.component';
import { ProviderDetailComponent } from './components/main/providers/provider-detail/provider-detail.component';
import { ProductDetailComponent } from './components/main/products/product-detail/product-detail.component';
import { OrderDetailComponent } from './components/main/orders/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'providers',
    children: [
      { path: '', component: ProviderCrudComponent},
      { path: 'detail/:id', component: ProviderDetailComponent},
      { path: 'form-provider', component: ProviderFormComponent},
      { path: 'form-provider/:id', component: ProviderFormComponent}
    ]
  },

  { path: 'products',
    children: [
      { path: '', component: ProductCrudComponent},
      { path: 'detail/:id', component: ProductDetailComponent},
      { path: 'form-product', component: ProductFormComponent},
      { path: 'form-product/:id', component: ProductFormComponent}
    ]
  },
  
  { path: 'orders',
    children: [
      { path: '', component: OrderCrudComponent},
      { path: 'detail/:id', component: OrderDetailComponent},
      { path: 'form-order', component: OrderFormComponent},
      { path: 'form-order/:id', component: OrderFormComponent}
    ]
  },

  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
