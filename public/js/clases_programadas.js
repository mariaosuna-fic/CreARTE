const API_URL = 'https://crearte-or0f.onrender.com';

const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'admin') {
    alert('Debes iniciar sesión como administrador');
    window.location.href = '/login.html';
}

const formClaseProgramada =
    document.getElementById('formClaseProgramada');

const tablaClasesProgramadas =
    document.getElementById('tablaClasesProgramadas');

const btnGuardar =
    document.getElementById('btnGuardar');

const btnCancelar =
    document.getElementById('btnCancelar');

let idClaseProgramadaEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarSelects();
    cargarClasesProgramadas();
});


// ==========================
// CARGAR SELECTS
// ==========================

async function cargarSelects() {

    await cargarCursos();

    await cargarProfesores();

    await cargarHorarios();

    await cargarSalones();

}


// ==========================
// CURSOS
// ==========================

async function cargarCursos() {

    const respuesta = await fetch(`${API_URL}/clases`, {

        headers: {
            'Authorization': `Bearer ${token}`
        }

    });

    const clases = await respuesta.json();

    const select =
        document.getElementById('id_clase');

    select.innerHTML = `
        <option value="">
            Selecciona un curso
        </option>
    `;

    clases.forEach(clase => {

        select.innerHTML += `
            <option value="${clase.id_clase}">
                ${clase.nombre_clase}
                - ${clase.nivel}
            </option>
        `;

    });

}


// ==========================
// PROFESORES
// ==========================

async function cargarProfesores() {

    const respuesta = await fetch(`${API_URL}/profesores`, {

        headers: {
            'Authorization': `Bearer ${token}`
        }

    });

    const profesores = await respuesta.json();

    const select =
        document.getElementById('id_profesor');

    select.innerHTML = `
        <option value="">
            Selecciona un profesor
        </option>
    `;

    profesores.forEach(profesor => {

        select.innerHTML += `
            <option value="${profesor.id_profesor}">
                ${profesor.nombre || 'Profesor'}
                - ${profesor.especialidad || ''}
            </option>
        `;

    });

}


// ==========================
// HORARIOS
// ==========================

async function cargarHorarios() {

    const respuesta = await fetch(`${API_URL}/horarios`, {

        headers: {
            'Authorization': `Bearer ${token}`
        }

    });

    const horarios = await respuesta.json();

    const select =
        document.getElementById('id_horario');

    select.innerHTML = `
        <option value="">
            Selecciona un horario
        </option>
    `;

    horarios.forEach(horario => {

        select.innerHTML += `
            <option value="${horario.id_horario}">
                ${horario.dia}
                - ${horario.hora_inicio}
                a
                ${horario.hora_fin}
            </option>
        `;

    });

}


// ==========================
// SALONES
// ==========================

async function cargarSalones() {

    const respuesta = await fetch(`${API_URL}/salones`, {

        headers: {
            'Authorization': `Bearer ${token}`
        }

    });

    const salones = await respuesta.json();

    const select =
        document.getElementById('id_salon');

    select.innerHTML = `
        <option value="">
            Selecciona un salón
        </option>
    `;

    salones.forEach(salon => {

        select.innerHTML += `
            <option value="${salon.id_salon}">
                ${salon.nombre_salon}
                - Capacidad:
                ${salon.capacidad}
            </option>
        `;

    });

}


// ==========================
// GUARDAR / ACTUALIZAR
// ==========================

formClaseProgramada.addEventListener('submit', async (e) => {

    e.preventDefault();

    const datos = {

        id_clase:
            document.getElementById('id_clase').value,

        id_profesor:
            document.getElementById('id_profesor').value,

        id_horario:
            document.getElementById('id_horario').value,

        id_salon:
            document.getElementById('id_salon').value

    };

    let url =
        `${API_URL}/clases_programadas`;

    let metodo = 'POST';

    if (idClaseProgramadaEditando !== null) {

        url =
            `${API_URL}/clases_programadas/${idClaseProgramadaEditando}`;

        metodo = 'PUT';

    }

    try {

        const respuesta = await fetch(url, {

            method: metodo,

            headers: {

                'Content-Type': 'application/json',

                'Authorization': `Bearer ${token}`

            },

            body: JSON.stringify(datos)

        });

        const resultado =
            await respuesta.json();

        alert(
            resultado.mensaje ||
            'Operación realizada'
        );

        if (!respuesta.ok) return;

        resetearFormulario();

        cargarClasesProgramadas();

    } catch (error) {

        console.error(error);

        alert(
            'Error al guardar clase programada'
        );

    }

});


// ==========================
// OBTENER TABLA
// ==========================

async function cargarClasesProgramadas() {

    try {

        const respuesta = await fetch(
            `${API_URL}/clases_programadas`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const clasesProgramadas =
            await respuesta.json();

        tablaClasesProgramadas.innerHTML = '';

        clasesProgramadas.forEach(cp => {

            tablaClasesProgramadas.innerHTML += `
                <tr>

                    <td>
                        ${cp.id_clase_programada}
                    </td>

                    <td>
                        ${cp.nombre_clase}
                    </td>

                    <td>
                        ${cp.profesor}
                    </td>

                    <td>
                        ${cp.dia}
                        ${cp.hora_inicio}
                        -
                        ${cp.hora_fin}
                    </td>

                    <td>
                        ${cp.nombre_salon}
                    </td>

                    <td>

                        <button
                            class="btn-table-edit"

                            onclick="editarClaseProgramada(
                                ${cp.id_clase_programada},
                                ${cp.id_clase},
                                ${cp.id_profesor},
                                ${cp.id_horario},
                                ${cp.id_salon}
                            )"
                        >
                            Editar
                        </button>

                        <button
                            class="btn-table-delete"

                            onclick="eliminarClaseProgramada(
                                ${cp.id_clase_programada}
                            )"
                        >
                            Eliminar
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert(
            'Error al cargar clases programadas'
        );

    }

}


// ==========================
// EDITAR
// ==========================

function editarClaseProgramada(
    id,
    idClase,
    idProfesor,
    idHorario,
    idSalon
) {

    idClaseProgramadaEditando = id;

    document.getElementById('id_clase').value =
        idClase;

    document.getElementById('id_profesor').value =
        idProfesor;

    document.getElementById('id_horario').value =
        idHorario;

    document.getElementById('id_salon').value =
        idSalon;

    btnGuardar.textContent =
        'Actualizar Clase Programada';

    btnCancelar.style.display =
        'inline-block';

    window.scrollTo({

        top: 0,

        behavior: 'smooth'

    });

}


// ==========================
// ELIMINAR
// ==========================

async function eliminarClaseProgramada(id) {

    if (
        !confirm(
            '¿Seguro que deseas eliminar esta clase programada?'
        )
    ) return;

    try {

        const respuesta = await fetch(

            `${API_URL}/clases_programadas/${id}`,

            {

                method: 'DELETE',

                headers: {
                    'Authorization': `Bearer ${token}`
                }

            }

        );

        const resultado =
            await respuesta.json();

        alert(
            resultado.mensaje ||
            'Clase programada eliminada'
        );

        cargarClasesProgramadas();

    } catch (error) {

        console.error(error);

        alert(
            'Error al eliminar clase programada'
        );

    }

}


// ==========================
// RESET
// ==========================

function resetearFormulario() {

    formClaseProgramada.reset();

    idClaseProgramadaEditando = null;

    btnGuardar.textContent =
        'Guardar Clase Programada';

    btnCancelar.style.display =
        'none';

}

btnCancelar.addEventListener(
    'click',
    resetearFormulario
);


// ==========================
// CERRAR SESIÓN
// ==========================

function cerrarSesion() {

    localStorage.clear();

    alert(
        'Sesión cerrada correctamente'
    );

    window.location.href =
        '/login.html';

}