const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            mensaje: 'Token requerido'
        });

    }

    const token = authHeader.split(' ')[1];

    if (!token) {

        return res.status(401).json({
            mensaje: 'Token inválido'
        });

    }

    try {

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });

    }

}

function soloAdmin(req, res, next) {

    if (req.usuario.rol !== 'admin') {

        return res.status(403).json({
            mensaje: 'Acceso denegado'
        });

    }

    next();

}

function soloAlumno(req, res, next) {

    if (req.usuario.rol !== 'alumno') {

        return res.status(403).json({
            mensaje: 'Acceso solo para alumnos'
        });

    }

    next();

}

function soloProfesor(req, res, next) {

    if (req.usuario.rol !== 'profesor') {

        return res.status(403).json({
            mensaje: 'Acceso solo para profesores'
        });

    }

    next();

}

module.exports = {
    verificarToken,
    soloAdmin,
    soloAlumno,
    soloProfesor
};