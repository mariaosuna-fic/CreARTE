const express = require('express');
const path = require('path');

const usuariosRoutes = require('./routes/usuarios.routes');
const alumnosRoutes = require('./routes/alumnos.routes');
const profesoresRoutes = require('./routes/profesores.routes');
const clasesRoutes = require('./routes/clases.routes');
const horariosRoutes = require('./routes/horarios.routes');
const salonesRoutes = require('./routes/salones.routes');
const clasesProgramadasRoutes = require('./routes/clases_programadas.routes');
const inscripcionesRoutes = require('./routes/inscripciones.routes');
const asistenciasRoutes = require('./routes/asistencias.routes');
const mensualidadesRoutes = require('./routes/mensualidades.routes');
const pagosRoutes = require('./routes/pagos.routes');
const autenticacionRoutes = require('./routes/autenticacion.routes');

const app = express();

const PORT = process.env.PORT || 3000;

// Permite JSON
app.use(express.json());

// Carpeta frontend
app.use(express.static(
    path.join(__dirname, '..', 'public')
));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, '..', 'views', 'index.html')
    );
});

// Ruta CRUD Clases
app.get('/clases-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'clases.html')
    );

});

// Rutas de autenticación
app.get('/login', (req, res) => {
    res.sendFile(
        path.join(__dirname, '..', 'views', 'login.html')
    );
});

app.get('/registro', (req, res) => {
    res.sendFile(
        path.join(__dirname, '..', 'views', 'registro.html')
    );
});

// Rutas
app.use('/usuarios', usuariosRoutes);
app.use('/alumnos', alumnosRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/clases', clasesRoutes);
app.use('/horarios', horariosRoutes);
app.use('/salones', salonesRoutes);
app.use('/clases-programadas', clasesProgramadasRoutes);
app.use('/inscripciones', inscripcionesRoutes);
app.use('/asistencias', asistenciasRoutes);
app.use('/mensualidades', mensualidadesRoutes);
app.use('/pagos', pagosRoutes);
app.use('/', autenticacionRoutes);

// Inicializa servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});