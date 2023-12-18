import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { AbmProveedorComponent } from './components/main/proveedores/abm-proveedor/abm-proveedor.component';
import { FormProveedorComponent } from './components/main/proveedores/form-proveedor/form-proveedor.component';
import { AbmProductoComponent } from './components/main/productos/abm-producto/abm-producto.component';
import { FormProductoComponent } from './components/main/productos/form-producto/form-producto.component';
import { AbmOrdenComponent } from './components/main/ordenes/abm-orden/abm-orden.component';
import { FormOrdenComponent } from './components/main/ordenes/form-orden/form-orden.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  

  { path: 'proveedores',
  children: [
    { path: '', component: AbmProveedorComponent},
    { path: 'form-proveedor', component: FormProveedorComponent}
  ]},

  { path: 'productos',
  children: [
    { path: '', component: AbmProductoComponent},
    { path: 'form-producto', component: FormProductoComponent}
  ]},
  
  { path: 'ordenes',
  children: [
    { path: '', component: AbmOrdenComponent},
    { path: 'form-orden', component: FormOrdenComponent}
  ]},

  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
