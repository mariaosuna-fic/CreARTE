const mysql = require('mysql2');
require('dotenv').config();

// Configuración para conectarnos a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Prueba de conexión con MySQL
connection.connect((error) => {

    if(error){
        console.log('Error al conectar con la base de datos:', error);
        return;
    }

    console.log('Conexión a MySQL exitosa');

});

// Exportamos la conexión para usarla en otros archivos
module.exports = connection;