const API_URL = 'https://crearte-or0f.onrender.com';

let idProfesorEditando = null;

const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'admin') {
    alert('Debes iniciar sesión como administrador');
    window.location.href = '/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProfesores();
});

async function cargarProfesores() {
    try {
        const respuesta = await fetch(`${API_URL}/profesores`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const profesores = await respuesta.json();

        if (!respuesta.ok) {
            alert(profesores.mensaje || 'Error al cargar profesores');
            return;
        }

        const tabla = document.getElementById('tablaProfesores');
        tabla.innerHTML = '';

        profesores.forEach(profesor => {
            tabla.innerHTML += `
                <tr>
                    <td>${profesor.id_profesor}</td>
                    <td>${profesor.nombre || ''}</td>
                    <td>${profesor.correo || ''}</td>
                    <td>${profesor.especialidad || ''}</td>
                    <td>${profesor.disponibilidad || ''}</td>
                    <td>${profesor.id_usuario}</td>
                    <td>
                        <button
                            class="btn-table-edit"
                            onclick="editarProfesor(
                                ${profesor.id_profesor},
                                '${profesor.nombre || ''}',
                                '${profesor.correo || ''}',
                                '${profesor.especialidad || ''}',
                                '${profesor.disponibilidad || ''}'
                            )"
                        >
                            Editar
                        </button>

                        <button
                            class="btn-table-delete"
                            onclick="eliminarProfesor(${profesor.id_profesor})"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
        alert('Error al cargar profesores');
    }
}

function editarProfesor(id, nombre, correo, especialidad, disponibilidad) {
    idProfesorEditando = id;

    document.getElementById('nombre').value = nombre;
    document.getElementById('correo').value = correo;
    document.getElementById('contraseña').value = '';
    document.getElementById('especialidad').value = especialidad;
    document.getElementById('disponibilidad').value = disponibilidad;

    document.getElementById('contraseña').removeAttribute('required');

    document.getElementById('btnGuardar').textContent = 'Actualizar Profesor';

    document.getElementById('btnCancelar').style.display = 'inline-block';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.getElementById('formProfesor').addEventListener('submit', async (e) => {
    e.preventDefault();

    let url = `${API_URL}/profesores`;
    let metodo = 'POST';

    let profesor = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        especialidad: document.getElementById('especialidad').value,
        disponibilidad: document.getElementById('disponibilidad').value
    };

    if (idProfesorEditando === null) {
        profesor.contraseña = document.getElementById('contraseña').value;
    } else {
        url = `${API_URL}/profesores/${idProfesorEditando}`;
        metodo = 'PUT';
    }

    try {
        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profesor)
        });

        const datos = await respuesta.json();

        alert(datos.mensaje);

        if (!respuesta.ok) {
            return;
        }

        resetearFormulario();

        cargarProfesores();

    } catch (error) {
        console.error(error);
        alert('Error al guardar profesor');
    }
});

async function eliminarProfesor(id) {
    const confirmar = confirm('¿Seguro que deseas eliminar este profesor?');

    if (!confirmar) return;

    try {
        const respuesta = await fetch(`${API_URL}/profesores/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const datos = await respuesta.json();

        alert(datos.mensaje);

        if (!respuesta.ok) {
            return;
        }

        cargarProfesores();

    } catch (error) {
        console.error(error);
        alert('Error al eliminar profesor');
    }
}

function resetearFormulario() {
    idProfesorEditando = null;

    document.getElementById('formProfesor').reset();

    document.getElementById('btnGuardar').textContent = 'Guardar Profesor';

    document.getElementById('btnCancelar').style.display = 'none';

    document.getElementById('contraseña').setAttribute('required', true);
}

document.getElementById('btnCancelar').addEventListener('click', resetearFormulario);

function cerrarSesion() {
    localStorage.clear();
    alert('Sesión cerrada correctamente');
    window.location.href = '/login.html';
}