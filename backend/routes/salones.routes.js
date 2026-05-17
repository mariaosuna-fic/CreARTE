const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'salon',
    id: 'id_salon',
    columnas: ['nombre_salon', 'capacidad']
});