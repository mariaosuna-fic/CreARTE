const API_URL = 'https://crearte-or0f.onrender.com';

const formLogin = document.getElementById('formLogin');

const mensaje = document.getElementById('mensaje');

formLogin.addEventListener('submit', async (e) => {

    e.preventDefault();

    mensaje.textContent = '';

    const datos = {

        correo: document.getElementById('correo').value,

        contraseña: document.getElementById('contraseña').value

    };

    try {

        const respuesta = await fetch(`${API_URL}/login`, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(datos)

        });

        const resultado = await respuesta.json();

        mensaje.textContent = resultado.mensaje;

        // ======================
        // SI HAY ERROR
        // ======================

        if (!respuesta.ok) {

            mensaje.style.color = 'red';

            return;

        }

        // ======================
        // GUARDAR SESIÓN
        // ======================

        localStorage.setItem(
            'token',
            resultado.token
        );

        localStorage.setItem(
            'rol',
            resultado.usuario.rol
        );

        localStorage.setItem(
            'nombre',
            resultado.usuario.nombre
        );

        localStorage.setItem(
            'id_usuario',
            resultado.usuario.id_usuario
        );

        mensaje.style.color = 'green';

        alert(
            'Bienvenido/a ' +
            resultado.usuario.nombre
        );

        // ======================
        // REDIRECCIÓN POR ROL
        // ======================

        if (resultado.usuario.rol === 'admin') {

            window.location.href = '/admin.html';

        } else {

            window.location.href = '/index.html';

        }

    } catch (error) {

        console.error('Error:', error);

        mensaje.style.color = 'red';

        mensaje.textContent =
            'Error al conectar con el servidor';

    }

});