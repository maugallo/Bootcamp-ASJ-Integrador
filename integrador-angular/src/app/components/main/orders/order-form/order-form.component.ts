import { Component } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../../models/order';
import { NgForm } from '@angular/forms';
import { Provider } from '../../../../models/provider';
import { Product } from '../../../../models/product';
import { OrderDetail } from '../../../../models/orderDetail';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  //Objeto Order que se enlazará mediante ngModel en el form:
  order: Order = {
    orderNumber: 0,
    issueDate: new Date('0000-00-00'),
    deliveryDate: new Date('0000-00-00'),
    receptionInfo: "",
    provider: {} as Provider,
    orderDetails: [],
    total: 0,
    enabled: true,
  }

  detail: OrderDetail = {
    product: {} as Product,
    quantity: 0,
  }

  //Select de proveedores que se renderizará en el form.
  providerSelect!: Provider[];
  codeSelectedProvider!: string;

  //Select de productos que se rendizará en el form.
  productSelect!: Product[];
  skuSelectedProduct!: string;
  selectedProductQuantity!: number;

  //Variables para manejar el título y nombre del botón:
  formTitle: string = "AGREGAR ORDEN DE COMPRA";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará una órden de compra:
  param!: number;

  constructor(private orderService: OrderService, private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.renderProviderSelect();

    this.param = Number(this.getParameter());
    let orderByParam = this.orderService.getOrder(this.param);
    if (orderByParam){
      this.order = orderByParam;
      this.codeSelectedProvider = this.order.provider.code; //Preseleccionar en el select, el proveedor de la orden.
      this.renderProductSelect();
      this.formTitle = "EDITAR ORDEN DE COMPRA";
      this.buttonName = "Editar";
    } else{
      this.router.navigate(['orders/form-order']);
    }
  }

  getParameter(){
    return this.activatedRoute.snapshot.params['id'];
  }

  renderProviderSelect(){
    this.orderService.getProvidersForSelect().subscribe((data) => {
      this.providerSelect = data;
    });
  }

  renderProductSelect(){
    this.productSelect = this.orderService.getProductsForSelect(this.codeSelectedProvider);
  }

  //Métodos de formulario para agregar órdenes de compra:
  onSubmit(form: NgForm){
    if (form.valid){
      if (this.areOrderDetailsValid() === false){
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
          this.order.orderNumber = this.orderService.generateCode();
          this.order.provider = this.providerSelect.find((proveedor) => proveedor.code === this.codeSelectedProvider)!;

          this.orderService.addOrder(this.order);
          alert("Orden creada!");
        }
        
        else if (this.buttonName === "Editar"){
          this.orderService.updateOrder(this.order);
          alert("Orden modificada!");
        }

        this.router.navigate(['/orders']);
      }
    }
  }

  areOrderDetailsValid(){
    if (this.order.orderDetails.length === 0){
      return false;
    } else{
      return true;
    }
  }

  areDatesCorrect(){
    if (this.order.issueDate >= this.order.deliveryDate){
      return false;
    } else{
      return true;
    }
  }

  isDatePresent(){
    let fechaEmision = new Date(this.order.issueDate); //Transformamos en formato Date crudo así podemos comparar con la fecha actual.
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

  //Métodos de formulario para agregar detalles a la orden de compra:
  addDetail(){
    if (this.isProductRepeated() === false){
      this.detail = {product: this.productService.getProduct(this.skuSelectedProduct), quantity: this.selectedProductQuantity};
      this.order.orderDetails.push(this.detail);
    }
    this.calculateTotal();
  }

  isProductRepeated(){
    for(let detail of this.order.orderDetails){
      if (detail.product.sku === this.skuSelectedProduct){
        detail.quantity += this.selectedProductQuantity;
        return true;
      }
    }
    return false;
  }

  selectProvider(){ //Método del evento (change) del select de proveedores.
    this.renderProductSelect();
  }

  calculateTotal(){
    this.order.total = 0;
    this.order.orderDetails.forEach((detail) => {
      this.order.total += this.calculateSubtotal(detail);
    })
  }

  calculateSubtotal(detail: OrderDetail){
    return (detail.product.price * detail.quantity);
  }

  removeDetail(sku: string){
    this.order.orderDetails = this.order.orderDetails.filter((detail) => detail.product.sku != sku);
    this.calculateTotal();
  }
}
