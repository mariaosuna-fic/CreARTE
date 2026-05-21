const express = require('express');

const router = express.Router();

const conexion = require('../database/db');


// ==========================
// OBTENER CLASES PROGRAMADAS
// ==========================

router.get('/', (req, res) => {

    const sql = `
        SELECT
            cp.id_clase_programada,

            cp.id_clase,
            cp.id_profesor,
            cp.id_horario,
            cp.id_salon,

            c.nombre_clase,
            c.tipo,
            c.nivel,

            u.nombre AS profesor,

            h.dia,
            h.hora_inicio,
            h.hora_fin,

            s.nombre_salon

        FROM clase_programada cp

        INNER JOIN clase c
            ON cp.id_clase = c.id_clase

        INNER JOIN profesor p
            ON cp.id_profesor = p.id_profesor

        INNER JOIN usuario u
            ON p.id_usuario = u.id_usuario

        INNER JOIN horario h
            ON cp.id_horario = h.id_horario

        INNER JOIN salon s
            ON cp.id_salon = s.id_salon

        ORDER BY cp.id_clase_programada DESC
    `;

    conexion.query(sql, (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                mensaje:
                    'Error al obtener clases programadas'
            });

        }

        res.json(results);

    });

});


// ==========================
// CREAR CLASE PROGRAMADA
// ==========================

router.post('/', (req, res) => {

    const {
        id_clase,
        id_profesor,
        id_horario,
        id_salon
    } = req.body;


    // ==========================
    // VALIDACIONES
    // ==========================

    if (
        !id_clase ||
        !id_profesor ||
        !id_horario ||
        !id_salon
    ) {

        return res.status(400).json({
            mensaje:
                'Todos los campos son obligatorios'
        });

    }


    // ==========================
    // EVITAR DUPLICADOS
    // ==========================

    const sqlExiste = `
        SELECT *
        FROM clase_programada
        WHERE
            id_clase = ?
            AND id_profesor = ?
            AND id_horario = ?
            AND id_salon = ?
    `;

    conexion.query(
        sqlExiste,
        [
            id_clase,
            id_profesor,
            id_horario,
            id_salon
        ],
        (err, results) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    mensaje:
                        'Error al validar clase programada'
                });

            }

            if (results.length > 0) {

                return res.status(400).json({
                    mensaje:
                        'La clase programada ya existe'
                });

            }


            // ==========================
            // INSERTAR
            // ==========================

            const sql = `
                INSERT INTO clase_programada
                (
                    id_clase,
                    id_profesor,
                    id_horario,
                    id_salon
                )
                VALUES (?, ?, ?, ?)
            `;

            conexion.query(
                sql,
                [
                    id_clase,
                    id_profesor,
                    id_horario,
                    id_salon
                ],
                (err) => {

                    if (err) {

                        console.error(err);

                        return res.status(500).json({
                            mensaje:
                                'Error al crear clase programada'
                        });

                    }

                    res.json({
                        mensaje:
                            'Clase programada creada correctamente'
                    });

                }
            );

        }
    );

});


// ==========================
// ACTUALIZAR CLASE PROGRAMADA
// ==========================

router.put('/:id', (req, res) => {

    const { id } = req.params;

    const {
        id_clase,
        id_profesor,
        id_horario,
        id_salon
    } = req.body;

    if (
        !id_clase ||
        !id_profesor ||
        !id_horario ||
        !id_salon
    ) {

        return res.status(400).json({
            mensaje:
                'Todos los campos son obligatorios'
        });

    }

    const sql = `
        UPDATE clase_programada
        SET
            id_clase = ?,
            id_profesor = ?,
            id_horario = ?,
            id_salon = ?
        WHERE id_clase_programada = ?
    `;

    conexion.query(
        sql,
        [
            id_clase,
            id_profesor,
            id_horario,
            id_salon,
            id
        ],
        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    mensaje:
                        'Error al actualizar clase programada'
                });

            }

            res.json({
                mensaje:
                    'Clase programada actualizada correctamente'
            });

        }
    );

});


// ==========================
// ELIMINAR CLASE PROGRAMADA
// ==========================

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM clase_programada
        WHERE id_clase_programada = ?
    `;

    conexion.query(sql, [id], (err) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                mensaje:
                    'Error al eliminar clase programada'
            });

        }

        res.json({
            mensaje:
                'Clase programada eliminada correctamente'
        });

    });

});


module.exports = router;