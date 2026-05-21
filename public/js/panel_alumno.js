const token = localStorage.getItem('token');

const rol = localStorage.getItem('rol');

if (!token || rol !== 'alumno') {

    alert('Debes iniciar sesión como alumno');

    window.location.href = '/login';

}

let alumnoData = {
    clases: [],
    horarios: [],
    salones: [],
    mensualidades: [],
    pagos: []
};

document.addEventListener('DOMContentLoaded', () => {

    cargarDatosAlumno();

});

async function cargarDatosAlumno() {

    try {

        const respuesta = await fetch(
            '/alumno_panel/panel',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!respuesta.ok) {

            throw new Error(
                'Error al cargar datos del alumno'
            );

        }

        alumnoData = await respuesta.json();

        cargarResumen();

        cargarClases();

        cargarHorarios();

        cargarSalones();

        cargarMensualidades();

        cargarPagos();

    } catch (error) {

        console.log(error);

        alert(
            'No se pudo cargar la información del alumno'
        );

    }

}

function cargarResumen() {

    document.getElementById(
        'totalClases'
    ).value = alumnoData.clases.length;

    const pendientes =
        alumnoData.mensualidades.filter(
            mensualidad =>
                mensualidad.estado === 'Pendiente'
        ).length;

    document.getElementById(
        'totalPendientes'
    ).value = pendientes;

    document.getElementById(
        'totalPagos'
    ).value = alumnoData.pagos.length;

}

function cargarClases() {

    const tabla =
        document.getElementById(
            'tablaMisClases'
        );

    tabla.innerHTML = '';

    alumnoData.clases.forEach(clase => {

        tabla.innerHTML += `
            <tr>

                <td>${clase.clase}</td>

                <td>${clase.tipo}</td>

                <td>${clase.nivel}</td>

                <td>${clase.profesor}</td>

                <td>${clase.estado}</td>

            </tr>
        `;

    });

}

function cargarHorarios() {

    const tabla =
        document.getElementById(
            'tablaHorarios'
        );

    tabla.innerHTML = '';

    alumnoData.horarios.forEach(horario => {

        tabla.innerHTML += `
            <tr>

                <td>${horario.clase}</td>

                <td>${horario.dia}</td>

                <td>${horario.inicio}</td>

                <td>${horario.fin}</td>

            </tr>
        `;

    });

}

function cargarSalones() {

    const tabla =
        document.getElementById(
            'tablaSalones'
        );

    tabla.innerHTML = '';

    alumnoData.salones.forEach(salon => {

        tabla.innerHTML += `
            <tr>

                <td>${salon.clase}</td>

                <td>${salon.salon}</td>

                <td>${salon.capacidad}</td>

            </tr>
        `;

    });

}

function cargarMensualidades() {

    const tabla =
        document.getElementById(
            'tablaMensualidades'
        );

    tabla.innerHTML = '';

    alumnoData.mensualidades.forEach(
        mensualidad => {

            tabla.innerHTML += `
                <tr>

                    <td>${mensualidad.folio}</td>

                    <td>${mensualidad.concepto}</td>

                    <td>$${mensualidad.monto}</td>

                    <td>${mensualidad.fecha}</td>

                    <td>${mensualidad.estado}</td>

                </tr>
            `;

        }
    );

}

function cargarPagos() {

    const tabla =
        document.getElementById(
            'tablaPagos'
        );

    tabla.innerHTML = '';

    alumnoData.pagos.forEach(pago => {

        tabla.innerHTML += `
            <tr>

                <td>${pago.fecha}</td>

                <td>$${pago.monto}</td>

                <td>${pago.metodo}</td>

                <td>${pago.folio}</td>

            </tr>
        `;

    });

}

window.cerrarSesion = function () {

    localStorage.clear();

    alert(
        'Sesión cerrada correctamente'
    );

    window.location.href = '/login';

};