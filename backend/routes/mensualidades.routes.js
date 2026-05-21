const express = require('express');

const router = express.Router();

const db = require('../database/db');

const verificarToken =
    require('../middlewares/verificarToken');


// ==========================
// OBTENER MENSUALIDADES
// ==========================

router.get('/', verificarToken, (req, res) => {

    const sql = `
        SELECT 
            m.id_mensualidad,
            m.folio_recibo,
            m.concepto,
            m.monto,
            m.fecha_limite,
            m.estado,
            m.mes,
            m.anio,
            m.id_alumno,
            u.nombre AS alumno
        FROM mensualidad m
        INNER JOIN alumno a
            ON m.id_alumno = a.id_alumno
        INNER JOIN usuario u
            ON a.id_usuario = u.id_usuario
        WHERE m.estado != 'pagado'
        ORDER BY m.id_mensualidad DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                mensaje:
                    'Error al obtener mensualidades'
            });

        }

        res.json(results);

    });

});


// ==========================
// CREAR MENSUALIDAD
// ==========================

router.post('/', verificarToken, (req, res) => {

    const {
        folio_recibo,
        concepto,
        monto,
        fecha_limite,
        estado,
        mes,
        anio,
        id_alumno
    } = req.body;

    const sql = `
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
        sql,
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
                    mensaje:
                        'Error al crear mensualidad'
                });

            }

            res.json({
                mensaje:
                    'Mensualidad creada correctamente'
            });

        }
    );

});


// ==========================
// ACTUALIZAR MENSUALIDAD
// ==========================

router.put('/:id', verificarToken, (req, res) => {

    const { id } = req.params;

    const {
        folio_recibo,
        concepto,
        monto,
        fecha_limite,
        estado,
        mes,
        anio,
        id_alumno
    } = req.body;

    const sql = `
        UPDATE mensualidad
        SET
            folio_recibo = ?,
            concepto = ?,
            monto = ?,
            fecha_limite = ?,
            estado = ?,
            mes = ?,
            anio = ?,
            id_alumno = ?
        WHERE id_mensualidad = ?
    `;

    db.query(
        sql,
        [
            folio_recibo,
            concepto,
            monto,
            fecha_limite,
            estado,
            mes,
            anio,
            id_alumno,
            id
        ],
        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    mensaje:
                        'Error al actualizar mensualidad'
                });

            }

            res.json({
                mensaje:
                    'Mensualidad actualizada correctamente'
            });

        }
    );

});


// ==========================
// ELIMINAR MENSUALIDAD
// ==========================

router.delete('/:id', verificarToken, (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM mensualidad
        WHERE id_mensualidad = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                mensaje:
                    'Error al eliminar mensualidad'
            });

        }

        res.json({
            mensaje:
                'Mensualidad eliminada correctamente'
        });

    });

});


module.exports = router;