const express = require('express');
require('dotenv').config();
const cors = require('cors')

const { dbConnection } = require('./bd/config');


const app = express();

// Configurar CORS
app.use(cors());

// Base de Datos
dbConnection();

// Rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    });
});

app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto: ' + process.env.PORT);
});