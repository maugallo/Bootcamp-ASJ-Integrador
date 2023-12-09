let txtFechaEmision = document.getElementById("txtFechaEmision");
let txtFechaEntrega = document.getElementById("txtFechaEntrega");
let selectProveedor = document.getElementById("selectProveedor");
let txtTotal = document.getElementById("txtTotal");

function agregarOrden(){
    let arrayOrdenes = [];
    if (localStorage.getItem("orden") === null){
        //Si no habia un localStorage previo, entonces creamos el objeto orden (con código = 1), pusheamos el objeto y creamos el localStorage.
        let orden = {codigo: 1, fechaEmision: txtFechaEmision.value, fechaEntrega: txtFechaEntrega.value, proveedor: selectProveedor.value, total: txtTotal.value};
        arrayOrdenes.push(orden);
        localStorage.setItem("orden", JSON.stringify(arrayOrdenes));
    } else{
        //Si ya había un localStorage previo, entonces lo devolvemos a un array, calculamos el último código para asignar un nuevo código a partir del último y le pusheamos el objeto 'orden', pisamos el localStorage con los valores actualizados.
        arrayOrdenes = JSON.parse(localStorage.getItem("orden"));
        let ultimoCodigo = arrayOrdenes[arrayOrdenes.length - 1].codigo;
        let orden = {codigo: ultimoCodigo + 1, fechaEmision: txtFechaEmision.value, fechaEntrega: txtFechaEntrega.value, proveedor: selectProveedor.value, total: txtTotal.value};
        arrayOrdenes.push(orden);
        localStorage.setItem("orden", JSON.stringify(arrayOrdenes));
    }
    //Agrego un localStorage para mantener un contador global de los proveedores que hay. Esto servirá para el index.
    localStorage.setItem("cantOrdenes", arrayOrdenes.length);
    alert("Orden agregada correctamente!");
    window.location.href = "adm-orden.html";
}