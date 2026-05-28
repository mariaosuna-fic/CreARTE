const express = require('express');
const router = express.Router();

const conexion = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ======================
// REGISTRO
// ======================

router.post('/registro', async (req, res) => {
    try {
        let { nombre, correo, contraseña, rol } = req.body;

        if (!nombre || !correo || !contraseña || !rol) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        rol = rol.toLowerCase().trim();

        const rolesPermitidos = ['alumno', 'profesor'];

        if (!rolesPermitidos.includes(rol)) {
            return res.status(400).json({
                mensaje: 'Rol no permitido'
            });
        }

        if (contraseña.length < 6) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!correoRegex.test(correo)) {
            return res.status(400).json({
                mensaje: 'Correo electrónico inválido'
            });
        }

        const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

        const sqlUsuario = `
            INSERT INTO usuario
            (
                nombre,
                correo,
                contraseña,
                rol,
                estado
            )
            VALUES (?, ?, ?, ?, true)
        `;

        conexion.query(
            sqlUsuario,
            [nombre, correo, contraseñaEncriptada, rol],
            (error, resultadoUsuario) => {
                if (error) {
                    console.error(error);

                    return res.status(500).json({
                        mensaje: 'Error al registrar usuario',
                        error: error.sqlMessage
                    });
                }

                const id_usuario = resultadoUsuario.insertId;

                if (rol === 'alumno') {
                    const sqlAlumno = `
                        INSERT INTO alumno
                        (
                            matricula,
                            telefono,
                            fecha_registro,
                            id_usuario
                        )
                        VALUES (?, ?, CURDATE(), ?)
                    `;

                    const matricula = `ALU${id_usuario}`;

                    conexion.query(
                        sqlAlumno,
                        [matricula, '', id_usuario],
                        (errorAlumno) => {
                            if (errorAlumno) {
                                console.error(errorAlumno);

                                return res.status(500).json({
                                    mensaje: 'Usuario creado, pero no se pudo registrar como alumno',
                                    error: errorAlumno.sqlMessage
                                });
                            }

                            return res.json({
                                mensaje: 'Alumno registrado correctamente',
                                id_usuario
                            });
                        }
                    );

                } else if (rol === 'profesor') {
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
                        ['', '', id_usuario],
                        (errorProfesor) => {
                            if (errorProfesor) {
                                console.error(errorProfesor);

                                return res.status(500).json({
                                    mensaje: 'Usuario creado, pero no se pudo registrar como profesor',
                                    error: errorProfesor.sqlMessage
                                });
                            }

                            return res.json({
                                mensaje: 'Profesor registrado correctamente',
                                id_usuario
                            });
                        }
                    );
                }
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
// LOGIN
// ======================

router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({
            mensaje: 'Correo y contraseña son obligatorios'
        });
    }

    const sql = `
        SELECT * FROM usuario
        WHERE correo = ?
    `;

    conexion.query(
        sql,
        [correo],
        async (error, resultados) => {
            if (error) {
                console.error(error);

                return res.status(500).json({
                    mensaje: 'Error al iniciar sesión',
                    error: error.sqlMessage
                });
            }

            if (resultados.length === 0) {
                return res.status(401).json({
                    mensaje: 'Correo o contraseña incorrectos'
                });
            }

            const usuario = resultados[0];

            const contraseñaValida = await bcrypt.compare(
                contraseña,
                usuario.contraseña
            );

            if (!contraseñaValida) {
                return res.status(401).json({
                    mensaje: 'Correo o contraseña incorrectos'
                });
            }

            if (!process.env.JWT_SECRET) {
                return res.status(500).json({
                    mensaje: 'JWT_SECRET no está configurado'
                });
            }

            const token = jwt.sign(
                {
                    id_usuario: usuario.id_usuario,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2h'
                }
            );

            delete usuario.contraseña;

            res.json({
                mensaje: 'Inicio de sesión exitoso',
                usuario,
                token
            });
        }
    );
});

module.exports = router;