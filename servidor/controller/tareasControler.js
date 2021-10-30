const Tareas = require ('../models/Tarea');
const Proyecto = require ('../models/Proyecto');
const {validationResult} = require('express-validator');
const Tarea = require('../models/Tarea');

//crea una nueva tareas 

exports.crearTareas = async (req, res) => {

        //revisar erro 
        const errores = validationResult(req);
        if(!errores.isEmpty()) {
            return res.status(400).json({error: error.array()});
        }

       
        try {
             //extraer proyexto y ver si existe 
        const {proyecto} = req.body;
            const exiteProyecto = await Proyecto.findById(proyecto);
            if(!exiteProyecto) {
                return res.status(404).json({msg: 'Proyecto no encontrado'});
            }
            // revisar si pertenece al ausuatio actual 
            if(exiteProyecto.creador.toString() !== req.usuario.id) {
                return res.status(401).json({msg : 'No Autorizado'})
            }
            const tarea = new Tareas(req.body);
            await tarea.save();
            res.json({tarea})
            
        } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
        }
};


//obtener tareas
exports.obtenerTareas =  async (req,res) => {

    try {
              //extraer proyexto y ver si existe 
              const {proyecto} = req.body;
              const exiteProyecto = await Proyecto.findById(proyecto);
              if(!exiteProyecto) {
                  return res.status(404).json({msg: 'Proyecto no encontrado'});
              }
              // revisar si pertenece al ausuatio actual 
              if(exiteProyecto.creador.toString() !== req.usuario.id) {
                  return res.status(401).json({msg : 'No Autorizado'})
              }

              //obter las tareas por proyecto
              const tareas = await Tareas.find({proyecto});
              res.json({tareas});

    } catch (error) {
        
        console.log(error);
        res.status(500).send('Hubo un error')
    }

};
exports.actualizarTareas = async (req, res) => {

    try {
          //extraer proyexto y ver si existe 
          const {proyecto,nombre,estado} = req.body;
          
          const exiteProyecto = await Proyecto.findById(proyecto);
         
            //si la tarea existe
            let tarea = await Tarea.findById(req.params.id);
            if(!tarea) {
                return res.status(401).json({msg : 'No existe la tarea'})
            }

            if(exiteProyecto.creador.toString() !== req.usuario.id) {
                return res.status(401).json({msg : 'No Autorizado'})
            }


            //objeto con la nueva informacion 
            const nuevaTareas = {};
            if(nombre) nuevaTareas.nombre= nombre;
            
            if(estado) nuevaTareas.estado= estado;
            
            //guardar 
            tarea = await Tarea.findOneAndUpdate({_id : req.params.id},nuevaTareas,{new : true} );
            res.json({tarea});


    } catch (error) {   

        console.log(error);
        res.status(500).send('Hubo un error')
        
    }

  

};


//eliminar tareas 
exports.eliminarTareas = async (req, res) => {

    try {
          //extraer proyexto y ver si existe 
          const {proyecto} = req.body;
          
          const exiteProyecto = await Proyecto.findById(proyecto);
         
            //si la tarea existe
            let tarea = await Tarea.findById(req.params.id);
            if(!tarea) {
                return res.status(401).json({msg : 'No existe la tarea'})
            }

            if(exiteProyecto.creador.toString() !== req.usuario.id) {
                return res.status(401).json({msg : 'No Autorizado'})
            }

                //eliminar 
            await Tarea.findByIdAndRemove({_id: req.params.id});
            res.json({msg : 'Tarea Eliminada'})



    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }



};
