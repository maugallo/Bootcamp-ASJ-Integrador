import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    AbmProveedorComponent,
    FormProveedorComponent,
    ProductCrudComponent,
    ProductFormComponent,
    OrderCrudComponent,
    OrderFormComponent,
    DetailProveedorComponent,
    ProductDetailComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
