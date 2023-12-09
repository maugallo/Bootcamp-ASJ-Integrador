const notyf = new Notyf({position: {x:'center',y:'top'}});

window.addEventListener("load", () => {
    if (localStorage.getItem("proveedor") === null) {
        notyf.error("¡No hay elementos en la tabla!");
    } else {
        let = arrayProveedores = JSON.parse(localStorage.getItem("proveedor"));
        for (let index = 0; index < arrayProveedores.length; index++) {
            let tableBody = document.getElementById("table-body");

            let tr = document.createElement("tr");

            let tdCodigo = document.createElement("td");
            let tdRubro = document.createElement("td");
            let tdEmpresa = document.createElement("td");
            let tdEmail = document.createElement("td");
            let tdTelefono = document.createElement("td");
            let tdAcciones = document.createElement("td");

            let txtCodigo = document.createTextNode(arrayProveedores[index].codigo);
            let txtRubro = document.createTextNode(arrayProveedores[index].rubro);
            let txtEmpresa = document.createTextNode(arrayProveedores[index].empresa);
            let txtEmail = document.createTextNode(arrayProveedores[index].email);
            let txtTelefono = document.createTextNode(arrayProveedores[index].telefono);

            tdCodigo.appendChild(txtCodigo);
            tdRubro.appendChild(txtRubro);
            tdEmpresa.appendChild(txtEmpresa);
            tdEmail.appendChild(txtEmail);
            tdTelefono.appendChild(txtTelefono);
            tdAcciones.innerHTML = `<a class="me-2 text-decoration-none" href="" onclick="eliminarProveedor(${arrayProveedores[index].codigo})">🗑️</a> <a class="text-decoration-none" href="" onclick="editarProveedor()">✏️</a>`;

            tr.appendChild(tdCodigo)
            tr.appendChild(tdRubro);
            tr.appendChild(tdEmpresa);
            tr.appendChild(tdEmail);
            tr.appendChild(tdTelefono);
            tr.appendChild(tdAcciones);

            tableBody.appendChild(tr);
        }
    }
});

function eliminarProveedor(codigo){
    let arrayProveedores = JSON.parse(localStorage.getItem("proveedor"));
    //Encuentro el index del elemento dentro del array que cumpla la condición especificada.
    let index = arrayProveedores.findIndex(proveedor => proveedor.codigo === codigo);
    //Uso el index encontrado para eliminar dicho elemento.
    arrayProveedores.splice(index, 1);
    //Modifico el localStorage. Si el array se queda sin elementos, directamente remuevo el localStorage.
    if (arrayProveedores.length > 0){
        localStorage.setItem("proveedor", JSON.stringify(arrayProveedores));
    } else{
        localStorage.removeItem("proveedor");
    }
    //Agrego un localStorage para mantener un contador global de los proveedores que hay. Esto servirá para el index. En este caso se restará cantida.
    localStorage.setItem("cantProveedores", arrayProveedores.length);
}

function editarProveedor(){
    alert("Próximamente!");
}