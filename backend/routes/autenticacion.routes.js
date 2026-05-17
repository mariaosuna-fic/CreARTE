const express = require('express');
const router = express.Router();

const conexion = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ======================
// REGISTRO
// ======================

router.post('/registro', async (req, res) => {

    const { nombre, correo, contraseña, rol } = req.body;

    if (!nombre || !correo || !contraseña || !rol) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

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

    const sql = `
        INSERT INTO usuario(nombre, correo, contraseña, rol, estado)
        VALUES (?, ?, ?, ?, true)
    `;

    conexion.query(
        sql,
        [nombre, correo, contraseñaEncriptada, rol],
        (error, resultado) => {

            if (error) {

                console.error(error);

                return res.status(500).json({
                    mensaje: 'Error al registrar usuario'
                });

            }

            res.json({
                mensaje: 'Usuario registrado correctamente',
                id_usuario: resultado.insertId
            });

        }
    );

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
                    mensaje: 'Error al iniciar sesión'
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