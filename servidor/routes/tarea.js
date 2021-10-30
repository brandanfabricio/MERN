const express = require('express');
const router = express.Router();
const tareasControler = require('../controller/tareasControler');

const auth = require('../middleware/authe');

const {check} = require('express-validator');

//crear tareas 
//api/tareas/

router.post('/',
auth,
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('proyecto','El proyecto es obligatorio').not().isEmpty()    

],

tareasControler.crearTareas
);

//obtere tareas por proyecti 
router.get("/", 
auth,
tareasControler.obtenerTareas);

//autalizar tareas 
router.put("/:id",

auth,
tareasControler.actualizarTareas);

//eliminar tareas 
router.delete("/:id",auth,tareasControler.eliminarTareas);



module.exports = router;