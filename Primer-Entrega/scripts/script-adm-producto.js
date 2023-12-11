const notyf = new Notyf({position: {x:'center',y:'top'}});

window.addEventListener("load", () => {
    if (localStorage.getItem("producto") === null) {
        notyf.error("¡No hay elementos en la tabla!");
    } else {
        let arrayProductos = JSON.parse(localStorage.getItem("producto"));
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
            tdAcciones.innerHTML = `<a class="me-2 text-decoration-none" href="" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="abrirModal(${arrayProductos[index].codigo})">🗑️</a> <a class="text-decoration-none" href="" onclick="editarProducto()">✏️</a>`;

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

function abrirModal(codigo){
    sessionStorage.clear();
    sessionStorage.setItem("codigoProducto", codigo);
}

function eliminarProducto(){
    let codigo = sessionStorage.getItem("codigoProducto");
    let arrayProductos = JSON.parse(localStorage.getItem("producto"));
    //Encuentro el index del elemento dentro del array que cumpla la condición especificada.
    let index = arrayProductos.findIndex(producto => producto.codigo === codigo);
    //Uso el index encontrado para eliminar dicho elemento.
    arrayProductos.splice(index, 1);
    //Modifico el localStorage. Si el array se queda sin elementos, directamente remuevo el localStorage.
    if (arrayProductos.length > 0){
        localStorage.setItem("producto", JSON.stringify(arrayProductos));
    } else{
        localStorage.removeItem("producto");
    }
    window.location.href = "adm-producto.html";
}

function editarProducto(){
    alert("Próximamente!");
}