const express = require('express');
const router = express.Router();

const conexion = require('../database/db');

// ======================
// REGISTRO
// ======================

router.post('/registro', (req, res) => {

    const { nombre, correo, contraseña, rol } = req.body;

    const sql = `
        INSERT INTO Usuario(nombre, correo, contraseña, rol, estado)
        VALUES (?, ?, ?, ?, true)
    `;

    conexion.query(
        sql,
        [nombre, correo, contraseña, rol],
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

router.post('/login', (req, res) => {

    const { correo, contraseña } = req.body;

    const sql = `
        SELECT * FROM Usuario
        WHERE correo = ? AND contraseña = ?
    `;

    conexion.query(
        sql,
        [correo, contraseña],
        (error, resultados) => {

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

            res.json({
                mensaje: 'Inicio de sesión exitoso',
                usuario: resultados[0]
            });

        }
    );

});

module.exports = router;