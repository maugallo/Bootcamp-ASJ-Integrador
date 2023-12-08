let txtFechaEmision = document.getElementById("txtFechaEmision");
let txtFechaEntrega = document.getElementById("txtFechaEntrega");
let selectProveedor = document.getElementById("selectProveedor");
let txtTotal = document.getElementById("txtTotal");

function agregarOrden(){
    let orden = {fechaEmision: txtFechaEmision.value, fechaEntrega: txtFechaEntrega.value, proveedor: selectProveedor.value, total: txtTotal.value};
    if (localStorage.getItem("orden") === null){
        //Si no habia un localStorage previo, entonces pusheamos el objeto 'orden' y creamos el localStorage.
        let arrayOrdenes = [];
        arrayOrdenes.push(orden);
        localStorage.setItem("orden", JSON.stringify(arrayOrdenes));
        //Después le asignamos al array de códigos un valor inicial y creamos su localStorage.
        let arrayContador = [1]
        localStorage.setItem("contadorCodigo", JSON.stringify(arrayContador));
    } else{
        //Si ya había un localStorage previo, entonces lo devolvemos a un array, le pusheamos el objeto 'orden' y pisamos el localStorage con los valores actualizados.
        let arrayOrdenes = JSON.parse(localStorage.getItem("orden"));
        arrayOrdenes.push(orden);
        localStorage.setItem("orden", JSON.stringify(arrayOrdenes));
        //Después agarramos el array de códigos ya guardado en el localStorage, le sumamos 1 en base a su elemento anterior y lo pisamos.
        let arrayContador = JSON.parse(localStorage.getItem("contadorCodigo"));
        arrayContador.push(arrayContador[arrayContador.length-1] + 1);
        localStorage.setItem("contadorCodigo", JSON.stringify(arrayContador));
    }
    alert("Orden agregada correctamente!");
    window.location.href = "adm-orden.html";
}