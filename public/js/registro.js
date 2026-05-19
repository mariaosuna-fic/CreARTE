const API_URL = 'https://crearte-or0f.onrender.com';

const formRegistro = document.getElementById('formRegistro');

const mensaje = document.getElementById('mensaje');

formRegistro.addEventListener('submit', async (e) => {

    e.preventDefault();

    // Obtener rol
    let rol = document.getElementById('rol').value;

    // Limpiar texto
    rol = rol.toLowerCase().trim();

    // Bloquear admin desde frontend
    if (rol === 'admin') {

        mensaje.textContent =
            'No puedes registrarte como administrador';

        mensaje.style.color = 'red';

        return;

    }

    const datos = {

        nombre: document.getElementById('nombre').value,

        correo: document.getElementById('correo').value,

        contraseña: document.getElementById('contraseña').value,

        rol: rol

    };

    try {

        const respuesta = await fetch(`${API_URL}/registro`, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(datos)

        });

        const resultado = await respuesta.json();

        mensaje.textContent = resultado.mensaje;

        if (respuesta.ok) {

            mensaje.style.color = 'green';

            formRegistro.reset();

        } else {

            mensaje.style.color = 'red';

        }

    } catch (error) {

        console.error(error);

        mensaje.textContent = 'Error al registrar usuario';

        mensaje.style.color = 'red';

    }

});