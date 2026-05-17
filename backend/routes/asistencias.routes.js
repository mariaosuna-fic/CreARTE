const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'asistencia',
    id: 'id_asistencia',
    columnas: ['fecha', 'estado', 'id_alumno', 'id_clase_programada']
});