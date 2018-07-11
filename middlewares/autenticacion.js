var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED;


// =====================================
// Verificar Token
// =====================================
exports.verificaToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no valido',
                errors: err
            });
        }
        req.Usuario = decoded.usuario;
        next();
    });
};