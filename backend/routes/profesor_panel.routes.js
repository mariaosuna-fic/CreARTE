const express = require('express');

const router = express.Router();

const conexion = require('../database/db');

const {
    verificarToken,
    soloProfesor
} = require('../middlewares/auth');

// =========================
// PANEL PROFESOR
// =========================

router.get(
    '/panel',
    verificarToken,
    soloProfesor,
    (req, res) => {

        const idUsuario = req.usuario.id;

        const sqlClases = `
            SELECT
                cp.id_clase_programada,
                c.nombre_clase AS clase,
                c.tipo,
                c.nivel,
                h.dia,
                h.hora_inicio AS inicio,
                h.hora_fin AS fin,
                s.nombre_salon AS salon
            FROM clase_programada cp

            INNER JOIN clase c
                ON cp.id_clase = c.id_clase

            INNER JOIN horario h
                ON cp.id_horario = h.id_horario

            INNER JOIN salon s
                ON cp.id_salon = s.id_salon

            INNER JOIN profesor p
                ON cp.id_profesor = p.id_profesor

            WHERE p.id_usuario = ?
        `;

        conexion.query(
            sqlClases,
            [idUsuario],
            (error, clases) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje:
                            'Error al obtener clases'
                    });

                }

                const totalAlumnos =
                    clases.length;

                const hoy = new Date()
                    .toLocaleDateString(
                        'es-MX',
                        {
                            weekday: 'long'
                        }
                    );

                const clasesHoy =
                    clases.filter(clase =>
                        clase.dia.toLowerCase()
                        === hoy.toLowerCase()
                    ).length;

                res.json({
                    clases,
                    totalAlumnos,
                    clasesHoy
                });

            }
        );

    }
);

// =========================
// ALUMNOS POR CLASE
// =========================

router.get(
    '/alumnos/:idClaseProgramada',
    verificarToken,
    soloProfesor,
    (req, res) => {

        const {
            idClaseProgramada
        } = req.params;

        const sql = `
            SELECT
                a.id_alumno,
                u.nombre,
                u.correo,
                a.matricula,
                a.telefono
            FROM inscripcion i

            INNER JOIN alumno a
                ON i.id_alumno = a.id_alumno

            INNER JOIN usuario u
                ON a.id_usuario = u.id_usuario

            WHERE i.id_clase_programada = ?
        `;

        conexion.query(
            sql,
            [idClaseProgramada],
            (error, alumnos) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje:
                            'Error al obtener alumnos'
                    });

                }

                res.json(alumnos);

            }
        );

    }
);

// =========================
// GUARDAR ASISTENCIA
// =========================

router.post(
    '/asistencia',
    verificarToken,
    soloProfesor,
    (req, res) => {

        const {
            id_clase_programada,
            fecha,
            asistencias
        } = req.body;

        if (
            !id_clase_programada
            || !fecha
            || !asistencias
        ) {

            return res.status(400).json({
                mensaje:
                    'Datos incompletos'
            });

        }

        const valores = asistencias.map(
            asistencia => [
                asistencia.id_alumno,
                id_clase_programada,
                fecha,
                asistencia.estado
            ]
        );

        const sql = `
            INSERT INTO asistencia (
                id_alumno,
                id_clase_programada,
                fecha,
                estado
            )
            VALUES ?
        `;

        conexion.query(
            sql,
            [valores],
            (error) => {

                if (error) {

                    console.log(error);

                    return res.status(500).json({
                        mensaje:
                            'Error al guardar asistencia'
                    });

                }

                res.json({
                    mensaje:
                        'Asistencia guardada correctamente'
                });

            }
        );

    }
);

module.exports = router;