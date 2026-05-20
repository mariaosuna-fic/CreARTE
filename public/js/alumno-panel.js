const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'alumno') {
    alert('Debes iniciar sesión como alumno');
    window.location.href = '/login.html';
}

const alumnoData = {
    clases: [
        {
            clase: 'Pintura al óleo',
            tipo: 'Arte visual',
            nivel: 'Intermedio',
            profesor: 'Ana Torres',
            estado: 'Activa'
        },
        {
            clase: 'Danza contemporánea',
            tipo: 'Danza',
            nivel: 'Principiante',
            profesor: 'Carlos Ruiz',
            estado: 'Activa'
        }
    ],

    horarios: [
        {
            clase: 'Pintura al óleo',
            dia: 'Lunes',
            inicio: '4:00 PM',
            fin: '6:00 PM'
        },
        {
            clase: 'Danza contemporánea',
            dia: 'Miércoles',
            inicio: '5:00 PM',
            fin: '7:00 PM'
        }
    ],

    salones: [
        {
            clase: 'Pintura al óleo',
            salon: 'Salón A',
            capacidad: 20
        },
        {
            clase: 'Danza contemporánea',
            salon: 'Salón B',
            capacidad: 15
        }
    ],

    mensualidades: [
        {
            folio: 'MENS-001',
            concepto: 'Mensualidad mayo',
            monto: '$1,200',
            fecha: '2026-05-30',
            estado: 'Pendiente'
        },
        {
            folio: 'MENS-002',
            concepto: 'Mensualidad abril',
            monto: '$1,200',
            fecha: '2026-04-30',
            estado: 'Pagada'
        }
    ],

    pagos: [
        {
            fecha: '2026-04-15',
            monto: '$1,200',
            metodo: 'Transferencia',
            folio: 'MENS-002'
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    cargarResumen();
    cargarClases();
    cargarHorarios();
    cargarSalones();
    cargarMensualidades();
    cargarPagos();
});

function cargarResumen() {
    document.getElementById('totalClases').textContent =
        alumnoData.clases.length;

    const pendientes = alumnoData.mensualidades.filter(
        mensualidad => mensualidad.estado === 'Pendiente'
    ).length;

    document.getElementById('totalPendientes').textContent =
        pendientes;

    document.getElementById('totalPagos').textContent =
        alumnoData.pagos.length;
}

function cargarClases() {
    const tabla = document.getElementById('tablaMisClases');

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
    const tabla = document.getElementById('tablaHorarios');

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
    const tabla = document.getElementById('tablaSalones');

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
    const tabla = document.getElementById('tablaMensualidades');

    tabla.innerHTML = '';

    alumnoData.mensualidades.forEach(mensualidad => {
        tabla.innerHTML += `
            <tr>
                <td>${mensualidad.folio}</td>
                <td>${mensualidad.concepto}</td>
                <td>${mensualidad.monto}</td>
                <td>${mensualidad.fecha}</td>
                <td>${mensualidad.estado}</td>
            </tr>
        `;
    });
}

function cargarPagos() {
    const tabla = document.getElementById('tablaPagos');

    tabla.innerHTML = '';

    alumnoData.pagos.forEach(pago => {
        tabla.innerHTML += `
            <tr>
                <td>${pago.fecha}</td>
                <td>${pago.monto}</td>
                <td>${pago.metodo}</td>
                <td>${pago.folio}</td>
            </tr>
        `;
    });
}

function cerrarSesion() {
    localStorage.clear();
    alert('Sesión cerrada correctamente');
    window.location.href = '/login.html';
}