const express = require('express');
const router = express.Router();

const conexion = require('../database/db');
const bcrypt = require('bcrypt');

// ======================
// REGISTRO
// ======================

router.post('/registro', async (req, res) => {

    const { nombre, correo, contraseña, rol } = req.body;

    const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

    const sql = `
        INSERT INTO Usuario(nombre, correo, contraseña, rol, estado)
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

            delete usuario.contraseña;

            res.json({
                mensaje: 'Inicio de sesión exitoso',
                usuario
            });

        }
    );

});

module.exports = router;