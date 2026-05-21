const API_URL = 'https://crearte-or0f.onrender.com';

const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'admin') {
    alert('Debes iniciar sesión como administrador');
    window.location.href = '/login.html';
}

const formPago = document.getElementById('formPago');
const tablaPagos = document.getElementById('tablaPagos');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');

let idPagoEditando = null;

document.addEventListener('DOMContentLoaded', () => {

    colocarFechaActual();

    cargarMensualidadesSelect();

    cargarPagos();

    document
        .getElementById('id_mensualidad')
        .addEventListener('change', autollenarMensualidad);

});

function colocarFechaActual() {
    document.getElementById('fecha_pago').value =
        new Date().toISOString().split('T')[0];
}


// ==========================
// CARGAR MENSUALIDADES
// ==========================

async function cargarMensualidadesSelect() {

    try {

        const respuesta = await fetch(`${API_URL}/mensualidades`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const mensualidades = await respuesta.json();

        const select = document.getElementById('id_mensualidad');

        select.innerHTML = `
            <option value="">
                Selecciona una mensualidad
            </option>
        `;

        mensualidades.forEach(m => {

            select.innerHTML += `
                <option
                    value="${m.id_mensualidad}"
                    data-concepto="${m.concepto}"
                    data-monto="${m.monto}"
                >
                    ${m.alumno} - ${m.folio_recibo} - ${m.concepto} - $${m.monto}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}


// ==========================
// AUTOLLENAR DATOS
// ==========================

function autollenarMensualidad() {

    const select = document.getElementById('id_mensualidad');

    const option =
        select.options[select.selectedIndex];

    document.getElementById('concepto').value =
        option.dataset.concepto || '';

    document.getElementById('monto').value =
        option.dataset.monto || '';

}


// ==========================
// GUARDAR PAGO
// ==========================

formPago.addEventListener('submit', async (e) => {

    e.preventDefault();

    const montoMensualidad =
        Number(document.getElementById('monto').value);

    const montoPagado =
        Number(document.getElementById('monto_pagado').value);

    if (montoPagado > montoMensualidad) {
        alert('El monto pagado no puede ser mayor al monto de la mensualidad');
        return;
    }

    let estado = 'pendiente';

    if (montoPagado >= montoMensualidad) {

        estado = 'pagado';

    } else if (montoPagado > 0) {

        estado = 'parcial';

    }

    const datos = {

        fecha_pago:
            document.getElementById('fecha_pago').value,

        monto_pagado:
            montoPagado,

        metodo_pago:
            document.getElementById('metodo_pago').value,

        id_mensualidad:
            document.getElementById('id_mensualidad').value,

        estado

    };

    let url = `${API_URL}/pagos`;

    let metodo = 'POST';

    if (idPagoEditando !== null) {

        url = `${API_URL}/pagos/${idPagoEditando}`;

        metodo = 'PUT';

    }

    try {

        const respuesta = await fetch(url, {

            method: metodo,

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify(datos)

        });

        const resultado = await respuesta.json();

        alert(resultado.mensaje || 'Operación realizada');

        if (!respuesta.ok) return;

        resetearFormulario();

        cargarPagos();

        cargarMensualidadesSelect();

    } catch (error) {

        console.error(error);

        alert('Error al guardar pago');

    }

});


// ==========================
// CARGAR PAGOS
// ==========================

async function cargarPagos() {

    try {

        const respuesta = await fetch(`${API_URL}/pagos`, {

            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        const pagos = await respuesta.json();

        tablaPagos.innerHTML = '';

        pagos.forEach(pago => {

            tablaPagos.innerHTML += `
                <tr>

                    <td>${pago.id_pago}</td>

                    <td>${pago.fecha_pago}</td>

                    <td>${pago.alumno}</td>

                    <td>${pago.concepto}</td>

                    <td>$${pago.monto_pagado}</td>

                    <td>${pago.metodo_pago}</td>

                    <td>${pago.estado}</td>

                    <td>

                        <button
                            class="btn-table-edit"

                            onclick="editarPago(
                                ${pago.id_pago},
                                '${pago.fecha_pago}',
                                '${pago.monto_pagado}',
                                '${pago.metodo_pago}',
                                ${pago.id_mensualidad}
                            )"
                        >
                            Editar
                        </button>

                        <button
                            class="btn-table-delete"
                            onclick="eliminarPago(${pago.id_pago})"
                        >
                            Eliminar
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert('Error al cargar pagos');

    }

}


// ==========================
// EDITAR PAGO
// ==========================

function editarPago(id, fecha, montoPagado, metodo, idMensualidad) {

    idPagoEditando = id;

    document.getElementById('fecha_pago').value = fecha;

    document.getElementById('monto_pagado').value = montoPagado;

    document.getElementById('metodo_pago').value = metodo;

    document.getElementById('id_mensualidad').value = idMensualidad;

    autollenarMensualidad();

    btnGuardar.textContent = 'Actualizar Pago';

    btnCancelar.style.display = 'inline-block';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}


// ==========================
// ELIMINAR PAGO
// ==========================

async function eliminarPago(id) {

    const confirmar =
        confirm('¿Seguro que deseas eliminar este pago?');

    if (!confirmar) return;

    try {

        const respuesta = await fetch(`${API_URL}/pagos/${id}`, {

            method: 'DELETE',

            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        const resultado = await respuesta.json();

        alert(resultado.mensaje || 'Pago eliminado');

        cargarPagos();

    } catch (error) {

        console.error(error);

        alert('Error al eliminar pago');

    }

}


// ==========================
// RESETEAR FORMULARIO
// ==========================

function resetearFormulario() {

    formPago.reset();

    colocarFechaActual();

    idPagoEditando = null;

    btnGuardar.textContent = 'Guardar Pago';

    btnCancelar.style.display = 'none';

}


// ==========================
// BOTÓN CANCELAR
// ==========================

btnCancelar.addEventListener('click', resetearFormulario);


// ==========================
// CERRAR SESIÓN
// ==========================

function cerrarSesion() {

    localStorage.clear();

    alert('Sesión cerrada correctamente');

    window.location.href = '/login.html';

}