const express = require('express');

const router = express.Router();

const conexion = require('../database/db');


// ==========================
// OBTENER MENSUALIDADES
// ==========================

router.get('/', (req, res) => {

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

    conexion.query(sql, (err, results) => {

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

router.post('/', (req, res) => {

    const {
        concepto,
        monto,
        fecha_limite,
        estado,
        mes,
        anio,
        id_alumno
    } = req.body;

    // ==========================
    // VALIDACIONES
    // ==========================

    if (monto <= 0) {
        return res.status(400).json({
            mensaje: 'El monto debe ser mayor a 0'
        });
    }

    if (mes < 1 || mes > 12) {
        return res.status(400).json({
            mensaje: 'El mes debe estar entre 1 y 12'
        });
    }

    if (anio < 2025) {
        return res.status(400).json({
            mensaje: 'El año no es válido'
        });
    }

    // ==========================
    // FOLIO AUTOMÁTICO
    // ==========================

    const fechaActual = new Date();

    const anioActual = fechaActual.getFullYear();

    const mesActual =
        String(fechaActual.getMonth() + 1).padStart(2, '0');

    const folio_recibo =
        `REC-${anioActual}-${mesActual}-${Date.now()}`;

    const estadoFinal = estado || 'pendiente';

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

    conexion.query(
        sql,
        [
            folio_recibo,
            concepto,
            monto,
            fecha_limite,
            estadoFinal,
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

router.put('/:id', (req, res) => {

    const { id } = req.params;

    const {
        concepto,
        monto,
        fecha_limite,
        estado,
        mes,
        anio,
        id_alumno
    } = req.body;

    // ==========================
    // VALIDACIONES
    // ==========================

    if (monto <= 0) {
        return res.status(400).json({
            mensaje: 'El monto debe ser mayor a 0'
        });
    }

    if (mes < 1 || mes > 12) {
        return res.status(400).json({
            mensaje: 'El mes debe estar entre 1 y 12'
        });
    }

    if (anio < 2025) {
        return res.status(400).json({
            mensaje: 'El año no es válido'
        });
    }

    const sql = `
        UPDATE mensualidad
        SET
            concepto = ?,
            monto = ?,
            fecha_limite = ?,
            estado = ?,
            mes = ?,
            anio = ?,
            id_alumno = ?
        WHERE id_mensualidad = ?
    `;

    conexion.query(
        sql,
        [
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

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM mensualidad
        WHERE id_mensualidad = ?
    `;

    conexion.query(sql, [id], (err) => {

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