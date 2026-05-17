const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'mensualidad',
    id: 'id_mensualidad',
    columnas: ['folio_recibo', 'concepto', 'monto', 'fecha_limite', 'estado', 'mes', 'anio', 'id_alumno']
});