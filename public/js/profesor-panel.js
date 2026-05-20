const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'profesor') {
    alert('Debes iniciar sesión como profesor');
    window.location.href = '/login.html';
}

const clasesProfesor = [
    {
        id: 1,
        clase: 'Pintura al óleo',
        tipo: 'Arte visual',
        nivel: 'Intermedio',
        dia: 'Lunes',
        horario: '4:00 PM - 6:00 PM',
        salon: 'Salón A',
        alumnos: [
            {
                id: 1,
                nombre: 'María López',
                correo: 'maria@gmail.com',
                matricula: 'A001',
                telefono: '6671234567'
            },
            {
                id: 2,
                nombre: 'Carlos Ruiz',
                correo: 'carlos@gmail.com',
                matricula: 'A002',
                telefono: '6679998888'
            }
        ]
    },
    {
        id: 2,
        clase: 'Danza contemporánea',
        tipo: 'Danza',
        nivel: 'Principiante',
        dia: 'Miércoles',
        horario: '5:00 PM - 7:00 PM',
        salon: 'Salón B',
        alumnos: [
            {
                id: 3,
                nombre: 'Ana Torres',
                correo: 'ana@gmail.com',
                matricula: 'A003',
                telefono: '6675551111'
            }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    cargarResumen();
    cargarClases();
    cargarFechaActual();
});

function cargarFechaActual() {
    const fecha = document.getElementById('fechaAsistencia');

    if (fecha) {
        fecha.value = new Date().toISOString().split('T')[0];
    }
}

function cargarResumen() {
    document.getElementById('totalClases').textContent =
        clasesProfesor.length;

    let totalAlumnos = 0;

    clasesProfesor.forEach(clase => {
        totalAlumnos += clase.alumnos.length;
    });

    document.getElementById('totalAlumnos').textContent =
        totalAlumnos;

    document.getElementById('totalHoy').textContent =
        clasesProfesor.length;
}

function cargarClases() {
    const tabla = document.getElementById('tablaMisClases');

    tabla.innerHTML = '';

    clasesProfesor.forEach(clase => {
        tabla.innerHTML += `
            <tr>
                <td>${clase.clase}</td>
                <td>${clase.tipo}</td>
                <td>${clase.nivel}</td>
                <td>${clase.dia}</td>
                <td>${clase.horario}</td>
                <td>${clase.salon}</td>
                <td>
                    <button
                        class="btn-table-edit"
                        onclick="verAlumnos(${clase.id})"
                    >
                        Ver alumnos
                    </button>
                </td>
            </tr>
        `;
    });
}

function verAlumnos(idClase) {
    const clase = clasesProfesor.find(c => c.id === idClase);

    if (!clase) return;

    document.getElementById('claseSeleccionada').value =
        clase.clase;

    const tablaAlumnos =
        document.getElementById('tablaAlumnosClase');

    tablaAlumnos.innerHTML = '';

    clase.alumnos.forEach(alumno => {
        tablaAlumnos.innerHTML += `
            <tr>
                <td>${alumno.id}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.correo}</td>
                <td>${alumno.matricula}</td>
                <td>${alumno.telefono}</td>
            </tr>
        `;
    });

    cargarAsistencia(clase);

    document.getElementById('seccionAlumnos').scrollIntoView({
        behavior: 'smooth'
    });
}

function cargarAsistencia(clase) {
    const tabla = document.getElementById('tablaAsistencia');

    tabla.innerHTML = '';

    clase.alumnos.forEach(alumno => {
        tabla.innerHTML += `
            <tr>
                <td>${alumno.nombre}</td>
                <td>
                    <input
                        type="radio"
                        name="asistencia_${alumno.id}"
                        value="presente"
                        checked
                    >
                </td>
                <td>
                    <input
                        type="radio"
                        name="asistencia_${alumno.id}"
                        value="ausente"
                    >
                </td>
            </tr>
        `;
    });
}

document.getElementById('formAsistencia').addEventListener('submit', (e) => {
    e.preventDefault();

    const claseSeleccionada =
        document.getElementById('claseSeleccionada').value;

    if (!claseSeleccionada) {
        alert('Primero selecciona una clase');
        return;
    }

    alert('Asistencia guardada correctamente');
});

function cerrarSesion() {
    localStorage.clear();
    alert('Sesión cerrada correctamente');
    window.location.href = '/login.html';
}