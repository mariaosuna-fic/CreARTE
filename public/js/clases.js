const API_URL = 'https://crearte-or0f.onrender.com/clases';

const formClase = document.getElementById('formClase');
const tablaClases = document.getElementById('tablaClases');
const btnCancelar = document.getElementById('btnCancelar');

const idClase = document.getElementById('id_clase');
const nombreClase = document.getElementById('nombre_clase');
const tipo = document.getElementById('tipo');
const nivel = document.getElementById('nivel');
const descripcion = document.getElementById('descripcion');
const cupoMaximo = document.getElementById('cupo_maximo');

// READ
async function obtenerClases() {
    const respuesta = await fetch(API_URL);
    const clases = await respuesta.json();

    tablaClases.innerHTML = '';

    clases.forEach(clase => {
        tablaClases.innerHTML += `
            <tr>
                <td>${clase.id_clase}</td>
                <td>${clase.nombre_clase}</td>
                <td>${clase.tipo}</td>
                <td>${clase.nivel}</td>
                <td>${clase.descripcion}</td>
                <td>${clase.cupo_maximo}</td>
                <td>
                    <button onclick="editarClase(${clase.id_clase}, '${clase.nombre_clase}', '${clase.tipo}', '${clase.nivel}', '${clase.descripcion}', ${clase.cupo_maximo})">
                        Editar
                    </button>

                    <button onclick="eliminarClase(${clase.id_clase})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

// CREATE / UPDATE
formClase.addEventListener('submit', async (e) => {
    e.preventDefault();

    const clase = {
        nombre_clase: nombreClase.value,
        tipo: tipo.value,
        nivel: nivel.value,
        descripcion: descripcion.value,
        cupo_maximo: Number(cupoMaximo.value)
    };

    if (idClase.value === '') {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clase)
        });
    } else {
        await fetch(`${API_URL}/${idClase.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clase)
        });
    }

    formClase.reset();
    idClase.value = '';
    obtenerClases();
});

// EDITAR
function editarClase(id, nombre, tipoValor, nivelValor, descripcionValor, cupo) {
    idClase.value = id;
    nombreClase.value = nombre;
    tipo.value = tipoValor;
    nivel.value = nivelValor;
    descripcion.value = descripcionValor;
    cupoMaximo.value = cupo;
}

// DELETE
async function eliminarClase(id) {
    const confirmar = confirm('¿Seguro que deseas eliminar esta clase?');

    if (!confirmar) {
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    obtenerClases();
}

// CANCELAR EDICIÓN
btnCancelar.addEventListener('click', () => {
    formClase.reset();
    idClase.value = '';
});

// Cargar clases al abrir la página
obtenerClases();