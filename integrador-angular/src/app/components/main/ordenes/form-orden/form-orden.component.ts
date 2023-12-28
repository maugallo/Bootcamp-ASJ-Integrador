import { Component } from '@angular/core';
import { ServiceOrdenService } from '../../../../services/service-orden.service';
import { Router } from '@angular/router';
import { Orden } from '../../../../models/ordenes';
import { NgForm } from '@angular/forms';
import { Proveedor } from '../../../../models/proveedores';
import { Producto } from '../../../../models/productos';
import { ItemOrden } from '../../../../models/itemOrden';
import { ServiceProductoService } from '../../../../services/service-producto.service';

@Component({
  selector: 'app-form-orden',
  templateUrl: './form-orden.component.html',
  styleUrl: './form-orden.component.css'
})
export class FormOrdenComponent {
  //Objeto Orden que se enlazará mediante ngModel en el form:
  orden: Orden = {
    nroOrden: undefined,
    fechaEmision: undefined,
    fechaEntrega: undefined,
    infoRecepcion: "",
    direccion: "",
    proveedor: undefined,
    listaItems: [],
    total: 0,
    habilitado: true,
  }

  item: ItemOrden = {
    producto: undefined,
    cantidad: undefined,
  }

  //Select de proveedores que se renderizará en el form.
  proveedores!: Proveedor[];
  codigoProveedor!: string;

  //Select de productos que se rendizará en el form.
  productos!: Producto[];
  skuProducto: string = "";
  cantidadProducto!: number | undefined;

  //Variables para manejar el título y nombre del botón:
  title: string = "AGREGAR ORDEN DE COMPRA";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará una órden de compra:
  nroOrdenParam!: string;

  constructor(private ordenService: ServiceOrdenService, private productoService: ServiceProductoService, private router: Router) { }

  ngOnInit(): void {
    this.proveedores = this.ordenService.getProvidersForSelect();
  }

  onSubmit(form: NgForm){
    
  }

  addItem(){
    if (this.isProductRepeated() === false){
      let productoElegido: Producto = this.productoService.getProduct(this.skuProducto);
      this.item = {producto: productoElegido, cantidad: this.cantidadProducto};
      this.orden.listaItems.push(this.item);
    }
    this.orden.total = 0;
    this.orden.listaItems.forEach((item) => {
      this.orden.total = Number(this.orden.total) + (Number(item.producto?.precio!) *  Number(item.cantidad!));
    })
  }

  isProductRepeated(){
    for(let item of this.orden.listaItems){
      if (item.producto?.sku === this.skuProducto){
        item.cantidad! = Number(item.cantidad) +  Number(this.cantidadProducto!);
        return true;
      }
    }
    return false;
  }

  calculateTotal(){
    
  }

  selectProvider(){
    this.productos = this.ordenService.getProductsForSelect(this.codigoProveedor);
  }
  
}
