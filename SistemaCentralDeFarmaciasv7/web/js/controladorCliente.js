async function cargarAgregarCliente() {
    let response = await fetch("html/sucursal/cliente/agregar.html");
    let text = await response.text();
    document.getElementById("contenido").innerHTML = text;
}

async function cargarClientesSucursal() {
    let response = await fetch("html/sucursal/cliente/modulo.html");
    let text = await response.text();
    document.getElementById("contenido").innerHTML = text;
    filtrarClientes();
}

function filtrarClientes() {
    const mostrarActivos = document.getElementById('chkClienteEstatus').checked;
    const filtro = document.getElementById('txtClienteListar').value.toLowerCase();

    let clientesFiltrados = [];

    if (mostrarActivos) {
        clientesFiltrados = clientes.filter(cliente => cliente.estatus === 1);
    } else {
        clientesFiltrados = clientes;
    }

    if (filtro) {
        clientesFiltrados = clientesFiltrados.filter(cliente => {
            const datosCliente = JSON.stringify(cliente).toLowerCase();
            return datosCliente.includes(filtro);
        });
    }

    cargarTablaClientes(clientesFiltrados);
}

function cargarTablaClientes(clientesMostrar) {
    let datosTabla = "";

    if (clientesMostrar.length === 0) {
        datosTabla += "<tr>";
        datosTabla += "<td colspan='7'>No hay registros de clientes.</td>";
        datosTabla += "</tr>";
    } else {
        // Generar un orden aleatorio de índices
        const indicesAleatorios = shuffleArray(Array.from({length: clientesMostrar.length}, (_, i) => i));

        for (let i = 0; i < indicesAleatorios.length; i++) {
            const clienteIndex = indicesAleatorios[i];
            let estatus = "Activo";
            if (clientesMostrar[clienteIndex].estatus === 0) {
                estatus = "Inactivo";
            }

            let nombreCompleto = clientesMostrar[clienteIndex].persona.nombre + " "
                    + clientesMostrar[clienteIndex].persona.apellidoPaterno + " "
                    + clientesMostrar[clienteIndex].persona.apellidoMaterno;

            let domicilioCompleto = clientesMostrar[clienteIndex].persona.domicilio + ", "
                    + clientesMostrar[clienteIndex].persona.ciudad + ", "
                    + clientesMostrar[clienteIndex].persona.estado + ", "
                    + clientesMostrar[clienteIndex].persona.codigoPostal;

            datosTabla += "<tr>";
            datosTabla += "<td>" + nombreCompleto + "</td>";
            datosTabla += "<td>" + clientesMostrar[clienteIndex].persona.telefono + "</td>";
            datosTabla += "<td>" + clientesMostrar[clienteIndex].persona.fechaNacimiento + "</td>";
            datosTabla += "<td>" + clientesMostrar[clienteIndex].persona.rfc + "</td>";
            datosTabla += "<td>" + clientesMostrar[clienteIndex].persona.curp + "</td>";
            datosTabla += "<td>" + domicilioCompleto + "</td>";
            datosTabla += "<td>" + estatus + "</td>";
            datosTabla += "</tr>";
        }
    }

    document.getElementById("tablaClientes").innerHTML = datosTabla;
}

// Función para mezclar un array de manera aleatoria
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function buscarCliente() {
    const telefonoBuscado = document.getElementById("txtClienteBuscar").value;
    const clienteEncontrado = clientes.find(cliente => cliente.persona.telefono === telefonoBuscado);

    if (clienteEncontrado) {
        document.getElementById('txtClienteNombre').value = clienteEncontrado.persona.nombre;
        document.getElementById('txtClienteApellidoPaterno').value = clienteEncontrado.persona.apellidoPaterno;
        document.getElementById('txtClienteApellidoMaterno').value = clienteEncontrado.persona.apellidoMaterno;
        document.getElementById('txtClienteTelefono').value = clienteEncontrado.persona.telefono;

        if (clienteEncontrado.persona.genero === "Masculino") {
            document.getElementById('txtEmpleadoenero').checked = true;
        } else {
            document.getElementById('radioClienteFemenino').checked = true;
        }

        document.getElementById('txtClienteFechaNacimiento').value = clienteEncontrado.persona.fechaNacimiento;
        document.getElementById('txtClienteRfc').value = clienteEncontrado.persona.rfc;
        document.getElementById('txtClienteCurp').value = clienteEncontrado.persona.curp;
        document.getElementById('txtClienteDomicilio').value = clienteEncontrado.persona.domicilio;
        document.getElementById('txtClienteCodigoPostal').value = clienteEncontrado.persona.codigoPostal;
        document.getElementById('txtClienteCiudad').value = clienteEncontrado.persona.ciudad;
        document.getElementById('txtClienteEstado').value = clienteEncontrado.persona.estado;
        

        if (clienteEncontrado.estatus === 0) {
            mostrarBotonesSucursal(true, false, true, false);
            document.getElementById("btnActivar").removeAttribute("hidden");
        } else {
            mostrarBotonesSucursal(true, true, true, false);
            document.getElementById("btnActivar").setAttribute("hidden", "true");
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existen coincidencias.'
        });
    }
}




function activarCamposCliente() {
    document.getElementById('txtClienteBuscar').setAttribute("disabled", "true");
    document.getElementById('txtClienteNombre').disabled = false;
    document.getElementById('txtClienteApellidoPaterno').disabled = false;
    document.getElementById('txtClienteApellidoMaterno').disabled = false;
    document.getElementById('txtClienteTelefono').disabled = false;
    document.getElementById('radioClienteMasculino').disabled = false;
    document.getElementById('radioClienteFemenino').disabled = false;
    document.getElementById('txtClienteFechaNacimiento').disabled = false;
    document.getElementById('txtClienteRfc').disabled = false;
    document.getElementById('txtClienteCurp').disabled = false;
    document.getElementById('txtClienteDomicilio').disabled = false;
    document.getElementById('txtClienteCodigoPostal').disabled = false;
    document.getElementById('txtClienteCiudad').disabled = false;
    document.getElementById('txtClienteEstado').disabled = false;
}

function editarCliente() {
    const telefonoABuscar = document.getElementById('txtClienteTelefono').value;
    const clienteIndex = clientes.findIndex(cliente => cliente.persona.telefono === telefonoABuscar);

    if (clienteIndex !== -1) {
        const persona = clientes[clienteIndex].persona;

        // Actualizar los datos de la persona con los valores de los campos editados
        persona.nombre = document.getElementById('txtClienteNombre').value;
        persona.apellidoPaterno = document.getElementById('txtClienteApellidoPaterno').value;
        persona.apellidoMaterno = document.getElementById('txtClienteApellidoMaterno').value;
        persona.telefono = document.getElementById('txtClienteTelefono').value;
        persona.genero = document.getElementById('radioClienteMasculino').checked ? 'Masculino' : 'Femenino';
        persona.fechaNacimiento = document.getElementById('txtClienteFechaNacimiento').value;
        persona.rfc = document.getElementById('txtClienteRfc').value;
        persona.curp = document.getElementById('txtClienteCurp').value;
        persona.domicilio = document.getElementById('txtClienteDomicilio').value;
        persona.codigoPostal = document.getElementById('txtClienteCodigoPostal').value;
        persona.ciudad = document.getElementById('txtClienteCiudad').value;
        persona.estado = document.getElementById('txtClienteEstado').value;

        // Actualizar el cliente en el arreglo
        clientes[clienteIndex].persona = persona;

        // Volver a cargar
        Swal.fire('¡Información guardada!', '', 'success');
        cargarClientesSucursal();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el cliente para editar.'
        });
    }
}

function confirmarEliminarCliente() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará al cliente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarCliente();
        }
    });
}

function eliminarCliente() {
    const telefonoABuscar = document.getElementById('txtClienteTelefono').value;
    const clienteIndex = clientes.findIndex(cliente => cliente.persona.telefono === telefonoABuscar);

    if (clienteIndex !== -1) {
        clientes[clienteIndex].estatus = 0;
        console.log(clientes[clienteIndex].estatus);
        Swal.fire({
            icon: 'success',
            title: 'Cliente eliminado',
            text: 'El cliente ha sido eliminado.'
        });
        cargarClientesSucursal();
    }
}

function confirmarActivarCliente() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'El cliente cambiará a activo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            activarCliente();
        }
    });
}

function activarCliente() {
    const telefonoABuscar = document.getElementById('txtClienteTelefono').value;
    const clienteIndex = clientes.findIndex(cliente => cliente.persona.telefono === telefonoABuscar);

    if (clienteIndex !== -1) {
        clientes[clienteIndex].estatus = 1;
        console.log(clientes[clienteIndex].estatus);
        Swal.fire({
            icon: 'success',
            title: 'Cliente activado',
            text: 'El cliente ha sido activado.'
        });
        cargarClientesSucursal();
    }
}

function agregarCliente() {
    const nombre = document.getElementById("txtClienteNombre").value;
    const apellidoPaterno = document.getElementById("txtClienteApellidoPaterno").value;
    const apellidoMaterno = document.getElementById("txtClienteApellidoMaterno").value;
    const genero = document.querySelector('input[name="radioClienteGenero"]:checked').value;
    const fechaNacimiento = document.getElementById("txtClienteFechaNacimiento").value;
    const rfc = document.getElementById("txtClienteRfc").value;
    const curp = document.getElementById("txtClienteCurp").value;
    const domicilio = document.getElementById("txtClienteDomicilio").value;
    const codigoPostal = document.getElementById("txtClienteCodigoPostal").value;
    const ciudad = document.getElementById("txtClienteCiudad").value;
    const estado = document.getElementById("txtClienteEstado").value;
    const telefono = document.getElementById("txtClienteTelefono").value;
    const email = document.getElementById("txtClienteEmail").value;
    
    // Validación de campos vacíos
    if (nombre === "" || apellidoPaterno === "" || fechaNacimiento === "" || rfc === "" || curp === "" || domicilio === "" || codigoPostal === "" || ciudad === "" || estado === "" || telefono === "" || email === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor completa todos los campos.',
        });
        return;
    }

    const fechaActual = new Date();
    const idConsecutivo = ("0" + (personas.length + 1)).slice(-2);
    const idCliente = `${fechaActual.getFullYear().toString().slice(-2)}${(fechaActual.getMonth() + 1).toString().padStart(2, "0")}00${idConsecutivo}`;
    const foto = "fotito jeje";
    
    const nuevoCliente = {
        id: idCliente,
        estatus: 1,
        persona: {
            id: idConsecutivo,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            genero,
            fechaNacimiento,
            rfc,
            curp,
            domicilio,
            codigoPostal,
            ciudad,
            estado,
            telefono,
            email,
            foto
        }
    };

    clientes.push(nuevoCliente);
    personas.push(nuevoCliente.persona);

    Swal.fire({
        icon: 'success',
        title: 'Cliente agregado',
        text: 'El cliente ha sido agregado con éxito.'
    });
    cargarClientesSucursal();
}


function leerDatos() {
    txtClienteNombre = document.getElementById("txtClienteNombre").value;
    txtClienteApellidoPaterno = document.getElementById("txtClienteApellidoPaterno").value;
    txtClienteApellidoMaterno = document.getElementById("txtClienteApellidoMaterno").value;
    if (document.getElementById("radioClienteMasculino").checked) {
        radioClienteGenero = "Masculino";
    } else if (document.getElementById("radioClienteFemenino").checked) {
        radioClienteGenero = "Femenino";
    }
    ;
    console.log(radioClienteGenero);
    txtClienteFechaNacimiento = document.getElementById("txtClienteFechaNacimiento").value;
    txtClienteRfc = document.getElementById("txtClienteRfc").value;
    txtClienteCurp = document.getElementById("txtClienteCurp").value;
    txtClienteDomicilio = document.getElementById("txtClienteDomicilio").value;
    txtClienteCodigoPostal = document.getElementById("txtClienteCodigoPostal").value;
    txtClienteCiudad = document.getElementById("txtClienteCiudad").value;
    txtClienteEstado = document.getElementById("txtClienteEstado").value;
    txtClienteTelefono = document.getElementById("txtClienteTelefono").value;
    imgClienteFoto = document.getElementById("imgClienteFoto");
    txtClienteEmail = document.getElementById("txtClienteEmail").value;
    if ((txtClienteNombre && txtClienteApellidoPaterno && txtClienteApellidoMaterno && txtClienteGenero
            && txtClienteFechaNacimiento && txtClienteRfc && txtClienteCurp && txtClienteDomicilio
            && txtClienteCodigoPostal && txtClienteCiudad && txtClienteEstado && txtClienteTelefono &&
            txtClienteEmail) == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingresa todos los datos solicitados.',
        });
    } else {
        return true;
    }
    ;
}