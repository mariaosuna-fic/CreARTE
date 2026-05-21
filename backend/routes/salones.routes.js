const express = require('express');

const router = express.Router();

const conexion = require('../database/db');


// OBTENER SALONES
router.get('/', (req, res) => {

    const sql = `
        SELECT 
            id_salon,
            nombre_salon,
            capacidad
        FROM salon
        ORDER BY id_salon DESC
    `;

    conexion.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                mensaje: 'Error al obtener salones'
            });
        }

        res.json(results);

    });

});


// CREAR SALÓN
router.post('/', (req, res) => {

    const {
        nombre_salon,
        capacidad
    } = req.body;

    if (capacidad <= 0) {
        return res.status(400).json({
            mensaje: 'La capacidad debe ser mayor a 0'
        });
    }

    const sql = `
        INSERT INTO salon
        (
            nombre_salon,
            capacidad
        )
        VALUES (?, ?)
    `;

    conexion.query(
        sql,
        [
            nombre_salon,
            capacidad
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    mensaje: 'Error al crear salón'
                });
            }

            res.json({
                mensaje: 'Salón creado correctamente'
            });

        }
    );

});


// ACTUALIZAR SALÓN
router.put('/:id', (req, res) => {

    const { id } = req.params;

    const {
        nombre_salon,
        capacidad
    } = req.body;

    if (capacidad <= 0) {
        return res.status(400).json({
            mensaje: 'La capacidad debe ser mayor a 0'
        });
    }

    const sql = `
        UPDATE salon
        SET
            nombre_salon = ?,
            capacidad = ?
        WHERE id_salon = ?
    `;

    conexion.query(
        sql,
        [
            nombre_salon,
            capacidad,
            id
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    mensaje: 'Error al actualizar salón'
                });
            }

            res.json({
                mensaje: 'Salón actualizado correctamente'
            });

        }
    );

});


// ELIMINAR SALÓN
router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM salon
        WHERE id_salon = ?
    `;

    conexion.query(sql, [id], (err) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                mensaje: 'Error al eliminar salón'
            });
        }

        res.json({
            mensaje: 'Salón eliminado correctamente'
        });

    });

});


module.exports = router;