const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.autenticarUsuario = async (req, res) => {
     // revidar si hay errores 
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }

// estrar password y email 
const {email,password} = req.body;

try {
    //revisar si el usuario existe o no
    let usuario = await Usuario.findOne({email});
    if(!usuario) {
        return res.status(400).json({msg: 'El usuario no existe'});
    }
    // revisar password
    const passCorrecto = await  bcryptjs.compare(password, usuario.password);
    if(!passCorrecto){
        return res.status(400).json({msg : 'El password es incorrecto'})
    }

    // si todo es correcto 
    const payload = {
        usuario: {
            id : usuario.id
        }
    };
    //firmar
    jwt.sign(payload, process.env.SECRETA,{
        expiresIn: 3600

    }, (error, token) => {
        if(error) throw error;
          //respuesta
    res.json({token});

    }) 
   

} catch (error) {
    console.log(error);
}

 

};

