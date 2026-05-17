const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'alumno',
    id: 'id_alumno',
    columnas: ['matricula', 'telefono', 'fecha_registro', 'id_usuario']
});