const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Profesor',
    id: 'id_profesor',
    columnas: ['especialidad', 'disponibilidad', 'id_usuario']
});