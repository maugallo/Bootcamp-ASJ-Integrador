const notyf = new Notyf({position: {x:'center',y:'top'}});

window.addEventListener("load", () => {
    if (localStorage.getItem("orden") === null) {
        notyf.error("¡No hay elementos en la tabla!");
    } else {
        let arrayOrdenes = JSON.parse(localStorage.getItem("orden"));
        for (let index = 0; index < arrayOrdenes.length; index++) {
            let tableBody = document.getElementById("table-body");

            let tr = document.createElement("tr");

            let tdCodigo = document.createElement("td");
            let tdFechaEmision = document.createElement("td");
            let tdFechaEntrega = document.createElement("td");
            let tdProveedor = document.createElement("td");
            let tdTotal = document.createElement("td");
            let tdAcciones = document.createElement("td");

            let txtCodigo = document.createTextNode(arrayOrdenes[index].codigo);
            let txtFechaEmision = document.createTextNode(arrayOrdenes[index].fechaEmision);
            let txtFechaEntrega = document.createTextNode(arrayOrdenes[index].fechaEntrega);
            let txtProveedor = document.createTextNode(arrayOrdenes[index].proveedor);
            let txtTotal = document.createTextNode(arrayOrdenes[index].total);

            tdCodigo.appendChild(txtCodigo);
            tdFechaEmision.appendChild(txtFechaEmision);
            tdFechaEntrega.appendChild(txtFechaEntrega);
            tdProveedor.appendChild(txtProveedor);
            tdTotal.appendChild(txtTotal);
            tdAcciones.innerHTML = `<a class="me-2 text-decoration-none" href="" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="abrirModal(${arrayOrdenes[index].codigo})">🗑️</a> <a class="text-decoration-none" href="" onclick="editarOrden(${arrayOrdenes[index]})">✏️</a>`;

            tr.appendChild(tdCodigo);
            tr.appendChild(tdFechaEmision);
            tr.appendChild(tdFechaEntrega);
            tr.appendChild(tdProveedor);
            tr.appendChild(tdTotal);
            tr.appendChild(tdAcciones);

            tableBody.appendChild(tr);
        }
    }
});

function abrirModal(codigo){
    sessionStorage.clear();
    sessionStorage.setItem("codigoOrden", codigo);
}

function eliminarOrden(){
    let codigo = sessionStorage.getItem("codigoOrden");
    let arrayOrdenes = JSON.parse(localStorage.getItem("orden"));
    //Encuentro el index del elemento dentro del array que cumpla la condición especificada.
    let index = arrayOrdenes.findIndex(orden => orden.codigo === codigo);
    //Uso el index encontrado para eliminar dicho elemento.
    arrayOrdenes.splice(index, 1);
    //Modifico el localStorage. Si el array se queda sin elementos, directamente remuevo el localStorage.
    if (arrayOrdenes.length > 0){
        localStorage.setItem("orden", JSON.stringify(arrayOrdenes));
    } else{
        localStorage.removeItem("orden");
    }
    window.location.href = "adm-orden.html";
}

function editarOrden(orden){
    localStorage.setItem("ordenEditar", orden);
    window.location.href = "form-orden.html";
}