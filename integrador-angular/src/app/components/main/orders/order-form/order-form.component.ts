import { Component } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrder } from '../../../../models/purchaseOrder';
import { NgForm } from '@angular/forms';
import { Provider } from '../../../../models/provider';
import { Product } from '../../../../models/product';
import { OrderDetail } from '../../../../models/orderDetail';
import { ProductService } from '../../../../services/product.service';
import { AlertHandler } from '../../../../utils/alertHandler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  //Objetos que se enlazarán mediante ngModel en el form:
  order: PurchaseOrder = {
    details: [],
    orderStatus: '',
    provider: null!,
    issueDate: new Date(),
    deliveryDate: null!,
    receptionInfo: '',
    total: 0
  }

  detail: OrderDetail = {
    product: null!,
    quantity: 0,
  }

  //Select de proveedores que se renderizará en el form.
  providerSelect: Provider[] = [];

  //Select de productos que se rendizará en el form.
  productSelect: Product[] = [];
  productInput!: Product;
  quantityInput!: number;

  //Variables para manejar el título y nombre del botón:
  formTitle: string = "AGREGAR ORDEN DE COMPRA";
  buttonName: string = "Agregar";

  //Variable para determinar si se editará o creará una órden de compra:
  param!: number;

  private alertHandler = new AlertHandler();

  constructor(private orderService: OrderService, private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.renderProviderSelect();

    this.param = this.getParameter();
    if (this.param){
      this.orderService.getOrderById(this.param).subscribe({
        next: (data) => {
          if (data) {
            this.order = data;

            this.preRenderProvider();
            this.preRenderProduct();

            this.formTitle = "EDITAR ORDEN DE COMPRA";
            this.buttonName = "Editar";
          } else {
            this.router.navigate(['orders/form-order']);
          }
        }
      })
    } else {
      this.router.navigate(['orders/form-order']);
    }
  }

  formatDate(date: Date){
    let year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1); //January starts in 0, so we add 1 for this format.
    let day = '' + date.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  getParameter(){
    return Number(this.activatedRoute.snapshot.params['id']);
  }

  renderProviderSelect(){
    this.orderService.getProvidersForSelect().subscribe({
      next: (data) => {
        this.providerSelect = data;
      }
    })
  }

  renderProductSelect(){
    this.orderService.getProductsForSelect(this.order.provider.id!).subscribe({
      next: (data) => {
        this.productSelect = data;
      }
    })
  }

  preRenderProvider(){
    this.order.provider = this.providerSelect.find(
      (provider) =>
        provider.id === this.order.provider.id
    )!;
  }

  preRenderProduct(){
    
  }

  //Métodos de formulario para agregar órdenes de compra:
  onSubmit(form: NgForm){
    if (form.valid){
      if (this.areOrderDetails() === false){
        Swal.fire({
          icon: "warning",
          title: "La orden no cuenta con productos agregados",
        });
      } else if (this.areDatesCorrect() === false){
        Swal.fire({
          icon: "warning",
          title: "La fecha de entrega no puede ser menor o igual a la fecha de emisión",
        });
      } else{
        if (this.buttonName === "Agregar"){
          this.addOrder();
        }
        else if (this.buttonName === "Editar"){
          this.orderService.updateOrder();
          alert("Orden modificada!");
        }

        this.router.navigate(['/orders']);
      }
    }
  }

  addOrder(){
    this.order.orderStatus = 'PENDIENTE';
    this.orderService.addOrder(this.order).subscribe({
      next: (data) => {
        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });

        this.router.navigate(['orders/']);
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.error
        });
      }
    })
  }

  updateOrder(){
    this.orderService.updateOrder().subscribe({
      next: (data) => {
        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });

        this.router.navigate(['orders/']);
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.error
        });
      }
    })
  }

  areOrderDetails(){
    if (this.order.details.length === 0){
      return false;
    } else{
      return true;
    }
  }

  areDatesCorrect(){
    let issueDate = new Date(this.order.issueDate);
    let deliveryDate = new Date(this.order.deliveryDate);
    if (issueDate >= deliveryDate){
      return false;
    } else{
      return true;
    }
  }

  //Métodos de formulario para agregar detalles a la orden de compra:
  addDetail(){
     if (this.isSelectedProductRepeated() === false){
      this.detail = {product: this.productInput, quantity: this.quantityInput};

      this.order.details.push(this.detail);
     }
    
    this.calculateTotal();
  }

  isSelectedProductRepeated(){
    let flag = false;
    this.order.details.forEach((detail) => {
      if (detail.product.sku === this.productInput.sku){
        detail.quantity += this.quantityInput;
        flag = true;
      }
    })
    return flag;
  }

  selectProvider(){ //Método del evento (change) del select de proveedores.
    this.renderProductSelect();
  }

  calculateTotal(){
    this.order.total = 0;
    this.order.details.forEach((detail) => {
      this.order.total += this.calculateSubtotal(detail);
    })
  }

  calculateSubtotal(detail: OrderDetail){
    return (detail.product.price * detail.quantity);
  }

  removeDetail(sku: string){
    this.order.details = this.order.details.filter((detail) => detail.product.sku != sku);
    this.calculateTotal();
  }
}
