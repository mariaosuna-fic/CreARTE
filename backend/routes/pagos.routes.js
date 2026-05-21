const express = require('express');

const router = express.Router();

const db = require('../config/db');

const verificarToken =
    require('../middlewares/verificarToken');


// ==========================
// OBTENER PAGOS
// ==========================

router.get('/', verificarToken, (req, res) => {

    const sql = `
        SELECT 
            p.id_pago,
            p.fecha_pago,
            p.monto_pagado,
            p.metodo_pago,
            p.id_mensualidad,
            m.folio_recibo,
            m.concepto,
            m.monto,
            m.estado,
            u.nombre AS alumno
        FROM pago p
        INNER JOIN mensualidad m 
            ON p.id_mensualidad = m.id_mensualidad
        INNER JOIN alumno a 
            ON m.id_alumno = a.id_alumno
        INNER JOIN usuario u 
            ON a.id_usuario = u.id_usuario
        ORDER BY p.id_pago DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                mensaje: 'Error al obtener pagos'
            });

        }

        res.json(results);

    });

});


// ==========================
// CREAR PAGO
// ==========================

router.post('/', verificarToken, (req, res) => {

    const {
        fecha_pago,
        monto_pagado,
        metodo_pago,
        id_mensualidad,
        estado
    } = req.body;

    const sqlPago = `
        INSERT INTO pago
        (
            fecha_pago,
            monto_pagado,
            metodo_pago,
            id_mensualidad
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sqlPago,
        [
            fecha_pago,
            monto_pagado,
            metodo_pago,
            id_mensualidad
        ],
        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    mensaje: 'Error al guardar pago'
                });

            }

            const sqlMensualidad = `
                UPDATE mensualidad
                SET estado = ?
                WHERE id_mensualidad = ?
            `;

            db.query(
                sqlMensualidad,
                [
                    estado,
                    id_mensualidad
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
                            'Pago registrado correctamente'
                    });

                }
            );

        }
    );

});


// ==========================
// ACTUALIZAR PAGO
// ==========================

router.put('/:id', verificarToken, (req, res) => {

    const { id } = req.params;

    const {
        fecha_pago,
        monto_pagado,
        metodo_pago,
        id_mensualidad,
        estado
    } = req.body;

    const sqlPago = `
        UPDATE pago
        SET
            fecha_pago = ?,
            monto_pagado = ?,
            metodo_pago = ?,
            id_mensualidad = ?
        WHERE id_pago = ?
    `;

    db.query(
        sqlPago,
        [
            fecha_pago,
            monto_pagado,
            metodo_pago,
            id_mensualidad,
            id
        ],
        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    mensaje: 'Error al actualizar pago'
                });

            }

            const sqlMensualidad = `
                UPDATE mensualidad
                SET estado = ?
                WHERE id_mensualidad = ?
            `;

            db.query(
                sqlMensualidad,
                [
                    estado,
                    id_mensualidad
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
                            'Pago actualizado correctamente'
                    });

                }
            );

        }
    );

});


// ==========================
// ELIMINAR PAGO
// ==========================

router.delete('/:id', verificarToken, (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM pago
        WHERE id_pago = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                mensaje: 'Error al eliminar pago'
            });

        }

        res.json({
            mensaje: 'Pago eliminado correctamente'
        });

    });

});


module.exports = router;