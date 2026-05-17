const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'clase_Programada',
    id: 'id_clase_programada',
    columnas: ['id_clase', 'id_profesor', 'id_horario', 'id_salon']
});