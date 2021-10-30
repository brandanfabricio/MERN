const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});


const conectarDB= async ()=> {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('Base de datos conectada db');


    } catch (error) {
        console.error(error)
        process.exit(1); // detner app
    }

}


module.exports =conectarDB;