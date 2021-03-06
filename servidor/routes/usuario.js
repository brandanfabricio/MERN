//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioControler = require('../controller/usuarioControler');
const {check} = require('express-validator');

//crear usuarios crear

//api/usuarios
router.post('/', 
     [
         check('nombre', 'El nombre es obligatorio').not().isEmpty(),
         check('email', 'agrege un email valido').isEmail(),
         check('password','El pasword debe ser minimo de 6 caracteres').isLength({min:6})  
    ],
    usuarioControler.crearUsuario
);

module.exports = router;