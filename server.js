const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

// Carpeta de archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'views', 'index.html')
    );

});

// Inicializa el servidor
app.listen(PORT, () => {

    console.log(`Servidor corriendo en puerto ${PORT}`);

});