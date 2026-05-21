const express = require('express');
const router = express.Router();

const conexion = require('../database/db');
const { verificarToken, soloAlumno } = require('../middlewares/auth');

router.get('/panel', verificarToken, soloAlumno, (req, res) => {

    const idUsuario = req.usuario.id || req.usuario.id_usuario;

    const sqlClases = `
        SELECT
            c.nombre_clase AS clase,
            c.tipo,
            c.nivel,
            u.nombre AS profesor,
            'Activa' AS estado
        FROM inscripcion i
        INNER JOIN alumno a
            ON i.id_alumno = a.id_alumno
        INNER JOIN clase_programada cp
            ON i.id_clase_programada = cp.id_clase_programada
        INNER JOIN clase c
            ON cp.id_clase = c.id_clase
        INNER JOIN profesor p
            ON cp.id_profesor = p.id_profesor
        INNER JOIN usuario u
            ON p.id_usuario = u.id_usuario
        WHERE a.id_usuario = ?
    `;

    conexion.query(sqlClases, [idUsuario], (error, clases) => {

        if (error) {
            console.log(error);
            return res.status(500).json({ mensaje: 'Error al obtener clases' });
        }

        const sqlHorarios = `
            SELECT
                c.nombre_clase AS clase,
                h.dia,
                h.hora_inicio AS inicio,
                h.hora_fin AS fin
            FROM inscripcion i
            INNER JOIN alumno a
                ON i.id_alumno = a.id_alumno
            INNER JOIN clase_programada cp
                ON i.id_clase_programada = cp.id_clase_programada
            INNER JOIN clase c
                ON cp.id_clase = c.id_clase
            INNER JOIN horario h
                ON cp.id_horario = h.id_horario
            WHERE a.id_usuario = ?
        `;

        conexion.query(sqlHorarios, [idUsuario], (error, horarios) => {

            if (error) {
                console.log(error);
                return res.status(500).json({ mensaje: 'Error al obtener horarios' });
            }

            const sqlSalones = `
                SELECT
                    c.nombre_clase AS clase,
                    s.nombre_salon AS salon,
                    s.capacidad
                FROM inscripcion i
                INNER JOIN alumno a
                    ON i.id_alumno = a.id_alumno
                INNER JOIN clase_programada cp
                    ON i.id_clase_programada = cp.id_clase_programada
                INNER JOIN clase c
                    ON cp.id_clase = c.id_clase
                INNER JOIN salon s
                    ON cp.id_salon = s.id_salon
                WHERE a.id_usuario = ?
            `;

            conexion.query(sqlSalones, [idUsuario], (error, salones) => {

                if (error) {
                    console.log(error);
                    return res.status(500).json({ mensaje: 'Error al obtener salones' });
                }

                const sqlMensualidades = `
                    SELECT
                        m.id_mensualidad,
                        m.folio_recibo AS folio,
                        m.concepto,
                        m.monto,
                        m.fecha_limite AS fecha,
                        m.estado
                    FROM mensualidad m
                    INNER JOIN alumno a
                        ON m.id_alumno = a.id_alumno
                    WHERE a.id_usuario = ?
                `;

                conexion.query(sqlMensualidades, [idUsuario], (error, mensualidades) => {

                    if (error) {
                        console.log(error);
                        return res.status(500).json({ mensaje: 'Error al obtener mensualidades' });
                    }

                    const sqlPagos = `
                        SELECT
                            p.fecha_pago AS fecha,
                            p.monto_pagado AS monto,
                            p.metodo_pago AS metodo,
                            m.folio_recibo AS folio
                        FROM pago p
                        INNER JOIN mensualidad m
                            ON p.id_mensualidad = m.id_mensualidad
                        INNER JOIN alumno a
                            ON m.id_alumno = a.id_alumno
                        WHERE a.id_usuario = ?
                    `;

                    conexion.query(sqlPagos, [idUsuario], (error, pagos) => {

                        if (error) {
                            console.log(error);
                            return res.status(500).json({ mensaje: 'Error al obtener pagos' });
                        }

                        res.json({
                            clases,
                            horarios,
                            salones,
                            mensualidades,
                            pagos
                        });

                    });

                });

            });

        });

    });

});

module.exports = router;