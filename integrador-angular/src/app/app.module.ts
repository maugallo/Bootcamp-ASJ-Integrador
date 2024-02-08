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
import { ProviderCrudComponent } from './components/main/providers/provider-crud/provider-crud.component';
import { ProviderFormComponent } from './components/main/providers/provider-form/provider-form.component';
import { ProductCrudComponent } from './components/main/products/product-crud/product-crud.component';
import { ProductFormComponent } from './components/main/products/product-form/product-form.component';
import { OrderCrudComponent } from './components/main/orders/order-crud/order-crud.component';
import { OrderFormComponent } from './components/main/orders/order-form/order-form.component';
import { ProviderDetailComponent } from './components/main/providers/provider-detail/provider-detail.component';
import { ProductDetailComponent } from './components/main/products/product-detail/product-detail.component';
import { OrderDetailComponent } from './components/main/orders/order-detail/order-detail.component';
import { VatConditionPipe } from './pipes/vat-condition.pipe';
import { CategoryCrudComponent } from './components/main/products/product-crud/category-crud/category-crud.component';
import { SectorCrudComponent } from './components/main/providers/provider-crud/sector-crud/sector-crud.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HomeComponent,
    ProviderCrudComponent,
    ProviderFormComponent,
    ProductCrudComponent,
    ProductFormComponent,
    OrderCrudComponent,
    OrderFormComponent,
    ProviderDetailComponent,
    ProductDetailComponent,
    OrderDetailComponent,
    VatConditionPipe,
    CategoryCrudComponent,
    SectorCrudComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
