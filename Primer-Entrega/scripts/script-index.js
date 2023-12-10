let cantidadProveedores = document.getElementById("cantidad-proveedores");
let cantidadProductos = document.getElementById("cantidad-productos");
let cantidadOrdenes = document.getElementById("cantidad-ordenes");

window.addEventListener("load", ()=>{
    //Pregunta si el localStorage existe. Si no existe (ya que no se crearon elementos todavía) la cantidad del contador será 0.
    cantidadProveedores.innerHTML = localStorage.getItem("cantProveedores") === null ? 0 : localStorage.getItem("cantProveedores");
    cantidadProductos.innerHTML = localStorage.getItem("cantProductos") === null ? 0 : localStorage.getItem("cantProductos");
    cantidadOrdenes.innerHTML = localStorage.getItem("cantOrdenes") === null ? 0 : localStorage.getItem("cantOrdenes");
});