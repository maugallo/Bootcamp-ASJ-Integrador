const notyf = new Notyf({position: {x:'center',y:'top'}});

window.addEventListener("load", () => {
    if (localStorage.getItem("orden") === null) {
        notyf.error("Todavía no hay órdenes creadas");
    } else {
        let = arrayOrdenes = JSON.parse(localStorage.getItem("orden"));
        let = arrayCodigos = JSON.parse(localStorage.getItem("contadorCodigo"));
        for (let index = 0; index < arrayOrdenes.length; index++) {
            let tableBody = document.getElementById("table-body");

            let tr = document.createElement("tr");

            let tdNumero = document.createElement("td");
            let tdFechaEmision = document.createElement("td");
            let tdFechaEntrega = document.createElement("td");
            let tdProveedor = document.createElement("td");
            let tdTotal = document.createElement("td");
            let tdAcciones = document.createElement("td");

            let txtNumero = document.createTextNode(arrayCodigos[index]);
            let txtFechaEmision = document.createTextNode(arrayOrdenes[index].fechaEmision);
            let txtFechaEntrega = document.createTextNode(arrayOrdenes[index].fechaEntrega);
            let txtProveedor = document.createTextNode(arrayOrdenes[index].proveedor);
            let txtTotal = document.createTextNode(arrayOrdenes[index].total);

            tdNumero.appendChild(txtNumero);
            tdFechaEmision.appendChild(txtFechaEmision);
            tdFechaEntrega.appendChild(txtFechaEntrega);
            tdProveedor.appendChild(txtProveedor);
            tdTotal.appendChild(txtTotal);
            tdAcciones.innerHTML = `<a class="me-2 text-decoration-none" href="" onclick="eliminarOrden()">🗑️</a> <a class="text-decoration-none" href="" onclick="editarOrden()">✏️</a>`;

            tr.appendChild(tdNumero)
            tr.appendChild(tdFechaEmision);
            tr.appendChild(tdFechaEntrega);
            tr.appendChild(tdProveedor);
            tr.appendChild(tdTotal);
            tr.appendChild(tdAcciones);

            tableBody.appendChild(tr);
        }
    }
});

function eliminarOrden(){
    alert("Próximamente!");
}

function editarOrden(){
    alert("Próximamente!");
}