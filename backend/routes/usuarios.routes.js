const express = require('express');
const router = express.Router();

const crearCRUD = require('./crud.routes');
const conexion = require('../database/db');

// CRUD general
const crudUsuarios = crearCRUD({
    tabla: 'usuario',
    id: 'id_usuario',
    columnas: ['nombre', 'correo', 'contraseña', 'rol', 'estado']
});

// GET Usuarios (Sin contraseña)

router.get('/', (req, res) => {

    const sql = `
        SELECT id_usuario, nombre, correo, rol, estado
        FROM usuario
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            console.error(error);

            return res.status(500).json({
                mensaje: 'Error al consultar usuarios'
            });

        }

        res.json(resultados);

    });

});

/* =========================
   RESTO CRUD GENERAL
========================= */

router.use('/', crudUsuarios);

module.exports = router;