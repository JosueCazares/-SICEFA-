const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const contentDiv = document.getElementById('content');
function mostrarAside() {
    document.getElementById('sidebar').classList.toggle("active");
}

// Cerrar la barra lateral en telefonos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }
});
// Cerrar la barra lateral en telefonos al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    } else {
        sidebar.classList.add('active');
    }
});
//sub menus
const subNavs =
    document.querySelectorAll(
        `.subnav`
    );
const buttons =
    document.querySelectorAll(
        `.sidebar button`
    );
const resetSideBar = () => {
    subNavs.forEach((nav) => {
        nav.style.height = 0;
    });
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
};
const handleClick = subNav => {
    resetSideBar();
    const subNavOuter =
        document.querySelector(`#${subNav}`);
    const subNavInner =
        document.querySelector(`#${subNav} .subnav-inner`);
    const button =
        subNavOuter.previousElementSibling;
    if (subNavOuter.clientHeight > 0) {
        button.classList.remove('active');
        subNavOuter.style.height = 0;
    } else {
        button.classList.add('active');
        subNavOuter.style.height =
            `${subNavInner.clientHeight}px`;
    }
};

function centralLogin() {

    const usuarioInput = document.getElementById('txtUsuario');
    const contrasenaInput = document.getElementById('txtContrasena');

    const usuario = usuarioInput.value;
    const contrasena = contrasenaInput.value;

    const usuarioEncontrado = usuarios.find(usuarioObj => {
        return usuarioObj.usuario === usuario && usuarioObj.contrasena === contrasena;
    });

    if (usuarioEncontrado && usuarioEncontrado.rol == "ADMC") {
        cargarMenuCentral();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.'
        });
    }
}

// Massiel
function mostrarAside() {
    document.getElementById('sidebar').classList.toggle("active");
}


// carga asincrona

async function cargarListadoSucursal() {
    let response = await fetch("html/central/sucursal/listado.html");
    let html = await response.text();
    document.getElementById('contenido').innerHTML = html;
}

async function cargarEditarSucursal() {
    let response = await fetch("html/central/sucursal/editar.html");
    let html = await response.text();
    document.getElementById('contenido').innerHTML = html;
}

async function cargarAgregarSucursal() {
    let response = await fetch("html/central/sucursal/agregar.html");
    let html = await response.text();
    document.getElementById('contenido').innerHTML = html;
}

async function cargarCentral() {
    let response = await fetch("html/central/central.html");
    let html = await response.text();
    document.getElementById('pagina').innerHTML = html;
}

async function cargarCentralLogin() {
    let response = await fetch("html/central/login.html");
    let html = await response.text();
    document.getElementById('contenido').innerHTML = html;
}

async function cargarMenuCentral() {
    const response = await fetch("html/central/menu.html");
    const html = await response.text();
    document.getElementById('pagina').innerHTML = html;
}

// Cerrar la barra lateral en telefonos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
});
// Cerrar la barra lateral en telefonos al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    } else {
        document.getElementById('sidebar').classList.add('active');
    }
});

//Funciones general
var registros = [
    {
        campo1: 'Massiel',
        campo2: 'Vallejo',
        campo3: '21'
        // Agrega aquí los demás campos y sus valores para el Registro 1
    },
    {
        campo1: 'Mario',
        campo2: 'Barrera',
        campo3: '22'
        // Agrega aquí los demás campos y sus valores para el Registro 2
    },
    // Agrega más registros aquí si lo deseas
];
function agregarRegistro() {
    var nuevoRegistro = {
        campo1: document.getElementById('campo1').value,
        campo2: document.getElementById('campo2').value,
        campo3: document.getElementById('campo3').value,
        // Agrega aquí los demás campos que necesites guardar
    };
    if (esRegistroValido(nuevoRegistro)) {
        Swal.fire({
            title: '¿Estás segur@ de guardar los cambios?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: `No Guardar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Información Guardada!', '', 'success');
                registros.push(nuevoRegistro); // Agregar el nuevo registro al array

                mostrarRegistros();
                limpiarCamposEntrada();
            } else if (result.isDenied) {
                Swal.fire('No se guardo la información', '', 'info');
            }
        });
    }
}

function esRegistroValido(registro) {
    if (registro.campo1.trim() === '' || registro.campo2.trim() === '' || registro.campo3.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingresa todos los datos solicitados',
        });
        return false;
    }
    return true;
}

function mostrarRegistros() {
    var tablaRegistros = document.getElementById('TABLITA');
    console.log(tablaRegistros); // Verifica si el elemento tbody se encuentra correctamente

    tablaRegistros.innerHTML = '';
    for (var i = 0; i < registros.length; i++) {
        var registro = registros[i];
        console.log(registro); // Verifica si los registros están siendo cargados en el array correctamente

        var fila = document.createElement('tr');
        var campo1Cell = document.createElement('td');
        var campo2Cell = document.createElement('td');
        var campo3Cell = document.createElement('td');
        campo1Cell.textContent = registro.campo1;
        campo2Cell.textContent = registro.campo2;
        campo3Cell.textContent = registro.campo3;
        fila.appendChild(campo1Cell);
        fila.appendChild(campo2Cell);
        fila.appendChild(campo3Cell);
        tablaRegistros.appendChild(fila);
    }
}

// Mostrar los registros iniciales (si existen) cuando el DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', function () {
    mostrarRegistros();
});
// Resto de tu código...