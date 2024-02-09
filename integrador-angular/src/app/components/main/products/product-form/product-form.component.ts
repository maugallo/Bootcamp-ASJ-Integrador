import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Category } from '../../../../models/category';
import { AlertService } from '../../../../services/utils/alert.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  //Product object attributes:
  inputCategory!: Category;
  inputProvider!: Provider;
  inputSku!: string;
  inputImage!: string;
  inputTitle!: string;
  inputPrice!: number;
  inputDescription!: string;

  //Product object that will be send in the request:
  product: Product = {
    category: undefined!,
    provider: undefined!,
    sku: '',
    image: '',
    title: '',
    price: 0,
    description: '',
    isEnabled: true
  };

  //Selects to render in the form:
  providerSelect: Provider[] = [];
  categorySelect: Category[] = [];

  //Variables to handle create or update;:
  param!: number;
  formTitle: string = 'AGREGAR PRODUCTO';
  buttonName: string = 'Agregar';

  //Object for back validations:
  @ViewChild('sku') skuNgModel!: NgModel;

  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.renderProviderSelect();
    this.renderCategorySelect();

    this.param = this.getParameter();
    if (this.param) {
      this.productService.getProductById(this.param).subscribe({
        next: (data) => {
          if (data) {
            this.product = data;

            //Precharge all the selects and inputs:
            this.preRenderProvider();
            this.preRenderCategory();

            this.inputSku = this.product.sku;
            this.inputImage = this.product.image;
            this.inputTitle = this.product.title;
            this.inputPrice = this.product.price;
            this.inputDescription = this.product.description;

            this.formTitle = 'EDITAR PRODUCTO';
            this.buttonName = 'Editar';
          } else {
            this.router.navigate(['products/form-product']);
          }
        },
        error: () => {
          this.router.navigate(['products/form-product']);
        }
      })
    } else {
      this.router.navigate(['products/form-product']);
    }
  }

  getParameter() {
    return Number(this.activatedRoute.snapshot.params['id']); 
  }

  renderProviderSelect() {
    this.productService.getProvidersForSelect().subscribe({
      next: (data) => {
        this.providerSelect = data;
      },
      error: (error) => {
        this.providerSelect = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    });
  }

  renderCategorySelect(){
    this.productService.getCategoriesForSelect().subscribe({
      next: (data) => {
        this.categorySelect = data;
      },
      error: (error) => {
        this.categorySelect = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    });
  }

  preRenderProvider(){
    this.productService.getProvidersForSelect().subscribe({
      next: (data) => {
        this.providerSelect = data;
        this.inputProvider = this.providerSelect.find(
          (provider) => provider.id === this.product.provider.id
        )!;
      },
      error: (error) => {
        this.providerSelect = [];
        this.alertService.getErrorToast(error.message).fire();
      }
    });
  }

  preRenderCategory(){
    this.inputCategory = this.categorySelect.find(
      (category) => category.id === this.product.category.id
    )!;
  }

  validateSku(){
    if (this.product !== undefined && this.inputSku !== '' && this.inputSku !== this.product.sku){
      this.productService.validateSku(this.inputSku).subscribe({
        next: (isRepeated) => {
          if (isRepeated){
            this.skuNgModel.control.setErrors({ ...this.skuNgModel.errors, skuRepeated: true});
          } else {
            if (this.skuNgModel.errors?.['skuRepeated']){
              delete this.skuNgModel.errors['skuRepeated'];
              this.skuNgModel.control.setErrors(this.skuNgModel.errors);
            }
          }
        },
        error: () => {
          this.skuNgModel.control.setErrors({ ...this.skuNgModel.errors, httpError: true});
        }
      })
    }
  }

  //Send data:
  onSubmit(form: NgForm) {
    if (form.valid) {

      this.product.category = this.inputCategory;
      this.product.provider = this.inputProvider;
      this.product.sku = this.inputSku;
      this.product.image = this.inputImage;
      this.product.title = this.inputTitle;
      this.product.price = this.inputPrice;
      this.product.description = this.inputDescription;

      if (this.buttonName === 'Agregar'){
        this.addProduct();
      } else if (this.buttonName === 'Editar') {
        this.updateProduct();
      }
    }
  }

  addProduct(){
    this.productService.addProduct(this.product).subscribe({
      next: (data) => {
        this.alertService.getSuccessToast(data).fire();
        this.router.navigate(['products/']);
      },
      error: (error) => { //If the observable emmits an error, we use 'error'.
        this.alertService.getErrorAlert(error.message).fire();
      },
    })
  }

  updateProduct(){
    this.productService.updateProduct(this.product).subscribe({
      next: (data) => {
        this.alertService.getSuccessToast(data).fire();
        this.router.navigate(['products/']);
      },
      error: (error) => {
        this.alertService.getErrorAlert(error.message).fire();
      },
    })
  }
}
