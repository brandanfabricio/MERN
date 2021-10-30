const express = require('express');
const router = express.Router();
const proyectosControler = require('../controller/proyectoControler');

const auth = require('../middleware/authe');

const {check} = require('express-validator');


// crear proyectos 
// api/proyecto
router.post('/', 
auth,[

    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
],

proyectosControler.crearProyecto

);

//obtenerProyecto
router.get('/', 
auth,
proyectosControler.obtenerProyecto

);

//actualizarProyecto}

router.put('/:id', 
auth,
[

    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
],
proyectosControler.actualizarProyecto

);

//eliminar proyecto 
router.delete('/:id', 
auth,

proyectosControler.eliminarProyecto

);
module.exports = router;