const express = require('express');

const router = express.Router();

const db = require('../config/db');

const verificarToken =
    require('../middlewares/verificarToken');


// ==========================
// OBTENER INSCRIPCIONES
// ==========================

router.get('/', verificarToken, (req, res) => {

    const sql = `
        SELECT 
            i.id_inscripcion,
            i.fecha_inscripcion,
            i.id_alumno,
            i.id_clase_programada,
            u.nombre AS alumno,
            c.nombre_clase AS clase
        FROM inscripcion i
        INNER JOIN alumno a 
            ON i.id_alumno = a.id_alumno
        INNER JOIN usuario u 
            ON a.id_usuario = u.id_usuario
        INNER JOIN clase_programada cp 
            ON i.id_clase_programada = cp.id_clase_programada
        INNER JOIN clase c 
            ON cp.id_clase = c.id_clase
        ORDER BY i.id_inscripcion DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                mensaje: 'Error al obtener inscripciones'
            });
        }

        res.json(results);

    });

});


// ==========================
// CREAR INSCRIPCIÓN
// Y CREAR MENSUALIDAD AUTOMÁTICA
// ==========================

router.post('/', verificarToken, (req, res) => {

    const {
        fecha_inscripcion,
        id_alumno,
        id_clase_programada
    } = req.body;

    const sqlInscripcion = `
        INSERT INTO inscripcion
        (
            fecha_inscripcion,
            id_alumno,
            id_clase_programada
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sqlInscripcion,
        [
            fecha_inscripcion,
            id_alumno,
            id_clase_programada
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    mensaje: 'Error al crear inscripción'
                });
            }

            const sqlClase = `
                SELECT 
                    c.nombre_clase
                FROM clase_programada cp
                INNER JOIN clase c
                    ON cp.id_clase = c.id_clase
                WHERE cp.id_clase_programada = ?
            `;

            db.query(sqlClase, [id_clase_programada], (err, claseResult) => {

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        mensaje: 'Inscripción creada, pero error al obtener la clase'
                    });
                }

                const fecha = new Date(fecha_inscripcion);

                const mes = fecha.getMonth() + 1;
                const anio = fecha.getFullYear();

                const nombreClase =
                    claseResult[0]?.nombre_clase || 'Clase';

                const folio_recibo =
                    `REC-${anio}-${mes}-${result.insertId}`;

                const concepto =
                    `Mensualidad ${mes}/${anio} - ${nombreClase}`;

                const monto = 800;

                const fecha_limite =
                    `${anio}-${String(mes).padStart(2, '0')}-10`;

                const estado = 'pendiente';

                const sqlMensualidad = `
                    INSERT INTO mensualidad
                    (
                        folio_recibo,
                        concepto,
                        monto,
                        fecha_limite,
                        estado,
                        mes,
                        anio,
                        id_alumno
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;

                db.query(
                    sqlMensualidad,
                    [
                        folio_recibo,
                        concepto,
                        monto,
                        fecha_limite,
                        estado,
                        mes,
                        anio,
                        id_alumno
                    ],
                    (err) => {

                        if (err) {
                            console.error(err);

                            return res.status(500).json({
                                mensaje: 'Inscripción creada, pero error al crear mensualidad'
                            });
                        }

                        res.json({
                            mensaje: 'Inscripción y mensualidad creadas correctamente'
                        });

                    }
                );

            });

        }
    );

});


// ==========================
// ACTUALIZAR INSCRIPCIÓN
// ==========================

router.put('/:id', verificarToken, (req, res) => {

    const { id } = req.params;

    const {
        fecha_inscripcion,
        id_alumno,
        id_clase_programada
    } = req.body;

    const sql = `
        UPDATE inscripcion
        SET
            fecha_inscripcion = ?,
            id_alumno = ?,
            id_clase_programada = ?
        WHERE id_inscripcion = ?
    `;

    db.query(
        sql,
        [
            fecha_inscripcion,
            id_alumno,
            id_clase_programada,
            id
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    mensaje: 'Error al actualizar inscripción'
                });
            }

            res.json({
                mensaje: 'Inscripción actualizada correctamente'
            });

        }
    );

});


// ==========================
// ELIMINAR INSCRIPCIÓN
// ==========================

router.delete('/:id', verificarToken, (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM inscripcion
        WHERE id_inscripcion = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                mensaje: 'Error al eliminar inscripción'
            });
        }

        res.json({
            mensaje: 'Inscripción eliminada correctamente'
        });

    });

});


module.exports = router;