const API_URL = 'https://crearte-or0f.onrender.com';

let idProfesorEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuariosProfesores();
    cargarProfesores();
});

async function cargarUsuariosProfesores() {
    const respuesta = await fetch(`${API_URL}/usuarios`);
    const usuarios = await respuesta.json();

    const select = document.getElementById('id_usuario');
    select.innerHTML = '<option value="">Selecciona un usuario profesor</option>';

    usuarios.forEach(usuario => {
        if (usuario.rol === 'profesor') {
            const option = document.createElement('option');
            option.value = usuario.id_usuario;
            option.textContent = `${usuario.nombre} - ${usuario.correo}`;
            select.appendChild(option);
        }
    });
}

async function cargarProfesores() {
    const respuesta = await fetch(`${API_URL}/profesores`);
    const profesores = await respuesta.json();

    const tabla = document.getElementById('tablaProfesores');
    tabla.innerHTML = '';

    profesores.forEach(profesor => {
        tabla.innerHTML += `
            <tr>
                <td>${profesor.id_profesor}</td>
                <td>${profesor.especialidad}</td>
                <td>${profesor.disponibilidad}</td>
                <td>${profesor.id_usuario}</td>
                <td>
                    <button onclick="editarProfesor(
                        ${profesor.id_profesor},
                        '${profesor.especialidad}',
                        '${profesor.disponibilidad}',
                        ${profesor.id_usuario}
                    )">Editar</button>

                    <button onclick="eliminarProfesor(${profesor.id_profesor})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function editarProfesor(id, especialidad, disponibilidad, id_usuario) {
    idProfesorEditando = id;

    document.getElementById('especialidad').value = especialidad;
    document.getElementById('disponibilidad').value = disponibilidad;
    document.getElementById('id_usuario').value = id_usuario;

    document.getElementById('btnGuardar').textContent = 'Actualizar Profesor';
}

document.getElementById('formProfesor').addEventListener('submit', async (e) => {
    e.preventDefault();

    const profesor = {
        especialidad: document.getElementById('especialidad').value,
        disponibilidad: document.getElementById('disponibilidad').value,
        id_usuario: document.getElementById('id_usuario').value
    };

    let url = `${API_URL}/profesores`;
    let metodo = 'POST';

    if (idProfesorEditando !== null) {
        url = `${API_URL}/profesores/${idProfesorEditando}`;
        metodo = 'PUT';
    }

    const respuesta = await fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profesor)
    });

    const datos = await respuesta.json();

    alert(datos.mensaje);

    document.getElementById('formProfesor').reset();
    document.getElementById('btnGuardar').textContent = 'Guardar Profesor';

    idProfesorEditando = null;

    cargarProfesores();
});

async function eliminarProfesor(id) {
    const confirmar = confirm('¿Seguro que deseas eliminar este profesor?');

    if (!confirmar) return;

    const respuesta = await fetch(`${API_URL}/profesores/${id}`, {
        method: 'DELETE'
    });

    const datos = await respuesta.json();

    alert(datos.mensaje);

    cargarProfesores();
}