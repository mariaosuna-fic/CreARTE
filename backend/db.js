const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'CreArte',
    password: 'Crearte123',
    database: 'CREARTE'
});

conexion.connect((error) => {
    if(error){
        console.log(error);
    } else {
        console.log('Conectado a MySQL');
    }
});

module.exports = conexion;