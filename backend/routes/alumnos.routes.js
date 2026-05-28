const express = require('express');
const router = express.Router();

const conexion = require('../database/db');
const bcrypt = require('bcrypt');

// ======================
// CREAR ALUMNO COMPLETO
// ======================

router.post('/', async (req, res) => {

    const {
        nombre,
        correo,
        contraseña,
        matricula,
        telefono,
        fecha_registro
    } = req.body;

    if (
        !nombre ||
        !correo ||
        !contraseña ||
        !matricula ||
        !telefono ||
        !fecha_registro
    ) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    try {

        const contraseñaEncriptada =
            await bcrypt.hash(contraseña, 10);

        const sqlUsuario = `
            INSERT INTO usuario
            (
                nombre,
                correo,
                contraseña,
                rol,
                estado
            )
            VALUES (?, ?, ?, 'alumno', true)
        `;

        conexion.query(
            sqlUsuario,
            [nombre, correo, contraseñaEncriptada],
            (errorUsuario, resultadoUsuario) => {

                if (errorUsuario) {

                    console.error(errorUsuario);

                    return res.status(500).json({
                        mensaje: 'Error al crear usuario alumno',
                        error: errorUsuario.sqlMessage
                    });

                }

                const id_usuario =
                    resultadoUsuario.insertId;

                const sqlAlumno = `
                    INSERT INTO alumno
                    (
                        matricula,
                        telefono,
                        fecha_registro,
                        id_usuario
                    )
                    VALUES (?, ?, ?, ?)
                `;

                conexion.query(
                    sqlAlumno,
                    [
                        matricula,
                        telefono,
                        fecha_registro,
                        id_usuario
                    ],
                    (errorAlumno) => {

                        if (errorAlumno) {

                            console.error(errorAlumno);

                            return res.status(500).json({
                                mensaje: 'Usuario creado, pero error al registrar alumno',
                                error: errorAlumno.sqlMessage
                            });

                        }

                        res.json({
                            mensaje: 'Alumno registrado correctamente'
                        });

                    }
                );

            }
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

});

// ======================
// LISTAR ALUMNOS
// ======================

router.get('/', (req, res) => {

    const sql = `
        SELECT 
            a.id_alumno,
            a.matricula,
            a.telefono,
            a.fecha_registro,
            a.id_usuario,
            u.nombre,
            u.correo,
            u.rol,
            u.estado
        FROM alumno AS a
        INNER JOIN usuario AS u
        ON a.id_usuario = u.id_usuario
        WHERE u.rol = 'alumno'
        ORDER BY a.id_alumno DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            console.error(error);

            return res.status(500).json({
                mensaje: 'Error al obtener alumnos',
                error: error.sqlMessage
            });

        }

        res.json(resultados);

    });

});

// ======================
// ACTUALIZAR ALUMNO
// ======================

router.put('/:id', (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        correo,
        matricula,
        telefono,
        fecha_registro
    } = req.body;

    if (
        !nombre ||
        !correo ||
        !matricula ||
        !telefono ||
        !fecha_registro
    ) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    const buscarUsuario = `
        SELECT id_usuario
        FROM alumno
        WHERE id_alumno = ?
    `;

    conexion.query(
        buscarUsuario,
        [id],
        (errorBuscar, resultados) => {

            if (errorBuscar) {

                console.error(errorBuscar);

                return res.status(500).json({
                    mensaje: 'Error al buscar alumno',
                    error: errorBuscar.sqlMessage
                });

            }

            if (resultados.length === 0) {

                return res.status(404).json({
                    mensaje: 'Alumno no encontrado'
                });

            }

            const id_usuario =
                resultados[0].id_usuario;

            const actualizarUsuario = `
                UPDATE usuario
                SET nombre = ?, correo = ?
                WHERE id_usuario = ?
            `;

            conexion.query(
                actualizarUsuario,
                [nombre, correo, id_usuario],
                (errorUsuario) => {

                    if (errorUsuario) {

                        console.error(errorUsuario);

                        return res.status(500).json({
                            mensaje: 'Error al actualizar usuario',
                            error: errorUsuario.sqlMessage
                        });

                    }

                    const actualizarAlumno = `
                        UPDATE alumno
                        SET 
                            matricula = ?,
                            telefono = ?,
                            fecha_registro = ?
                        WHERE id_alumno = ?
                    `;

                    conexion.query(
                        actualizarAlumno,
                        [
                            matricula,
                            telefono,
                            fecha_registro,
                            id
                        ],
                        (errorAlumno) => {

                            if (errorAlumno) {

                                console.error(errorAlumno);

                                return res.status(500).json({
                                    mensaje: 'Error al actualizar alumno',
                                    error: errorAlumno.sqlMessage
                                });

                            }

                            res.json({
                                mensaje: 'Alumno actualizado correctamente'
                            });

                        }
                    );

                }
            );

        }
    );

});

// ======================
// ELIMINAR ALUMNO
// ======================

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const buscarUsuario = `
        SELECT id_usuario
        FROM alumno
        WHERE id_alumno = ?
    `;

    conexion.query(
        buscarUsuario,
        [id],
        (errorBuscar, resultados) => {

            if (errorBuscar) {

                console.error(errorBuscar);

                return res.status(500).json({
                    mensaje: 'Error al buscar alumno',
                    error: errorBuscar.sqlMessage
                });

            }

            if (resultados.length === 0) {

                return res.status(404).json({
                    mensaje: 'Alumno no encontrado'
                });

            }

            const id_usuario =
                resultados[0].id_usuario;

            const eliminarAlumno = `
                DELETE FROM alumno
                WHERE id_alumno = ?
            `;

            conexion.query(
                eliminarAlumno,
                [id],
                (errorAlumno) => {

                    if (errorAlumno) {

                        console.error(errorAlumno);

                        return res.status(500).json({
                            mensaje: 'Error al eliminar alumno',
                            error: errorAlumno.sqlMessage
                        });

                    }

                    const eliminarUsuario = `
                        DELETE FROM usuario
                        WHERE id_usuario = ?
                    `;

                    conexion.query(
                        eliminarUsuario,
                        [id_usuario],
                        (errorUsuario) => {

                            if (errorUsuario) {

                                console.error(errorUsuario);

                                return res.status(500).json({
                                    mensaje: 'Alumno eliminado, pero error al eliminar usuario',
                                    error: errorUsuario.sqlMessage
                                });

                            }

                            res.json({
                                mensaje: 'Alumno eliminado correctamente'
                            });

                        }
                    );

                }
            );

        }
    );

});

module.exports = router;