// Required
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');


// Inicializar variables
var app = express();

// BodyParser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var hospitalRoutes = require('./routes/hospital');
var medicolRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var loginRoutes = require('./routes/login');

//Conexion a la BBDD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos online: \x1b[32m%s\x1b[0m', 'online');

});



// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicolRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/', appRoutes);


// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});