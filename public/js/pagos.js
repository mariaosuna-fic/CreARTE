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

document.addEventListener('DOMContentLoaded', cargarPagos);

formPago.addEventListener('submit', async (e) => {

    e.preventDefault();

    const datos = {
        fecha_pago: document.getElementById('fecha_pago').value,
        monto_pagado: document.getElementById('monto_pagado').value,
        metodo_pago: document.getElementById('metodo_pago').value,
        id_mensualidad: document.getElementById('id_mensualidad').value
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

    } catch (error) {

        console.error(error);

        alert('Error al guardar pago');

    }

});

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

                    <td>${pago.monto_pagado}</td>

                    <td>${pago.metodo_pago}</td>

                    <td>${pago.id_mensualidad}</td>

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

function editarPago(id, fecha, monto, metodo, idMensualidad) {

    idPagoEditando = id;

    document.getElementById('fecha_pago').value = fecha;
    document.getElementById('monto_pagado').value = monto;
    document.getElementById('metodo_pago').value = metodo;
    document.getElementById('id_mensualidad').value = idMensualidad;

    btnGuardar.textContent = 'Actualizar Pago';

    btnCancelar.style.display = 'inline-block';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}

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

function resetearFormulario() {

    formPago.reset();

    idPagoEditando = null;

    btnGuardar.textContent = 'Guardar Pago';

    btnCancelar.style.display = 'none';

}

btnCancelar.addEventListener('click', resetearFormulario);

function cerrarSesion() {

    localStorage.clear();

    alert('Sesión cerrada correctamente');

    window.location.href = '/login.html';

}