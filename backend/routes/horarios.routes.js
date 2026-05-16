const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Horario',
    id: 'id_horario',
    columnas: ['dia', 'hora_inicio', 'hora_fin']
});