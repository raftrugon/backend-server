var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Hospital = require('../models/hospital');
var mdAutenticacion = require('../middlewares/autenticacion');


// =====================================
// Obtener todos los hospitales
// =====================================
app.get('/', (req, res, next) => {
    Hospital.find({})
        .populate('usuario', 'nombre email')
        .exec(
            (err, hospitales) => {

                if (err) {
                    res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospitales',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    mensaje: 'Get hospitales',
                    hospitales: hospitales
                });
            });
});




// =====================================
// Crear un nuevo hospital
// =====================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id
    });
    hospital.save((err, hospitalGuardado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado
        });
    });


});

// =====================================
// Actualizar hospital
// =====================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body

    Hospital.findById(id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id' + id + 'no existe',
                errors: { message: 'No existe un hospital con el ID indicado' }
            });
        }

        hospital.nombre = body.nombre;
        hospital.usuario = req.usuario._id;

        hospital.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar el hospital',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });
        });
    });
});


// =====================================
// Borrar un usuaio
// =====================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar hospital',
                errors: err
            });
        }

        if (!hospitalBorrado) {
            res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id' + id + 'no existe',
                errors: { message: 'No existe un hospital con el ID indicado' }
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });
    });
});
module.exports = app;