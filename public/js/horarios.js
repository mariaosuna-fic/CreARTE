const API_URL = 'https://crearte-or0f.onrender.com';

const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'admin') {
    alert('Debes iniciar sesión como administrador');
    window.location.href = '/login.html';
}

const formHorario = document.getElementById('horarioForm');
const tablaHorarios = document.getElementById('tablaHorarios');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');

let editando = false;
let idHorarioEditar = null;

document.addEventListener('DOMContentLoaded', cargarHorarios);

formHorario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        dia: document.getElementById('dia').value,
        hora_inicio: document.getElementById('hora_inicio').value,
        hora_fin: document.getElementById('hora_fin').value
    };

    try {
        let url = `${API_URL}/horarios`;
        let metodo = 'POST';

        if (editando) {
            url = `${API_URL}/horarios/${idHorarioEditar}`;
            metodo = 'PUT';
        }

        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.status === 401 || respuesta.status === 403) {
            alert('Tu sesión no es válida o no tienes permisos.');
            localStorage.clear();
            window.location.href = '/login.html';
            return;
        }

        if (!respuesta.ok) {
            alert(resultado.mensaje || 'Error al guardar horario');
            return;
        }

        alert(resultado.mensaje || 'Horario guardado correctamente');

        resetearFormulario();
        cargarHorarios();

    } catch (error) {
        console.error(error);
        alert('Error de conexión con el servidor');
    }
});

async function cargarHorarios() {
    try {
        const respuesta = await fetch(`${API_URL}/horarios`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (respuesta.status === 401 || respuesta.status === 403) {
            alert('Debes iniciar sesión como administrador');
            localStorage.clear();
            window.location.href = '/login.html';
            return;
        }

        const horarios = await respuesta.json();

        tablaHorarios.innerHTML = '';

        horarios.forEach(horario => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${horario.id_horario}</td>
                <td>${horario.dia}</td>
                <td>${horario.hora_inicio}</td>
                <td>${horario.hora_fin}</td>
                <td>
                    <button 
                        class="btn-table-edit"
                        onclick="editarHorario(${horario.id_horario}, '${horario.dia}', '${horario.hora_inicio}', '${horario.hora_fin}')"
                    >
                        ✏️ Editar
                    </button>

                    <button 
                        class="btn-table-delete"
                        onclick="eliminarHorario(${horario.id_horario})"
                    >
                        🗑️ Eliminar
                    </button>
                </td>
            `;

            tablaHorarios.appendChild(fila);
        });

    } catch (error) {
        console.error(error);
        alert('Error al cargar horarios');
    }
}

function editarHorario(id, dia, horaInicio, horaFin) {
    document.getElementById('dia').value = dia;
    document.getElementById('hora_inicio').value = horaInicio;
    document.getElementById('hora_fin').value = horaFin;

    editando = true;
    idHorarioEditar = id;

    btnGuardar.textContent = 'Actualizar Horario';
    btnGuardar.style.backgroundColor = '#2a9d8f';
    btnCancelar.style.display = 'inline-block';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

async function eliminarHorario(id) {
    const confirmar = confirm('¿Seguro que deseas eliminar este horario?');

    if (!confirmar) return;

    try {
        const respuesta = await fetch(`${API_URL}/horarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const resultado = await respuesta.json();

        if (respuesta.status === 401 || respuesta.status === 403) {
            alert('Tu sesión no es válida.');
            localStorage.clear();
            window.location.href = '/login.html';
            return;
        }

        if (!respuesta.ok) {
            alert(resultado.mensaje || 'Error al eliminar horario');
            return;
        }

        alert(resultado.mensaje || 'Horario eliminado correctamente');

        cargarHorarios();

    } catch (error) {
        console.error(error);
        alert('Error de conexión con el servidor');
    }
}

function resetearFormulario() {
    formHorario.reset();

    editando = false;
    idHorarioEditar = null;

    btnGuardar.textContent = 'Guardar Horario';
    btnGuardar.style.backgroundColor = '#9d8df1';

    btnCancelar.style.display = 'none';
}

function cerrarSesion() {
    localStorage.clear();
    alert('Sesión cerrada correctamente');
    window.location.href = '/login.html';
}

btnCancelar.addEventListener('click', resetearFormulario);