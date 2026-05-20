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

        const tabla = document.getElementById('tablaProfesores');

        tabla.innerHTML = '';

        profesores.forEach(profesor => {

            tabla.innerHTML += `
                <tr>
                    <td>${profesor.id_profesor}</td>
                    <td>${profesor.nombre || ''}</td>
                    <td>${profesor.correo || ''}</td>
                    <td>${profesor.especialidad}</td>
                    <td>${profesor.disponibilidad}</td>
                    <td>${profesor.id_usuario}</td>
                    <td>
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

document.getElementById('formProfesor').addEventListener('submit', async (e) => {

    e.preventDefault();

    const profesor = {

        nombre: document.getElementById('nombre').value,

        correo: document.getElementById('correo').value,

        contraseña: document.getElementById('contraseña').value,

        especialidad: document.getElementById('especialidad').value,

        disponibilidad: document.getElementById('disponibilidad').value

    };

    try {

        const respuesta = await fetch(`${API_URL}/profesores`, {

            method: 'POST',

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

        document.getElementById('formProfesor').reset();

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

        cargarProfesores();

    } catch (error) {

        console.error(error);

        alert('Error al eliminar profesor');

    }

}

function cerrarSesion() {

    localStorage.clear();

    alert('Sesión cerrada correctamente');

    window.location.href = '/login.html';

}