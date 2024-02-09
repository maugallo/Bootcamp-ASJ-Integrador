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
import { LoginComponent } from './components/main/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard]},

  { path: 'login', component: LoginComponent, canActivate: [AuthenticationGuard]},
  
  { path: 'providers',
    children: [
      { path: '', component: ProviderCrudComponent, canActivate: [AuthenticationGuard]},
      { path: 'detail/:id', component: ProviderDetailComponent, canActivate: [AuthenticationGuard]},
      { path: 'form-provider', component: ProviderFormComponent, canActivate: [AuthenticationGuard]},
      { path: 'form-provider/:id', component: ProviderFormComponent, canActivate: [AuthenticationGuard]}
    ]
  },

  { path: 'products',
    children: [
      { path: '', component: ProductCrudComponent, canActivate: [AuthenticationGuard]},
      { path: 'detail/:id', component: ProductDetailComponent, canActivate: [AuthenticationGuard]},
      { path: 'form-product', component: ProductFormComponent, canActivate: [AuthenticationGuard]},
      { path: 'form-product/:id', component: ProductFormComponent, canActivate: [AuthenticationGuard]}
    ]
  },
  
  { path: 'orders',
    children: [
      { path: '', component: OrderCrudComponent, canActivate: [AuthenticationGuard]},
      { path: 'detail/:id', component: OrderDetailComponent, canActivate: [AuthenticationGuard]},
      { path: 'form-order', component: OrderFormComponent, canActivate: [AuthenticationGuard]},
      { path: 'form-order/:id', component: OrderFormComponent, canActivate: [AuthenticationGuard]}
    ]
  },

  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
