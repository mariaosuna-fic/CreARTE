const API_URL = 'https://crearte-or0f.onrender.com';

const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'admin') {
    alert('Debes iniciar sesión como administrador');
    window.location.href = '/login.html';
}

const formInscripcion = document.getElementById('formInscripcion');
const tablaInscripciones = document.getElementById('tablaInscripciones');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');

let idInscripcionEditando = null;

document.addEventListener('DOMContentLoaded', cargarInscripciones);

formInscripcion.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        fecha_inscripcion: document.getElementById('fecha_inscripcion').value,
        id_alumno: document.getElementById('id_alumno').value,
        id_clase: document.getElementById('id_clase').value
    };

    let url = `${API_URL}/inscripciones`;
    let metodo = 'POST';

    if (idInscripcionEditando !== null) {
        url = `${API_URL}/inscripciones/${idInscripcionEditando}`;
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
        cargarInscripciones();

    } catch (error) {
        console.error(error);
        alert('Error al guardar inscripción');
    }
});

async function cargarInscripciones() {
    try {
        const respuesta = await fetch(`${API_URL}/inscripciones`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const inscripciones = await respuesta.json();

        tablaInscripciones.innerHTML = '';

        inscripciones.forEach(i => {
            tablaInscripciones.innerHTML += `
                <tr>
                    <td>${i.id_inscripcion}</td>
                    <td>${i.fecha_inscripcion}</td>
                    <td>${i.id_alumno}</td>
                    <td>${i.id_clase}</td>
                    <td>
                        <button
                            class="btn-table-edit"
                            onclick="editarInscripcion(
                                ${i.id_inscripcion},
                                '${i.fecha_inscripcion}',
                                ${i.id_alumno},
                                ${i.id_clase}
                            )"
                        >
                            Editar
                        </button>

                        <button
                            class="btn-table-delete"
                            onclick="eliminarInscripcion(${i.id_inscripcion})"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
        alert('Error al cargar inscripciones');
    }
}

function editarInscripcion(id, fecha, idAlumno, idClase) {
    idInscripcionEditando = id;

    document.getElementById('fecha_inscripcion').value = fecha;
    document.getElementById('id_alumno').value = idAlumno;
    document.getElementById('id_clase').value = idClase;

    btnGuardar.textContent = 'Actualizar Inscripción';
    btnCancelar.style.display = 'inline-block';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

async function eliminarInscripcion(id) {
    if (!confirm('¿Seguro que deseas eliminar esta inscripción?')) return;

    try {
        const respuesta = await fetch(`${API_URL}/inscripciones/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const resultado = await respuesta.json();

        alert(resultado.mensaje || 'Inscripción eliminada');

        cargarInscripciones();

    } catch (error) {
        console.error(error);
        alert('Error al eliminar inscripción');
    }
}

function resetearFormulario() {
    formInscripcion.reset();
    idInscripcionEditando = null;
    btnGuardar.textContent = 'Guardar Inscripción';
    btnCancelar.style.display = 'none';
}

btnCancelar.addEventListener('click', resetearFormulario);

function cerrarSesion() {
    localStorage.clear();
    alert('Sesión cerrada correctamente');
    window.location.href = '/login.html';
}