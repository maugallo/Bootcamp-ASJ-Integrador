import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { Provider } from '../../../../models/provider';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import Swal from 'sweetalert2';
import { AlertHandler } from '../../../../utils/alertHandler';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  //Objetos que se enlazarán mediante ngModel en el form:
  category!: Category;
  provider!: Provider;

  product: Product = {
    category: null!,
    provider: null!,
    sku: '',
    image: '',
    title: '',
    price: 0,
    description: '',
    isEnabled: true,
  };

  realProduct: Product = {
    category: null!,
    provider: null!,
    sku: '',
    image: '',
    title: '',
    price: 0,
    description: '',
    isEnabled: true,
  };

  //Select de proveedores que se renderizará en el form.
  providerSelect: Provider[] = [];

  //Select de categorías que se renderizará en el form.
  categorySelect: Category[] = [];

  //Variables para manejar el título y nombre del botón:
  formTitle: string = 'AGREGAR PRODUCTO';
  buttonName: string = 'Agregar';

  //Variable para determinar si se editará o creará un producto:
  param!: number;

  //Validaciones del back:
  @ViewChild('sku') skuNgModel!: NgModel;

  private alertHandler = new AlertHandler();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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
          if (data){
            this.realProduct = data;

            this.product = JSON.parse(JSON.stringify(this.realProduct));

            this.preRenderProvider();
            this.preRenderCategory();

            this.formTitle = 'EDITAR PRODUCTO';
            this.buttonName = 'Editar';
          } else {
            this.router.navigate(['products/form-product']);
          }
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
      }
    })
  }

  renderCategorySelect(){
    this.categoryService.getCategories(true).subscribe({
      next: (data) => {
        this.categorySelect = data;
      }
    })
  }

  preRenderProvider(){
    this.provider = this.providerSelect.find(
      (provider) =>
        provider.id === this.realProduct.provider.id
    )!;
  }

  preRenderCategory(){
    this.category = this.categorySelect.find(
      (category) =>
        category.id === this.realProduct.category.id
    )!;
  }

  validateSku(){
    if (this.product.sku !== '' && this.product.sku !== this.realProduct.sku){
      this.productService.validateSku(this.product.sku).subscribe({
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

  //Métodos de formulario para agregar productos:
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.realProduct = this.product;
      this.realProduct.provider = this.provider;
      this.realProduct.category = this.category;

      if (this.buttonName === 'Agregar'){
        this.addProduct();
      } else if (this.buttonName === 'Editar') {
        this.updateProduct();
      }
    }
  }

  addProduct(){
    this.productService.addProduct(this.realProduct).subscribe({
      next: (data) => {
        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });

        this.router.navigate(['products/']);
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

  updateProduct(){
    this.productService.updateProduct(this.realProduct).subscribe({
      next: (data) => {
        this.alertHandler.getToast().fire({
          icon: "success",
          title: data,
        });

        this.router.navigate(['products/']);
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
}
