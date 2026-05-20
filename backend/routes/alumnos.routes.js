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

    if (!nombre || !correo || !contraseña || !matricula || !telefono || !fecha_registro) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    try {

        const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

        const sqlUsuario = `
            INSERT INTO usuario(nombre, correo, contraseña, rol, estado)
            VALUES (?, ?, ?, 'alumno', true)
        `;

        conexion.query(
            sqlUsuario,
            [nombre, correo, contraseñaEncriptada],
            (errorUsuario, resultadoUsuario) => {

                if (errorUsuario) {
                    console.error(errorUsuario);
                    return res.status(500).json({
                        mensaje: 'Error al crear usuario alumno'
                    });
                }

                const id_usuario = resultadoUsuario.insertId;

                const sqlAlumno = `
                    INSERT INTO alumno(matricula, telefono, fecha_registro, id_usuario)
                    VALUES (?, ?, ?, ?)
                `;

                conexion.query(
                    sqlAlumno,
                    [matricula, telefono, fecha_registro, id_usuario],
                    (errorAlumno) => {

                        if (errorAlumno) {
                            console.error(errorAlumno);
                            return res.status(500).json({
                                mensaje: 'Usuario creado, pero error al registrar alumno'
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
            alumno.id_alumno,
            alumno.matricula,
            alumno.telefono,
            alumno.fecha_registro,
            alumno.id_usuario,
            usuario.nombre,
            usuario.correo
        FROM alumno
        INNER JOIN usuario
        ON alumno.id_usuario = usuario.id_usuario
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                mensaje: 'Error al obtener alumnos'
            });
        }

        res.json(resultados);

    });

});

// ======================
// ELIMINAR ALUMNO
// ======================

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM alumno
        WHERE id_alumno = ?
    `;

    conexion.query(sql, [id], (error) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                mensaje: 'Error al eliminar alumno'
            });
        }

        res.json({
            mensaje: 'Alumno eliminado correctamente'
        });

    });

});

module.exports = router;