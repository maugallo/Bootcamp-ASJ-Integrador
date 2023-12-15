import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/main/home/home.component';
import { AbmProveedorComponent } from './components/main/proveedores/abm-proveedor/abm-proveedor.component';
import { FormProveedorComponent } from './components/main/proveedores/form-proveedor/form-proveedor.component';
import { AbmProductoComponent } from './components/main/productos/abm-producto/abm-producto.component';
import { FormProductoComponent } from './components/main/productos/form-producto/form-producto.component';
import { AbmOrdenComponent } from './components/main/ordenes/abm-orden/abm-orden.component';
import { FormOrdenComponent } from './components/main/ordenes/form-orden/form-orden.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    AbmProveedorComponent,
    FormProveedorComponent,
    AbmProductoComponent,
    FormProductoComponent,
    AbmOrdenComponent,
    FormOrdenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
