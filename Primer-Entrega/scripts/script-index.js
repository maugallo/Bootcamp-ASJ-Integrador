let cantidadProveedores = document.getElementById("cantidad-proveedores");
let cantidadProductos = document.getElementById("cantidad-productos");
let cantidadOrdenes = document.getElementById("cantidad-ordenes");

const arrayProveedores = JSON.parse(localStorage.getItem("proveedor"));
const arrayProductos = JSON.parse(localStorage.getItem("producto"));
const arrayOrdenes = JSON.parse(localStorage.getItem("orden"));

window.addEventListener("load", ()=>{
    //Pregunta si el localStorage existe. Si no existe (ya que no se crearon elementos todavía) la cantidad del contador será 0.
    cantidadProveedores.innerHTML = arrayProveedores === null ? 0 : arrayProveedores.length;
    cantidadProductos.innerHTML = arrayProductos === null ? 0 : arrayProductos.length;
    cantidadOrdenes.innerHTML = arrayOrdenes === null ? 0 : arrayOrdenes.length;
});