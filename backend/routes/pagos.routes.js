const crearCRUD = require('./crud.routes');

module.exports = crearCRUD({
    tabla: 'Pago',
    id: 'id_pago',
    columnas: ['fecha_pago', 'monto_pagado', 'metodo_pago', 'id_mensualidad']
});