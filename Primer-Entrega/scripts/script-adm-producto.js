const notyf = new Notyf({position: {x:'center',y:'top'}});

window.addEventListener("load", () => {
    if (localStorage.getItem("producto") === null) {
        notyf.error("Todavía no hay productos creados");
    } else {
        let = arrayProductos = JSON.parse(localStorage.getItem("producto"));
        for (let index = 0; index < arrayProductos.length; index++) {
            let tableBody = document.getElementById("table-body");

            let tr = document.createElement("tr");

            let tdCodigo = document.createElement("td");
            let tdNombre = document.createElement("td");
            let tdPrecio = document.createElement("td");
            let tdProveedor = document.createElement("td");
            let tdCategoria = document.createElement("td");
            let tdAcciones = document.createElement("td");

            let txtCodigo = document.createTextNode(arrayProductos[index].codigo);
            let txtNombre = document.createTextNode(arrayProductos[index].nombre);
            let txtPrecio = document.createTextNode(arrayProductos[index].precio);
            let txtProveedor = document.createTextNode(arrayProductos[index].proveedor);
            let txtCategoria = document.createTextNode(arrayProductos[index].categoria);

            tdCodigo.appendChild(txtCodigo);
            tdNombre.appendChild(txtNombre);
            tdPrecio.appendChild(txtPrecio);
            tdProveedor.appendChild(txtProveedor);
            tdCategoria.appendChild(txtCategoria);
            tdAcciones.innerHTML = `<a class="me-2 text-decoration-none" href="" onclick="eliminarProducto()">🗑️</a> <a class="text-decoration-none" href="" onclick="editarProducto()">✏️</a>`;

            tr.appendChild(tdCodigo)
            tr.appendChild(tdNombre);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdProveedor);
            tr.appendChild(tdCategoria);
            tr.appendChild(tdAcciones);

            tableBody.appendChild(tr);
        }
    }
});

function eliminarProducto(){
    alert("Próximamente!");
}

function editarProducto(){
    alert("Próximamente!");
}