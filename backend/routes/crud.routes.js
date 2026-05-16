const express = require('express');
const conexion = require('../database/db');

function crearCRUD(config) {
    const router = express.Router();

    router.get('/', (req, res) => {
        conexion.query(`SELECT * FROM ${config.tabla}`, (error, resultados) => {
            if (error) return res.status(500).json({ mensaje: 'Error al consultar datos' });
            res.json(resultados);
        });
    });

    router.post('/', (req, res) => {
        const datos = req.body;

        const columnas = Object.keys(datos).filter(columna =>
            config.columnas.includes(columna)
        );

        const valores = columnas.map(columna => datos[columna]);
        const placeholders = columnas.map(() => '?').join(', ');

        const sql = `
            INSERT INTO ${config.tabla} (${columnas.join(', ')})
            VALUES (${placeholders})
        `;

        conexion.query(sql, valores, (error, resultado) => {
            if (error) return res.status(500).json({ mensaje: 'Error al registrar datos' });

            res.json({
                mensaje: 'Registro creado correctamente',
                id: resultado.insertId
            });
        });
    });

    router.put('/:id', (req, res) => {
        const datos = req.body;

        const columnas = Object.keys(datos).filter(columna =>
            config.columnas.includes(columna)
        );

        const valores = columnas.map(columna => datos[columna]);
        const campos = columnas.map(columna => `${columna} = ?`).join(', ');

        const sql = `
            UPDATE ${config.tabla}
            SET ${campos}
            WHERE ${config.id} = ?
        `;

        conexion.query(sql, [...valores, req.params.id], (error, resultado) => {
            if (error) return res.status(500).json({ mensaje: 'Error al actualizar datos' });

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }

            res.json({ mensaje: 'Registro actualizado correctamente' });
        });
    });

    router.delete('/:id', (req, res) => {
        const sql = `DELETE FROM ${config.tabla} WHERE ${config.id} = ?`;

        conexion.query(sql, [req.params.id], (error, resultado) => {
            if (error) {
                return res.status(500).json({
                    mensaje: 'Error al eliminar. Puede que el registro esté relacionado con otra tabla.'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }

            res.json({ mensaje: 'Registro eliminado correctamente' });
        });
    });

    return router;
}

module.exports = crearCRUD;