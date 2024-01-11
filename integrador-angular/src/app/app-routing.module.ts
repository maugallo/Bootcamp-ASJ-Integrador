import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { AbmProveedorComponent } from './components/main/proveedores/abm-proveedor/abm-proveedor.component';
import { FormProveedorComponent } from './components/main/proveedores/form-proveedor/form-proveedor.component';
import { AbmProductoComponent } from './components/main/productos/abm-producto/abm-producto.component';
import { FormProductoComponent } from './components/main/productos/form-producto/form-producto.component';
import { OrderCrudComponent } from './components/main/ordenes/order-crud/order-crud.component';
import { OrderFormComponent } from './components/main/ordenes/order-form/order-form.component';
import { DetailProveedorComponent } from './components/main/proveedores/detail-proveedor/detail-proveedor.component';
import { DetailProductoComponent } from './components/main/productos/detail-producto/detail-producto.component';
import { OrderDetailComponent } from './components/main/ordenes/order-detail/order-detail.component';

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
    { path: '', component: AbmProductoComponent},
    { path: 'form-product', component: FormProductoComponent},
    { path: ':id', component: DetailProductoComponent},
    { path: 'form-product/:id', component: FormProductoComponent}
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
