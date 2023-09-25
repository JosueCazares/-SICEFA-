async function cargarSucursal() {
    let response = await fetch("html/sucursal/sucursal.html");
    let text = await response.text();
    document.getElementById("pagina").innerHTML = text;
}

async function cargarLoginSucursal() {
    let response = await fetch("html/sucursal/login.html");
    let text = await response.text();
    document.getElementById("contenido").innerHTML = text;
}

function sucursalLogin() {

    const usuarioInput = document.getElementById('txtUsuario');
    const contrasenaInput = document.getElementById('txtContrasena');

    const usuario = usuarioInput.value;
    const contrasena = contrasenaInput.value;

    const usuarioEncontrado = usuarios.find(usuarioObj => {
        return usuarioObj.usuario === usuario && usuarioObj.contrasena === contrasena;
    });

    if (usuarioEncontrado) {
        const empleado = usuarioEncontrado.empleado;
        const persona = personas[empleado.persona];

        switch (usuarioEncontrado.rol) {
            case "ADMS":
                // Acciones para rol de Administrador de Sucursal (ADMS)
                cargarMenuSucursal();
                break;
            case "EMPS":
                cargarMenuEmpleadosSucursal();
                break;
            default:
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.'
                });
                break;
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.'
        });
    }
}

async function cargarMenuEmpleadosSucursal() {
    let response = await fetch("html/sucursal/menu.html");
    let text = await response.text();
    document.getElementById("pagina").innerHTML = text;
    document.getElementById("btnPedidos").setAttribute("hidden", "true");
    document.getElementById("btnClientes").setAttribute("hidden", "true");
    document.getElementById("btnEmpleados").setAttribute("hidden", "true");
}

async function cargarMenuSucursal() {
    let response = await fetch("html/sucursal/menu.html");
    let text = await response.text();
    document.getElementById("pagina").innerHTML = text;
}

async function cargarVentasSucursal() {
    let response = await fetch("html/sucursal/venta/modulo.html");
    let text = await response.text();
    document.getElementById("contenido").innerHTML = text;
}

function mostrarBotonesSucursal(editar, eliminar, cancelar, aceptar) {
    if (editar === true) {
        document.getElementById("btnEditar").removeAttribute("hidden");
    } else {
        document.getElementById("btnEditar").setAttribute("hidden", "true");
    } if (eliminar === true) {
        document.getElementById("btnEliminar").removeAttribute("hidden");
    } else {
        document.getElementById("btnEliminar").setAttribute("hidden", "true");
    } if (cancelar === true) {
        document.getElementById("btnCancelar").removeAttribute("hidden");
    } else {
        document.getElementById("btnCancelar").setAttribute("hidden", "true");
    } if (aceptar === true) {
        document.getElementById("btnAceptar").removeAttribute("hidden");
    } else {
        document.getElementById("btnAceptar").setAttribute("hidden", "true");
    }
}