const API_URL = 'https://crearte-or0f.onrender.com';

let idAlumnoEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuariosAlumnos();
    cargarAlumnos();
});

async function cargarUsuariosAlumnos() {
    try {

        const respuesta = await fetch(`${API_URL}/usuarios`);
        const usuarios = await respuesta.json();

        const select = document.getElementById('id_usuario');

        select.innerHTML =
            '<option value="">Selecciona un usuario con rol alumno</option>';

        usuarios.forEach(usuario => {

            if (usuario.rol === 'alumno') {

                const option = document.createElement('option');

                option.value = usuario.id_usuario;

                option.textContent =
                    `${usuario.nombre} - ${usuario.correo}`;

                select.appendChild(option);

            }

        });

    } catch (error) {

        console.error('Error al cargar usuarios alumnos:', error);

    }
}

async function cargarAlumnos() {

    try {

        const respuesta = await fetch(`${API_URL}/alumnos`);
        const alumnos = await respuesta.json();

        console.log('Alumnos recibidos:', alumnos);

        const tabla = document.getElementById('tablaAlumnos');

        tabla.innerHTML = '';

        alumnos.forEach(alumno => {

            const fecha = alumno.fecha_registro
                ? alumno.fecha_registro.split('T')[0]
                : '';

            tabla.innerHTML += `
                <tr>
                    <td>${alumno.id_alumno}</td>
                    <td>${alumno.matricula}</td>
                    <td>${alumno.telefono}</td>
                    <td>${fecha}</td>
                    <td>${alumno.id_usuario}</td>

                    <td>

                        <button onclick="editarAlumno(
                            ${alumno.id_alumno},
                            '${alumno.matricula}',
                            '${alumno.telefono}',
                            '${fecha}',
                            ${alumno.id_usuario}
                        )">

                            Editar

                        </button>

                        <button onclick="eliminarAlumno(${alumno.id_alumno})">

                            Eliminar

                        </button>

                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error('Error al cargar alumnos:', error);

    }
}

function editarAlumno(
    id,
    matricula,
    telefono,
    fecha_registro,
    id_usuario
) {

    idAlumnoEditando = id;

    document.getElementById('matricula').value = matricula;
    document.getElementById('telefono').value = telefono;
    document.getElementById('fecha_registro').value = fecha_registro;
    document.getElementById('id_usuario').value = id_usuario;

    document.getElementById('btnGuardar').textContent =
        'Actualizar Alumno';

}

document.getElementById('formAlumno').addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const alumno = {

            matricula:
                document.getElementById('matricula').value,

            telefono:
                document.getElementById('telefono').value,

            fecha_registro:
                document.getElementById('fecha_registro').value,

            id_usuario:
                document.getElementById('id_usuario').value

        };

        let url = `${API_URL}/alumnos`;
        let metodo = 'POST';

        if (idAlumnoEditando !== null) {

            url =
                `${API_URL}/alumnos/${idAlumnoEditando}`;

            metodo = 'PUT';

        }

        try {

            const respuesta = await fetch(url, {

                method: metodo,

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(alumno)

            });

            const datos = await respuesta.json();

            alert(datos.mensaje);

            document.getElementById('formAlumno').reset();

            document.getElementById('btnGuardar').textContent =
                'Guardar Alumno';

            idAlumnoEditando = null;

            cargarAlumnos();

        } catch (error) {

            console.error('Error al guardar alumno:', error);

            alert('Error al guardar alumno');

        }
    }
);

async function eliminarAlumno(id) {

    const confirmar =
        confirm('¿Seguro que deseas eliminar este alumno?');

    if (!confirmar) return;

    try {

        const respuesta = await fetch(
            `${API_URL}/alumnos/${id}`,
            {
                method: 'DELETE'
            }
        );

        const datos = await respuesta.json();

        alert(datos.mensaje);

        cargarAlumnos();

    } catch (error) {

        console.error('Error al eliminar alumno:', error);

        alert('Error al eliminar alumno');

    }
}