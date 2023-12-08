//Crear notyf

let txtRubro = document.getElementById("txtRubro");
let txtEmpresa = document.getElementById("txtEmpresa");
let txtEmail = document.getElementById("txtEmail");
let txtTelefono = document.getElementById("txtTelefono");

function agregarProveedor(){
    let proveedor = {rubro: txtRubro.value, empresa: txtEmpresa.value, email: txtEmail.value, telefono: txtTelefono.value};
    if (localStorage.getItem("proveedor") === null){
        //Si no habia un localStorage previo, entonces pusheamos el objeto 'proveedor' y creamos el localStorage.
        let arrayProveedores = [];
        arrayProveedores.push(proveedor);
        localStorage.setItem("proveedor", JSON.stringify(arrayProveedores));
        //Después le asignamos al array de códigos un valor inicial y creamos su localStorage.
        let arrayContador = [1]
        localStorage.setItem("contadorCodigo", JSON.stringify(arrayContador));
    } else{
        //Si ya había un localStorage previo, entonces lo devolvemos a un array, le pusheamos el objeto 'proveedor' y pisamos el localStorage con los valores actualizados.
        let arrayProveedores = JSON.parse(localStorage.getItem("proveedor"));
        arrayProveedores.push(proveedor);
        localStorage.setItem("proveedor", JSON.stringify(arrayProveedores));
        //Después agarramos el array de códigos ya guardado en el localStorage, le sumamos 1 en base a su elemento anterior y lo pisamos.
        let arrayContador = JSON.parse(localStorage.getItem("contadorCodigo"));
        arrayContador.push(arrayContador[arrayContador.length-1] + 1);
        localStorage.setItem("contadorCodigo", JSON.stringify(arrayContador));
    }
    alert("¡Proveedor agregado correctamente!");
    window.location.href = "adm-proveedor.html";
}