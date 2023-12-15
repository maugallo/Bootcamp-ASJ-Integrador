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
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'proveedores/abm-proveedor', component: AbmProveedorComponent },
  { path: 'proveedores/form-proveedor', component: FormProveedorComponent },
  { path: 'productos/abm-producto', component: AbmProductoComponent },
  { path: 'productos/form-producto', component: FormProductoComponent },
  { path: 'ordenes/abm-orden', component: AbmOrdenComponent },
  { path: 'ordenes/form-orden', component: FormOrdenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
