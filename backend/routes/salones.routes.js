const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Salon',
    id: 'id_salon',
    columnas: ['nombre_salon', 'capacidad']
});