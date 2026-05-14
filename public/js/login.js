const formLogin = document.getElementById('formLogin');

const mensaje = document.getElementById('mensaje');

formLogin.addEventListener('submit', async (e) => {

    e.preventDefault();

    const datos = {

        correo: document.getElementById('correo').value,

        contraseña: document.getElementById('contraseña').value

    };

    try {

        const respuesta = await fetch('/login', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(datos)

        });

        const resultado = await respuesta.json();

        mensaje.textContent = resultado.mensaje;

        if (respuesta.ok) {

            alert('Bienvenido/a ' + resultado.usuario.nombre);

            // Redirección según rol
            if (resultado.usuario.rol === 'admin') {

                window.location.href = '/clases-admin';

            } else {

                window.location.href = '/';

            }

        }

    } catch (error) {

        console.error(error);

        mensaje.textContent = 'Error al iniciar sesión';

    }

});