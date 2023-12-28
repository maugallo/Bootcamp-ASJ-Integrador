import { Component } from '@angular/core';
import { ServiceOrdenService } from '../../../../services/service-orden.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectProveedores!: Proveedor[];
  codProveedorSeleccionado!: string;

  //Select de productos que se rendizará en el form.
  selectProductos!: Producto[];
  skuProductoSeleccionado: string = "";
  cantidadProductoSeleccionado!: number | undefined;

  //Variables para manejar el título y nombre del botón:
  title: string = "AGREGAR ORDEN DE COMPRA";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará una órden de compra:
  nroOrdenParam!: number;

  constructor(private ordenService: ServiceOrdenService, private productoService: ServiceProductoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.renderProvidersSelect();

    this.nroOrdenParam = Number(this.getParameter());
    let ordenByParam = this.ordenService.getOrder(this.nroOrdenParam);
    if (ordenByParam){
      this.orden = ordenByParam;
      this.codProveedorSeleccionado = this.orden.proveedor!.codigo; //Preseleccionar en el select, el proveedor de la orden.
      this.renderProductsSelect();
      this.title = "EDITAR ORDEN DE COMPRA";
      this.buttonName = "Editar";
    } else{
      this.router.navigate(['orders/form-order']);
    }
  }

  getParameter(){
    return this.activatedRoute.snapshot.params['id'];
  }

  renderProvidersSelect(){
    this.selectProveedores = this.ordenService.getProvidersForSelect();
  }

  renderProductsSelect(){
    this.selectProductos = this.ordenService.getProductsForSelect(this.codProveedorSeleccionado);
  }

  //Métodos de formulario para agregar órdenes de compra:
  onSubmit(form: NgForm){
    if (form.valid){
      if (this.isItemListValid() === false){
        alert("La orden no cuenta con productos agregados");
      }

      else if (this.areDatesCorrect() === false){
        alert("La fecha de entrega no puede ser menor o igual a la fecha de emisión");
      }

      else if (this.isDatePresent() === false) {
        alert("La fecha de emisión no puede ser anterior a la fecha actual");
      }

      else{
        if (this.buttonName === "Agregar"){
          this.orden.nroOrden = this.ordenService.generateCode();
          this.orden.proveedor = this.selectProveedores.find((proveedor) => proveedor.codigo === this.codProveedorSeleccionado);

          this.ordenService.addOrder(this.orden);
          alert("Orden creada!");
        }
        
        else if (this.buttonName === "Editar"){
          this.ordenService.updateOrder(this.orden);
          alert("Orden modificada!");
        }

        this.router.navigate(['/orders']);
      }
    }
  }

  isItemListValid(){
    if (this.orden.listaItems.length === 0){
      return false;
    } else{
      return true;
    }
  }

  areDatesCorrect(){
    if (this.orden.fechaEmision! >= this.orden.fechaEntrega!){
      return false;
    } else{
      return true;
    }
  }

  isDatePresent(){
    let fechaEmision = new Date(this.orden.fechaEmision!); //Transformamos en formato Date crudo así podemos comparar con la fecha actual.
    fechaEmision.setDate(fechaEmision.getDate() + 1); //Le seteo 1 día más para que funcione.
    fechaEmision.setHours(0, 0, 0, 0);
    let fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    
    if (fechaEmision < fechaHoy){
      return false;
    } else{
      return true;
    }
  }

  //Métodos de formulario para agregar items a la orden de compra:
  addItem(){
    if (this.isProductRepeated() === false){
      this.item = {producto: this.productoService.getProduct(this.skuProductoSeleccionado), cantidad: this.cantidadProductoSeleccionado};
      this.orden.listaItems.push(this.item);
    }
    this.calculateTotal();
  }

  isProductRepeated(){
    for(let item of this.orden.listaItems){
      if (item.producto?.sku === this.skuProductoSeleccionado){
        item.cantidad! += this.cantidadProductoSeleccionado!;
        return true;
      }
    }
    return false;
  }

  selectProvider(){ //Método del evento (change) del select de proveedores.
    this.renderProductsSelect();
  }

  calculateTotal(){
    this.orden.total = 0;
    this.orden.listaItems.forEach((item) => {
      this.orden.total! += this.calculateSubtotal(item);
    })
  }

  calculateSubtotal(item: ItemOrden){
    return (item.producto?.precio! * item.cantidad!);
  }

  removeItem(sku: string){
    this.orden.listaItems = this.orden.listaItems.filter((item) => item.producto?.sku != sku);
    this.calculateTotal();
  }
}
