const express = require('express');
require('dotenv').config();
const cors = require('cors')

const { dbConnection } = require('./bd/config');

const app = express();

// Configurar CORS
app.use(cors());

//parseo
app.use(express.json());

// Base de Datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto: ' + process.env.PORT);
});