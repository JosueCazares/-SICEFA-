var usuarios = [];
function generarAdministrador() {
    persona = {
        "id": 0,
        "nombre": "",
        "apellidoPaterno": "",
        "apellidoMaterno": "",
        "genero": "",
        "fechaNacimiento": "",
        "rfc": "",
        "curp": "",
        "domicilio": "",
        "codigoPostal": "",
        "ciudad": "",
        "estado": "",
        "telefono": "",
        "foto": "",
        "fechaIngreso": ""
    };

    sucursal = {
        "id": 0,
        "nombre": "",
        "titular": "",
        "rfc": "",
        "domicilio": "",
        "colonia": "",
        "codigoPostal": "",
        "ciudad": "",
        "estado": "",
        "telefono": "",
        "latitud": "",
        "longitud": "",
        "estatus": 0
    };

    empleado = {
        "id": 0,
        "codigo": "",
        "puesto": "",
        "salario": 0,
        "activo": 0,
        "persona": persona,
        "sucursal": sucursal
    };

    usuario = {
        "usuario": "admin",
        "contrasena": "admin",
        "rol": "Administrador",
        "empleado": empleado
    };

    usuarios[0] = usuario;
}

function sucursalLogin() {
    generarAdministrador();
    let user = document.getElementById("txtUsuario").value;
    let pass = document.getElementById("txtContrasena").value;
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario == user) {
            if (usuarios[i].contrasena == pass) {
                cargarMenuSucursal();
            }
        }
    }
}


