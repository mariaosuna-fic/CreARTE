const API_URL = 'https://crearte-or0f.onrender.com';

const formRegistro = document.getElementById('formRegistro');

const mensaje = document.getElementById('mensaje');

formRegistro.addEventListener('submit', async (e) => {

    e.preventDefault();

    const datos = {

        nombre: document.getElementById('nombre').value,

        correo: document.getElementById('correo').value,

        contraseña: document.getElementById('contraseña').value,

        rol: document.getElementById('rol').value

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

            formRegistro.reset();

        }

    } catch (error) {

        console.error(error);

        mensaje.textContent = 'Error al registrar usuario';

    }

});