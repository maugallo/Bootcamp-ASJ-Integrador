import { Component, OnInit } from '@angular/core';
import { ServiceProductoService } from '../../../../services/service-producto.service';
import { Product } from '../../../../models/product';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent implements OnInit {
  //Objeto Producto que se enlazará mediante ngModel en el form:
  producto: Product = {
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
  selectProveedores: Provider[] = [];
  codProveedorSeleccionado: string = "";

  //Variables para manejar el título y nombre del botón:
  title: string = "AGREGAR PRODUCTO";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará un proveedor en el form [diabled]="skuParam"
  skuParam!: string; //Si es una cadena de string vacía o null, el elemento enlazado estará habilitado. Si es una cadena con algún valor, el elemento enlazado estará deshabilitado.
  
  constructor(private productoService: ServiceProductoService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.renderProvidersSelect();

    this.skuParam = this.getParameter();
    let productByParam = this.productoService.getProduct(this.skuParam);
    if (productByParam){
      this.producto = productByParam;
      this.codProveedorSeleccionado = this.producto.provider!.code; //Preseleccionar en el select, el proveedor del producto.
      this.title = "EDITAR PRODUCTO";
      this.buttonName = "Editar";
    } else{
      this.router.navigate(['products/form-product']);
    }
  }

  getParameter(){
    return this.activatedRoute.snapshot.params['id'];
  }

  renderProvidersSelect(){
    this.selectProveedores = this.productoService.getProvidersForSelect();
  }

  //Métodos de formulario para agregar productos:
  onSubmit(form: NgForm){
    if (form.valid){
      if (this.buttonName === "Agregar"){
        if (this.isSkuRepeated(this.producto.sku)){
          alert("El SKU del producto ya existe");
        }

        else{
          this.producto.provider = this.selectProveedores.find((proveedor) => proveedor.code === this.codProveedorSeleccionado)!; //Obtenemos el objeto de proveedor seleccionado.
          this.productoService.addProduct(this.producto);
          alert("Producto creado!");
          this.router.navigate(['/products']);
        }
      }
      
      else if (this.buttonName === "Editar"){
        this.productoService.updateProduct(this.producto);
        alert("Producto modificado!");
        this.router.navigate(['/products']);
      }
    }
  }

  isSkuRepeated(sku: string){
    let index = this.productoService.getProducts().findIndex((producto: Product) => producto.sku === sku);
    if (index != -1){
      return true;
    } else{
      return false;
    }
  }
}
