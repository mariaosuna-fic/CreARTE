const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');

if (!token || rol !== 'admin') {
    window.location.href = '/login.html';
}

const cerrarSesion = document.getElementById('cerrarSesion');

cerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');

    window.location.href = '/login.html';
});