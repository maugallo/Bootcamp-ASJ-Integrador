//Crear notyf

let txtNombre = document.getElementById("txtNombre");
let txtCodigo = document.getElementById("txtCodigo");
let txtPrecio = document.getElementById("txtPrecio");
let selectProveedor = document.getElementById("selectProveedor");
let selectCategoria = document.getElementById("selectCategoria");

function agregarProducto(){
    let producto = {codigo: txtCodigo.value, nombre: txtNombre.value, precio: txtPrecio.value, proveedor: selectProveedor.value, categoria: selectCategoria.value};
    if (localStorage.getItem("producto") === null){
        //Si no habia un localStorage previo, entonces pusheamos el objeto 'producto' y creamos el localStorage.
        let arrayProductos = [];
        arrayProductos.push(producto);
        localStorage.setItem("producto", JSON.stringify(arrayProductos));
    } else{
        //Si ya había un localStorage previo, entonces lo devolvemos a un array, le pusheamos el objeto 'producto' y pisamos el localStorage con los valores actualizados.
        let arrayProductos = JSON.parse(localStorage.getItem("producto"));
        arrayProductos.push(producto);
        localStorage.setItem("producto", JSON.stringify(arrayProductos));
    }
    alert("¡Producto agregado correctamente!");
    window.location.href = "adm-producto.html";
}