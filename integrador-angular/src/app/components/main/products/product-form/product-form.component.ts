import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  //Objeto Producto que se enlazará mediante ngModel en el form:
  product: Product = {
    sku: "",
    image: "",
    title: "",
    price: 0,
    description: "",
    category: "", //Preselecciono el primer elemento en el select.
    provider: {} as Provider,
    enabled: true,
  }
  
  //Select de proveedores que se renderizará en el form.
  providerSelect: Provider[] = [];
  codeSelectedProvider: string = "";

  //Variables para manejar el título y nombre del botón:
  formTitle: string = "AGREGAR PRODUCTO";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará un proveedor en el form [diabled]="skuParam"
  param!: string; //Si es una cadena de string vacía o null, el elemento enlazado estará habilitado. Si es una cadena con algún valor, el elemento enlazado estará deshabilitado.
  
  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.renderProviderSelect();

    this.param = this.getParameter();
    let productByParam = this.productService.getProduct(this.param);
    if (productByParam){
      this.product = productByParam;
      this.codeSelectedProvider = this.product.provider.code; //Preseleccionar en el select, el proveedor del producto.
      this.formTitle = "EDITAR PRODUCTO";
      this.buttonName = "Editar";
    } else{
      this.router.navigate(['products/form-product']);
    }
  }

  getParameter(){
    return this.activatedRoute.snapshot.params['id'];
  }

  renderProviderSelect(){
    this.providerSelect = this.productService.getProvidersForSelect();
  }

  //Métodos de formulario para agregar productos:
  onSubmit(form: NgForm){
    if (form.valid){
      if (this.buttonName === "Agregar"){
        if (this.isSkuRepeated(this.product.sku)){
          alert("El SKU del producto ya existe");
        }

        else{
          this.product.provider = this.providerSelect.find((provider) => provider.code === this.codeSelectedProvider)!; //Obtenemos el objeto de proveedor seleccionado.
          this.productService.addProduct(this.product);
          alert("Producto creado!");
          this.router.navigate(['/products']);
        }
      }
      
      else if (this.buttonName === "Editar"){
        this.product.provider = this.providerSelect.find((provider) => provider.code === this.codeSelectedProvider)!; //Obtenemos el objeto de proveedor seleccionado.
        this.productService.updateProduct(this.product);
        alert("Producto modificado!");
        this.router.navigate(['/products']);
      }
    }
  }

  isSkuRepeated(sku: string){
    let index = this.productService.getProducts().findIndex((product: Product) => product.sku === sku);
    if (index != -1){
      return true;
    } else{
      return false;
    }
  }
}
