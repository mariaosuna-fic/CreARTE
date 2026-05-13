const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Usuario',
    id: 'id_usuario',
    columnas: ['nombre', 'correo', 'contraseña', 'rol', 'estado']
});