import { Component } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrder } from '../../../../models/purchaseOrder';
import { NgForm } from '@angular/forms';
import { Provider } from '../../../../models/provider';
import { Product } from '../../../../models/product';
import { OrderDetail } from '../../../../models/orderDetail';
import { format } from 'date-fns';
import { AlertService } from '../../../../services/utils/alert.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  //Order object attributes:
  inputProvider!: Provider;
  inputIssueDate: string = format(new Date(), 'yyyy-MM-dd');
  inputDeliveryDate!: string;
  inputReceptionInfo!: string;
  inputTotal!: number;

  //Detail object attributes:
  inputProduct!: Product;
  inputQuantity!: number;

  order: PurchaseOrder = {
    details: [],
    status: 'PENDIENTE',
    provider: undefined!,
    issueDate: '',
    deliveryDate: '',
    receptionInfo: '',
    total: 0
  }

  detail: OrderDetail = {
    product: undefined!,
    quantity: 0
  }

  //Selects to render in the form:
  providerSelect: Provider[] = [];
  productSelect: Product[] = [];

  //Variables to handle create or update:
  param!: number;
  formTitle: string = "AGREGAR ORDEN DE COMPRA";
  buttonName: string = "Agregar";

  constructor(
    private orderService: OrderService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.renderProviderSelect();
    
    this.param = this.getParameter();
    if (this.param){
      this.orderService.getOrderById(this.param).subscribe({
        next: (data) => {
          if (data) {
            this.order = data;

            //Precharge all the selects and inputs:
            this.preRenderProvider();
            this.preRenderProducts();

            this.inputProvider = this.order.provider;
            this.inputIssueDate = this.order.issueDate;
            this.inputDeliveryDate = this.order.deliveryDate;
            this.inputReceptionInfo = this.order.receptionInfo;
            this.inputTotal = this.order.total;

            this.formTitle = "EDITAR ORDEN DE COMPRA";
            this.buttonName = "Editar";
          } else {
            this.router.navigate(['orders/form-order']);
          }
        },
        error: () => {
          this.router.navigate(['orders/form-order']);
        }
      })
    } else {
      this.router.navigate(['orders/form-order']);
    }
  }

  getParameter() {
    return Number(this.activatedRoute.snapshot.params['id']);
  }

  formatDate(date: Date){
    let year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1); //January starts in 0, so we add 1 for this format.
    let day = '' + date.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  renderProviderSelect(){
    this.orderService.getProvidersForSelect().subscribe({
      next: (data) => {
        this.providerSelect = data;
      },
      error: (error) => {
        this.providerSelect = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    })
  }

  renderProductSelect(){
    this.orderService.getProductsForSelect(this.inputProvider.id!).subscribe({
      next: (data) => {
        this.productSelect = data;
      },
      error: (error) => {
        this.productSelect = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    })
  }

  preRenderProvider(){
    this.orderService.getProvidersForSelect().subscribe({
      next: (data) => {
        this.providerSelect = data;
        this.inputProvider = this.providerSelect.find(
          (provider) =>
            provider.id === this.order.provider.id
        )!;
      },
      error: (error) => {
        this.providerSelect = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    })
  }

  preRenderProducts(){
    this.orderService.getProductsForSelect(this.order.provider.id!).subscribe({
      next: (data) => {
        this.productSelect = data;
      },
      error: (error) => {
        this.productSelect = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    })
  }

  selectProvider(){ //Método del evento (change) del select de proveedores.
    this.renderProductSelect();
  }

  onSubmit(form: NgForm){
    if (form.valid){
      if (this.areOrderDetails() === false){
        this.alertService.getWarningAlert("La orden no cuenta con productos agregados");
      } else if (this.areDatesCorrect() === false){
        this.alertService.getWarningAlert("La fecha de entrega no puede ser menor o igual a la fecha de emisión");
      } else{

        this.order.provider = this.inputProvider;
        this.order.issueDate = this.inputIssueDate;
        this.order.deliveryDate = this.inputDeliveryDate;
        this.order.receptionInfo = this.inputReceptionInfo;
        this.order.total = this.inputTotal;

        if (this.buttonName === "Agregar"){
          this.addOrder();
        }
        else if (this.buttonName === "Editar"){
          this.updateOrder();
        }
      }
    }
  }

  addOrder(){
    this.orderService.addOrder(this.order).subscribe({
      next: (data) => {
        this.alertService.getSuccessToast(data).fire();
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      }
    })
  }

  updateOrder(){
    this.orderService.updateOrder(this.order).subscribe({
      next: (data) => {
        this.alertService.getSuccessToast(data).fire();
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
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
    let issueDate = new Date(this.inputIssueDate);
    let deliveryDate = new Date(this.inputDeliveryDate);
    if (issueDate >= deliveryDate){
      return false;
    } else{
      return true;
    }
  }

  //Métodos de formulario para agregar detalles a la orden de compra:
  addDetail(){
    if (this.isSelectedProductRepeated() === false){
      this.detail = {product: this.inputProduct, quantity: this.inputQuantity};

      this.order.details.push(this.detail);
    }
    
    this.calculateTotal();
  }

  removeDetail(id: number){
    this.order.details = this.order.details.filter(
      (detail) => detail.product.id != id
    );
    this.calculateTotal();
  }

  isSelectedProductRepeated(){
    let flag = false;
    this.order.details.forEach((detail) => {
      if (detail.product.id === this.inputProduct.id){
        detail.quantity += this.inputQuantity;
        flag = true;
      }
    })
    return flag;
  }

  calculateTotal(){
    this.inputTotal = 0;
    this.order.details.forEach((detail) => {
      this.inputTotal += this.calculateSubtotal(detail);
    })
  }

  calculateSubtotal(detail: OrderDetail){
    return (detail.product.price * detail.quantity);
  }

}
