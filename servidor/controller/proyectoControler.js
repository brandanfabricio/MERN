const Proyecto = require('../models/Proyecto');

const {validationResult} = require('express-validator');

exports.crearProyecto = async (req,res) => {


    
    // revidar errores 
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }

    try {
            //crear un nuevo proyecto
            const proyecto = new Proyecto(req.body);

            // guardar el creador via jswt

            proyecto.creador = req.usuario.id;

            //guardar proyecto
            proyecto.save();
            res.json(proyecto);



    } catch (error) {
        console.log(error);
        res.send(500).send('hubo un error ');
        
    }
}

//obtene todo los proyecto del usuario actual 

exports.obtenerProyecto = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({creador : req.usuario.id});
        res.json({proyectos});
        
    } catch (error) {
        console.log(error);
        res.send(500).send('hubo un error ');
    }

}

//actualizar ptoyecto 

exports.actualizarProyecto = async (req, res) => {


     // revidar errores 
     const error = validationResult(req);
     if(!error.isEmpty()) {
         return res.status(400).json({error: error.array()});
     }

      //extra la infirmacion del proyecto 
      const {nombre} = req.body;
      const nuevoProyecto = {};
      if(nombre){
          nuevoProyecto.nombre = nombre;
      }

  try {
          // revisar el id

            let proyecto = await Proyecto.findById(req.params.id);



          // si el proyecto existe o no
                if(!proyecto){
                    return res.status(404).json({msj : 'Proyecto no encontrado'})
                }
            
          // verificar el creador 
                if(proyecto.creador.toString() !== req.usuario.id){
                    return res.status(401).json({msj : 'No Autorizado'})
                }


          // actualizar
   proyecto = await Proyecto.findOneAndUpdate({_id : req.params.id},{$set : nuevoProyecto},{new : true})
      res.json({proyecto});          


  } catch (error) {
    console.log(error);
    res.send(500).send('hubo un erroren el servidor ');
      
  }
//  elimina el proyexto por id 

}
exports.eliminarProyecto = async (req, res)=>{

    try {
        // revisar el id

          let proyecto = await Proyecto.findById(req.params.id);



        // si el proyecto existe o no
              if(!proyecto){
                  return res.status(404).json({msj : 'Proyecto no encontrado'})
              }
          
        // verificar el creador 
              if(proyecto.creador.toString() !== req.usuario.id){
                  return res.status(401).json({msj : 'No Autorizado'})
              }


        // eliminar

        await Proyecto.findOneAndRemove({_id : req.params.id});
        res.json({msj : 'Proyecto eliminado'})
      


} catch (error) {
  console.log(error);
  res.send(500).send('hubo un erroren el servidor ');
    
}
    

}