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
const alumnoPanelRoutes = require('./routes/alumno_panel.routes');
const profesorPanelRoutes = require('./routes/profesor_panel.routes');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(
    path.join(__dirname, '..', 'public')
));

app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'index.html')
    );

});

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

app.get('/alumno_panel', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'alumno_panel.html')
    );

});

app.get('/profesor_panel', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'profesor_panel.html')
    );

});

app.get('/clases-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'clases.html')
    );

});

app.get('/alumnos-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'alumnos.html')
    );

});

app.get('/profesores-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'profesores.html')
    );

});

app.get('/horarios-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'horarios.html')
    );

});

app.get('/salones-admin', (req, res) => {

    res.sendFile(
        path.join(__dirname, '..', 'views', 'salones.html')
    );

});

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

app.use('/alumno_panel', alumnoPanelRoutes);

app.use('/profesor_panel', profesorPanelRoutes);

app.use('/', autenticacionRoutes);

app.listen(PORT, () => {

    console.log(
        `Servidor corriendo en puerto ${PORT}`
    );

});