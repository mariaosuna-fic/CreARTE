const express = require('express');
const router = express.Router();

const conexion = require('../database/db');
const bcrypt = require('bcrypt');

// ======================
// CREAR PROFESOR COMPLETO
// ======================

router.post('/', async (req, res) => {

    const {
        nombre,
        correo,
        contraseña,
        especialidad,
        disponibilidad
    } = req.body;

    if (!nombre || !correo || !contraseña || !especialidad || !disponibilidad) {

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
            VALUES (?, ?, ?, 'profesor', true)
        `;

        conexion.query(
            sqlUsuario,
            [
                nombre,
                correo,
                contraseñaEncriptada
            ],
            (errorUsuario, resultadoUsuario) => {

                if (errorUsuario) {

                    console.error(errorUsuario);

                    return res.status(500).json({
                        mensaje: 'Error al crear usuario profesor'
                    });

                }

                const id_usuario =
                    resultadoUsuario.insertId;

                const sqlProfesor = `
                    INSERT INTO profesor
                    (
                        especialidad,
                        disponibilidad,
                        id_usuario
                    )
                    VALUES (?, ?, ?)
                `;

                conexion.query(
                    sqlProfesor,
                    [
                        especialidad,
                        disponibilidad,
                        id_usuario
                    ],
                    (errorProfesor) => {

                        if (errorProfesor) {

                            console.error(errorProfesor);

                            return res.status(500).json({
                                mensaje: 'Usuario creado, pero error al registrar profesor'
                            });

                        }

                        res.json({
                            mensaje: 'Profesor registrado correctamente'
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
// LISTAR PROFESORES
// ======================

router.get('/', (req, res) => {

    const sql = `
        SELECT
            profesor.id_profesor,
            profesor.especialidad,
            profesor.disponibilidad,
            profesor.id_usuario,
            usuario.nombre,
            usuario.correo
        FROM profesor
        INNER JOIN usuario
        ON profesor.id_usuario = usuario.id_usuario
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            console.error(error);

            return res.status(500).json({
                mensaje: 'Error al obtener profesores'
            });

        }

        res.json(resultados);

    });

});

// ======================
// ACTUALIZAR PROFESOR
// ======================

router.put('/:id', (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        correo,
        especialidad,
        disponibilidad
    } = req.body;

    if (!nombre || !correo || !especialidad || !disponibilidad) {

        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });

    }

    const buscarProfesor = `
        SELECT id_usuario
        FROM profesor
        WHERE id_profesor = ?
    `;

    conexion.query(
        buscarProfesor,
        [id],
        (errorBuscar, resultadoBuscar) => {

            if (errorBuscar) {

                console.error(errorBuscar);

                return res.status(500).json({
                    mensaje: 'Error al buscar profesor'
                });

            }

            if (resultadoBuscar.length === 0) {

                return res.status(404).json({
                    mensaje: 'Profesor no encontrado'
                });

            }

            const id_usuario =
                resultadoBuscar[0].id_usuario;

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
                            mensaje: 'Error al actualizar usuario'
                        });

                    }

                    const actualizarProfesor = `
                        UPDATE profesor
                        SET especialidad = ?, disponibilidad = ?
                        WHERE id_profesor = ?
                    `;

                    conexion.query(
                        actualizarProfesor,
                        [
                            especialidad,
                            disponibilidad,
                            id
                        ],
                        (errorProfesor) => {

                            if (errorProfesor) {

                                console.error(errorProfesor);

                                return res.status(500).json({
                                    mensaje: 'Error al actualizar profesor'
                                });

                            }

                            res.json({
                                mensaje: 'Profesor actualizado correctamente'
                            });

                        }
                    );

                }
            );

        }
    );

});

// ======================
// ELIMINAR PROFESOR
// ======================

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM profesor
        WHERE id_profesor = ?
    `;

    conexion.query(sql, [id], (error) => {

        if (error) {

            console.error(error);

            return res.status(500).json({
                mensaje: 'Error al eliminar profesor'
            });

        }

        res.json({
            mensaje: 'Profesor eliminado correctamente'
        });

    });

});

module.exports = router;