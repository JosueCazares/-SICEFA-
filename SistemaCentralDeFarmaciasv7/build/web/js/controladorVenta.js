async function cargarAgregarVenta() {
    let response = await fetch("html/sucursal/venta/agregar.html");
    let text = await response.text();
    document.getElementById("contenido").innerHTML = text;
}