const API_URL = 'https://crearte-or0f.onrender.com';

let idAlumnoEditando = null;

document.addEventListener('DOMContentLoaded', () => {

    cargarAlumnos();

});

async function cargarAlumnos() {

    try {

        const respuesta = await fetch(`${API_URL}/alumnos`);
        const alumnos = await respuesta.json();

        if (!respuesta.ok) {
            console.error('Error del backend:', alumnos);
            alert(alumnos.error || alumnos.mensaje || 'Error al cargar alumnos');
            return;
        }

        if (!Array.isArray(alumnos)) {
            console.error('La respuesta no es una lista:', alumnos);
            alert('La respuesta del servidor no es una lista de alumnos');
            return;
        }

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
                    <td>${alumno.nombre}</td>
                    <td>${alumno.correo}</td>
                    <td>${alumno.matricula}</td>
                    <td>${alumno.telefono}</td>
                    <td>${fecha}</td>
                    <td>
                        <button 
                            onclick="editarAlumno(
                                ${alumno.id_alumno},
                                '${alumno.nombre}',
                                '${alumno.correo}',
                                '${alumno.matricula}',
                                '${alumno.telefono}',
                                '${fecha}'
                            )"
                        >
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
    nombre,
    correo,
    matricula,
    telefono,
    fecha_registro
) {

    idAlumnoEditando = id;

    document.getElementById('nombre').value = nombre;
    document.getElementById('correo').value = correo;
    document.getElementById('matricula').value = matricula;
    document.getElementById('telefono').value = telefono;
    document.getElementById('fecha_registro').value = fecha_registro;

    document.getElementById('btnGuardar').textContent =
        'Actualizar Alumno';

}

document.getElementById('formAlumno').addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const alumno = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            contraseña: document.getElementById('contraseña').value,
            matricula: document.getElementById('matricula').value,
            telefono: document.getElementById('telefono').value,
            fecha_registro: document.getElementById('fecha_registro').value
        };

        let url = `${API_URL}/alumnos`;
        let metodo = 'POST';

        if (idAlumnoEditando !== null) {
            url = `${API_URL}/alumnos/${idAlumnoEditando}`;
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

        const respuesta = await fetch(`${API_URL}/alumnos/${id}`, {
            method: 'DELETE'
        });

        const datos = await respuesta.json();

        alert(datos.mensaje);

        cargarAlumnos();

    } catch (error) {

        console.error('Error al eliminar alumno:', error);

        alert('Error al eliminar alumno');

    }

}