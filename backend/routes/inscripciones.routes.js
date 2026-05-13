const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Inscripcion',
    id: 'id_inscripcion',
    columnas: ['fecha_inscripcion', 'id_alumno', 'id_clase_programada']
});