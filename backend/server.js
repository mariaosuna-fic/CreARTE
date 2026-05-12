const express = require('express');
const path = require('path');

// Conexión MySQL
const conexion = require('./database/db');

const app = express();

const PORT = process.env.PORT || 3000;

// Permite trabajar con JSON
app.use(express.json());

// Carpeta de archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'views', 'index.html')
    );

});

// Ruta usuarios
app.get('/usuarios', (req, res) => {

    const sql = 'SELECT * FROM Usuario';

    conexion.query(sql, (error, resultados) => {

        if (error) {

            console.error(error);

            return res.status(500).json({
                error: 'Error al consultar usuarios'
            });

        }

        res.json(resultados);

    });

});

// Inicializa el servidor
app.listen(PORT, () => {

    console.log(`Servidor corriendo en puerto ${PORT}`);

});