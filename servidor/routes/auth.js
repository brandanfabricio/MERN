//rutas autenticar usuario
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authConteler = require('../controller/authControler');
//crear usuarios crear

//api/auth
router.post('/', 
     [

         check('email', 'agrege un email valido').isEmail(),
         check('password','El pasword debe ser minimo de 6 caracteres').isLength({min:6})  
    ],
       authConteler.autenticarUsuario
);

module.exports = router;