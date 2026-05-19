const API_URL = 'https://crearte-or0f.onrender.com';

const formLogin = document.getElementById('formLogin');

const mensaje = document.getElementById('mensaje');

formLogin.addEventListener('submit', async (e) => {

    e.preventDefault();

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

        if (respuesta.ok) {

            localStorage.setItem('token', resultado.token);

            localStorage.setItem('rol', resultado.usuario.rol);

            localStorage.setItem('nombre', resultado.usuario.nombre);

            alert('Bienvenido/a ' + resultado.usuario.nombre);

            if (resultado.usuario.rol === 'admin') {

                window.location.href = '/admin.html';

            } else {

                window.location.href = '/index.html';

            }

        }

    } catch (error) {

        console.error('Error:', error);

        mensaje.textContent = 'Error al iniciar sesión';

    }

});