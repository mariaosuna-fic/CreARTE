let idSalonEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarSalones();
});

async function cargarSalones() {
    try {
        const respuesta = await fetch('/salones');
        const salones = await respuesta.json();

        const tabla = document.getElementById('tablaSalones');
        tabla.innerHTML = '';

        salones.forEach(salon => {
            tabla.innerHTML += `
                <tr>
                    <td>${salon.id_salon}</td>
                    <td>${salon.nombre_salon}</td>
                    <td>${salon.capacidad}</td>
                    <td>
                        <button onclick="editarSalon(
                            ${salon.id_salon},
                            '${salon.nombre_salon}',
                            ${salon.capacidad}
                        )">Editar</button>

                        <button onclick="eliminarSalon(${salon.id_salon})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error('Error al cargar salones:', error);
    }
}

function editarSalon(id, nombre_salon, capacidad) {
    idSalonEditando = id;

    document.getElementById('nombre_salon').value = nombre_salon;
    document.getElementById('capacidad').value = capacidad;

    document.getElementById('btnGuardar').textContent = 'Actualizar Salón';
}

document.getElementById('formSalon').addEventListener('submit', async (e) => {
    e.preventDefault();

    const salon = {
        nombre_salon: document.getElementById('nombre_salon').value,
        capacidad: document.getElementById('capacidad').value
    };

    let url = '/salones';
    let metodo = 'POST';

    if (idSalonEditando !== null) {
        url = `/salones/${idSalonEditando}`;
        metodo = 'PUT';
    }

    try {
        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(salon)
        });

        const datos = await respuesta.json();

        alert(datos.mensaje);

        document.getElementById('formSalon').reset();
        document.getElementById('btnGuardar').textContent = 'Guardar Salón';

        idSalonEditando = null;

        cargarSalones();

    } catch (error) {
        console.error('Error al guardar salón:', error);
        alert('Error al guardar salón');
    }
});

async function eliminarSalon(id) {
    const confirmar = confirm('¿Seguro que deseas eliminar este salón?');

    if (!confirmar) return;

    try {
        const respuesta = await fetch(`/salones/${id}`, {
            method: 'DELETE'
        });

        const datos = await respuesta.json();

        alert(datos.mensaje);

        cargarSalones();

    } catch (error) {
        console.error('Error al eliminar salón:', error);
        alert('Error al eliminar salón');
    }
}