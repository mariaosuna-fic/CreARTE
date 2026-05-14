const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Clase',
    id: 'id_clase',
    columnas: ['nombre_clase', 'tipo', 'nivel', 'descripcion', 'cupo_maximo']
});