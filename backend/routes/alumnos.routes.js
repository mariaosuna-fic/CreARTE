const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Alumno',
    id: 'id_alumno',
    columnas: ['matricula', 'telefono', 'fecha_registro', 'id_usuario']
});