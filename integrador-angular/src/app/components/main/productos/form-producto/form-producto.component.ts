import { Component, OnInit } from '@angular/core';
import { ServiceProductoService } from '../../../../services/service-producto.service';
import { Producto } from '../../../../models/productos';
import { Proveedor } from '../../../../models/proveedores';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent implements OnInit {

  arrayProveedores: Proveedor[] = this.productoService.getProvidersSelect();

  producto!: Producto;
  proveedor!: any;
  
  txtNombre!: string;
  txtSku!: string;
  txtPrecio!: number;
  txtDescripcion!: string;
  txtProveedor: number = this.arrayProveedores[0].codigo; //Preselecciono el primer elemento en el select.
  txtCategoria: string = "categoriaA"; //Preselecciono el primer elemento en el select.

  constructor(private productoService: ServiceProductoService, private router: Router){}

  ngOnInit(): void {
    
  }

  addProduct(){
    this.proveedor = this.arrayProveedores.find(proveedor => proveedor.codigo === Number(this.txtProveedor));
    this.producto = { nombre: this.txtNombre, sku: this.txtSku, precio: this.txtPrecio, descripcion: this.txtDescripcion, proveedor: this.proveedor,  categoria: this.txtCategoria}

    this.productoService.addProduct(this.producto);
    alert("Producto creado!");
    //Redireccionar hacia la lista.
    this.router.navigate(['products/']);
  }
}
