const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'profesor') {

    alert('Debes iniciar sesión como profesor');

    window.location.href = '/login.html';

}

let profesorData = {
    clases: [],
    alumnos: [],
    asistencia: []
};

let claseActual = null;

document.addEventListener('DOMContentLoaded', () => {

    cargarDatosProfesor();

});

async function cargarDatosProfesor() {

    try {

        const respuesta = await fetch('/profesor_panel/panel', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {

            throw new Error(
                'Error al obtener datos del profesor'
            );

        }

        profesorData = await respuesta.json();

        cargarResumen();

        cargarClases();

    } catch (error) {

        console.log(error);

        alert(
            'No se pudo cargar la información del profesor'
        );

    }

}

function cargarResumen() {

    document.getElementById('totalClases').value =
        profesorData.clases.length;

    document.getElementById('totalAlumnos').value =
        profesorData.totalAlumnos || 0;

    document.getElementById('totalHoy').value =
        profesorData.clasesHoy || 0;

}

function cargarClases() {

    const tabla =
        document.getElementById('tablaMisClases');

    tabla.innerHTML = '';

    if (profesorData.clases.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="7">
                    No tienes clases asignadas.
                </td>
            </tr>
        `;

        return;

    }

    profesorData.clases.forEach(clase => {

        tabla.innerHTML += `
            <tr>

                <td>${clase.clase}</td>

                <td>${clase.tipo}</td>

                <td>${clase.nivel}</td>

                <td>${clase.dia}</td>

                <td>
                    ${clase.inicio} - ${clase.fin}
                </td>

                <td>${clase.salon}</td>

                <td>

                    <button
                        class="btn-table-edit"
                        onclick="seleccionarClase(
                            ${clase.id_clase_programada},
                            '${clase.clase}'
                        )"
                    >
                        Ver alumnos
                    </button>

                </td>

            </tr>
        `;

    });

}

async function seleccionarClase(idClaseProgramada, nombreClase) {

    claseActual = idClaseProgramada;

    document.getElementById(
        'claseSeleccionada'
    ).value = nombreClase;

    try {

        const respuesta = await fetch(
            `/profesor_panel/alumnos/${idClaseProgramada}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!respuesta.ok) {

            throw new Error(
                'Error al obtener alumnos'
            );

        }

        const alumnos = await respuesta.json();

        cargarTablaAlumnos(alumnos);

        cargarTablaAsistencia(alumnos);

    } catch (error) {

        console.log(error);

        alert(
            'No se pudieron cargar los alumnos'
        );

    }

}

function cargarTablaAlumnos(alumnos) {

    const tabla =
        document.getElementById('tablaAlumnosClase');

    tabla.innerHTML = '';

    if (alumnos.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5">
                    No hay alumnos inscritos.
                </td>
            </tr>
        `;

        return;

    }

    alumnos.forEach(alumno => {

        tabla.innerHTML += `
            <tr>

                <td>${alumno.id_alumno}</td>

                <td>${alumno.nombre}</td>

                <td>${alumno.correo}</td>

                <td>${alumno.matricula}</td>

                <td>${alumno.telefono}</td>

            </tr>
        `;

    });

}

function cargarTablaAsistencia(alumnos) {

    const tabla =
        document.getElementById('tablaAsistencia');

    tabla.innerHTML = '';

    alumnos.forEach(alumno => {

        tabla.innerHTML += `
            <tr>

                <td>${alumno.nombre}</td>

                <td>
                    <input
                        type="radio"
                        name="asistencia_${alumno.id_alumno}"
                        value="Presente"
                        checked
                    >
                </td>

                <td>
                    <input
                        type="radio"
                        name="asistencia_${alumno.id_alumno}"
                        value="Ausente"
                    >
                </td>

            </tr>
        `;

    });

}

document.getElementById('formAsistencia')
.addEventListener('submit', async (e) => {

    e.preventDefault();

    if (!claseActual) {

        alert(
            'Debes seleccionar una clase'
        );

        return;

    }

    const fecha =
        document.getElementById(
            'fechaAsistencia'
        ).value;

    const asistencias = [];

    const radios =
        document.querySelectorAll(
            '#tablaAsistencia tr'
        );

    radios.forEach((fila) => {

        const radioSeleccionado =
            fila.querySelector(
                'input[type="radio"]:checked'
            );

        if (radioSeleccionado) {

            const idAlumno =
                radioSeleccionado.name.split('_')[1];

            asistencias.push({
                id_alumno: idAlumno,
                estado: radioSeleccionado.value
            });

        }

    });

    try {

        const respuesta = await fetch(
            '/profesor_panel/asistencia',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_clase_programada: claseActual,
                    fecha,
                    asistencias
                })
            }
        );

        const data = await respuesta.json();

        alert(data.mensaje);

    } catch (error) {

        console.log(error);

        alert(
            'Error al guardar asistencia'
        );

    }

});

function cerrarSesion() {

    localStorage.clear();

    alert(
        'Sesión cerrada correctamente'
    );

    window.location.href = '/login.html';

}