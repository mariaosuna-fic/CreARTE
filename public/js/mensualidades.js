const API_URL = 'https://crearte-or0f.onrender.com';

const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'admin') {
    alert('Debes iniciar sesión como administrador');
    window.location.href = '/login.html';
}

const formMensualidad = document.getElementById('formMensualidad');
const tablaMensualidades = document.getElementById('tablaMensualidades');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');

let idMensualidadEditando = null;

// ======================
// INICIO
// ======================

document.addEventListener('DOMContentLoaded', () => {

    cargarAlumnosSelect();

    cargarMensualidades();

});

// ======================
// CARGAR ALUMNOS SELECT
// ======================

async function cargarAlumnosSelect() {

    try {

        const respuesta = await fetch(`${API_URL}/alumnos`, {

            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        const alumnos = await respuesta.json();

        const select =
            document.getElementById('id_alumno');

        select.innerHTML = `
            <option value="">
                Selecciona un alumno
            </option>
        `;

        alumnos.forEach(alumno => {

            select.innerHTML += `
                <option value="${alumno.id_alumno}">
                    ${alumno.nombre || 'Alumno'} - ${alumno.id_alumno}
                </option>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ======================
// GUARDAR / ACTUALIZAR
// ======================

formMensualidad.addEventListener('submit', async (e) => {

    e.preventDefault();

    const datos = {

        folio_recibo:
            document.getElementById('folio_recibo').value,

        concepto:
            document.getElementById('concepto').value,

        monto:
            document.getElementById('monto').value,

        fecha_limite:
            document.getElementById('fecha_limite').value,

        estado:
            document.getElementById('estado').value,

        mes:
            document.getElementById('mes').value,

        anio:
            document.getElementById('anio').value,

        id_alumno:
            document.getElementById('id_alumno').value

    };

    let url = `${API_URL}/mensualidades`;

    let metodo = 'POST';

    if (idMensualidadEditando !== null) {

        url = `${API_URL}/mensualidades/${idMensualidadEditando}`;

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

        cargarMensualidades();

    } catch (error) {

        console.error(error);

        alert('Error al guardar mensualidad');

    }

});

// ======================
// CARGAR MENSUALIDADES
// ======================

async function cargarMensualidades() {

    try {

        const respuesta = await fetch(`${API_URL}/mensualidades`, {

            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        const mensualidades = await respuesta.json();

        tablaMensualidades.innerHTML = '';

        mensualidades.forEach(m => {

            tablaMensualidades.innerHTML += `
                <tr>

                    <td>${m.id_mensualidad}</td>

                    <td>${m.folio_recibo}</td>

                    <td>${m.concepto}</td>

                    <td>${m.monto}</td>

                    <td>${m.fecha_limite}</td>

                    <td>${m.estado}</td>

                    <td>${m.mes}</td>

                    <td>${m.anio}</td>

                    <td>${m.id_alumno}</td>

                    <td>

                        <button
                            class="btn-table-edit"
                            onclick="editarMensualidad(
                                ${m.id_mensualidad},
                                '${m.folio_recibo}',
                                '${m.concepto}',
                                '${m.monto}',
                                '${m.fecha_limite}',
                                '${m.estado}',
                                ${m.mes},
                                ${m.anio},
                                ${m.id_alumno}
                            )"
                        >
                            Editar
                        </button>

                        <button
                            class="btn-table-delete"
                            onclick="eliminarMensualidad(${m.id_mensualidad})"
                        >
                            Eliminar
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert('Error al cargar mensualidades');

    }

}

// ======================
// EDITAR
// ======================

function editarMensualidad(
    id,
    folio,
    concepto,
    monto,
    fecha,
    estado,
    mes,
    anio,
    idAlumno
) {

    idMensualidadEditando = id;

    document.getElementById('folio_recibo').value = folio;

    document.getElementById('concepto').value = concepto;

    document.getElementById('monto').value = monto;

    document.getElementById('fecha_limite').value = fecha;

    document.getElementById('estado').value = estado;

    document.getElementById('mes').value = mes;

    document.getElementById('anio').value = anio;

    document.getElementById('id_alumno').value = idAlumno;

    btnGuardar.textContent = 'Actualizar Mensualidad';

    btnCancelar.style.display = 'inline-block';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}

// ======================
// ELIMINAR
// ======================

async function eliminarMensualidad(id) {

    if (!confirm('¿Seguro que deseas eliminar esta mensualidad?')) {
        return;
    }

    try {

        const respuesta = await fetch(`${API_URL}/mensualidades/${id}`, {

            method: 'DELETE',

            headers: {
                'Authorization': `Bearer ${token}`
            }

        });

        const resultado = await respuesta.json();

        alert(resultado.mensaje || 'Mensualidad eliminada');

        cargarMensualidades();

    } catch (error) {

        console.error(error);

        alert('Error al eliminar mensualidad');

    }

}

// ======================
// RESETEAR FORMULARIO
// ======================

function resetearFormulario() {

    formMensualidad.reset();

    idMensualidadEditando = null;

    btnGuardar.textContent = 'Guardar Mensualidad';

    btnCancelar.style.display = 'none';

}

btnCancelar.addEventListener('click', resetearFormulario);

// ======================
// CERRAR SESIÓN
// ======================

function cerrarSesion() {

    localStorage.clear();

    alert('Sesión cerrada correctamente');

    window.location.href = '/login.html';

}