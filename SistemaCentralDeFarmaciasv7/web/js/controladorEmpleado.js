async function cargarEmpleadosSucursal() {
    let response = await fetch("html/sucursal/empleado/modulo.html");
    let text = await response.text();
    document.getElementById("contenido").innerHTML = text;
    filtrarEmpleados();
}

async function cargarAgregarEmpleado() {
    let response = await fetch("html/sucursal/empleado/agregar.html");
    let text = await response.text();
    document.getElementById("contenido").innerHTML = text;
}

function filtrarEmpleados() {
    const filtro = document.getElementById('txtClienteBuscar').value.toLowerCase();

    let empleadosFiltrados = empleados;

    if (filtro) {
        empleadosFiltrados = empleadosFiltrados.filter(empleado => {
            const datosEmpleado = JSON.stringify(empleado).toLowerCase();
            return datosEmpleado.includes(filtro);
        });
    }

    cargarTablaEmpleados(empleadosFiltrados);
}

function cargarTablaEmpleados(empleadosMostrar) {
    let datosTabla = "";

    if (empleadosMostrar.length === 0) {
        datosTabla += "<tr>";
        datosTabla += "<td colspan='7'>No hay registros de empleados.</td>";
        datosTabla += "</tr>";
    } else {
        for (let i = 0; i < empleadosMostrar.length; i++) {
            const empleado = empleadosMostrar[i];
            const fechaRegistro = new Date(empleado.persona.fechaIngreso).toLocaleDateString();

            datosTabla += "<tr>";
            datosTabla += "<td>" + empleado.codigo + "</td>";
            datosTabla += "<td>" + empleado.persona.nombre + " " + empleado.persona.apellidoPaterno + " " + empleado.persona.apellidoMaterno + "</td>";
            datosTabla += "<td>" + empleado.persona.genero + "</td>";
            datosTabla += "<td>" + empleado.persona.curp + "</td>";
            datosTabla += "<td>" + empleado.persona.rfc + "</td>";
            datosTabla += "<td>" + empleado.persona.telefono + "</td>";
            datosTabla += "<td>" + fechaRegistro + "</td>";
            datosTabla += "</tr>";
        }
    }

    document.getElementById("tablaEmpleados").innerHTML = datosTabla;
}

let i=1;
function agregarEmpleado() {
    // Obtener los valores ingresados en los campos de entrada
    const nombre = document.getElementById("txtEmpleadoNombre").value;
    const apellidoPaterno = document.getElementById("txtEmpleadoApellidoPaterno").value;
    const apellidoMaterno = document.getElementById("txtEmpleadoApellidoMaterno").value;
    const fechaNacimiento = document.getElementById("txtEmpleadoFechaDeNacimiento").value;
    const rfc = document.getElementById("txtEmpleadoRfc").value;
    const curp = document.getElementById("txtEmpleadoCurp").value;
    const puesto = document.getElementById("txtEmpleadoPuesto").value;
    let genero = "";
    if (document.querySelector("input[name='radioEmpleadoGenero']:checked").value=="1") {
        genero = "Masculino";
    } else if (document.querySelector("input[name='radioEmpleadoGenero']:checked").value="2") {
        genero = "Femenino";
    }
    ;
    const rol = document.querySelector("input[name='radioRol']:checked").value;
    const domicilio = document.getElementById("txtEmpleadoDomicilio").value;
    const codigoPostal = document.getElementById("txtEmpleadoCodigoPostal").value;
    const ciudad = document.getElementById("txtEmpleadoCiudad").value;
    const estado = document.getElementById("txtEmpleadoEstado").value;
    const telefono = document.getElementById("txtEmpleadoTelefono").value;
    const salario = document.getElementById("txtEmpleadoSalario").value;

    // Verificar que los campos obligatorios no estén vacíos
    if (
        nombre === "" ||
        apellidoPaterno === "" ||
        fechaNacimiento === "" ||
        rfc === "" ||
        curp === "" ||
        puesto === "" ||
        genero === undefined ||
        rol === undefined ||
        domicilio === "" ||
        codigoPostal === "" ||
        ciudad === "" ||
        estado === "" ||
        telefono === "" ||
        salario === ""
    ) {
        // Mostrar mensaje de error si algún campo está vacío
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor completa todos los campos.',
        });
        return;
    }

    let fecha = new Date();
    // Crear el nuevo empleado con los valores ingresados

    const nuevaPersona = {
        "id": personas.length + 1, // Usar el mismo ID que el empleado
        "nombre": nombre,
        "apellidoPaterno": apellidoPaterno,
        "apellidoMaterno": apellidoMaterno,
        "genero": genero,
        "fechaNacimiento": fechaNacimiento,
        "rfc": rfc,
        "curp": curp,
        "domicilio": domicilio,
        "codigoPostal": codigoPostal,
        "ciudad": ciudad,
        "estado": estado,
        "telefono": telefono,
        "foto": "",
        "fechaIngreso": fecha.toLocaleDateString()
    }

    const nuevoEmpleado = {
        "id": personas.length + 1, // Usar el próximo ID disponible
        "codigo": generarCodigo(fecha),
        "puesto": puesto,
        "salario": salario,
        "activo": 1,
        "persona": nuevaPersona
    }

    // Agregar el nuevo empleado al arreglo de empleados
    empleados.push(nuevoEmpleado);
    personas.push(nuevoEmpleado.nuevaPersona);

    // Crear el nuevo usuario y agregarlo al arreglo de usuarios
    const nuevoUsuario = {
        "usuario": (rol === "Administrador") ? "admins" + i : nuevoEmpleado.codigo,
        "contrasena": (rol === "Administrador") ? "admins" + i : nuevoEmpleado.codigo,
        "rol": (rol === "Administrador") ? "ADMS" : "EMPS",
        "empleado": nuevoEmpleado
    };
    usuarios.push(nuevoUsuario);
    i++

    // Mostrar mensaje de éxito con las credenciales del empleado
    const mensajeExito = `
        Empleado agregado con éxito.\n
        Usuario: ${nuevoUsuario.usuario}\n
        Contraseña: ${nuevoUsuario.contrasena}
    `;
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: mensajeExito
    });
    cargarEmpleadosSucursal();
}

function generarCodigo(fechaIngreso) {
    const idConsecutivo = personas.length + 1;
    const idEmpleado = `${fechaIngreso.getFullYear().toString().slice(-2)}${(fechaIngreso.getMonth() + 1).toString().padStart(2, "0")}00${idConsecutivo}`;
    return idEmpleado;
}


function buscarEmpleado(){
    const telefonoBuscado = document.getElementById("txtEmpleadoBuscar").value;
    const empleadoEncontrado = empleados.find(empleados => empleados.persona.telefono === telefonoBuscado);
    if (empleadoEncontrado){
        document.getElementById("txtEmpleadoNombr").value = empleadoEncontrado.persona.nombre;
        document.getElementById("txtEmpleadoApelidoPaterno").value = empleadoEncontrado.persona.apellidoPaterno;
        document.getElementById("txtEmpleadoAellidoMaterno").value = empleadoEncontrado.persona.apellidoMaterno;
        document.getElementById("txtEmpleadoelefono").value = empleadoEncontrado.persona.telefono;
        if (empleadoEncontrado.persona.genero === "Masculino") {
            document.getElementById('radioEmpleadoMasculino').checked = true;
        } else {
            document.getElementById('radioEmpleadoFemenino').checked = true;
        }
        

        //document.getElementById("txtEmpleadoFechaDeNacimiento").value = empleadoEncontrado.persona.fechaNacimiento;
        document.getElementById("txtmpleadoRFC").value = empleadoEncontrado.persona.rfc;
        document.getElementById("txtmpleadoCURP").value = empleadoEncontrado.persona.curp;
        document.getElementById("txtmpleadoDomicilio").value = empleadoEncontrado.persona.domicilio;
        document.getElementById("txtmpleadoCodigoPostal").value = empleadoEncontrado.persona.codigoPostal;
        document.getElementById("txtmpleadoCiudad").value = empleadoEncontrado.persona.ciudad;
        document.getElementById("txtmpleadoEstado").value = empleadoEncontrado.persona.estado;
       
        document.getElementById("txtEmpleadoPuesto").value = empleadoEncontrado.puesto;
       
        
        if (empleadoEncontrado.activo === 1) {
            mostrarBotonesSucursal(true, false, true, false);
            document.getElementById("btnActivar").removeAttribute("hidden");
        } else {
           
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existen coincidencias.'
        });
    }
    
}

function activarCamposEmpleado() {
    document.getElementById('txtEmpleadoBuscar').setAttribute("disabled", "true");
    document.getElementById('txtEmpleadoNombr').disabled = false;
    document.getElementById('txtEmpleadoApelidoPaterno').disabled = false;
    document.getElementById('txtEmpleadoAellidoMaterno').disabled = false;
    document.getElementById('txtEmpleadoelefono').disabled = false;
    document.getElementById('radioEmpleadoMasculino').disabled = false;
    document.getElementById('radioEmpleadoFemenino').disabled = false;
    //document.getElementById('txtClienteFechaNacimiento').disabled = false;
    document.getElementById('txtmpleadoRFC').disabled = false;
    document.getElementById('txtmpleadoCURP').disabled = false;
    document.getElementById('txtmpleadoDomicilio').disabled = false;
    document.getElementById('txtmpleadoCodigoPostal').disabled = false;
    document.getElementById('txtmpleadoCiudad').disabled = false;
    document.getElementById('txtmpleadoEstado').disabled = false;
    document.getElementById('txtEmpleadoPuesto').disabled = false;
}

function editarEmpleado() {
    const telefonoABuscar = document.getElementById('txtEmpleadoBuscar').value;
    const empleadoIndex = empleados.findIndex(empleados => empleados.persona.telefono === telefonoABuscar);

    if (empleadoIndex !== -1) {
        const persona = clientes[empleadoIndex].persona;

        // Actualizar los datos de la persona con los valores de los campos editados
        persona.nombre = document.getElementById('txtEmpleadoNombr').value;
        persona.apellidoPaterno = document.getElementById('txtEmpleadoApelidoPaterno').value;
        persona.apellidoMaterno = document.getElementById('txtEmpleadoAellidoMaterno').value;
        persona.telefono = document.getElementById('txtEmpleadoelefono').value;
        persona.genero = document.getElementById('radioEmpleadoMasculino').checked ? 'Masculino' : 'Femenino';
        
        persona.rfc = document.getElementById('txtmpleadoRFC').value;
        persona.curp = document.getElementById('txtmpleadoCURP').value;
        persona.domicilio = document.getElementById('txtmpleadoDomicilio').value;
        persona.codigoPostal = document.getElementById('txtmpleadoCodigoPostal').value;
        persona.ciudad = document.getElementById('txtmpleadoCiudad').value;
        persona.estado = document.getElementById('txtmpleadoEstado').value;
        //empleado.puesto = document.getElementById('txtEmpleadoPuesto').value;
        // Actualizar el cliente en el arreglo
        clientes[empleadoIndex].persona = persona;

        // Volver a cargar
        Swal.fire('¡Información guardada!', '', 'success');
        cargarEmpleadosSucursal();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el cliente para editar.'
        });
    }
}

async function cargarEmpSucursal() {
    let response = await fetch("html/sucursal/empleado/modulo.html");
    let text = await response.text();
    document.getElementById("contenido").innerHTML = text;
    filtrarEmp();
}
function confirmarActivarEmp() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'El empleado cambiará a inactivo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            activarEmp();
        }
    });
}

function activarEmp() {
    const telefonoABuscar = document.getElementById('txtEmpleadoelefono').value;
    const empIndex = empleados.findIndex(empleados => empleados.persona.telefono === telefonoABuscar);

    if (empIndex !== -1) {
        clientes[empIndex].activo = 0;
        console.log(clientes[empIndex].estatus);
        Swal.fire({
            icon: 'success',
            title: 'Cliente inactivado',
            text: 'El cliente ha sido inactivado.'
        });
        cargarEmpleadosSucursal();
    }
}