//Crear notyf

let txtRubro = document.getElementById("txtRubro");
let txtEmpresa = document.getElementById("txtEmpresa");
let txtEmail = document.getElementById("txtEmail");
let txtTelefono = document.getElementById("txtTelefono");

function agregarProveedor(){
    let arrayProveedores = [];
    if (localStorage.getItem("proveedor") === null){
        //Si no habia un localStorage previo, entonces pusheamos el objeto 'proveedor' y creamos el localStorage.
        let proveedor = {codigo: 1, rubro: txtRubro.value, empresa: txtEmpresa.value, email: txtEmail.value, telefono: txtTelefono.value};
        arrayProveedores.push(proveedor);
        localStorage.setItem("proveedor", JSON.stringify(arrayProveedores));
    } else{
        //Si ya había un localStorage previo, entonces lo devolvemos a un array, le pusheamos el objeto 'proveedor' y pisamos el localStorage con los valores actualizados.
        arrayProveedores = JSON.parse(localStorage.getItem("proveedor"));
        let ultimoCodigo = arrayProveedores[arrayProveedores.length - 1].codigo;
        let proveedor = {codigo: ultimoCodigo + 1, rubro: txtRubro.value, empresa: txtEmpresa.value, email: txtEmail.value, telefono: txtTelefono.value};
        arrayProveedores.push(proveedor);
        localStorage.setItem("proveedor", JSON.stringify(arrayProveedores));
    }
    alert("¡Proveedor agregado correctamente!");
    window.location.href = "adm-proveedor.html";
}