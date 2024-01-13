import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { AbmProveedorComponent } from './components/main/proveedores/abm-proveedor/abm-proveedor.component';
import { FormProveedorComponent } from './components/main/proveedores/form-proveedor/form-proveedor.component';
import { ProductCrudComponent } from './components/main/products/product-crud/product-crud.component';
import { ProductFormComponent } from './components/main/products/product-form/product-form.component';
import { OrderCrudComponent } from './components/main/orders/order-crud/order-crud.component';
import { OrderFormComponent } from './components/main/orders/order-form/order-form.component';
import { DetailProveedorComponent } from './components/main/proveedores/detail-proveedor/detail-proveedor.component';
import { ProductDetailComponent } from './components/main/products/product-detail/product-detail.component';
import { OrderDetailComponent } from './components/main/orders/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  

  { path: 'providers',
  children: [
    { path: '', component: AbmProveedorComponent},
    { path: 'form-provider', component: FormProveedorComponent},
    { path: ':id', component: DetailProveedorComponent},
    { path: 'form-provider/:id', component: FormProveedorComponent}
  ]},

  { path: 'products',
  children: [
    { path: '', component: ProductCrudComponent},
    { path: 'form-product', component: ProductFormComponent},
    { path: ':id', component: ProductDetailComponent},
    { path: 'form-product/:id', component: ProductFormComponent}
  ]},
  
  { path: 'orders',
  children: [
    { path: '', component: OrderCrudComponent},
    { path: 'form-order', component: OrderFormComponent},
    { path: ':id', component: OrderDetailComponent},
    { path: 'form-order/:id', component: OrderFormComponent}
  ]},

  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
