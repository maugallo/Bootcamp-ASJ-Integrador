const notyf = new Notyf({position: {x:'center',y:'top'}});

window.addEventListener("load", () => {
    if (localStorage.getItem("proveedor") === null) {
        notyf.error("Todavía no hay proveedores creados");
    } else {
        let = arrayProveedores = JSON.parse(localStorage.getItem("proveedor"));
        let = arrayCodigos = JSON.parse(localStorage.getItem("contadorCodigo"));
        for (let index = 0; index < arrayProveedores.length; index++) {
            let tableBody = document.getElementById("table-body");

            let tr = document.createElement("tr");

            let tdCodigo = document.createElement("td");
            let tdRubro = document.createElement("td");
            let tdEmpresa = document.createElement("td");
            let tdEmail = document.createElement("td");
            let tdTelefono = document.createElement("td");
            let tdAcciones = document.createElement("td");

            let txtCodigo = document.createTextNode(arrayCodigos[index]);
            let txtRubro = document.createTextNode(arrayProveedores[index].rubro);
            let txtEmpresa = document.createTextNode(arrayProveedores[index].empresa);
            let txtEmail = document.createTextNode(arrayProveedores[index].email);
            let txtTelefono = document.createTextNode(arrayProveedores[index].telefono);

            tdCodigo.appendChild(txtCodigo);
            tdRubro.appendChild(txtRubro);
            tdEmpresa.appendChild(txtEmpresa);
            tdEmail.appendChild(txtEmail);
            tdTelefono.appendChild(txtTelefono);
            tdAcciones.innerHTML = `<a class="me-2 text-decoration-none" href="" onclick="eliminarProveedor()">🗑️</a> <a class="text-decoration-none" href="" onclick="editarProveedor()">✏️</a>`;

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

function eliminarProveedor(){
    alert("Próximamente!");
}

function editarProveedor(){
    alert("Próximamente!");
}