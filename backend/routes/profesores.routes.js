const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'profesor',
    id: 'id_profesor',
    columnas: ['especialidad', 'disponibilidad', 'id_usuario']
});