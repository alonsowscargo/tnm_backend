const express = require('express')
const app = express()
const {verifyToken} = require('../middlewares/authotization');
//const prefix='/api/usuario';
const prefix='/api/control-servicio';
const controlServicioController=require('../controllers/controlServicioCtrl');


app.get(`${prefix}`,[],controlServicioController.list);

// app.get(`${prefix}/:id`,[], taskController.findOneBy)

//app.post(`${prefix}`,verifyToken, taskController.create)
// app.post(`${prefix}`,[], taskController.create)


// app.delete(`${prefix}/:id`, taskController.delete)

// app.put(`${prefix}/:id`,[], taskController.update)


module.exports=app;
