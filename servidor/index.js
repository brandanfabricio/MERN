const express = require('express');
const conectarDB = require('./config/db');



//crear servidor 
const app = express();
//conectar a la base de dato 


conectarDB();
//express .js 
app.use(express.json({extension: true}));

//pueto 
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuario') );
app.use('/api/auth', require('./routes/auth') );
app.use('/api/proyecto', require('./routes/proyecto') );
app.use('/api/tareas', require('./routes/tarea') );





//mensaje
app.get('/', (req, res) => {
    res.send("hola  estoy conectado")
});

//arrancar servidor 
app.listen(PORT, () => {
    console.log(`escuchando por el puerto ${PORT}`);
})
