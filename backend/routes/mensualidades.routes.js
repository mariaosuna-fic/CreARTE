const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Mensualidad',
    id: 'id_mensualidad',
    columnas: ['folio_recibo', 'concepto', 'monto', 'fecha_limite', 'estado', 'mes', 'anio', 'id_alumno']
});