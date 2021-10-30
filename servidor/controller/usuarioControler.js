const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // revidar errores 
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }
    //extrar email y password
    const {email,password} = req.body;



    try {
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: ' El usuario ya  existe'});
        }
        //crea  usuario
        usuario = new Usuario(req.body);
        //hasher el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        //guardar usuario
       await usuario.save();
       // crear y firmar el json web token
       const payload = {
           usuario: {
               id : usuario.id
           }
       };
       //firmar
       jwt.sign(payload, process.env.SECRETA,{
           expiresIn: 36000

       }, (error, token) => {
           if(error) throw error;
             //respuesta
       res.json({token});
       console.log(token);

       }) 
      

    } catch (error) {
            console.error(error);
            res.status(400).send('hubo un error')
    }       
}

