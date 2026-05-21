const express = require('express');
const path = require('path');
const cors = require('cors');

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

app.use(cors());

const PORT = process.env.PORT || 3000;

// ======================
// MIDDLEWARES
// ======================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// ======================
// ARCHIVOS ESTÁTICOS
// ======================

app.use(express.static(
    path.join(__dirname, '..', 'public')
));

// ======================
// VISTAS
// ======================

// Inicio
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'index.html')
    );

});

// Login
app.get('/login', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'login.html')
    );

});

// Registro
app.get('/registro', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'registro.html')
    );

});

// CRUD Clases
app.get('/clases-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'clases.html')
    );

});

// CRUD Alumnos
app.get('/alumnos-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'alumnos.html')
    );

});

// CRUD Profesores
app.get('/profesores-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'profesores.html')
    );

});

// CRUD Horarios
app.get('/horarios-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'horarios.html')
    );

});

// CRUD Salones
app.get('/salones-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'salones.html')
    );

});

// ======================
// RUTAS API
// ======================

app.use('/usuarios', usuariosRoutes);

app.use('/alumnos', alumnosRoutes);

app.use('/profesores', profesoresRoutes);

app.use('/clases', clasesRoutes);

app.use('/horarios', horariosRoutes);

app.use('/salones', salonesRoutes);

app.use('/clases_programadas', clasesProgramadasRoutes);

app.use('/inscripciones', inscripcionesRoutes);

app.use('/asistencias', asistenciasRoutes);

app.use('/mensualidades', mensualidadesRoutes);

app.use('/pagos', pagosRoutes);

// Auth
app.use('/', autenticacionRoutes);

// ======================
// SERVIDOR
// ======================

app.listen(PORT, () => {

    console.log(
        `Servidor corriendo en puerto ${PORT}`
    );

});